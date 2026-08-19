import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { initialWebsites } from '../../data/storyData';
import { soundEngine } from '../../audio/soundEngine';
import { BrowserWindow } from '../browser/BrowserWindow';
import { PortalSidebar } from './PortalSidebar';
import { EvidenceBoard } from '../investigation/EvidenceBoard';
import { ContradictionsView } from '../investigation/ContradictionsView';
import { Notebook } from '../investigation/Notebook';
import { TerminalWindow } from '../terminal/TerminalWindow';
import { RadioScanner } from '../os/RadioScanner';
import { SettingsModal } from '../crt/SettingsModal';
import {
  Globe,
  Search,
  Sliders,
  Shield,
  Radio,
  Calendar,
  AlertTriangle,
  BookOpen,
  Terminal as TermIcon,
  X,
  Zap,
  ExternalLink,
} from 'lucide-react';

export const PortalShell: React.FC = () => {
  const currentUrl = useGameStore((state) => state.currentUrl);
  const navigateUrl = useGameStore((state) => state.navigateUrl);
  const unlockedUrls = useGameStore((state) => state.unlockedUrls);

  const [activeDrawerTab, setActiveDrawerTab] = useState<'evidence' | 'timeline' | 'contradictions' | 'notebook' | 'terminal' | 'radio' | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const navLinks = [
    { name: 'WORLDNET NEWS', url: 'http://worldnet.news', color: 'text-emerald-400' },
    { name: 'AURORA ENERGY', url: 'http://aurora-energy.net', color: 'text-amber-400' },
    { name: 'WEATHER NETWORK', url: 'http://globalweather.gov', color: 'text-cyan-400' },
    { name: 'ARCHIVE SOCIAL', url: 'http://archive.social', color: 'text-indigo-400' },
    { name: 'HELIX BIOLOGICS', url: 'http://helixbio.org', color: 'text-teal-400' },
    { name: 'GOV ARCHIVE', url: 'http://gov.archive.sys', color: 'text-rose-400' },
    { name: 'KYLE VANCE BLOG', url: 'http://blog.kyle-vance.me', color: 'text-yellow-400' },
    { name: 'SOLITUDE OBS', url: 'http://solitude-journal.org', color: 'text-sky-400' },
    { name: 'RETRO FORUM', url: 'http://retro-forum.net', color: 'text-orange-400' },
    { name: 'NODE 001', url: 'http://deep-signal.node001.net', color: 'text-red-400' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigateUrl('http://nexus.search');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Top Portal Header Bar */}
      <header className="w-full bg-slate-900 border-b border-slate-800 shadow-xl">
        {/* Top Emergency Broadcast Ticker */}
        <div className="bg-amber-950/80 border-b border-amber-500/40 px-4 py-1 flex items-center justify-between text-xs text-amber-300 font-bold overflow-hidden">
          <div className="flex items-center space-x-2 animate-pulse truncate">
            <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="truncate">
              EMERGENCY NETWORK ALERT: SATELLITE RELAY #41 LOST AT 04:12 UTC. IONOSPHERE CARRIER WAVE LOCKED AT 440MHz.
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-3 text-[11px] text-amber-400">
            <span>WORKSTATION: NODE 001</span>
            <span>SYSTEM STATUS: RECOVERY MODE</span>
          </div>
        </div>

        {/* Graphical Logo & Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            onClick={() => {
              soundEngine.playKeyClick();
              navigateUrl('http://worldnet.news');
            }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="p-2.5 bg-emerald-500 text-black font-extrabold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-widest text-emerald-400 group-hover:text-emerald-300 transition-colors uppercase">
                THE LAST WEBSITE ON EARTH
              </h1>
              <p className="text-[11px] text-slate-400 tracking-wider">
                SURVIVING DIGITAL INTERNET ARCHIVE (EST. 2087)
              </p>
            </div>
          </div>

          {/* Quick Search & Config */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <form onSubmit={handleSearchSubmit} className="flex-1 md:w-72 flex items-center">
              <div className="w-full flex items-center px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search archive keywords..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-200 focus:outline-none"
                />
              </div>
            </form>

            <button
              onClick={() => {
                soundEngine.playKeyClick();
                setShowSettingsModal(true);
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 transition-colors"
              title="System Config"
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Graphical Website Navigation Tabs Bar */}
        <nav className="w-full bg-slate-950 border-t border-slate-800 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 text-xs py-2">
            <span className="text-slate-500 font-bold mr-2 text-[10px] uppercase">NODES:</span>
            {navLinks.map((link) => (
              <button
                key={link.url}
                onClick={() => {
                  soundEngine.playKeyClick();
                  navigateUrl(link.url);
                }}
                className={`px-3 py-1.5 rounded-lg border transition-all truncate font-bold text-xs whitespace-nowrap ${
                  currentUrl.startsWith(link.url)
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Website Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 py-8 flex-1 flex flex-col lg:flex-row gap-8">
        {/* Main Article & Browser Viewport */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl overflow-hidden min-h-[600px]">
          <BrowserWindow />
        </div>

        {/* Telemetry & Investigation Sidebar */}
        <PortalSidebar onOpenDrawer={(tab) => setActiveDrawerTab(tab)} />
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span>THE LAST WEBSITE ON EARTH &copy; 2087 RECOVERY ARCHIVE</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveDrawerTab('terminal')}
              className="hover:text-emerald-400 flex items-center space-x-1"
            >
              <TermIcon className="w-3.5 h-3.5" />
              <span>TERMINAL CLI</span>
            </button>
            <button
              onClick={() => setActiveDrawerTab('radio')}
              className="hover:text-amber-400 flex items-center space-x-1"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>RADIO SCANNER</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Slide-Out Investigation Drawer */}
      {activeDrawerTab && (
        <div className="fixed inset-0 z-[200] flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-3xl h-full bg-slate-950 border-l-2 border-emerald-500/40 p-6 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <h2 className="text-lg font-bold text-emerald-400 uppercase">
                INVESTIGATION DRAWER // {activeDrawerTab}
              </h2>
              <button
                onClick={() => setActiveDrawerTab(null)}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeDrawerTab === 'evidence' && <EvidenceBoard />}
              {activeDrawerTab === 'timeline' && <Notebook />}
              {activeDrawerTab === 'contradictions' && <Notebook />}
              {activeDrawerTab === 'notebook' && <Notebook />}
              {activeDrawerTab === 'terminal' && <TerminalWindow />}
              {activeDrawerTab === 'radio' && <RadioScanner />}
            </div>
          </div>
        </div>
      )}

      {/* Settings Config Modal */}
      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
    </div>
  );
};
