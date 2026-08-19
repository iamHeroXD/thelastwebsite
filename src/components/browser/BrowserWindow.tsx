import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { initialWebsites, initialDiscoveryCards } from '../../data/storyData';
import { soundEngine } from '../../audio/soundEngine';
import { NexusSearch } from './NexusSearch';
import { DiscoveryModal } from '../investigation/DiscoveryModal';
import { DiscoveryCard } from '../../types/game';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Bookmark,
  Search,
  Globe,
  Wifi,
  ExternalLink,
  FileQuestion,
} from 'lucide-react';

export const BrowserWindow: React.FC = () => {
  const currentUrl = useGameStore((state) => state.currentUrl);
  const navigateUrl = useGameStore((state) => state.navigateUrl);
  const browserBack = useGameStore((state) => state.browserBack);
  const browserForward = useGameStore((state) => state.browserForward);
  const addBookmark = useGameStore((state) => state.addBookmark);
  const bookmarks = useGameStore((state) => state.bookmarks);
  const discoverEvidence = useGameStore((state) => state.discoverEvidence);

  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('CONNECTED');
  const [activeDiscoveryCard, setActiveDiscoveryCard] = useState<DiscoveryCard | null>(null);

  useEffect(() => {
    setInputUrl(currentUrl);
    setIsLoading(true);
    setLoadingText('CONNECTING TO SURVIVING NODE...');

    const timer = setTimeout(() => {
      setIsLoading(false);
      setLoadingText('TRANSMISSION COMPLETE');
    }, 300);

    return () => clearTimeout(timer);
  }, [currentUrl]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      navigateUrl(inputUrl);
    }
  };

  const parsedUrl = new URL(currentUrl.startsWith('http') ? currentUrl : `http://${currentUrl}`);
  const siteDomain = parsedUrl.host || parsedUrl.pathname.replace('/', '');
  const pagePath = parsedUrl.pathname || '/';

  const matchedSite = Object.values(initialWebsites).find((s) => s.domain === siteDomain);
  const matchedPage = matchedSite?.pages[pagePath] || matchedSite?.pages['/'];

  useEffect(() => {
    if (matchedPage?.evidenceIds) {
      matchedPage.evidenceIds.forEach((evId) => discoverEvidence(evId));
    }
    if (matchedPage?.discoveryId && initialDiscoveryCards[matchedPage.discoveryId]) {
      setActiveDiscoveryCard(initialDiscoveryCards[matchedPage.discoveryId]);
    }
  }, [matchedPage, discoverEvidence]);

  return (
    <div className="w-full h-full flex flex-col bg-black text-cyan-300 font-mono text-xs select-none relative">
      
      {/* Bookmarks Quick Bar */}
      <div className="flex items-center space-x-2 text-[10px] pb-3 border-b border-cyan-400/40 mb-4 overflow-x-auto">
        <span className="text-yellow-300 font-bold">BOOKMARKS:</span>
        {bookmarks.map((bmUrl) => (
          <button
            key={bmUrl}
            onClick={() => {
              soundEngine.playKeyClick();
              navigateUrl(bmUrl);
            }}
            className={`px-2 py-0.5 rounded border transition-colors truncate max-w-[150px] font-bold ${
              currentUrl === bmUrl
                ? 'bg-yellow-400 text-black border-white'
                : 'bg-slate-900 border-cyan-400/30 text-cyan-300 hover:border-cyan-400'
            }`}
          >
            {bmUrl.replace('http://', '')}
          </button>
        ))}
      </div>

      {/* Main Web Page Body */}
      <div className="flex-1 overflow-y-auto pr-1">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-3 py-16 text-cyan-300">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <div className="text-xs font-bold animate-pulse text-yellow-300">{loadingText}</div>
          </div>
        ) : currentUrl === 'http://nexus.search' ? (
          <NexusSearch />
        ) : matchedPage ? (
          <div className="max-w-4xl mx-auto space-y-6 select-text">
            {/* 90s Web Page Title Banner */}
            <div className="border-b-2 border-cyan-400 pb-3">
              <div className="text-xs text-yellow-300 font-bold tracking-widest uppercase mb-1">
                {matchedSite?.name} — {matchedSite?.tagline}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-cyan-300 tracking-wide">
                {matchedPage.title}
              </h1>
            </div>

            {/* Markdown / HTML Content Render */}
            <div className="prose prose-invert max-w-none text-xs md:text-sm font-mono leading-relaxed space-y-4 text-cyan-200">
              {matchedPage.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h2 key={idx} className="text-xl font-bold text-yellow-300 pt-2 border-b border-cyan-400/30">
                      {paragraph.replace('# ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-sm font-bold text-cyan-300 pt-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="p-3 border-l-4 border-yellow-400 bg-slate-900 text-yellow-200 italic rounded">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }

                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                const parts = [];
                let lastIndex = 0;
                let match;

                while ((match = linkRegex.exec(paragraph)) !== null) {
                  if (match.index > lastIndex) {
                    parts.push(paragraph.substring(lastIndex, match.index));
                  }
                  const linkText = match[1];
                  const linkHref = match[2];
                  parts.push(
                    <button
                      key={match.index}
                      onClick={() => {
                        soundEngine.playKeyClick();
                        navigateUrl(linkHref);
                      }}
                      className="text-yellow-300 hover:underline font-bold inline-flex items-center space-x-1 mx-1"
                    >
                      <span>{linkText}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  );
                  lastIndex = linkRegex.lastIndex;
                }
                if (lastIndex < paragraph.length) {
                  parts.push(paragraph.substring(lastIndex));
                }

                return <p key={idx}>{parts}</p>;
              })}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 select-text">
            <FileQuestion className="w-16 h-16 text-yellow-400 animate-bounce" />
            <h1 className="text-2xl font-bold text-red-400">404 — PAGE NOT FOUND</h1>
            <p className="text-xs text-cyan-200 max-w-md">
              The requested URL <span className="text-yellow-300 font-bold">{currentUrl}</span> could not be found on the archived server.
            </p>
          </div>
        )}
      </div>

      {/* Shareable Discovery Card Popup */}
      {activeDiscoveryCard && (
        <DiscoveryModal
          card={activeDiscoveryCard}
          onClose={() => setActiveDiscoveryCard(null)}
        />
      )}
    </div>
  );
};
