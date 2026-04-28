// src/components/NodeCard.jsx
import { useState, useRef, useCallback } from 'react';
import { useFlow } from '../FlowContext';

export default function NodeCard({ node, isSelected, onClick }) {
  const { updateNode } = useFlow();
  const isEnd = node.type === 'end';
  const borderColor = isEnd ? '#86EFAC' : isSelected ? '#2D6CDF' : '#CDD3DC';
  const bgColor = isEnd ? '#ECFDF5' : 'white';

  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, nodeX: 0, nodeY: 0 });
  const hasMoved = useRef(false);

  const onMouseDown = (e) => {
    e.stopPropagation(); // prevent canvas-level events
    // Only left click
    if (e.button !== 0) return;
    // If ALT is held, we might disable snap later; for now allow free movement
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      nodeX: node.position.x,
      nodeY: node.position.y,
    };
    hasMoved.current = false;
    setDragging(true);

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - dragStart.current.x;
      const dy = moveEvent.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved.current = true;
      }
      let newX = dragStart.current.nodeX + dx;
      let newY = dragStart.current.nodeY + dy;

      // Snap to 14pt grid unless ALT is pressed
      if (!moveEvent.altKey) {
        newX = Math.round(newX / 14) * 14;
        newY = Math.round(newY / 14) * 14;
      }

      updateNode(node.id, { position: { x: newX, y: newY } });
    };

    const onMouseUp = () => {
      setDragging(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // If we didn't really move, it's a click
      if (!hasMoved.current) {
        onClick();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className="absolute select-none"
      style={{
        left: node.position.x,
        top: node.position.y,
        width: 200,
        cursor: dragging ? 'grabbing' : 'pointer',
        zIndex: dragging ? 1000 : 10,
      }}
    >
      <div
        className="rounded-lg border-2 transition-colors relative"
        style={{
          borderColor,
          backgroundColor: bgColor,
          padding: 10,
          borderWidth: isSelected ? 1.6 : 1,
        }}
      >
        {/* Input port */}
        <div
          id={`input-port-${node.id}`}
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-400 border border-white z-10"
        />

        <p className="text-[9.5px] font-normal leading-tight mb-2">{node.text}</p>

        {!isEnd && node.options.map((opt, idx) => (
          <div
            key={`${node.id}-opt-${idx}`}
            className="flex items-center justify-between text-[9.5px] py-1 border-t border-gray-100 relative"
          >
            <span>{opt.label}</span>
            <div
              id={`port-${node.id}-${idx}`}
              className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-400 border border-white z-10"
            />
          </div>
        ))}

        {isEnd && (
          <div className="text-[9.5px] text-green-700 font-semibold mt-1">END</div>
        )}
      </div>
    </div>
  );
}