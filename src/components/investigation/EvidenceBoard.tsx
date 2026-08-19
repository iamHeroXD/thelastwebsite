import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { EvidenceItem } from '../../types/game';
import { soundEngine } from '../../audio/soundEngine';
import { ShieldCheck, Link, Tag, ExternalLink, HelpCircle } from 'lucide-react';

export const EvidenceBoard: React.FC = () => {
  const discoveredEvidence = useGameStore((state) => state.discoveredEvidence);
  const evidenceConnections = useGameStore((state) => state.evidenceConnections);
  const connectEvidence = useGameStore((state) => state.connectEvidence);
  const navigateUrl = useGameStore((state) => state.navigateUrl);

  const [selectedEv1, setSelectedEv1] = useState<EvidenceItem | null>(null);
  const [selectedEv2, setSelectedEv2] = useState<EvidenceItem | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const handleSelectCard = (ev: EvidenceItem) => {
    soundEngine.playKeyClick();
    if (!selectedEv1) {
      setSelectedEv1(ev);
    } else if (selectedEv1.id === ev.id) {
      setSelectedEv1(null);
    } else {
      setSelectedEv2(ev);
    }
  };

  const handleAttemptConnection = () => {
    if (!selectedEv1 || !selectedEv2) return;

    const success = connectEvidence(selectedEv1.id, selectedEv2.id);
    if (success) {
      setFeedback('CONNECTION VERIFIED // RELATIONSHIP LOGGED IN ARCHIVE');
    } else {
      setFeedback('INSUFFICIENT EVIDENCE // NO DIRECT CORRELATION DISCOVERED');
    }

    setTimeout(() => {
      setSelectedEv1(null);
      setSelectedEv2(null);
      setFeedback('');
    }, 2500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-crt-dark p-4 text-crt-green font-mono text-xs select-none">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-crt-green/30 mb-4 gap-2">
        <div>
          <h3 className="font-bold text-sm text-crt-green">EVIDENCE INVESTIGATION BOARD</h3>
          <p className="text-[10px] text-crt-green/70">
            Select two evidence cards to analyze correlation and verify story connections.
          </p>
        </div>

        {selectedEv1 && selectedEv2 && (
          <button
            onClick={handleAttemptConnection}
            className="flex items-center space-x-2 px-4 py-1.5 bg-amber-400 text-black font-bold rounded hover:bg-amber-300 transition-colors animate-bounce text-xs"
          >
            <Link className="w-4 h-4" />
            <span>VERIFY CONNECTION</span>
          </button>
        )}
      </div>

      {feedback && (
        <div
          className={`p-2 mb-4 rounded border text-center font-bold text-xs ${
            feedback.includes('VERIFIED')
              ? 'bg-emerald-950/80 border-crt-green text-crt-green'
              : 'bg-red-950/80 border-red-500 text-red-300'
          }`}
        >
          {feedback}
        </div>
      )}

      {/* Discovered Cards Grid */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1">
        {discoveredEvidence.map((ev) => {
          const isSelected = selectedEv1?.id === ev.id || selectedEv2?.id === ev.id;
          const isConnected = evidenceConnections.some(
            ([a, b]) => a === ev.id || b === ev.id
          );

          return (
            <div
              key={ev.id}
              onClick={() => handleSelectCard(ev)}
              className={`p-3 rounded border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-400/20 border-amber-400 shadow-[0_0_15px_rgba(255,176,0,0.4)]'
                  : isConnected
                  ? 'bg-crt-green/10 border-crt-green/60'
                  : 'bg-black/40 border-crt-green/30 hover:border-crt-green/60'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] text-amber-400 font-bold uppercase">{ev.id}</span>
                  <span className="text-[10px] text-crt-green/60">{ev.date}</span>
                </div>

                <h4 className="font-bold text-xs text-crt-green mb-1 line-clamp-1">{ev.sourceTitle}</h4>
                <p className="text-[11px] text-crt-green/90 leading-relaxed mb-3">{ev.keyInfo}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {ev.tags.map((tag, idx) => (
                    <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-crt-green/10 border border-crt-green/30 rounded text-crt-green/80">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playKeyClick();
                    navigateUrl(ev.sourceUrl);
                  }}
                  className="flex items-center space-x-1 text-[10px] text-amber-400 hover:underline"
                >
                  <span>SOURCE WEBSITE</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
