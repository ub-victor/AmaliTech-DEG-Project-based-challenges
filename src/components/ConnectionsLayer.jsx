import { useRef } from 'react';
import { useFlow } from '../FlowContext';
import { useConnectionLines } from '../hooks/useConnectionLines';

export default function ConnectionsLayer() {
  const { nodes, nodeMap } = useFlow();
  const canvasRef = useRef(null);
  const paths = useConnectionLines(nodes, nodeMap, canvasRef);

  return (
    <svg ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L6,3 z" fill="#CDD3DC" />
        </marker>
      </defs>
      {paths.map(p => (
        <path
          key={p.id}
          d={p.d}
          fill="none"
          stroke="#CDD3DC"
          strokeWidth="1.4"
          markerEnd="url(#arrowhead)"
        />
      ))}
    </svg>
  );
}