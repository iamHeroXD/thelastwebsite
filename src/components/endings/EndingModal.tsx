import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { storyEndings } from '../../data/storyData';
import { soundEngine } from '../../audio/soundEngine';
import { Trophy, Shield, RefreshCw, X } from 'lucide-react';

export const EndingModal: React.FC = () => {
  const activeEndingModal = useGameStore((state) => state.activeEndingModal);
  const closeEndingModal = useGameStore((state) => state.closeEndingModal);
  const resetGame = useGameStore((state) => state.resetGame);

  if (!activeEndingModal) return null;

  const ending = storyEndings[activeEndingModal];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in zoom-in-95">
      <div className="w-full max-w-xl bg-crt-dark border-4 border-amber-400 rounded-xl p-6 md:p-8 text-crt-green font-mono shadow-[0_0_50px_rgba(255,176,0,0.4)] relative space-y-6">
        
        {/* Header Title */}
        <div className="text-center space-y-2 border-b-2 border-amber-400/40 pb-4">
          <div className="flex justify-center mb-2">
            <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-widest text-amber-400 uppercase">
            {ending?.title || 'ENDING ACHIEVED'}
          </h1>
          <p className="text-xs md:text-sm font-bold text-crt-green tracking-wide">
            {ending?.subtitle}
          </p>
        </div>

        {/* Narrative Description Box */}
        <div className="p-4 bg-black border border-crt-green/40 rounded space-y-3">
          <p className="text-xs md:text-sm text-crt-green/90 leading-relaxed">
            {ending?.description}
          </p>
          <div className="text-[10px] text-amber-400 font-bold border-t border-crt-green/20 pt-2">
            UNLOCKED CONDITION: {ending?.requirementDesc}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              soundEngine.playKeyClick();
              closeEndingModal();
            }}
            className="flex-1 py-2.5 bg-crt-green text-black font-extrabold rounded hover:bg-emerald-300 transition-colors text-xs text-center"
          >
            RETURN TO ARCHIVE WORKSTATION
          </button>

          <button
            onClick={() => {
              if (confirm('Restart investigation from beginning?')) {
                resetGame();
                closeEndingModal();
              }
            }}
            className="flex items-center justify-center space-x-1.5 px-4 py-2.5 border border-red-500/60 text-red-400 hover:bg-red-500 hover:text-white rounded text-xs transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>RESTART GAME</span>
          </button>
        </div>

      </div>
    </div>
  );
};
