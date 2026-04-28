import { useFlow } from '../FlowContext';
import NodeCard from './NodeCard';
import ConnectionsLayer from './ConnectionsLayer';

export default function Canvas() {
  const { nodes, setSelectedNodeId, selectedNodeId } = useFlow();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      {/* SVG layer for connections – we’ll fill this next */}
      <ConnectionsLayer />

      {/* Nodes layer */}
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