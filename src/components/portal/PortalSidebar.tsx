import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../audio/soundEngine';
import { Globe, Radio, Search, Shield, Activity, Wifi, ExternalLink, Calendar, BookOpen, AlertTriangle, Cpu } from 'lucide-react';

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
    <aside className="w-full lg:w-80 space-y-6 font-mono text-xs select-none">
      {/* Archive Diagnostic Widget */}
      <div className="p-4 bg-slate-900 border-2 border-emerald-500/40 rounded-xl shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>ARCHIVE RECOVERY DIAGNOSTIC</span>
          </div>
        </div>

        <div className="space-y-2 text-slate-300">
          <div className="flex justify-between items-center text-xs">
            <span>ARCHIVE INTEGRITY:</span>
            <span className="text-amber-400 font-extrabold text-sm">{archiveIntegrity}%</span>
          </div>

          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-emerald-500/30">
            <div
              className="bg-emerald-400 h-full transition-all duration-500"
              style={{ width: `${archiveIntegrity}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 pt-1">
            <span>SITES RECOVERED:</span>
            <span className="text-emerald-400 font-bold">{unlockedUrls.length} / 10</span>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>EVIDENCE COLLECTED:</span>
            <span className="text-emerald-400 font-bold">{discoveredEvidence.length} ITEMS</span>
          </div>
        </div>
      </div>

      {/* Quick Access Investigation Tools */}
      <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2">
        <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider mb-2 border-b border-slate-800 pb-1">
          INVESTIGATION TOOLKIT
        </h4>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onOpenDrawer('evidence');
            }}
            className="flex items-center space-x-2 p-2 bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 rounded text-emerald-400 font-bold text-xs transition-colors"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>EVIDENCE BOARD</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onOpenDrawer('timeline');
            }}
            className="flex items-center space-x-2 p-2 bg-slate-950 hover:bg-slate-800 border border-amber-500/30 rounded text-amber-400 font-bold text-xs transition-colors"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>TIMELINE</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onOpenDrawer('contradictions');
            }}
            className="flex items-center space-x-2 p-2 bg-slate-950 hover:bg-slate-800 border border-red-500/30 rounded text-red-400 font-bold text-xs transition-colors"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>CONTRADICTIONS</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onOpenDrawer('notebook');
            }}
            className="flex items-center space-x-2 p-2 bg-slate-950 hover:bg-slate-800 border border-yellow-500/30 rounded text-yellow-400 font-bold text-xs transition-colors"
          >
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span>NOTEBOOK</span>
          </button>
        </div>
      </div>

      {/* 440MHz Radio Receiver Widget */}
      <div className="p-4 bg-slate-900 border border-amber-500/40 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <Radio className={`w-4 h-4 ${isRadioOn ? 'animate-pulse text-amber-400' : 'text-slate-500'}`} />
            <span>440MHz RADIO SCANNER</span>
          </div>

          <button
            onClick={() => toggleRadio()}
            className={`px-2 py-0.5 rounded font-bold text-[10px] ${
              isRadioOn ? 'bg-red-600 text-white' : 'bg-emerald-500 text-black'
            }`}
          >
            {isRadioOn ? 'OFF' : 'ON'}
          </button>
        </div>

        <div className="text-[11px] text-slate-300">
          {isRadioOn ? (
            <span className="text-amber-400 font-bold">CARRIER WAVE MATCHED // STREAMING SIGNAL...</span>
          ) : (
            <span className="text-slate-500">Receiver Standby (Turn ON to listen)</span>
          )}
        </div>
      </div>

      {/* Discovered Evidence Quick List */}
      <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-3">
        <h4 className="font-bold text-slate-300 text-xs uppercase border-b border-slate-800 pb-1">
          COLLECTED EVIDENCE LOG
        </h4>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {discoveredEvidence.map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                soundEngine.playKeyClick();
                navigateUrl(ev.sourceUrl);
              }}
              className="p-2 bg-slate-950 hover:bg-slate-800 border border-emerald-500/20 rounded cursor-pointer transition-colors space-y-1"
            >
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-amber-400 font-bold">{ev.id}</span>
                <span className="text-slate-500">{ev.date}</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-bold line-clamp-1">{ev.sourceTitle}</div>
              <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed">{ev.keyInfo}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
