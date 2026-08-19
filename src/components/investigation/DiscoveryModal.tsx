import React, { useState } from 'react';
import { DiscoveryCard } from '../../types/game';
import { soundEngine } from '../../audio/soundEngine';
import { Share2, Copy, Check, ShieldAlert, X } from 'lucide-react';

export const DiscoveryModal: React.FC<{
  card: DiscoveryCard;
  onClose: () => void;
}> = ({ card, onClose }) => {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleCopyId = () => {
    soundEngine.playKeyClick();
    navigator.clipboard.writeText(card.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyShareText = () => {
    soundEngine.playKeyClick();
    const text = `THE LAST WEBSITE ON EARTH // ARCHIVAL DISCOVERY [${card.id}]\nTITLE: ${card.title}\nSTATUS: ${card.status}\nTIMESTAMP: ${card.timestamp}\n\nExplore the surviving internet archive: https://github.com/iamHeroXD/thelastwebsite`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 font-mono select-none">
      <div className="w-full max-w-lg bg-crt-dark border-4 border-amber-400 rounded-xl p-6 md:p-8 text-crt-green shadow-[0_0_50px_rgba(255,176,0,0.4)] relative space-y-5">
        
        {/* Archival Card Header */}
        <div className="flex justify-between items-start border-b-2 border-amber-400/40 pb-3">
          <div>
            <div className="text-[10px] text-amber-400 font-bold tracking-widest uppercase">
              THE LAST WEBSITE ON EARTH // ARCHIVAL DISCOVERY
            </div>
            <h2 className="text-2xl font-extrabold text-crt-green tracking-wide mt-1">
              {card.id}
            </h2>
          </div>

          <button
            onClick={() => {
              soundEngine.playKeyClick();
              onClose();
            }}
            className="p-1 hover:bg-crt-green hover:text-black rounded transition-colors text-crt-green"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Discovery Metadata Table */}
        <div className="p-4 bg-black border border-crt-green/30 rounded space-y-3">
          <div className="flex justify-between text-xs border-b border-crt-green/10 pb-1">
            <span className="text-crt-green/60 font-bold">DISCOVERY TITLE:</span>
            <span className="text-crt-green font-bold">{card.title}</span>
          </div>

          <div className="flex justify-between text-xs border-b border-crt-green/10 pb-1">
            <span className="text-crt-green/60 font-bold">RECORDED TIMESTAMP:</span>
            <span className="text-amber-400 font-bold">{card.timestamp}</span>
          </div>

          <div className="flex justify-between text-xs border-b border-crt-green/10 pb-1">
            <span className="text-crt-green/60 font-bold">SOURCE SYSTEM:</span>
            <span className="text-crt-green">{card.source}</span>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-crt-green/60 font-bold">STATUS:</span>
            <span className="px-1.5 py-0.5 bg-amber-950 text-amber-400 border border-amber-800 rounded font-bold text-[10px]">
              {card.status}
            </span>
          </div>
        </div>

        {/* Summary Description */}
        <div className="text-xs text-crt-green/90 leading-relaxed p-3 bg-crt-dark border border-crt-green/20 rounded">
          {card.summary}
        </div>

        {/* Share & Copy Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleCopyId}
            className="flex-1 flex items-center justify-center space-x-2 py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded text-xs transition-colors"
          >
            {copiedId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedId ? 'COPIED DISCOVERY ID!' : 'COPY DISCOVERY ID'}</span>
          </button>

          <button
            onClick={handleCopyShareText}
            className="flex-1 flex items-center justify-center space-x-2 py-2 border border-crt-green hover:bg-crt-green/20 text-crt-green font-bold rounded text-xs transition-colors"
          >
            {copiedShare ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedShare ? 'COPIED SHARE TEXT!' : 'COPY SPOILER-SAFE SHARE'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
