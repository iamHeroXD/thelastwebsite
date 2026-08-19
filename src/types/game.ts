export type BootState = 'OFF' | 'BOOTING' | 'DESKTOP' | 'BROWSER';

export type CRTPhosphorTheme = 'green' | 'amber' | 'cyan' | 'white';

export interface CRTSettings {
  intensity: number; // 0.0 to 1.0
  brightness: number; // 0.5 to 1.5
  phosphorTheme: CRTPhosphorTheme;
  scanlines: boolean;
  chromatic: boolean;
  flicker: boolean;
  ghosting: boolean;
  curvedScreen: boolean;
  audioVolume: number; // 0.0 to 1.0
  ambientVolume: number;
  uiVolume: number;
  humVolume: number;
  musicVolume: number;
  muted: boolean;
  reducedMotion: boolean;
}

export interface WebPageData {
  id: string;
  domain: string;
  url: string;
  title: string;
  author?: string;
  date?: string;
  category?: string;
  content: string; // Markdown or rich HTML layout identifier
  links?: { title: string; url: string }[];
  evidenceIds?: string[];
  discoveryId?: string;
  requiresDiscovery?: boolean;
  hiddenClue?: string;
  audioLog?: string;
}

export interface WebsiteData {
  id: string;
  domain: string;
  name: string;
  tagline: string;
  theme: 'news' | 'corporate' | 'weather' | 'social' | 'biotech' | 'government' | 'blog' | 'forum' | 'secret';
  pages: Record<string, WebPageData>; // path -> page
}

export interface EvidenceItem {
  id: string;
  sourceTitle: string;
  sourceUrl: string;
  date: string;
  keyInfo: string;
  connectedTo: string[]; // Related website domains or evidence IDs
  tags: string[];
  unlockedAt?: number;
}

export interface ContradictionItem {
  id: string;
  title: string;
  sourceA: { title: string; url: string; statement: string };
  sourceB: { title: string; url: string; statement: string };
  description: string;
  discovered: boolean;
}

export interface DiscoveryCard {
  id: string; // e.g. DISCOVERY-041
  title: string;
  timestamp: string;
  source: string;
  status: 'VERIFIED' | 'UNVERIFIED' | 'CRITICAL' | 'CLASSIFIED';
  summary: string;
  shareText: string;
  unlocked: boolean;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  organization: string;
  lastSeen: string;
  status: 'MISSING' | 'UNKNOWN' | 'DECEASED' | 'CLASSIFIED' | 'DIGITIZED';
  notes: string;
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
  purpose: string;
  secretProject: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface TimelineEvent {
  id: string;
  year: number;
  dateStr: string;
  title: string;
  description: string;
  category: 'SCIENCE' | 'DISASTER' | 'GOVERNMENT' | 'SOCIAL' | 'COLLAPSE';
  discovered: boolean;
}

export interface FSNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
  content?: string;
  children?: FSNode[];
  locked?: boolean;
  password?: string;
  evidenceId?: string;
}

export interface OSWindow {
  id: string;
  title: string;
  type: 'browser' | 'explorer' | 'evidence' | 'notebook' | 'terminal' | 'radio' | 'settings' | 'credits' | 'debug';
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  data?: any;
}

export type EndingType = 'ARCHIVIST' | 'SIGNAL' | 'TRUTH' | 'UNKNOWN' | 'SECRET';

export interface StoryEnding {
  id: EndingType;
  title: string;
  subtitle: string;
  description: string;
  requirementDesc: string;
  unlocked: boolean;
}
