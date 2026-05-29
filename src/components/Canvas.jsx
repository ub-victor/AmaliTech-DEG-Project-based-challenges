// src/components/Canvas.jsx
import { useRef } from 'react';
import { useFlow } from '../FlowContext';
import NodeCard from './NodeCard';
import ConnectionsLayer from './ConnectionsLayer';

function getTouchDistance(touches) {
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY
  );
}

export default function Canvas() {
  const {
    nodes,
    selectedNodeId,
    selectNode,
    clearSelection,
    canvasZoom,
    canvasPan,
    panCanvas,
    setCanvasZoom,
  } = useFlow();

  const canvasRef = useRef(null);
  const panStart = useRef(null);
  const pinchState = useRef(null);

  const handlePointerDown = (e) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    panStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!panStart.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    if (dx !== 0 || dy !== 0) {
      panCanvas(dx, dy);
      panStart.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e) => {
    panStart.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setCanvasZoom(canvasZoom + (e.deltaY > 0 ? -0.1 : 0.1));
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      pinchState.current = {
        distance: getTouchDistance(e.touches),
        zoom: canvasZoom,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (pinchState.current && e.touches.length === 2) {
      e.preventDefault();
      const newDistance = getTouchDistance(e.touches);
      setCanvasZoom(pinchState.current.zoom * (newDistance / pinchState.current.distance));
    }
  };

  const handleTouchEnd = () => {
    pinchState.current = null;
  };

  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) {
      clearSelection();
    }
  };

  const minX = Math.min(0, ...nodes.map(node => node.position?.x ?? 0));
  const minY = Math.min(0, ...nodes.map(node => node.position?.y ?? 0));
  const maxX = Math.max(...nodes.map(node => (node.position?.x ?? 0) + 260));
  const maxY = Math.max(...nodes.map(node => (node.position?.y ?? 0) + 220));
  const contentWidth = Math.max(1200, maxX - minX + 300);
  const contentHeight = Math.max(800, maxY - minY + 300);

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full min-h-[calc(100vh-3rem)] overflow-visible bg-gray-50"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleCanvasClick}
      style={{ touchAction: 'pan-x pan-y' }}
    >
      <div className="absolute inset-0 w-full h-full">
        <ConnectionsLayer canvasRef={canvasRef} canvasZoom={canvasZoom} canvasPan={canvasPan} />
      </div>

      <div style={{ width: contentWidth, height: contentHeight, position: 'relative' }}>
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: `translate(${canvasPan.x}px, ${canvasPan.y}px) scale(${canvasZoom})`,
          }}
        >
          {nodes.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              isSelected={node.id === selectedNodeId}
              onClick={() => selectNode(node.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
