// src/components/Canvas.jsx
import { useFlow } from '../FlowContext';
import NodeCard from './NodeCard';
import ConnectionsLayer from './ConnectionsLayer';

export default function Canvas() {
  const { nodes, selectedNodeId, setSelectedNodeId } = useFlow();

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-gray-50"
      onMouseDown={(e) => {
        // If clicked directly on the canvas background, deselect
        if (e.target === e.currentTarget) {
          setSelectedNodeId(null);
        }
      }}
    >
      <ConnectionsLayer />
      {nodes.map(node => (
        <NodeCard
          key={node.id}
          node={node}
          isSelected={node.id === selectedNodeId}
          onClick={() => setSelectedNodeId(node.id)}
        />
      ))}
    </div>
  );
}