import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { ContradictionsView } from './ContradictionsView';
import { soundEngine } from '../../audio/soundEngine';
import { initialContradictions } from '../../data/storyData';
import { BookOpen, Calendar, Users, Building, FileEdit, Plus, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

export const Notebook: React.FC = () => {
  const timeline = useGameStore((state) => state.timeline);
  const people = useGameStore((state) => state.people);
  const organizations = useGameStore((state) => state.organizations);
  const userNotes = useGameStore((state) => state.userNotes);
  const userTheories = useGameStore((state) => state.userTheories);
  const updateNotes = useGameStore((state) => state.updateNotes);
  const addTheory = useGameStore((state) => state.addTheory);
  const removeTheory = useGameStore((state) => state.removeTheory);

  const [activeTab, setActiveTab] = useState<'timeline' | 'people' | 'orgs' | 'contradictions' | 'theories' | 'scratchpad'>('timeline');
  const [newTheoryInput, setNewTheoryInput] = useState('');

  const handleTabChange = (tab: any) => {
    soundEngine.playKeyClick();
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-full flex flex-col bg-crt-dark p-4 text-crt-green font-mono text-xs select-none">
      {/* Notebook Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-crt-green/30 pb-2 mb-4 overflow-x-auto">
        <button
          onClick={() => handleTabChange('timeline')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs transition-colors ${
            activeTab === 'timeline'
              ? 'bg-crt-green text-black font-bold'
              : 'hover:bg-crt-green/20 text-crt-green'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>TIMELINE</span>
        </button>

        <button
          onClick={() => handleTabChange('contradictions')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs transition-colors ${
            activeTab === 'contradictions'
              ? 'bg-amber-400 text-black font-bold'
              : 'hover:bg-crt-green/20 text-amber-400'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>CONTRADICTIONS ({initialContradictions.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('people')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs transition-colors ${
            activeTab === 'people'
              ? 'bg-crt-green text-black font-bold'
              : 'hover:bg-crt-green/20 text-crt-green'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>PEOPLE ({people.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('orgs')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs transition-colors ${
            activeTab === 'orgs'
              ? 'bg-crt-green text-black font-bold'
              : 'hover:bg-crt-green/20 text-crt-green'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>ORGANIZATIONS</span>
        </button>

        <button
          onClick={() => handleTabChange('theories')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs transition-colors ${
            activeTab === 'theories'
              ? 'bg-crt-green text-black font-bold'
              : 'hover:bg-crt-green/20 text-crt-green'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>THEORIES ({userTheories.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('scratchpad')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs transition-colors ${
            activeTab === 'scratchpad'
              ? 'bg-crt-green text-black font-bold'
              : 'hover:bg-crt-green/20 text-crt-green'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>SCRATCHPAD</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto pr-1">
        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div className="space-y-4 relative border-l-2 border-crt-green/30 ml-4 pl-4 py-2">
            {timeline.map((event) => (
              <div key={event.id} className="relative">
                <div
                  className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                    event.discovered
                      ? 'bg-crt-green border-white shadow-[0_0_8px_#00ff66]'
                      : 'bg-black border-crt-green/40'
                  }`}
                />

                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-amber-400">{event.dateStr}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-crt-green/10 border border-crt-green/30 rounded text-crt-green/80">
                    {event.category}
                  </span>
                </div>

                {event.discovered ? (
                  <div>
                    <h4 className="font-bold text-sm text-crt-green mb-1">{event.title}</h4>
                    <p className="text-crt-green/80 text-xs leading-relaxed">{event.description}</p>
                  </div>
                ) : (
                  <div className="text-crt-green/40 italic">
                    [UNKNOWN TIMELINE EVENT — INVESTIGATE WEBSITES TO UNLOCK]
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CONTRADICTIONS TAB */}
        {activeTab === 'contradictions' && (
          <ContradictionsView contradictions={initialContradictions} />
        )}

        {/* PEOPLE TAB */}
        {activeTab === 'people' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {people.map((p) => (
              <div key={p.id} className="p-3 border border-crt-green/30 rounded bg-black/40 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-crt-green">{p.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 bg-red-950 text-red-400 border border-red-800 rounded font-bold">
                    {p.status}
                  </span>
                </div>
                <div className="text-[11px] text-amber-400 font-bold">{p.role} — {p.organization}</div>
                <p className="text-xs text-crt-green/80 leading-relaxed">{p.notes}</p>
              </div>
            ))}
          </div>
        )}

        {/* ORGANIZATIONS TAB */}
        {activeTab === 'orgs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {organizations.map((org) => (
              <div key={org.id} className="p-3 border border-crt-green/30 rounded bg-black/40 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-crt-green">{org.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 bg-amber-950 text-amber-400 border border-amber-800 rounded font-bold">
                    THREAT: {org.threatLevel}
                  </span>
                </div>
                <div className="text-[11px] text-amber-400">DOMAIN: {org.domain}</div>
                <p className="text-xs text-crt-green/80 leading-relaxed">{org.purpose}</p>
                <div className="text-xs text-crt-green font-bold">SECRET PROJECT: {org.secretProject}</div>
              </div>
            ))}
          </div>
        )}

        {/* THEORIES TAB */}
        {activeTab === 'theories' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Formulate a new player theory..."
                value={newTheoryInput}
                onChange={(e) => setNewTheoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTheory(newTheoryInput);
                    setNewTheoryInput('');
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-black border border-crt-green/40 rounded text-crt-green font-mono focus:outline-none"
              />
              <button
                onClick={() => {
                  addTheory(newTheoryInput);
                  setNewTheoryInput('');
                }}
                className="flex items-center space-x-1 px-3 py-1.5 bg-crt-green text-black font-bold rounded hover:bg-emerald-300 text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>ADD THEORY</span>
              </button>
            </div>

            <div className="space-y-2">
              {userTheories.map((theory, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-crt-green/30 rounded bg-black/40">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-crt-green flex-shrink-0" />
                    <span className="text-xs text-crt-green/90 leading-relaxed">{theory}</span>
                  </div>
                  <button
                    onClick={() => removeTheory(idx)}
                    className="p-1 hover:bg-red-500 hover:text-white text-red-400 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCRATCHPAD TAB */}
        {activeTab === 'scratchpad' && (
          <div className="h-full flex flex-col space-y-2">
            <span className="text-[10px] text-amber-400 font-bold">EDITABLE ARCHIVIST LOG (AUTOSAVED)</span>
            <textarea
              value={userNotes}
              onChange={(e) => updateNotes(e.target.value)}
              className="flex-1 w-full p-3 bg-black border border-crt-green/40 rounded text-crt-green font-mono text-xs focus:outline-none resize-none leading-relaxed min-h-[300px]"
              placeholder="Type your notes, password leads, and investigation clues here..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
