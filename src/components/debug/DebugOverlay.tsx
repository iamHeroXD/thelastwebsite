import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { initialWebsites, initialEvidence, storyEndings } from '../../data/storyData';
import { soundEngine } from '../../audio/soundEngine';
import { Bug, X, Play, ShieldAlert, CheckCircle, Unlock, RotateCcw } from 'lucide-react';

export const DebugOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const currentUrl = useGameStore((state) => state.currentUrl);
  const unlockedUrls = useGameStore((state) => state.unlockedUrls);
  const discoveredEvidence = useGameStore((state) => state.discoveredEvidence);
  const archiveIntegrity = useGameStore((state) => state.archiveIntegrity);
  const navigateUrl = useGameStore((state) => state.navigateUrl);
  const discoverEvidence = useGameStore((state) => state.discoverEvidence);
  const triggerEnding = useGameStore((state) => state.triggerEnding);
  const resetGame = useGameStore((state) => state.resetGame);

  const [urlInput, setUrlInput] = useState('');

  const handleUnlockAllEvidence = () => {
    soundEngine.playDiscovery();
    initialEvidence.forEach((ev) => discoverEvidence(ev.id));
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 font-mono select-none">
      <div className="w-full max-w-2xl bg-stone-900 border-2 border-red-500 rounded-lg p-6 text-stone-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-red-500/40 pb-2">
          <div className="flex items-center space-x-2 text-red-400 font-bold">
            <Bug className="w-5 h-5" />
            <span>DEVELOPMENT DEBUG SYSTEM (NON-PRODUCTION ONLY)</span>
          </div>
          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onClose();
            }}
            className="p-1 hover:bg-red-500 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current State Summary */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-black p-3 rounded border border-stone-800">
          <div>
            <span className="text-stone-500">CURRENT URL:</span>{' '}
            <span className="text-amber-400 font-bold">{currentUrl}</span>
          </div>
          <div>
            <span className="text-stone-500">ARCHIVE INTEGRITY:</span>{' '}
            <span className="text-emerald-400 font-bold">{archiveIntegrity}%</span>
          </div>
          <div>
            <span className="text-stone-500">DISCOVERED WEBSITES:</span>{' '}
            <span className="text-emerald-400">{unlockedUrls.length} / 10</span>
          </div>
          <div>
            <span className="text-stone-500">DISCOVERED EVIDENCE:</span>{' '}
            <span className="text-emerald-400">{discoveredEvidence.length} / {initialEvidence.length}</span>
          </div>
        </div>

        {/* Quick URL Jump Form */}
        <div className="space-y-2">
          <label className="text-xs text-stone-400 font-bold">FORCE NAVIGATE URL:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="e.g. http://deep-signal.node001.net"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-3 py-1 bg-black border border-stone-700 rounded text-xs text-emerald-400 focus:outline-none"
            />
            <button
              onClick={() => {
                if (urlInput.trim()) {
                  navigateUrl(urlInput);
                  onClose();
                }
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded"
            >
              JUMP
            </button>
          </div>
        </div>

        {/* Shortcut Quick Jumps */}
        <div className="space-y-2">
          <label className="text-xs text-stone-400 font-bold">KNOWN ECOSYSTEM SITES:</label>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {Object.values(initialWebsites).map((site) => (
              <button
                key={site.id}
                onClick={() => {
                  navigateUrl(site.pages['/']?.url || `http://${site.domain}`);
                  onClose();
                }}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 border border-stone-700"
              >
                {site.name}
              </button>
            ))}
          </div>
        </div>

        {/* Ending Controls */}
        <div className="space-y-2">
          <label className="text-xs text-stone-400 font-bold">FORCE TRIGGER STORY ENDING:</label>
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.keys(storyEndings).map((endingKey) => (
              <button
                key={endingKey}
                onClick={() => {
                  triggerEnding(endingKey);
                  onClose();
                }}
                className="px-3 py-1 bg-amber-950 border border-amber-700 text-amber-300 hover:bg-amber-800 rounded font-bold"
              >
                TRIGGER {endingKey}
              </button>
            ))}
          </div>
        </div>

        {/* Mass Actions */}
        <div className="flex justify-between items-center pt-2 border-t border-stone-800">
          <button
            onClick={handleUnlockAllEvidence}
            className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-bold"
          >
            <Unlock className="w-4 h-4" />
            <span>UNLOCK ALL EVIDENCE</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset save state?')) {
                resetGame();
                onClose();
              }
            }}
            className="flex items-center space-x-1 px-3 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded text-xs font-bold"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET SAVE DATA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
