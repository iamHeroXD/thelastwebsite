import { create } from 'zustand';
import { BootState, CRTSettings, CRTPhosphorTheme, EvidenceItem, OSWindow, Person, Organization, TimelineEvent, FSNode } from '../types/game';
import { soundEngine } from '../audio/soundEngine';
import { initialWebsites, initialEvidence, initialTimeline, initialPeople, initialOrganizations, initialFileSystem } from '../data/storyData';

interface GameState {
  // Boot & System State
  bootState: BootState;
  crtSettings: CRTSettings;

  // Browser State
  currentUrl: string;
  historyStack: string[];
  historyIndex: number;
  unlockedUrls: string[];
  bookmarks: string[];

  // Radio App
  isRadioOn: boolean;

  // Investigation & Evidence
  discoveredEvidence: EvidenceItem[];
  evidenceConnections: [string, string][];
  archiveIntegrity: number;

  // Notebook & Discovery Data
  timeline: TimelineEvent[];
  people: Person[];
  organizations: Organization[];
  userNotes: string;
  userTheories: string[];

  // File System
  fileSystem: FSNode;

  // Window Manager State
  windows: OSWindow[];
  activeWindowId: string | null;

  // Terminal State
  terminalHistory: string[];

  // Ending State
  unlockedEndings: string[];
  activeEndingModal: string | null;

  // Actions
  setBootState: (state: BootState) => void;
  updateCRTSettings: (settings: Partial<CRTSettings>) => void;
  toggleRadio: (on?: boolean) => void;
  navigateUrl: (url: string) => void;
  browserBack: () => void;
  browserForward: () => void;
  addBookmark: (url: string) => void;

  // Evidence Actions
  discoverEvidence: (evidenceId: string) => void;
  connectEvidence: (id1: string, id2: string) => boolean;

  // Notebook Actions
  updateNotes: (notes: string) => void;
  addTheory: (theory: string) => void;
  removeTheory: (index: number) => void;

