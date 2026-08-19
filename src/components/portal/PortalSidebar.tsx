import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../audio/soundEngine';
import { Shield, Calendar, BookOpen, AlertTriangle, Radio, ExternalLink, Cpu, Sparkles } from 'lucide-react';

export const PortalSidebar: React.FC<{
  onOpenDrawer: (tab: 'evidence' | 'timeline' | 'contradictions' | 'notebook' | 'terminal' | 'radio') => void;
}> = ({ onOpenDrawer }) => {
  const archiveIntegrity = useGameStore((state) => state.archiveIntegrity);
  const discoveredEvidence = useGameStore((state) => state.discoveredEvidence);
  const unlockedUrls = useGameStore((state) => state.unlockedUrls);
  const navigateUrl = useGameStore((state) => state.navigateUrl);
  const isRadioOn = useGameStore((state) => state.isRadioOn);
  const toggleRadio = useGameStore((state) => state.toggleRadio);

  return (
    <aside className="w-full lg:w-72 space-y-5 font-mono text-xs select-none">
      {/* 90s Web 1.0 GeoCities Visitor Counter Widget */}
      <div className="p-3 bg-black border-2 border-cyan-400 rounded shadow-[0_0_15px_rgba(0,255,255,0.2)] text-center space-y-2">
        <div className="text-[10px] text-yellow-300 font-bold tracking-widest uppercase">
          ★ SURVIVING VISITORS ★
        </div>
        <div className="inline-block px-3 py-1 bg-slate-950 border border-cyan-400 rounded text-lg font-bold text-yellow-400 tracking-widest font-mono">
          084,912
        </div>
        <div className="text-[9px] text-cyan-300">
          LAST SYNC: 2087-11-03 23:59 UTC
        </div>
      </div>

      {/* Archive Recovery Telemetry */}
      <div className="p-3 bg-slate-950 border border-cyan-400/60 rounded space-y-2">
        <div className="flex items-center justify-between border-b border-cyan-400/30 pb-1.5">
          <div className="flex items-center space-x-1 text-cyan-300 font-bold text-xs">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>ARCHIVE INTEGRITY</span>
          </div>
          <span className="text-yellow-400 font-extrabold text-sm">{archiveIntegrity}%</span>
        </div>

        <div className="w-full bg-black h-2.5 rounded border border-cyan-400/40 overflow-hidden">
          <div
            className="bg-yellow-400 h-full transition-all duration-500"
            style={{ width: `${archiveIntegrity}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-cyan-200/80 pt-1">
          <span>RECOVERED NODES:</span>
          <span className="text-yellow-300 font-bold">{unlockedUrls.length} / 10</span>
        </div>
        <div className="flex justify-between text-[10px] text-cyan-200/80">
          <span>EVIDENCE ITEMS:</span>
          <span className="text-yellow-300 font-bold">{discoveredEvidence.length} LOGGED</span>
        </div>
      </div>

      {/* 90s Toolkit Navigation Panel */}
      <div className="p-3 bg-black border border-cyan-400/60 rounded space-y-2">
        <h4 className="font-bold text-yellow-300 text-xs uppercase border-b border-cyan-400/30 pb-1">
          INVESTIGATION TOOLKIT
        </h4>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onOpenDrawer('evidence');
            }}
            className="flex items-center space-x-1 p-2 bg-slate-900 hover:bg-cyan-900 border border-cyan-400 rounded text-cyan-300 font-bold text-[11px] transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>EVIDENCE</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onOpenDrawer('timeline');
            }}
            className="flex items-center space-x-1 p-2 bg-slate-900 hover:bg-yellow-900 border border-yellow-400 rounded text-yellow-300 font-bold text-[11px] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-yellow-400" />
            <span>TIMELINE</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onOpenDrawer('contradictions');
            }}
            className="flex items-center space-x-1 p-2 bg-slate-900 hover:bg-red-900 border border-red-500 rounded text-red-300 font-bold text-[11px] transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>CLUES</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onOpenDrawer('notebook');
            }}
            className="flex items-center space-x-1 p-2 bg-slate-900 hover:bg-amber-900 border border-amber-400 rounded text-amber-300 font-bold text-[11px] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>NOTEBOOK</span>
          </button>
        </div>
      </div>

      {/* 440MHz Shortwave Radio Widget */}
      <div className="p-3 bg-black border border-yellow-400/60 rounded space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-yellow-300 font-bold text-xs">
            <Radio className={`w-4 h-4 ${isRadioOn ? 'animate-pulse text-yellow-400' : 'text-slate-500'}`} />
            <span>440MHz SHORTWAVE</span>
          </div>

          <button
            onClick={() => toggleRadio()}
            className={`px-2 py-0.5 rounded font-bold text-[10px] ${
              isRadioOn ? 'bg-red-600 text-white' : 'bg-yellow-400 text-black'
            }`}
          >
            {isRadioOn ? 'STOP' : 'LISTEN'}
          </button>
        </div>

        <div className="text-[10px] text-cyan-200">
          {isRadioOn ? (
            <span className="text-yellow-300 font-bold">STREAMING CARRIER WAVE STATIC...</span>
          ) : (
            <span className="text-slate-500">Receiver Standby</span>
          )}
        </div>
      </div>

      {/* Netscape 4.0 Badge */}
      <div className="p-2 bg-slate-950 border border-slate-700 rounded text-center text-[9px] text-slate-400 font-sans">
        BEST VIEWED IN NETSCAPE NAVIGATOR 4.0 // 1024x768 RESOLUTION
      </div>
    </aside>
  );
};
