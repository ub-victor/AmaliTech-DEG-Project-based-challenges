import { createContext, useContext, useState } from 'react';
import flowData from '../flow_data.json';

const FlowContext = createContext();

export function FlowProvider({ children }) {
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [viewMode, setViewMode] = useState('editor'); // 'editor' | 'preview'

  // Derive a map for quick lookups
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Find start node (first "start" type or fallback to first node)
  const startNode = nodes.find(n => n.type === 'start') || nodes[0];

  const updateNode = (id, newData) => {
    setNodes(prev => prev.map(n => (n.id === id ? { ...n, ...newData } : n)));
  };

  return (
    <FlowContext.Provider value={{
      nodes, setNodes, nodeMap, startNode,
      selectedNodeId, setSelectedNodeId,
      viewMode, setViewMode,
      updateNode
    }}>
      {children}
    </FlowContext.Provider>
  );
}

export const useFlow = () => useContext(FlowContext);