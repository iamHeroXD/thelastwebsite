import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';

export const CRTScreenOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const crtSettings = useGameStore((state) => state.crtSettings);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const themeHexMap = {
    green: '#00ff66',
    amber: '#ffb000',
    cyan: '#00e5ff',
    white: '#e5e5e5',
  };

  const themeRgbaMap = {
    green: 'rgba(0, 255, 102, 0.2)',
    amber: 'rgba(255, 176, 0, 0.2)',
    cyan: 'rgba(0, 229, 255, 0.2)',
    white: 'rgba(229, 229, 229, 0.2)',
  };

  const themeDropShadowMap = {
    green: 'rgba(0, 255, 102, 0.4)',
    amber: 'rgba(255, 176, 0, 0.4)',
    cyan: 'rgba(0, 229, 255, 0.4)',
    white: 'rgba(229, 229, 229, 0.4)',
  };

  const currentThemeKey = crtSettings.phosphorTheme || 'green';
  const currentThemeColor = themeHexMap[currentThemeKey] || '#00ff66';
  const currentThemeRgba = themeRgbaMap[currentThemeKey] || 'rgba(0, 255, 102, 0.2)';
  const currentThemeDropShadow = themeDropShadowMap[currentThemeKey] || 'rgba(0, 255, 102, 0.4)';

  // Render scanlines and phosphor noise on HTML5 Canvas overlay safely
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (crtSettings.scanlines && crtSettings.intensity > 0.05) {
        const lineSpacing = 3;
        const opacity = 0.12 * crtSettings.intensity;
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        for (let y = 0; y < canvas.height; y += lineSpacing) {
          ctx.fillRect(0, y, canvas.width, 1);
        }

        // Draw rolling scanline beam matched to phosphor theme
        const rollY = (frame * 1.5) % (canvas.height + 60) - 30;
        try {
          const grad = ctx.createLinearGradient(0, Math.max(0, rollY - 30), 0, Math.min(canvas.height, rollY + 30));
          grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(0.5, currentThemeRgba);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, rollY - 30, canvas.width, 60);
        } catch (e) {}
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
  }, [crtSettings, currentThemeRgba]);

  const intensityVal = crtSettings.intensity;
  const brightnessVal = crtSettings.brightness;

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-crt-dark select-none"
      style={{ color: currentThemeColor }}
    >
      {/* Curved Screen Barrel Distortion & Bloom Wrapper */}
      <div
        className={`w-full h-full relative transition-all duration-300 ${
          crtSettings.flicker ? 'animate-flicker' : ''
        }`}
        style={{
          filter: `brightness(${brightnessVal}) contrast(${1.0 + intensityVal * 0.15}) drop-shadow(0 0 ${Math.round(
            intensityVal * 10
          )}px ${currentThemeDropShadow})`,
          transform: crtSettings.reducedMotion ? 'none' : 'scale(1.0)',
        }}
      >
        {/* Actual Game Screen Content */}
        <div className="w-full h-full font-mono">{children}</div>

        {/* HTML5 Canvas CRT Scanlines & Roll overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-40"
        />

        {/* Vignette & Corner Screen Shadow */}
        <div
          className="absolute inset-0 pointer-events-none z-50"
          style={{
            boxShadow: `inset 0 0 ${40 * intensityVal}px rgba(0, 0, 0, ${0.7 * intensityVal})`,
          }}
        />

        {/* Chromatic Aberration RGB Edge Fringe */}
        {crtSettings.chromatic && intensityVal > 0.2 && (
          <div
            className="absolute inset-0 pointer-events-none z-30 opacity-20 mix-blend-screen"
            style={{
              boxShadow: `inset 2px 0 0 rgba(255, 0, 0, 0.4), inset -2px 0 0 rgba(0, 255, 255, 0.4)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
