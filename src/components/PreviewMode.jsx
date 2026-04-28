// src/components/PreviewMode.jsx
import { useState } from 'react';
import { useFlow } from '../FlowContext';

export default function PreviewMode() {
  const { startNode, nodeMap } = useFlow();
  const [currentNodeId, setCurrentNodeId] = useState(startNode?.id);
  const [history, setHistory] = useState([]); // For possible "back" feature? Not required.

  const currentNode = nodeMap.get(currentNodeId);
  if (!currentNode) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">No start node defined.</p>
      </div>
    );
  }

  const isEnd = currentNode.type === 'end' || currentNode.options?.length === 0;

  const handleOptionClick = (nextId) => {
    if (nextId) {
      setCurrentNodeId(nextId);
    } else {
      setCurrentNodeId(null); // will show the end screen
    }
  };

  const handleRestart = () => {
    setCurrentNodeId(startNode.id);
  };

  // End screen when nextId is null or no more nodes
  if (isEnd || !currentNodeId) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
            ✓
          </div>
          <h2 className="text-lg font-bold mb-2">Conversation Ended</h2>
          <p className="text-gray-500 text-sm mb-6">
            {currentNode?.text || "Thanks! An agent will reach out."}
          </p>
          <button
            onClick={handleRestart}
            className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Restart Conversation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Bot message (question) */}
        <div className="flex justify-start">
          <div className="max-w-xs bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-800">{currentNode.text}</p>
          </div>
        </div>

        {/* User message placeholders (if we want to show previous choices) */}
        {/* We could track history, but for simplicity we'll skip that */}
      </div>

      {/* Options area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <p className="text-xs text-gray-400 mb-2">Choose an option:</p>
        <div className="flex flex-wrap gap-2">
          {currentNode.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(opt.nextId)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}