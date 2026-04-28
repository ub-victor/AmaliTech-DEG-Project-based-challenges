import { useEffect, useState } from 'react';


export function useConnectionLines(nodes, nodeMap, canvasRef) {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const newPaths = [];
    // Wait for next frame so DOM is painted
    const raf = requestAnimationFrame(() => {
      nodes.forEach(node => {
        if (node.type === 'end' || !node.options) return;

        node.options.forEach((opt, optIdx) => {
          if (!opt.nextId) return; // skip null links
          const targetNode = nodeMap.get(opt.nextId);
          if (!targetNode) return;

          // Get source port element (we need its position relative to canvas)
          const sourcePort = document.getElementById(`port-${node.id}-${optIdx}`);
          const targetPort = document.getElementById(`input-port-${targetNode.id}`);
          if (!sourcePort || !targetPort) return;

          const canvasRect = canvasRef.current.getBoundingClientRect();
          const sourceRect = sourcePort.getBoundingClientRect();
          const targetRect = targetPort.getBoundingClientRect();

          const sx = sourceRect.right - canvasRect.left;
          const sy = sourceRect.top + sourceRect.height/2 - canvasRect.top;
          const tx = targetRect.left - canvasRect.left;
          const ty = targetRect.top + targetRect.height/2 - canvasRect.top;

          // Build a smooth cubic bezier (horizontal then vertical)
          const midX = (sx + tx) / 2;
          const d = `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ty}, ${tx} ${ty}`;

          newPaths.push({
            id: `${node.id}-${optIdx}-to-${targetNode.id}`,
            d,
          });
        });
      });
      setPaths(newPaths);
    });
    return () => cancelAnimationFrame(raf);
  }, [nodes, nodeMap, canvasRef]);

  return paths;
}