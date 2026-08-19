import React, { useState } from 'react';
import { initialWebsites } from '../../data/storyData';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../audio/soundEngine';
import { Search, Globe, ArrowRight, ExternalLink } from 'lucide-react';

export const NexusSearch: React.FC = () => {
  const navigateUrl = useGameStore((state) => state.navigateUrl);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ title: string; url: string; snippet: string; domain: string }[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    soundEngine.playModemConnect();
    setHasSearched(true);

    const q = query.toLowerCase();
    const matches: { title: string; url: string; snippet: string; domain: string }[] = [];

    Object.values(initialWebsites).forEach((site) => {
      Object.values(site.pages).forEach((page) => {
        if (
          page.title.toLowerCase().includes(q) ||
          page.content.toLowerCase().includes(q) ||
          page.domain.toLowerCase().includes(q)
        ) {
          const lines = page.content.split('\n').filter((l) => l.trim().length > 0);
          const snippetLine = lines.find((l) => l.toLowerCase().includes(q)) || lines[0] || '';
          matches.push({
            title: page.title,
            url: page.url,
            domain: page.domain,
            snippet: snippetLine.substring(0, 140) + '...',
          });
        }
      });
    });

    setResults(matches);
  };

  return (
    <div className="w-full h-full flex flex-col bg-crt-dark p-6 text-crt-green font-mono select-none overflow-y-auto">
      {/* Brand Search Header */}
      <div className="text-center my-6 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-widest text-crt-green uppercase drop-shadow-[0_0_10px_#00ff66]">
          NEXUS SEARCH ENGINE
        </h1>
        <p className="text-xs text-crt-green/70">
          SURVIVING INDEX // 10 ARCHIVED WEBSITES ONLINE
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-xl w-full mx-auto flex items-center space-x-2 mb-6">
        <div className="flex-1 flex items-center px-3 py-2 bg-black border-2 border-crt-green rounded shadow-inner">
          <Search className="w-4 h-4 text-crt-green mr-2" />
          <input
            type="text"
            placeholder="Search keywords (e.g. Project Echo, Kyle Vance, Horizon-7)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-transparent border-none outline-none text-crt-green text-xs font-mono"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-crt-green text-black font-extrabold rounded hover:bg-emerald-300 transition-colors text-xs"
        >
          SEARCH
        </button>
      </div>

      {/* Suggested Terms */}
      {!hasSearched && (
        <div className="max-w-xl mx-auto flex flex-wrap gap-2 text-xs justify-center mb-8">
          <span className="text-crt-green/60">SUGGESTED:</span>
          {['Project Echo', 'Kyle Vance', 'Horizon-7', 'Satellite', 'Order #804', 'Node 001'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                soundEngine.playKeyClick();
              }}
              className="px-2 py-0.5 border border-crt-green/30 hover:border-crt-green rounded text-crt-green/80 hover:text-crt-green"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Search Results List */}
      {hasSearched && (
        <div className="max-w-2xl w-full mx-auto space-y-4">
          <div className="text-xs text-amber-400 font-bold border-b border-crt-green/30 pb-2 flex justify-between">
            <span>FOUND {results.length} INDEXED MATCHES</span>
            <span>RELEVANCE: 98.4%</span>
          </div>

          {results.length > 0 ? (
            results.map((res, idx) => (
              <div
                key={idx}
                onClick={() => {
                  soundEngine.playKeyClick();
                  navigateUrl(res.url);
                }}
                className="p-3 border border-crt-green/30 rounded bg-black/40 hover:border-crt-green transition-all cursor-pointer space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-crt-green" />
                  <span className="text-[10px] text-amber-400 font-bold">{res.domain}</span>
                </div>
                <h3 className="font-bold text-sm text-crt-green hover:underline">{res.title}</h3>
                <p className="text-xs text-crt-green/80 leading-relaxed">{res.snippet}</p>
                <div className="text-[10px] text-crt-green/50">{res.url}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-crt-green/50 text-xs">
              No matching records found for "{query}". Try another search term.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
