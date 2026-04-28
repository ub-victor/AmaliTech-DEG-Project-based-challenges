// src/components/InspectorPanel.jsx
import { useFlow } from '../FlowContext';

export default function InspectorPanel() {
  const { nodes, selectedNodeId, updateNode, setSelectedNodeId } = useFlow();

  if (!selectedNodeId) return null;

  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  if (!selectedNode) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 flex flex-col h-screen shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold">Edit Node</h2>
        <button
          onClick={() => setSelectedNodeId(null)}
          className="text-gray-500 hover:text-gray-800 text-lg leading-none"
        >
          ✕
        </button>
      </div>

      <div className="text-xs text-gray-500 mb-2">ID: {selectedNode.id}</div>

      <label className="text-xs font-semibold mb-1 block">Question Text</label>
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 text-xs resize-none focus:outline-none focus:border-blue-500"
        rows={4}
        value={selectedNode.text}
        onChange={(e) => updateNode(selectedNode.id, { text: e.target.value })}
      />

      {selectedNode.type === 'end' && (
        <div className="mt-4 text-xs text-green-600 bg-green-50 p-2 rounded">
          This is an END node – no options.
        </div>
      )}

      {selectedNode.options && selectedNode.options.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold mb-2">Options</h3>
          <ul className="space-y-1">
            {selectedNode.options.map((opt, idx) => (
              <li key={idx} className="text-xs bg-gray-50 p-2 rounded flex justify-between">
                <span>{opt.label}</span>
                <span className="text-gray-400">{opt.nextId || 'end'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}