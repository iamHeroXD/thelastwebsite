import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { WindowShell } from './WindowShell';
import { BrowserWindow } from '../browser/BrowserWindow';
import { FileExplorer } from './FileExplorer';
import { NodeGraph } from '../investigation/NodeGraph';
import { EvidenceBoard } from '../investigation/EvidenceBoard';
import { Notebook } from '../investigation/Notebook';
import { TerminalWindow } from '../terminal/TerminalWindow';
import { SettingsModal } from '../crt/SettingsModal';
import { soundEngine } from '../../audio/soundEngine';
import {
  Globe,
  Folder,
  Network,
  BookOpen,
  Terminal as TermIcon,
  Sliders,
  Info,
  Shield,
  Cpu,
} from 'lucide-react';

export const Desktop: React.FC = () => {
  const windows = useGameStore((state) => state.windows);
  const openWindow = useGameStore((state) => state.openWindow);
  const focusWindow = useGameStore((state) => state.focusWindow);
  const archiveIntegrity = useGameStore((state) => state.archiveIntegrity);

  const [showSettings, setShowSettings] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  const desktopIcons = [
    {
      id: 'browser',
      title: 'ORBIT BROWSER',
      icon: Globe,
      color: 'text-crt-green',
      action: () =>
        openWindow({
          id: 'browser',
          title: 'ORBIT BROWSER v3.4.1',
          type: 'browser',
          x: 40,
          y: 30,
          width: 900,
          height: 600,
          isMinimized: false,
          isMaximized: false,
        }),
    },
    {
      id: 'explorer',
      title: 'MY COMPUTER',
      icon: Folder,
      color: 'text-amber-400',
      action: () =>
        openWindow({
          id: 'explorer',
          title: 'SYSTEM FILE EXPLORER (C:)',
          type: 'explorer',
          x: 100,
          y: 60,
          width: 750,
          height: 500,
          isMinimized: false,
          isMaximized: false,
        }),
    },
    {
      id: 'evidence',
      title: 'EVIDENCE MAP',
      icon: Network,
      color: 'text-emerald-400',
      action: () =>
        openWindow({
          id: 'evidence',
          title: 'INTERNET INVESTIGATION BOARD',
          type: 'evidence',
          x: 140,
          y: 80,
          width: 800,
          height: 550,
          isMinimized: false,
          isMaximized: false,
        }),
    },
    {
      id: 'notebook',
      title: 'ARCHIVIST NOTEBOOK',
      icon: BookOpen,
      color: 'text-yellow-400',
      action: () =>
        openWindow({
          id: 'notebook',
          title: 'ARCHIVIST NOTEBOOK & TIMELINE',
          type: 'notebook',
          x: 180,
          y: 100,
          width: 780,
          height: 520,
          isMinimized: false,
          isMaximized: false,
        }),
    },
    {
      id: 'terminal',
      title: 'TERMINAL CLI',
      icon: TermIcon,
      color: 'text-crt-green',
      action: () =>
        openWindow({
          id: 'terminal',
          title: 'ORBIT OS TERMINAL v4.81',
          type: 'terminal',
          x: 220,
          y: 120,
          width: 700,
          height: 480,
          isMinimized: false,
          isMaximized: false,
        }),
    },
    {
      id: 'settings',
      title: 'SYSTEM CONFIG',
      icon: Sliders,
      color: 'text-stone-300',
      action: () => setShowSettings(true),
    },
  ];

  return (
    <div className="relative w-full h-full bg-crt-bg overflow-hidden flex flex-col justify-between select-none font-mono">
      {/* Desktop Background & Watermark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-10">
        <Cpu className="w-64 h-64 text-crt-green stroke-1 mb-4" />
        <h1 className="text-4xl font-extrabold tracking-[0.3em] text-crt-green uppercase">
          ORBIT OS v4.81
        </h1>
        <p className="text-sm text-crt-green mt-2 font-mono">
          WORKSTATION NODE 001 // ATMOSPHERIC RECOVERY MODE
        </p>
      </div>

      {/* Desktop Grid Icons */}
      <div className="relative z-10 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-xl">
        {desktopIcons.map((ico) => {
          const IconComp = ico.icon;
          return (
            <button
              key={ico.id}
              onClick={() => {
                soundEngine.playKeyClick();
                ico.action();
              }}
              className="flex flex-col items-center p-3 rounded-lg border border-transparent hover:border-crt-green/40 hover:bg-crt-green/10 transition-all text-center group"
            >
              <div className="p-3 bg-black/60 border border-crt-green/30 rounded-xl mb-2 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,102,0.1)]">
                <IconComp className={`w-8 h-8 ${ico.color}`} />
              </div>
              <span className="text-xs font-bold tracking-wider text-crt-green drop-shadow-[0_0_5px_#00ff66]">
                {ico.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Render Open Windows */}
      <div className="relative flex-1">
        {windows.map((win) => (
          <WindowShell key={win.id} window={win}>
            {win.type === 'browser' && <BrowserWindow />}
            {win.type === 'explorer' && <FileExplorer />}
            {win.type === 'evidence' && <EvidenceBoard />}
            {win.type === 'notebook' && <Notebook />}
            {win.type === 'terminal' && <TerminalWindow />}
          </WindowShell>
        ))}
      </div>

      {/* OS Taskbar */}
      <div className="relative z-50 h-10 bg-stone-900 border-t-2 border-crt-green/40 px-3 flex items-center justify-between">
        {/* Start Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCreditsModal(true)}
            className="flex items-center space-x-1.5 px-3 py-1 bg-crt-green text-black font-extrabold rounded text-xs hover:bg-emerald-300 transition-colors shadow-[0_0_10px_rgba(0,255,102,0.4)]"
          >
            <Shield className="w-4 h-4 fill-current" />
            <span>ORBIT OS</span>
          </button>

          {/* Active Window Taskbar Buttons */}
          <div className="flex items-center space-x-1 overflow-x-auto">
            {windows.map((win) => (
              <button
                key={win.id}
                onClick={() => focusWindow(win.id)}
                className={`px-3 py-1 rounded text-xs font-bold truncate max-w-[140px] transition-colors border ${
                  !win.isMinimized
                    ? 'bg-crt-green/20 border-crt-green text-crt-green'
                    : 'bg-black/40 border-crt-green/20 text-crt-green/60'
                }`}
              >
                {win.title}
              </button>
            ))}
          </div>
        </div>

        {/* Taskbar Clock & System Diagnostic */}
        <div className="flex items-center space-x-4 text-xs text-crt-green/80">
          <div className="hidden sm:flex items-center space-x-1">
            <span>INTEGRITY:</span>
            <span className="text-amber-400 font-bold">{archiveIntegrity}%</span>
          </div>
          <div className="px-2 py-0.5 bg-black border border-crt-green/30 rounded font-mono text-[11px] text-crt-green font-bold">
            2087-11-03 23:59 UTC
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {/* System Credits Modal */}
      {showCreditsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md bg-crt-bezel border-2 border-crt-green rounded-lg p-6 text-crt-green font-mono space-y-4">
            <h2 className="text-lg font-bold border-b border-crt-green/40 pb-2">SYSTEM CREDITS</h2>
            <div className="space-y-1 text-xs text-crt-green/90 leading-relaxed">
              <div>ARCHIVE ENGINE ........ ONLINE</div>
              <div>STORY SYSTEM .......... ONLINE</div>
              <div>NETWORK SIMULATION ..... ONLINE</div>
              <div>MEMORY SYSTEM .......... ONLINE</div>
            </div>
            <div className="p-3 bg-black border border-crt-green/30 rounded text-center">
              <h3 className="font-bold text-sm text-crt-green">THE LAST WEBSITE ON EARTH</h3>
              <p className="text-[11px] text-amber-400">A Digital Archive of What We Left Behind.</p>
            </div>
            <button
              onClick={() => setShowCreditsModal(false)}
              className="w-full py-1.5 bg-crt-green text-black font-bold rounded text-xs hover:bg-emerald-300"
            >
              CLOSE DIAGNOSTIC
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
