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
    setLoadingText('CONNECTING TO NODE...');

    const timer = setTimeout(() => {
      setIsLoading(false);
      setLoadingText('PACKET TRANSMISSION COMPLETE');
    }, 400);

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
    <div className="w-full h-full flex flex-col bg-crt-dark text-crt-green font-mono text-xs select-none relative">
      {/* Retro Browser Chrome Top Bar */}
      <div className="bg-stone-900 border-b-2 border-crt-green/40 p-2 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button
              onClick={browserBack}
              className="p-1 hover:bg-crt-green hover:text-black rounded transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={browserForward}
              className="p-1 hover:bg-crt-green hover:text-black rounded transition-colors"
              title="Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateUrl(currentUrl)}
              className="p-1 hover:bg-crt-green hover:text-black rounded transition-colors"
              title="Reload Page"
            >
              <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => navigateUrl('http://worldnet.news')}
              className="p-1 hover:bg-crt-green hover:text-black rounded transition-colors"
              title="Home"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center">
            <div className="w-full flex items-center px-3 py-1 bg-black border border-crt-green/60 rounded shadow-inner">
              <Globe className="w-3.5 h-3.5 text-crt-green mr-2" />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-crt-green text-xs font-mono"
              />
              <button type="submit" className="text-[10px] px-2 py-0.5 bg-crt-green/20 hover:bg-crt-green hover:text-black rounded font-bold">
                GO
              </button>
            </div>
          </form>

          <button
            onClick={() => navigateUrl('http://nexus.search')}
            className="p-1.5 bg-crt-green/20 hover:bg-crt-green hover:text-black rounded text-xs flex items-center space-x-1 font-bold"
            title="Nexus Search Engine"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SEARCH</span>
          </button>

          <button
            onClick={() => addBookmark(currentUrl)}
            className="p-1.5 hover:bg-crt-green hover:text-black rounded text-xs"
            title="Bookmark Page"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-1 px-2 py-1 bg-black border border-crt-green/30 rounded">
            <Wifi className={`w-3 h-3 ${isLoading ? 'text-amber-400 animate-pulse' : 'text-crt-green'}`} />
            <span className="text-[9px] text-crt-green/70 hidden md:inline">440MHz</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[10px] overflow-x-auto pt-1 border-t border-crt-green/10">
          <span className="text-crt-green/50 font-bold">BOOKMARKS:</span>
          {bookmarks.map((bmUrl) => (
            <button
              key={bmUrl}
              onClick={() => {
                soundEngine.playKeyClick();
                navigateUrl(bmUrl);
              }}
              className={`px-2 py-0.5 rounded border transition-colors truncate max-w-[140px] ${
                currentUrl === bmUrl
                  ? 'bg-crt-green text-black font-bold border-crt-green'
                  : 'bg-black/40 border-crt-green/20 text-crt-green/80 hover:border-crt-green'
              }`}
            >
              {bmUrl.replace('http://', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Page View Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-crt-dark">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 text-crt-green">
            <div className="w-12 h-12 border-4 border-crt-green border-t-transparent rounded-full animate-spin" />
            <div className="text-xs font-bold animate-pulse">{loadingText}</div>
            <div className="text-[10px] text-crt-green/60 font-mono">
              PACKET 01 .... OK | PACKET 02 .... OK | SIGNAL HARMONIC: 440MHz
            </div>
          </div>
        ) : currentUrl === 'http://nexus.search' ? (
          <NexusSearch />
        ) : matchedPage ? (
          <div className="max-w-4xl mx-auto space-y-6 select-text">
            <div className="border-b-2 border-crt-green/40 pb-4">
              <div className="text-xs text-amber-400 font-bold tracking-widest uppercase mb-1">
                {matchedSite?.name} — {matchedSite?.tagline}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-crt-green tracking-wide">
                {matchedPage.title}
              </h1>
            </div>

            <div className="prose prose-invert max-w-none text-xs md:text-sm font-mono leading-relaxed space-y-4">
              {matchedPage.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h2 key={idx} className="text-xl font-bold text-crt-green pt-2 border-b border-crt-green/20">
                      {paragraph.replace('# ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-sm font-bold text-amber-400 pt-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="p-3 border-l-4 border-amber-400 bg-amber-950/20 text-amber-300 italic rounded">
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
                      className="text-amber-400 hover:underline font-bold inline-flex items-center space-x-1 mx-1"
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
            <FileQuestion className="w-16 h-16 text-amber-400 animate-bounce" />
            <h1 className="text-2xl font-bold text-red-400">404 — SURVIVING NODE NOT FOUND</h1>
            <p className="text-xs text-crt-green/80 max-w-md">
              The URL <span className="text-amber-400 font-bold">{currentUrl}</span> could not be reached across the ionospheric frequency matrix.
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
