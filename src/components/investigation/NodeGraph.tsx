import React, { useRef, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { initialWebsites } from '../../data/storyData';
import { soundEngine } from '../../audio/soundEngine';

interface NodePos {
  id: string;
  label: string;
  url: string;
  x: number;
  y: number;
  unlocked: boolean;
}

export const NodeGraph: React.FC = () => {
  const unlockedUrls = useGameStore((state) => state.unlockedUrls);
  const evidenceConnections = useGameStore((state) => state.evidenceConnections);
  const navigateUrl = useGameStore((state) => state.navigateUrl);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate node positions in circle / graph layout
  const nodes: NodePos[] = Object.values(initialWebsites).map((site, index, array) => {
    const angle = (index / array.length) * Math.PI * 2;
    const radius = 180;
    const centerX = 350;
    const centerY = 250;
    return {
      id: site.id,
      label: site.name,
      url: site.pages['/']?.url || `http://${site.domain}`,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      unlocked: unlockedUrls.includes(site.pages['/']?.url || `http://${site.domain}`),
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw connections between unlocked nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].unlocked && nodes[j].unlocked) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // Glowing animated pulses on connection lines
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            const pulse = (frame * 0.02) % 1;
            grad.addColorStop(0, 'rgba(0, 255, 102, 0.2)');
            grad.addColorStop(pulse, 'rgba(0, 255, 102, 0.8)');
            grad.addColorStop(1, 'rgba(0, 255, 102, 0.2)');

            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }

      // Draw node circles & text
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = node.unlocked ? '#00ff66' : '#1a291a';
        ctx.fill();
        ctx.strokeStyle = node.unlocked ? '#ffffff' : '#005522';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node Label
        ctx.font = '10px VT323, monospace';
        ctx.fillStyle = node.unlocked ? '#00ff66' : '#006622';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 30);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [unlockedUrls]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const clicked = nodes.find(
      (n) => Math.hypot(n.x - clickX, n.y - clickY) < 20 && n.unlocked
    );

    if (clicked) {
      soundEngine.playKeyClick();
      navigateUrl(clicked.url);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-crt-dark p-4 text-crt-green font-mono text-xs select-none">
      <div className="flex justify-between items-center pb-2 border-b border-crt-green/30 mb-3">
        <h3 className="font-bold text-sm">SURVIVING INTERNET NETWORK MAP</h3>
        <span className="text-[10px] text-amber-400">CLICK UNLOCKED NODE TO VISIT WEBSITE</span>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-hidden border border-crt-green/20 rounded bg-black/60 relative">
        <canvas
          ref={canvasRef}
          width={700}
          height={500}
          onClick={handleCanvasClick}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