  // Window Manager Actions
  openWindow: (window: Omit<OSWindow, 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;

  // Terminal & File System Actions
  addTerminalHistory: (cmd: string) => void;
  unlockFileNode: (nodeId: string) => void;

  // Story & Endings
  triggerEnding: (endingId: string) => void;
  closeEndingModal: () => void;
  resetGame: () => void;
}

const LOCAL_STORAGE_KEY = 'LAST_WEBSITE_EARTH_SAVE_V1';

const defaultCRTSettings: CRTSettings = {
  intensity: 0.65,
  brightness: 1.0,
  phosphorTheme: 'green',
  scanlines: true,
  chromatic: true,
  flicker: false, // Turned flicker false by default for maximum screen stability
  ghosting: true,
  curvedScreen: true,
  audioVolume: 0.8,
  ambientVolume: 0.5,
  uiVolume: 0.7,
  humVolume: 0.4,
  musicVolume: 0.6,
  muted: false,
  reducedMotion: false,
};

const initialWindows: OSWindow[] = [
  {
    id: 'browser',
    title: 'ORBIT BROWSER v3.4.1',
    type: 'browser',
    x: 40,
    y: 30,
    width: 900,
    height: 600,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  }
];

export const useGameStore = create<GameState>((set, get) => {
  let savedData: any = null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      savedData = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load save file:', e);
  }

  const initialUrl = savedData?.currentUrl || 'http://worldnet.news';
  const unlocked = savedData?.unlockedUrls || [
    'http://worldnet.news',
    'http://aurora-energy.net',
    'http://globalweather.gov',
    'http://archive.social',
    'http://helixbio.org',
  ];

  return {
    // Force default boot state to BROWSER so the website is immediately visible and playable!
    bootState: 'BROWSER',
    crtSettings: savedData?.crtSettings || defaultCRTSettings,

    currentUrl: initialUrl,
    historyStack: [initialUrl],
    historyIndex: 0,
    unlockedUrls: unlocked,
    bookmarks: savedData?.bookmarks || [
      'http://worldnet.news',
      'http://aurora-energy.net',
      'http://globalweather.gov',
    ],

    isRadioOn: false,

    discoveredEvidence: savedData?.discoveredEvidence || initialEvidence.slice(0, 3),
    evidenceConnections: savedData?.evidenceConnections || [],
    archiveIntegrity: savedData?.archiveIntegrity || 15,

    timeline: savedData?.timeline || initialTimeline,
    people: savedData?.people || initialPeople,
    organizations: savedData?.organizations || initialOrganizations,
    userNotes: savedData?.userNotes || 'My Investigation Notes:\n- Atmospheric anomalies reported across multiple sectors.\n- Satellite transmissions dropping since Project Echo launch.\n- Where did Kyle Vance go?',
    userTheories: savedData?.userTheories || ['Satellite interference caused total network blackout.'],

    fileSystem: savedData?.fileSystem || initialFileSystem,

    windows: savedData?.windows || initialWindows,
    activeWindowId: 'browser',

    terminalHistory: savedData?.terminalHistory || ['System init...', 'ORBIT Terminal v4.8 ready.'],

    unlockedEndings: savedData?.unlockedEndings || [],
    activeEndingModal: null,

    // ACTIONS
    setBootState: (state) => {
      set({ bootState: state });
      if (state === 'DESKTOP' || state === 'BROWSER') {
        soundEngine.startHum();
        soundEngine.startAmbient();
      } else if (state === 'OFF') {
        soundEngine.stopHum();
      }
      saveToStorage(get());
    },

    updateCRTSettings: (newSettings) => {
      const updated = { ...get().crtSettings, ...newSettings };
      set({ crtSettings: updated });
      soundEngine.updateVolumes(
        updated.audioVolume,
        updated.humVolume,
        updated.uiVolume,
        updated.ambientVolume,
        updated.musicVolume,
        updated.muted
      );
      saveToStorage(get());
    },

    toggleRadio: (on) => {
      const current = get().isRadioOn;
      const next = on !== undefined ? on : !current;
      set({ isRadioOn: next });
      soundEngine.toggleRadioStatic(next);
    },

    navigateUrl: (url) => {
      let formattedUrl = url.trim().toLowerCase();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'http://' + formattedUrl;
      }

      soundEngine.playModemConnect();

      const { historyStack, historyIndex, unlockedUrls } = get();
      const newStack = historyStack.slice(0, historyIndex + 1);
      newStack.push(formattedUrl);

      const newUnlocked = unlockedUrls.includes(formattedUrl)
        ? unlockedUrls
        : [...unlockedUrls, formattedUrl];

      set({
        currentUrl: formattedUrl,
        historyStack: newStack,
        historyIndex: newStack.length - 1,
        unlockedUrls: newUnlocked,
      });

      saveToStorage(get());
    },

    browserBack: () => {
      const { historyStack, historyIndex } = get();
      if (historyIndex > 0) {
        soundEngine.playKeyClick();
        const prevIndex = historyIndex - 1;
        set({
          historyIndex: prevIndex,
          currentUrl: historyStack[prevIndex],
        });
      }
    },

    browserForward: () => {
      const { historyStack, historyIndex } = get();
      if (historyIndex < historyStack.length - 1) {
        soundEngine.playKeyClick();
        const nextIndex = historyIndex + 1;
        set({
          historyIndex: nextIndex,
          currentUrl: historyStack[nextIndex],
        });
      }
    },

    addBookmark: (url) => {
      const { bookmarks } = get();
      if (!bookmarks.includes(url)) {
        soundEngine.playKeyClick();
        set({ bookmarks: [...bookmarks, url] });
        saveToStorage(get());
      }
    },

    discoverEvidence: (evidenceId) => {
      const { discoveredEvidence, timeline } = get();
      const existing = discoveredEvidence.find((e) => e.id === evidenceId);
      if (!existing) {
        const item = initialEvidence.find((e) => e.id === evidenceId);
        if (item) {
          soundEngine.playDiscovery();
          const nextEv = [...discoveredEvidence, item];

          const updatedTimeline = timeline.map((t) => {
            if (t.id === `timeline-${evidenceId}` || item.keyInfo.toLowerCase().includes(t.title.toLowerCase())) {
              return { ...t, discovered: true };
            }
            return t;
          });

          const integrity = Math.min(100, Math.round((nextEv.length / initialEvidence.length) * 100));

          set({
            discoveredEvidence: nextEv,
            timeline: updatedTimeline,
            archiveIntegrity: integrity,
          });

          saveToStorage(get());
        }
      }
    },

    connectEvidence: (id1, id2) => {
      const { evidenceConnections, discoveredEvidence } = get();
      const pairExists = evidenceConnections.some(
        ([a, b]) => (a === id1 && b === id2) || (a === id2 && b === id1)
      );

      if (pairExists) return true;

      const ev1 = discoveredEvidence.find((e) => e.id === id1);
      const ev2 = discoveredEvidence.find((e) => e.id === id2);

      if (ev1 && ev2) {
        const isRelated =
          ev1.connectedTo.includes(ev2.id) ||
          ev2.connectedTo.includes(ev1.id) ||
          ev1.tags.some((t) => ev2.tags.includes(t));

        if (isRelated) {
          soundEngine.playDiscovery();
          const nextConn: [string, string][] = [...evidenceConnections, [id1, id2]];
          set({ evidenceConnections: nextConn });
          saveToStorage(get());
          return true;
        }
      }

      soundEngine.playGlitch();
      return false;
    },

    updateNotes: (notes) => {
      set({ userNotes: notes });
      saveToStorage(get());
    },

    addTheory: (theory) => {
      if (!theory.trim()) return;
      soundEngine.playKeyClick();
      set({ userTheories: [...get().userTheories, theory.trim()] });
      saveToStorage(get());
    },

    removeTheory: (index) => {
      soundEngine.playKeyClick();
      const updated = get().userTheories.filter((_, i) => i !== index);
      set({ userTheories: updated });
      saveToStorage(get());
    },

    openWindow: (winData) => {
      soundEngine.playDiskSeek();
      const { windows } = get();
      const existing = windows.find((w) => w.id === winData.id);

      const maxZ = windows.reduce((max, w) => Math.max(max, w.zIndex), 10);

      if (existing) {
        set({
          windows: windows.map((w) =>
            w.id === winData.id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w
          ),
          activeWindowId: winData.id,
        });
      } else {
        const newWin: OSWindow = {
          ...winData,
          zIndex: maxZ + 1,
        };
        set({
          windows: [...windows, newWin],
          activeWindowId: winData.id,
        });
      }
      saveToStorage(get());
    },

    closeWindow: (id) => {
      soundEngine.playKeyClick();
      set({ windows: get().windows.filter((w) => w.id !== id) });
      saveToStorage(get());
    },

    minimizeWindow: (id) => {
      soundEngine.playKeyClick();
      set({
        windows: get().windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
      });
    },

    maximizeWindow: (id) => {
      soundEngine.playKeyClick();
      set({
        windows: get().windows.map((w) =>
          w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
        ),
      });
    },

    focusWindow: (id) => {
      const { windows } = get();
      const maxZ = windows.reduce((max, w) => Math.max(max, w.zIndex), 10);
      set({
        activeWindowId: id,
        windows: windows.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w)),
      });
    },

    addTerminalHistory: (cmd) => {
      set({ terminalHistory: [...get().terminalHistory, cmd] });
    },

    unlockFileNode: (nodeId) => {
      soundEngine.playDiscovery();
      const unlockRecursive = (node: FSNode): FSNode => {
        if (node.id === nodeId) {
          return { ...node, locked: false };
        }
        if (node.children) {
          return { ...node, children: node.children.map(unlockRecursive) };
        }
        return node;
      };
      set({ fileSystem: unlockRecursive(get().fileSystem) });
      saveToStorage(get());
    },

    triggerEnding: (endingId) => {
      soundEngine.playDiscovery();
      const { unlockedEndings } = get();
      if (!unlockedEndings.includes(endingId)) {
        set({
          unlockedEndings: [...unlockedEndings, endingId],
          activeEndingModal: endingId,
        });
      } else {
        set({ activeEndingModal: endingId });
      }
      saveToStorage(get());
    },

    closeEndingModal: () => {
      set({ activeEndingModal: null });
    },

    resetGame: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({
        bootState: 'BROWSER',
        crtSettings: defaultCRTSettings,
        currentUrl: 'http://worldnet.news',
        historyStack: ['http://worldnet.news'],
        historyIndex: 0,
        unlockedUrls: [
          'http://worldnet.news',
          'http://aurora-energy.net',
          'http://globalweather.gov',
          'http://archive.social',
          'http://helixbio.org',
        ],
        bookmarks: [
          'http://worldnet.news',
          'http://aurora-energy.net',
          'http://globalweather.gov',
        ],
        isRadioOn: false,
        discoveredEvidence: initialEvidence.slice(0, 3),
        evidenceConnections: [],
        archiveIntegrity: 15,
        timeline: initialTimeline,
        people: initialPeople,
        organizations: initialOrganizations,
        userNotes: '',
        userTheories: [],
        fileSystem: initialFileSystem,
        windows: initialWindows,
        activeWindowId: 'browser',
        terminalHistory: ['System init...', 'ORBIT Terminal v4.8 ready.'],
        unlockedEndings: [],
        activeEndingModal: null,
      });
    },
  };
});

function saveToStorage(state: GameState) {
  try {
    const toSave = {
      bootState: state.bootState,
      crtSettings: state.crtSettings,
      currentUrl: state.currentUrl,
      unlockedUrls: state.unlockedUrls,
      bookmarks: state.bookmarks,
      discoveredEvidence: state.discoveredEvidence,
      evidenceConnections: state.evidenceConnections,
      archiveIntegrity: state.archiveIntegrity,
      timeline: state.timeline,
      people: state.people,
      organizations: state.organizations,
      userNotes: state.userNotes,
      userTheories: state.userTheories,
      fileSystem: state.fileSystem,
      windows: state.windows,
      unlockedEndings: state.unlockedEndings,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error('Failed to save game state:', e);
  }
}
