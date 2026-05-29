// src/components/PreviewMode.jsx
import { useState, useRef, useEffect } from 'react';
import { useFlow } from '../FlowContext';

export default function PreviewMode() {
  const { startNode, nodeMap } = useFlow();
  const messageIdRef = useRef(2);
  const initialMessages = startNode ? [{ type: 'bot', text: startNode.text, id: 1 }] : [];
  const [messages, setMessages] = useState(initialMessages);
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
      id: messageIdRef.current++,
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
          id: messageIdRef.current++,
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
    messageIdRef.current = 1;
    setMessages([{ type: 'bot', text: startNode.text, id: messageIdRef.current++ }]);
    setConversationEnded(false);
    setCurrentNodeId(startNode.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-full sm:max-w-xs rounded-lg p-3 text-sm ${
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
              className="w-full sm:inline-flex sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              Restart
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-2">Choose an option:</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {currentNode?.options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
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