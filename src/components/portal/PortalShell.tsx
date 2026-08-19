import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../audio/soundEngine';
import { BrowserWindow } from '../browser/BrowserWindow';
import { PortalSidebar } from './PortalSidebar';
import { EvidenceBoard } from '../investigation/EvidenceBoard';
import { Notebook } from '../investigation/Notebook';
import { TerminalWindow } from '../terminal/TerminalWindow';
import { RadioScanner } from '../os/RadioScanner';
import { SettingsModal } from '../crt/SettingsModal';
import {
  ArrowLeft,
  ArrowRight,
  XCircle,
  RotateCw,
  Home,
  Search,
  Star,
  History,
  Printer,
  Sliders,
  Shield,
  Radio,
  Calendar,
  AlertTriangle,
  BookOpen,
  Terminal as TermIcon,
  X,
  Zap,
} from 'lucide-react';

export const PortalShell: React.FC = () => {
  const currentUrl = useGameStore((state) => state.currentUrl);
  const navigateUrl = useGameStore((state) => state.navigateUrl);
  const browserBack = useGameStore((state) => state.browserBack);
  const browserForward = useGameStore((state) => state.browserForward);

  const [activeDrawerTab, setActiveDrawerTab] = useState<'evidence' | 'timeline' | 'contradictions' | 'notebook' | 'terminal' | 'radio' | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [addressInput, setAddressInput] = useState(currentUrl);

  const navLinks = [
    { name: 'WORLDNET NEWS', url: 'http://worldnet.news' },
    { name: 'AURORA ENERGY', url: 'http://aurora-energy.net' },
    { name: 'WEATHER NETWORK', url: 'http://globalweather.gov' },
    { name: 'ARCHIVE SOCIAL', url: 'http://archive.social' },
    { name: 'HELIX BIOLOGICS', url: 'http://helixbio.org' },
    { name: 'GOV ARCHIVE', url: 'http://gov.archive.sys' },
    { name: 'KYLE VANCE BLOG', url: 'http://blog.kyle-vance.me' },
    { name: 'SOLITUDE OBS', url: 'http://solitude-journal.org' },
    { name: 'RETRO FORUM', url: 'http://retro-forum.net' },
    { name: 'NODE 001', url: 'http://deep-signal.node001.net' },
  ];

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      navigateUrl(addressInput);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-cyan-300 font-sans flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      
      {/* 1990s Internet Explorer Top Chrome Container */}
      <header className="w-full bg-[#c0c0c0] text-black border-b-2 border-[#404040] shadow-md select-none font-sans text-xs">
        
        {/* IE Window Title Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white px-2 py-1 flex items-center justify-between font-bold text-xs">
          <div className="flex items-center space-x-2 truncate">
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 inline-block border border-white" />
            <span className="truncate">The Last Website on Earth - Microsoft Internet Explorer</span>
          </div>
          <div className="flex items-center space-x-1">
            <button className="px-2 py-0.5 bg-[#c0c0c0] text-black font-extrabold text-[10px] border border-white shadow">_</button>
            <button className="px-2 py-0.5 bg-[#c0c0c0] text-black font-extrabold text-[10px] border border-white shadow">□</button>
            <button className="px-2 py-0.5 bg-red-600 text-white font-extrabold text-[10px] border border-white shadow">X</button>
          </div>
        </div>

        {/* IE Menu Bar */}
        <div className="flex items-center space-x-4 px-2 py-0.5 border-b border-[#808080] text-xs">
          <span className="cursor-pointer hover:bg-blue-800 hover:text-white px-1">File</span>
          <span className="cursor-pointer hover:bg-blue-800 hover:text-white px-1">Edit</span>
          <span className="cursor-pointer hover:bg-blue-800 hover:text-white px-1">View</span>
          <span className="cursor-pointer hover:bg-blue-800 hover:text-white px-1">Favorites</span>
          <span className="cursor-pointer hover:bg-blue-800 hover:text-white px-1">Tools</span>
          <span className="cursor-pointer hover:bg-blue-800 hover:text-white px-1">Help</span>
        </div>

        {/* IE Action Toolbar Buttons */}
        <div className="flex items-center space-x-1 px-2 py-1 bg-[#c0c0c0] border-b border-[#808080] overflow-x-auto">
          <button onClick={browserBack} className="bevel-outset px-2 py-1 flex items-center space-x-1 font-bold text-[11px]">
            <ArrowLeft className="w-3.5 h-3.5 text-blue-900" />
            <span>Back</span>
          </button>
          <button onClick={browserForward} className="bevel-outset px-2 py-1 flex items-center space-x-1 font-bold text-[11px]">
            <ArrowRight className="w-3.5 h-3.5 text-blue-900" />
            <span>Forward</span>
          </button>
          <button onClick={() => navigateUrl(currentUrl)} className="bevel-outset px-2 py-1 flex items-center space-x-1 font-bold text-[11px]">
            <RotateCw className="w-3.5 h-3.5 text-blue-900" />
            <span>Refresh</span>
          </button>
          <button onClick={() => navigateUrl('http://worldnet.news')} className="bevel-outset px-2 py-1 flex items-center space-x-1 font-bold text-[11px]">
            <Home className="w-3.5 h-3.5 text-blue-900" />
            <span>Home</span>
          </button>
          <button onClick={() => navigateUrl('http://nexus.search')} className="bevel-outset px-2 py-1 flex items-center space-x-1 font-bold text-[11px]">
            <Search className="w-3.5 h-3.5 text-blue-900" />
            <span>Search</span>
          </button>

          <div className="h-5 border-r border-[#808080] mx-1" />

          <button onClick={() => setShowSettingsModal(true)} className="bevel-outset px-2 py-1 flex items-center space-x-1 font-bold text-[11px]">
            <Sliders className="w-3.5 h-3.5 text-blue-900" />
            <span>Config</span>
          </button>
        </div>

        {/* IE Address Bar */}
        <div className="flex items-center space-x-2 px-2 py-1 bg-[#c0c0c0]">
          <span className="font-bold text-xs">Address</span>
          <form onSubmit={handleAddressSubmit} className="flex-1 flex items-center">
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              className="w-full px-2 py-0.5 bg-white text-black font-mono text-xs border-2 border-[#404040] focus:outline-none"
            />
            <button type="submit" className="bevel-outset px-3 py-0.5 ml-1 font-bold text-xs">
              Go
            </button>
          </form>
        </div>
      </header>

      {/* 90s Web 1.0 WordArt Header & Ticker Bar */}
      <div className="bg-black border-b-2 border-cyan-400 py-4 px-4 text-center space-y-2">
        <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase wordart-3d">
          THE LAST WEBSITE ON EARTH
        </h1>
        <p className="text-xs text-yellow-300 font-mono tracking-widest uppercase">
          ★ SURVIVING DIGITAL INTERNET ARCHIVE (2087) ★
        </p>

        {/* Web 1.0 Category Navigation Bar */}
        <nav className="pt-2 flex flex-wrap justify-center gap-1 max-w-5xl mx-auto font-mono text-xs">
          {navLinks.map((link) => (
            <button
              key={link.url}
              onClick={() => {
                soundEngine.playKeyClick();
                navigateUrl(link.url);
              }}
              className={`px-3 py-1 font-bold rounded border transition-colors ${
                currentUrl.startsWith(link.url)
                  ? 'bg-yellow-400 text-black border-white shadow-[0_0_10px_#ffff00]'
                  : 'bg-slate-900 text-cyan-300 border-cyan-400/50 hover:bg-cyan-900 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Main Graphical Web Page View */}
        <div className="flex-1 bg-black border-2 border-cyan-400 rounded-xl p-4 md:p-6 shadow-[0_0_25px_rgba(0,255,255,0.15)] overflow-hidden min-h-[600px]">
          <BrowserWindow />
        </div>

        {/* Left/Right Web 1.0 Telemetry Sidebar */}
        <PortalSidebar onOpenDrawer={(tab) => setActiveDrawerTab(tab)} />
      </main>

      {/* Web 1.0 Footer */}
      <footer className="w-full bg-[#c0c0c0] text-black border-t-2 border-[#404040] py-3 px-4 text-center font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>THE LAST WEBSITE ON EARTH &copy; 2087 ARCHIVE</span>
          <div className="flex items-center space-x-4 font-bold">
            <button onClick={() => setActiveDrawerTab('terminal')} className="hover:underline text-blue-900">
              Terminal CLI
            </button>
            <button onClick={() => setActiveDrawerTab('radio')} className="hover:underline text-blue-900">
              440MHz Radio
            </button>
          </div>
        </div>
      </footer>

      {/* Slide-out Investigation Drawer */}
      {activeDrawerTab && (
        <div className="fixed inset-0 z-[200] flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-3xl h-full bg-black border-l-4 border-yellow-400 p-6 flex flex-col justify-between font-mono">
            <div className="flex items-center justify-between border-b border-cyan-400 pb-3 mb-4">
              <h2 className="text-lg font-bold text-yellow-300 uppercase">
                INVESTIGATION TOOL // {activeDrawerTab}
              </h2>
              <button onClick={() => setActiveDrawerTab(null)} className="p-1 hover:bg-yellow-400 hover:text-black rounded text-cyan-300">
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

      {/* Config Modal */}
      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
    </div>
  );
};
