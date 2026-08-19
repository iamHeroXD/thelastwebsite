import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';

export const CRTScreenOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const crtSettings = useGameStore((state) => state.crtSettings);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render scanlines and phosphor noise on HTML5 Canvas overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (crtSettings.scanlines && crtSettings.intensity > 0.05) {
        // Draw CRT scanlines
        const lineSpacing = 3;
        const opacity = 0.12 * crtSettings.intensity;
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        for (let y = 0; y < canvas.height; y += lineSpacing) {
          ctx.fillRect(0, y, canvas.width, 1);
        }

        // Draw rolling scanline beam
        const rollY = (frame * 1.5) % (canvas.height + 60) - 30;
        const grad = ctx.createLinearGradient(0, rollY - 30, 0, rollY + 30);
        grad.addColorStop(0, 'rgba(0, 255, 102, 0)');
        grad.addColorStop(0.5, `rgba(0, 255, 102, ${0.08 * crtSettings.intensity})`);
        grad.addColorStop(1, 'rgba(0, 255, 102, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, rollY - 30, canvas.width, 60);
      }

      // Draw subtle noise grain
      if (crtSettings.flicker && crtSettings.intensity > 0.1) {
        const noiseOpacity = (Math.random() * 0.03 + 0.01) * crtSettings.intensity;
        ctx.fillStyle = `rgba(255, 255, 255, ${noiseOpacity})`;
        for (let i = 0; i < 40; i++) {
          const rx = Math.random() * canvas.width;
          const ry = Math.random() * canvas.height;
          ctx.fillRect(rx, ry, 2, 2);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [crtSettings]);

  const intensityVal = crtSettings.intensity;
  const brightnessVal = crtSettings.brightness;

  return (
    <div className="relative w-full h-full overflow-hidden bg-crt-dark rounded-xl select-none">
      {/* Curved Screen Barrel Distortion & Bloom Wrapper */}
      <div
        className={`w-full h-full relative transition-all duration-300 ${
          crtSettings.flicker ? 'animate-flicker' : ''
        }`}
        style={{
          filter: `brightness(${brightnessVal}) contrast(${1.0 + intensityVal * 0.15}) drop-shadow(0 0 ${
            intensityVal * 12
          }px rgba(0, 255, 102, ${0.4 * intensityVal}))`,
          transform: crtSettings.reducedMotion ? 'none' : 'scale(0.995)',
        }}
      >
        {/* Actual Game Screen Content */}
        <div className="w-full h-full text-crt-green font-mono">{children}</div>

        {/* HTML5 Canvas CRT Scanlines & Roll overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-40 rounded-xl"
        />

        {/* Vignette & Corner Screen Shadow */}
        <div
          className="absolute inset-0 pointer-events-none z-50 rounded-xl"
          style={{
            boxShadow: `inset 0 0 ${60 * intensityVal}px rgba(0, 0, 0, ${0.8 * intensityVal}), inset 0 0 ${
              120 * intensityVal
            }px rgba(0, 15, 5, ${0.6 * intensityVal})`,
          }}
        />

        {/* Chromatic Aberration RGB Edge Fringe */}
        {crtSettings.chromatic && intensityVal > 0.2 && (
          <div
            className="absolute inset-0 pointer-events-none z-30 opacity-30 mix-blend-screen"
            style={{
              boxShadow: `inset 2px 0 0 rgba(255, 0, 0, 0.4), inset -2px 0 0 rgba(0, 255, 255, 0.4)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
