// src/components/PreviewMode.jsx
import { useState, useRef, useEffect } from 'react';
import { useFlow } from '../FlowContext';

export default function PreviewMode() {
  const { startNode, nodeMap } = useFlow();
  const [messages, setMessages] = useState([]);
  const [currentNodeId, setCurrentNodeId] = useState(startNode?.id);
  const [conversationEnded, setConversationEnded] = useState(false);
  const messagesEndRef = useRef(null);

  const currentNode = nodeMap.get(currentNodeId);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = (option) => {
    // Add user's choice as a message
    const userMessage = {
      type: 'user',
      text: option.label,
      id: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);

    if (option.nextId) {
      // Move to next node and add its question
      const nextNode = nodeMap.get(option.nextId);
      if (nextNode) {
        setCurrentNodeId(option.nextId);
        const botMessage = {
          type: 'bot',
          text: nextNode.text,
          id: Date.now() + 0.5,
        };
        // If it's an end node, we'll show it and then mark ended after a short delay
        if (nextNode.type === 'end' || nextNode.options?.length === 0) {
          setMessages(prev => [...prev, botMessage]);
          setConversationEnded(true);
        } else {
          setMessages(prev => [...prev, botMessage]);
        }
      } else {
        setConversationEnded(true);
      }
    } else {
      // nextId is null -> end immediately
      setConversationEnded(true);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setConversationEnded(false);
    setCurrentNodeId(startNode.id);
    // Add the first bot question
    setMessages([{ type: 'bot', text: startNode.text, id: Date.now() }]);
  };

  // Initial message
  useEffect(() => {
    if (startNode && messages.length === 0 && !conversationEnded) {
      setMessages([{ type: 'bot', text: startNode.text, id: Date.now() }]);
    }
  }, [startNode, messages.length, conversationEnded]);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs rounded-lg p-3 text-sm ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
              }`}
              style={{ borderRadius: '10px' }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Options / End screen */}
      <div className="border-t border-gray-200 bg-white p-4">
        {conversationEnded ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mb-2">
              ✓
            </div>
            <p className="text-xs text-gray-500 mb-3">Conversation finished</p>
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              Restart
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-2">Choose an option:</p>
            <div className="flex flex-wrap gap-2">
              {currentNode?.options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}