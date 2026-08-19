import React from 'react';
import { ContradictionItem } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../audio/soundEngine';
import { AlertTriangle, ExternalLink, ArrowRightLeft } from 'lucide-react';

export const ContradictionsView: React.FC<{
  contradictions: ContradictionItem[];
}> = ({ contradictions }) => {
  const navigateUrl = useGameStore((state) => state.navigateUrl);

  return (
    <div className="w-full h-full flex flex-col bg-crt-dark p-4 text-crt-green font-mono text-xs select-none space-y-4">
      <div className="border-b border-crt-green/30 pb-2">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="font-bold text-sm text-crt-green uppercase">NARRATIVE CONTRADICTION DETECTOR</h3>
        </div>
        <p className="text-[10px] text-crt-green/70 mt-1">
          Conflicting records discovered across surviving websites. Resolving contradictions reveals hidden truth.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {contradictions.map((c) => (
          <div
            key={c.id}
            className="p-4 border-2 border-amber-400/60 rounded bg-black/60 space-y-3 shadow-[0_0_15px_rgba(255,176,0,0.15)]"
          >
            <div className="flex justify-between items-start border-b border-crt-green/20 pb-2">
              <span className="text-amber-400 font-bold text-xs">{c.id}: {c.title}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded font-bold">
                CONTRADICTION DETECTED
              </span>
            </div>

            {/* Side-by-Side Sources Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Source A */}
              <div className="p-3 border border-crt-green/30 rounded bg-crt-dark space-y-2">
                <div className="text-[10px] text-amber-400 font-bold uppercase">SOURCE A: {c.sourceA.title}</div>
                <p className="text-xs text-crt-green/90 italic">"{c.sourceA.statement}"</p>
                <button
                  onClick={() => {
                    soundEngine.playKeyClick();
                    navigateUrl(c.sourceA.url);
                  }}
                  className="text-[10px] text-amber-400 hover:underline flex items-center space-x-1"
                >
                  <span>VISIT SOURCE A</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Source B */}
              <div className="p-3 border border-red-500/40 rounded bg-red-950/20 space-y-2">
                <div className="text-[10px] text-red-400 font-bold uppercase">SOURCE B: {c.sourceB.title}</div>
                <p className="text-xs text-red-200 italic">"{c.sourceB.statement}"</p>
                <button
                  onClick={() => {
                    soundEngine.playKeyClick();
                    navigateUrl(c.sourceB.url);
                  }}
                  className="text-[10px] text-red-300 hover:underline flex items-center space-x-1"
                >
                  <span>VISIT SOURCE B</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="text-xs text-crt-green/80 bg-black p-2 border border-crt-green/20 rounded">
              <span className="font-bold text-amber-400">ANALYSIS: </span>
              {c.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
