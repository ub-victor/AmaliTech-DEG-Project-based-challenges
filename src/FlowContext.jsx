// src/FlowContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import flowData from '../flow_data.json';

const FlowContext = createContext();

export function FlowProvider({ children }) {
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [viewMode, setViewMode] = useState('editor'); // 'editor' | 'preview'

  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const startNode = nodes.find(n => n.type === 'start') || nodes[0];

  const updateNode = useCallback((id, newData) => {
    setNodes(prev => prev.map(n => (n.id === id ? { ...n, ...newData } : n)));
  }, []);

  const autoLayout = useCallback(() => {
    // Build adjacency: id -> [childIds]
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

    // Find start node (first with type 'start' or fallback)
    const start = nodes.find(n => n.type === 'start') || nodes[0];
    if (!start) return;

    // BFS to assign depth and order
    const visited = new Set();
    const queue = [start];
    const depthMap = new Map(); // id -> depth
    const orderMap = new Map(); // id -> order within depth
    const depthCounters = new Map(); // depth -> next order index
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
          queue.push({ id: childId, type: nodes.find(n=>n.id===childId)?.type });
        }
      });
    }

    // Assign positions
    // X = 120 + depth * 280  (200 card width + 120 gap)
    // Y = 80 + order * 120  (card height roughly 100 + 40 gap)
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
        // Unreachable nodes (should not happen) place at far right
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
      nodes, setNodes, nodeMap, startNode,
      selectedNodeId, setSelectedNodeId,
      viewMode, setViewMode,
      updateNode,
      autoLayout,
    }}>
      {children}
    </FlowContext.Provider>
  );
}

export const useFlow = () => useContext(FlowContext);