import React, { useState, useRef } from 'react';
import { OSWindow } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';
import { Minus, Square, X } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

export const WindowShell: React.FC<{
  window: OSWindow;
  children: React.ReactNode;
}> = ({ window: win, children }) => {
  const closeWindow = useGameStore((state) => state.closeWindow);
  const minimizeWindow = useGameStore((state) => state.minimizeWindow);
  const maximizeWindow = useGameStore((state) => state.maximizeWindow);
  const focusWindow = useGameStore((state) => state.focusWindow);

  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: win.x,
    posY: win.y,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    focusWindow(win.id);
    if (win.isMaximized) return;
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    const handleMouseMove = (me: MouseEvent) => {
      const dx = me.clientX - dragRef.current.startX;
      const dy = me.clientY - dragRef.current.startY;
      setPosition({
        x: Math.max(0, dragRef.current.posX + dx),
        y: Math.max(0, dragRef.current.posY + dy),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (win.isMinimized) return null;

  const windowStyle: React.CSSProperties = win.isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 36px)', zIndex: win.zIndex }
    : {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${win.width}px`,
        height: `${win.height}px`,
        zIndex: win.zIndex,
      };

  return (
    <div
      className={`absolute flex flex-col bg-crt-glass border-2 border-crt-green rounded shadow-[0_0_20px_rgba(0,255,102,0.2)] overflow-hidden font-mono text-crt-green select-none ${
        isDragging ? 'opacity-95 cursor-grabbing' : ''
      }`}
      style={windowStyle}
      onClick={() => focusWindow(win.id)}
    >
      {/* Retro OS Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between px-3 py-1.5 bg-crt-green/20 border-b border-crt-green/40 cursor-grab select-none"
      >
        <div className="flex items-center space-x-2 truncate">
          <span className="w-2 h-2 rounded-full bg-crt-green animate-pulse" />
          <span className="font-bold text-xs tracking-wider uppercase truncate">{win.title}</span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(win.id);
            }}
            className="p-1 hover:bg-crt-green hover:text-black rounded transition-colors text-crt-green"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(win.id);
            }}
            className="p-1 hover:bg-crt-green hover:text-black rounded transition-colors text-crt-green"
            title="Maximize"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(win.id);
            }}
            className="p-1 hover:bg-red-500 hover:text-white rounded transition-colors text-crt-green"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-auto p-2 bg-crt-dark/95 text-crt-green">{children}</div>
    </div>
  );
};
