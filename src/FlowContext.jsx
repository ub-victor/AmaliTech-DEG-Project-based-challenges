/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import flowData from '../flow_data.json';

const FlowContext = createContext();
const STORAGE_KEY = 'supportflow-nodes';
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1.5;

export function FlowProvider({ children }) {
  const [nodes, setNodes] = useState(() => {
    if (typeof window === 'undefined') return flowData.nodes;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore invalid stored data
    }
    return flowData.nodes;
  });

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [viewMode, setViewMode] = useState('editor');
  const [isInspectorOpen, setInspectorOpen] = useState(true);
  const [canvasZoom, setCanvasZoom] = useState(1);
  const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nodes));
    } catch {
      // ignore storage errors
    }
  }, [nodes]);

  const nodeMap = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);
  const startNode = useMemo(() => nodes.find(n => n.type === 'start') || nodes[0], [nodes]);

  const clampZoom = useCallback((value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value)), []);

  const updateNode = useCallback((id, newData) => {
    setNodes(prev => prev.map(n => (n.id === id ? { ...n, ...newData } : n)));
  }, []);

  const selectNode = useCallback((id) => {
    setSelectedNodeId(id);
    setInspectorOpen(true);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const zoomIn = useCallback(() => {
    setCanvasZoom(prev => clampZoom(prev + 0.1));
  }, [clampZoom]);

  const zoomOut = useCallback(() => {
    setCanvasZoom(prev => clampZoom(prev - 0.1));
  }, [clampZoom]);

  const setCanvasZoomValue = useCallback((value) => {
    setCanvasZoom(clampZoom(value));
  }, [clampZoom]);

  const resetCanvasView = useCallback(() => {
    setCanvasZoom(1);
    setCanvasPan({ x: 0, y: 0 });
  }, []);

  const panCanvas = useCallback((dx, dy) => {
    setCanvasPan(prev => ({ x: prev.x + dx / canvasZoom, y: prev.y + dy / canvasZoom }));
  }, [canvasZoom]);

  const addNode = useCallback(() => {
    const numericIds = nodes.map(node => Number(node.id)).filter(Number.isFinite);
    const nextId = String(numericIds.length ? Math.max(...numericIds) + 1 : Date.now());
    const selectedNode = nodes.find(node => node.id === selectedNodeId);
    const position = selectedNode
      ? { x: selectedNode.position.x + 240, y: selectedNode.position.y }
      : { x: 320, y: 220 };
    const newNode = {
      id: nextId,
      type: 'question',
      text: 'New question',
      position,
      options: [{ label: 'New option', nextId: null }],
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(nextId);
    setInspectorOpen(true);
  }, [nodes, selectedNodeId]);

  const deleteNode = useCallback((id) => {
    setNodes(prev => prev
      .filter(node => node.id !== id)
      .map(node => ({
        ...node,
        options: node.options?.map(option => (option.nextId === id ? { ...option, nextId: null } : option)) ?? [],
      })));
    setSelectedNodeId(prev => (prev === id ? null : prev));
  }, []);

  const addOption = useCallback((nodeId) => {
    setNodes(prev => prev.map(node => {
      if (node.id !== nodeId) return node;
      return {
        ...node,
        options: [...(node.options ?? []), { label: 'New option', nextId: null }],
      };
    }));
  }, []);

  const updateOption = useCallback((nodeId, index, change) => {
    setNodes(prev => prev.map(node => {
      if (node.id !== nodeId) return node;
      return {
        ...node,
        options: (node.options ?? []).map((option, idx) => idx === index ? { ...option, ...change } : option),
      };
    }));
  }, []);

  const removeOption = useCallback((nodeId, index) => {
    setNodes(prev => prev.map(node => {
      if (node.id !== nodeId) return node;
      return {
        ...node,
        options: (node.options ?? []).filter((_, idx) => idx !== index),
      };
    }));
  }, []);

  const setInspectorOpenState = useCallback((value) => {
    setInspectorOpen(value);
  }, []);

  const toggleInspector = useCallback(() => {
    setInspectorOpen(prev => !prev);
  }, []);

  const autoLayout = useCallback(() => {
    const adj = new Map();
    nodes.forEach(n => adj.set(n.id, []));
    nodes.forEach(n => {
      if (n.options) {
        n.options.forEach(opt => {
          if (opt.nextId && adj.has(opt.nextId)) {
            adj.get(n.id).push(opt.nextId);
          }
        });
      }
    });

    const start = nodes.find(n => n.type === 'start') || nodes[0];
    if (!start) return;

    const visited = new Set();
    const queue = [start];
    const depthMap = new Map();
    const orderMap = new Map();
    const depthCounters = new Map();
    depthMap.set(start.id, 0);
    orderMap.set(start.id, 0);
    depthCounters.set(0, 1);

    while (queue.length > 0) {
      const current = queue.shift();
      const currentDepth = depthMap.get(current.id);
      const children = adj.get(current.id) || [];
      children.forEach(childId => {
        if (!visited.has(childId)) {
          visited.add(childId);
          const childDepth = currentDepth + 1;
          depthMap.set(childId, childDepth);
          const order = depthCounters.get(childDepth) || 0;
          orderMap.set(childId, order);
          depthCounters.set(childDepth, order + 1);
          queue.push({ id: childId, type: nodes.find(n => n.id === childId)?.type });
        }
      });
    }

    const newPositions = {};
    nodes.forEach(node => {
      if (depthMap.has(node.id)) {
        const d = depthMap.get(node.id);
        const o = orderMap.get(node.id) || 0;
        newPositions[node.id] = {
          x: 120 + d * 320,
          y: 80 + o * 120,
        };
      } else {
        newPositions[node.id] = { x: 120 + 10 * 320, y: 80 };
      }
    });

    setNodes(prev => prev.map(node => ({
      ...node,
      position: newPositions[node.id],
    })));
  }, [nodes]);

  return (
    <FlowContext.Provider value={{
      nodes,
      setNodes,
      nodeMap,
      startNode,
      selectedNodeId,
      setSelectedNodeId,
      selectNode,
      clearSelection,
      viewMode,
      setViewMode,
      isInspectorOpen,
      setInspectorOpen: setInspectorOpenState,
      toggleInspector,
      canvasZoom,
      canvasPan,
      zoomIn,
      zoomOut,
      setCanvasZoom: setCanvasZoomValue,
      resetCanvasView,
      panCanvas,
      updateNode,
      addNode,
      deleteNode,
      addOption,
      updateOption,
      removeOption,
      autoLayout,
    }}>
      {children}
    </FlowContext.Provider>
  );
}

export const useFlow = () => useContext(FlowContext);
