// src/components/InspectorPanel.jsx
import { useFlow } from '../FlowContext';

export default function InspectorPanel() {
  const { nodes, selectedNodeId, updateNode, setSelectedNodeId } = useFlow();

  if (!selectedNodeId) return null;

  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  if (!selectedNode) return null;

  return (
    <div className="lg:w-80 w-full max-w-full fixed inset-x-0 bottom-0 z-50 max-h-[70vh] bg-white border-t border-gray-200 p-4 flex flex-col shadow-2xl overflow-hidden lg:static lg:max-h-full lg:border-l lg:border-t-0 lg:h-screen lg:shadow-none">
      <div className="mx-auto w-10 h-1.5 rounded-full bg-gray-300 mb-3 lg:hidden" />
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

      <label className="text-xs sm:text-sm font-semibold mb-1 block">Question Text</label>
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none min-h-[120px] focus:outline-none focus:border-blue-500"
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