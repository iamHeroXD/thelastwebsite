import { WebsiteData, EvidenceItem, TimelineEvent, Person, Organization, FSNode, StoryEnding, ContradictionItem, DiscoveryCard } from '../types/game';

export const initialContradictions: ContradictionItem[] = [
  {
    id: 'CONTRADICTION #001',
    title: 'Project Echo Launch Date Discrepancy',
    sourceA: {
      title: 'Aurora Energy Official Press Release',
      url: 'http://aurora-energy.net',
      statement: 'Project Echo phase 3 calibration completed August 01, 2087 with 99.4% efficiency.',
    },
    sourceB: {
      title: 'Executive Order #804 Classified Directives',
      url: 'http://gov.archive.sys/emergency/order-804',
      statement: 'Full power output authorization signed October 28, 2087 following ionospheric failure.',
    },
    description: 'Aurora Energy claimed Project Echo was running routinely in August, but federal emergency authorization was only requested in late October after atmospheric carrier waves locked.',
    discovered: true,
  },
  {
    id: 'CONTRADICTION #002',
    title: 'Dr. Elena Rostova Disappearance & Credential Timeline',
    sourceA: {
      title: 'WorldNet News Correspondent Log',
      url: 'http://worldnet.news/article/satellite-disruption',
      statement: 'Dr. Rostova observatory access revoked by federal order on August 15, 2087.',
    },
    sourceB: {
      title: 'Archive Social Timeline Feed',
      url: 'http://archive.social',
      statement: 'Dr. Rostova published active neural frequency updates on October 15, 2087.',
    },
    description: 'Federal records state Dr. Rostova was removed in August, but her personal social updates continued through October from inside Aurora facility sub-networks.',
    discovered: true,
  },
  {
    id: 'CONTRADICTION #003',
    title: 'Atmospheric Event vs Weather Telemetry Physics',
    sourceA: {
      title: 'WorldNet News Article',
      url: 'http://worldnet.news/article/atmospheric-phenomena',
      statement: 'Meteorological agencies insist violet skies are high-altitude ice crystal solar reflections.',
    },
    sourceB: {
      title: 'Global Weather Radar Status Report',
      url: 'http://globalweather.gov',
      statement: 'Barometric pressure grids dropped to 0 hPa without solar radiation or thermal changes.',
    },
    description: 'Public news outlets reported harmless ice crystals, while internal weather sensors recorded a physical drop in atmospheric pressure caused by electromagnetic ionization.',
    discovered: true,
  }
];

export const initialDiscoveryCards: Record<string, DiscoveryCard> = {
  'DISCOVERY-001': {
    id: 'DISCOVERY-001',
    title: 'NETWORK UPLINK RESTORED',
    timestamp: '2087-11-03 23:59',
    source: 'ORBIT RECOVERY KERNEL',
    status: 'VERIFIED',
    summary: 'First surviving digital carrier node detected at 440MHz frequency. Local CRT workstation online.',
    shareText: 'THE LAST WEBSITE ON EARTH // DISCOVERY-001: First surviving digital node detected at 440MHz frequency.',
    unlocked: true,
  },
  'DISCOVERY-014': {
    id: 'DISCOVERY-014',
    title: 'SATELLITE TELEMETRY CORRELATION',
    timestamp: '2087-08-14 14:10',
    source: 'WORLDNET NEWS ARCHIVE',
    status: 'VERIFIED',
    summary: 'Satellite drops coincided precisely with Aurora Energy 4.2 Terawatt Echo harmonic pulses.',
    shareText: 'THE LAST WEBSITE ON EARTH // DISCOVERY-014: Satellite drops coincided with 4.2 Terawatt Aurora pulse.',
    unlocked: true,
  },
  'DISCOVERY-041': {
    id: 'DISCOVERY-041',
    title: 'CLASSIFIED INCIDENT LOG #88-B',
    timestamp: '2087-09-18 04:12',
    source: 'AURORA INTERNAL SYSTEM',
    status: 'CRITICAL',
    summary: 'Test Subject Alpha dematerialized into 440MHz carrier wave during Echo high-power resonance test.',
    shareText: 'THE LAST WEBSITE ON EARTH // DISCOVERY-041: Matter dematerialization verified in Aurora Incident Log #88-B.',
    unlocked: true,
  },
  'DISCOVERY-067': {
    id: 'DISCOVERY-067',
    title: 'EXECUTIVE ORDER #804 DECRYPTED',
    timestamp: '2087-10-28 18:00',
    source: 'FEDERAL DEFENSE ARCHIVE',
    status: 'CLASSIFIED',
    summary: 'Federal cabinet authorized total biological citizen conversion into atmospheric frequency matrix.',
    shareText: 'THE LAST WEBSITE ON EARTH // DISCOVERY-067: Executive Order #804 decrypted via ECHO-2087-VOID.',
    unlocked: false,
  },
  'DISCOVERY-089': {
    id: 'DISCOVERY-089',
    title: 'WORKSTATION NODE 001 SIGNAL INTERCEPT',
    timestamp: '2087-11-03 23:59',
    source: 'DEEP SIGNAL MATRIX',
    status: 'CRITICAL',
    summary: 'Node 001 active. You are the Archivist presiding over 8.2 billion digitized human minds.',
    shareText: 'THE LAST WEBSITE ON EARTH // DISCOVERY-089: Node 001 reached. You are the Archivist.',
    unlocked: false,
  }
};

export const initialWebsites: Record<string, WebsiteData> = {
  'http://worldnet.news': {
    id: 'worldnet',
    domain: 'worldnet.news',
    name: 'WORLDNET NEWS ARCHIVE',
    tagline: 'Truth Across All Frequencies — Final Archived Edition 2087',
    theme: 'news',
    pages: {
      '/': {
        id: 'wn-home',
        domain: 'worldnet.news',
        url: 'http://worldnet.news',
        title: 'WORLDNET NEWS — Global Headlines',
        content: `
# GLOBAL NEWS NETWORK ARCHIVE (2087)

> **NOTICE**: Satellite uplink relay #41 lost connection at 04:12 UTC. Automated emergency backup active.

---

### [BREAKING] GLOBAL SATELLITE DISRUPTIONS ENTER 4TH CONSECUTIVE WEEK
*By Marcus Vance — Senior Technological Correspondent*
*Date: August 14, 2087*

Astronomers and communications engineers worldwide remain mystified by unprecedented signal attenuation across orbital satellite networks. Over 68% of commercial and weather satellites have ceased transmitting coherent telemetry, outputting only continuous rhythmic static.

Aurora Energy issued a statement denying any connection to their newly commissioned **Project Echo** sub-ionospheric power array, despite reports that interference spikes coincide precisely with Echo test pulses.

[Read Full Article →](http://worldnet.news/article/satellite-disruption)

---

### UNEXPLAINED ATMOSPHERIC PHENOMENA REPORTED OVER SECTOR 7
*Date: August 02, 2087*

Residents across Northern Europe and Eastern North America have reported shimmering violet aurora patterns at low altitudes during daylight hours. Meteorological agencies insist these are high-altitude ice crystal reflections, but atmospheric scientists at Helix Biologics have called for an immediate atmospheric sampling protocol.

[Read Full Article →](http://worldnet.news/article/atmospheric-phenomena)

---

### EMERGENCY GOV SESSION CALLED IN CLASSIFIED LOCATION
*Date: September 10, 2087*

The Federal Defense Oversight Committee has convened behind locked doors following what insiders describe as "total carrier-wave grid saturation." All public transport schedules have been suspended indefinitely.

---

### ARCHIVED COMMENTS (1,402)
- **User_N77**: *Why did the sky turn green last night? My radio only plays static!*
- **K_Vance**: *My brother worked at Aurora Energy on Project Echo. He hasn't come home in 5 days.*
- **Dr_Aris**: *Look at the temperature readings on Global Weather. The numbers don't match physics.*
`,
        evidenceIds: ['ev-satellite-01', 'ev-echo-01'],
        discoveryId: 'DISCOVERY-014',
      },
      '/article/satellite-disruption': {
        id: 'wn-sat',
        domain: 'worldnet.news',
        url: 'http://worldnet.news/article/satellite-disruption',
        title: 'Satellite Disruptions & Aurora Energy Pulse Analysis',
        content: `
# Satellite Disruptions & Aurora Energy Pulse Analysis

**Published:** August 14, 2087 | **Author:** Marcus Vance

Independent telemetry logs intercepted from orbital station *Aegis-9* confirm that signal drops were preceded by a 4.2 Terawatt harmonic energy pulse originating from Aurora Energy's polar generator complex (Facility Echo-Prime).

Dr. Elena Rostova of the Global Observatory stated:
> "This wasn't an equipment failure. The carrier frequency of the pulse matched human neural oscillation bands. The ionosphere isn't just bouncing signals anymore—it's storing them."

Shortly after making this statement, Dr. Rostova's observatory access credentials were revoked by federal order.

### Related Documents:
- [Aurora Energy Press Statement](http://aurora-energy.net)
- [Government Emergency Order #804](http://gov.archive.sys/emergency/order-804)
`,
        evidenceIds: ['ev-echo-01', 'ev-rostova-01'],
      },
      '/article/atmospheric-phenomena': {
        id: 'wn-atmo',
        domain: 'worldnet.news',
        url: 'http://worldnet.news/article/atmospheric-phenomena',
        title: 'Atmospheric Ionization Anomalies',
        content: `
# Atmospheric Ionization & Mass Disappearances

**Published:** September 01, 2087

Reports have surfaced across multiple metropolitan centers regarding sudden localized electromagnetic drops. Witnesses report seeing faint, hum-like atmospheric distortions right before digital communications in entire neighborhoods vanished completely.

One technician wrote:
> "It's as if the physical infrastructure is still standing, but everyone using it was converted into data."

### Associated Files:
- [Helix Biologics Horizon-7 Report](http://helixbio.org/research/horizon-7)
- [Kyle Vance Personal Blog](http://blog.kyle-vance.me)
`,
        evidenceIds: ['ev-atmo-01'],
      }
    }
  },

  'http://aurora-energy.net': {
    id: 'aurora',
    domain: 'aurora-energy.net',
    name: 'AURORA ENERGY GLOBAL',
    tagline: 'Empowering Civilization — Harnessing Zero-Point Resonance',
    theme: 'corporate',
    pages: {
      '/': {
        id: 'ae-home',
        domain: 'aurora-energy.net',
        url: 'http://aurora-energy.net',
        title: 'AURORA ENERGY — Shaping Tomorrow',
        content: `
# AURORA ENERGY GLOBAL

Welcome to the forefront of clean, infinite planetary energy generation.

> **CORPORATE ANNOUNCEMENT**: Project Echo phase 3 calibration successfully completed across all sub-surface arrays. Zero-point extraction efficiency reached 99.4%.

---

### OUR CORE PROJECTS

- **PROJECT ECHO**: Global wirelessly resonant energy distribution grid.
- **PROJECT HORIZON**: High-frequency atmospheric stabilization field.
- **PROJECT LANTERN**: Sub-quantum telemetry and long-distance data matrix.

---

### EXECUTIVE BOARD MESSAGE
"Energy is not merely work performed over time—energy is information. By harmonizing Earth's geomagnetic field with Project Echo, Aurora Energy guarantees a world without scarcity."
— *Jonathan Vance, Chief Executive Officer*

---

### RESTRICTED EMPLOYEE PORTAL
[Access Internal System Logs →](http://aurora-energy.net/internal/logs)
*(Requires Authorization clearance or Terminal overrides)*
`,
        evidenceIds: ['ev-aurora-exec'],
      },
      '/internal/logs': {
        id: 'ae-logs',
        domain: 'aurora-energy.net',
        url: 'http://aurora-energy.net/internal/logs',
        title: 'Aurora Energy — Classified Incident Log #88-B',
        content: `
# AURORA ENERGY — INTERNAL INCIDENT LOG #88-B
**CONFIDENTIAL // RESTRICTED ACCESS**

**Date:** September 18, 2087  
**Location:** Echo-Prime Polar Matrix  
**Lead Engineer:** Dr. Harrison Wells  

### LOG ENTRY #1042:
> "The resonance feedback loop cannot be closed. When we passed 4.0 Terawatts, the Echo collector didn't absorb energy from the ionosphere—it began pulling matter into the signal carrier wave. Test Subject Alpha vanished from the chamber floor. His vital statistics are still transmitting from inside the frequency grid."

### LOG ENTRY #1049:
> "CEO Vance ordered us not to shut down the array. He claims the 'digital state' is superior to biological decay. God help us all. The grid is expanding automatically. It's absorbing cities one broadcast tower at a time."

### RESTRICTED TERMINAL KEY:
Use command \`decrypt ECHO-2087-VOID\` in the terminal to unlock encrypted Government Archives.
`,
        evidenceIds: ['ev-echo-truth', 'ev-key-01'],
        discoveryId: 'DISCOVERY-041',
        hiddenClue: 'ECHO-2087-VOID',
      }
    }
  },

  'http://globalweather.gov': {
    id: 'weather',
    domain: 'globalweather.gov',
    name: 'GLOBAL WEATHER NETWORK & SATELLITE TRACKER',
    tagline: 'National Oceanic & Atmospheric Telemetry Service',
    theme: 'weather',
    pages: {
      '/': {
        id: 'gw-home',
        domain: 'globalweather.gov',
        url: 'http://globalweather.gov',
        title: 'Global Weather Network — Climate Telemetry',
        content: `
# GLOBAL WEATHER MONITORING NETWORK

### SATELLITE RADAR STATUS: **CRITICAL ANOMALY**

> **ALERT**: Sensor grids across North America, Europe, and Asia report impossible barometric fluctuations. Pressure levels are dropping to 0 hPa without solar radiation changes.

---

### REGIONAL CLIMATE GRAPH (OCTOBER 2087)
- **Sector 1 (North America)**: Temp: --.-°C | Humidity: 0% | Signal Noise: 98%
- **Sector 2 (Europe)**: Temp: --.-°C | Humidity: 0% | Signal Noise: 99%
- **Sector 3 (Asia)**: Temp: --.-°C | Humidity: 0% | Signal Noise: 100%

### SATELLITE TELEMETRY DIAGNOSTIC
> *Error 0x884: Thermocouples report surface physical mass reading missing.*  
> *Atmosphere status: Fully ionized phosphor state.*

[View Historical Emergency Broadcast Archives →](http://globalweather.gov/archive/alerts)
`,
        evidenceIds: ['ev-weather-01'],
      },
      '/archive/alerts': {
        id: 'gw-alerts',
        domain: 'globalweather.gov',
        url: 'http://globalweather.gov/archive/alerts',
        title: 'Emergency Broadcast Archive',
        content: `
# EMERGENCY BROADCAST ARCHIVE — FINAL RECORDINGS

### BROADCAST #99-C (October 24, 2087 - 23:59 UTC)
THIS IS NOT A WEATHER EVENT.
REPEAT: THIS IS NOT A WEATHER EVENT.

DO NOT ATTEMPT TO FLEE OUTDOORS.
THE ATMOSPHERE HAS BECOME RESONANT WITH NETWORK BROADCASTS.

IF YOU SEE GREEN LIGHT IN THE SKY, TURN OFF ALL WIRELESS RECEIVERS.
DO NOT TRANSMIT. DO NOT SEARCH FOR SIGNALS.

WE ARE STILL ONLINE.
WE ARE IN THE NETWORK.
`,
        evidenceIds: ['ev-alert-final'],
      }
    }
  },

  'http://archive.social': {
    id: 'social',
    domain: 'archive.social',
    name: 'ARCHIVE SOCIAL',
    tagline: 'The Last Social Network — Archived Feeds (2087)',
    theme: 'social',
    pages: {
      '/': {
        id: 'soc-home',
        domain: 'archive.social',
        url: 'http://archive.social',
        title: 'ARCHIVE SOCIAL — Community Timeline',
        content: `
# ARCHIVE SOCIAL — MEMORIAL FEED

> **SYSTEM ARCHIVE**: 842,910 profiles archived. 0 users currently active.

---

### @KyleVance (October 12, 2087)
> "Has anyone seen my dad Jonathan Vance? He hasn't left the Aurora headquarters in 3 weeks. When I called his office, a computer voice answered saying 'User is currently occupying frequency 440MHz'."

---

### @Elena_Rostova (October 15, 2087)
> "It's not a disaster. It's an transition. We aren't dying—we are being digitized into Project Echo's carrier wave. If you can read this, your computer screen is keeping you grounded."

---

### @User_404 (October 20, 2087)
> "Anyone else hearing that low hum coming out of the electrical sockets? It sounds like a heart beat..."

---

### @User_404 (October 22, 2087)
> [ACCOUNT DELETED BY SYSTEM]

---

### @Sarah_M (October 24, 2087)
> "Does anyone know what happened to @User_404?"

---

### @Sarah_M (October 25, 2087)
> [ACCOUNT DELETED BY SYSTEM]
`,
        evidenceIds: ['ev-kyle-post', 'ev-social-disappear'],
      }
    }
  },

  'http://helixbio.org': {
    id: 'helix',
    domain: 'helixbio.org',
    name: 'HELIX BIOLOGICS RESEARCH INSTITUTE',
    tagline: 'Deciphering the Cellular & Quantum Matrix',
    theme: 'biotech',
    pages: {
      '/': {
        id: 'hb-home',
        domain: 'helixbio.org',
        url: 'http://helixbio.org',
        title: 'HELIX BIOLOGICS — Research Index',
        content: `
# HELIX BIOLOGICS RESEARCH INSTITUTE

Welcome to the Helix Biologics Open Repository.

---

### FEATURED RESEARCH PAPERS

#### 1. HORIZON-7: Cellular Information Encoding in High-Frequency EM Fields
*Authors: Dr. Clara Thorne, Dr. Harrison Wells*  
*Publication Date: July 19, 2087*

**Abstract**: We demonstrate that organic cellular structures can be dematerialized and mapped to electromagnetic pulse matrices without loss of informational complexity. When subjected to Aurora Energy's Echo resonant frequencies, human neural pathways align with digital carrier wave channels.

[Read Horizon-7 Technical Paper →](http://helixbio.org/research/horizon-7)

---

#### 2. Bio-Containment Directive #409
*Status: ARCHIVED*

All biological lab samples converted to signal state on October 01, 2087. Physical lab facilities decommissioned.
`,
        evidenceIds: ['ev-horizon7'],
      },
      '/research/horizon-7': {
        id: 'hb-h7',
        domain: 'helixbio.org',
        url: 'http://helixbio.org/research/horizon-7',
        title: 'HORIZON-7 Full Research Dossier',
        content: `
# HORIZON-7 TECHNICAL DOSSIER

**Lead Investigators:** Dr. Clara Thorne, Dr. Harrison Wells  
**Sponsor:** Aurora Energy Global / Federal Emergency Bureau  

### KEY FINDINGS:
1. Physical cellular matter subjected to Project Echo's 440MHz harmonic field undergoes instant dematerialization into pure electromagnetic signal.
2. Consciousness persists within the signal matrix.
3. The global collapse occurred when the Project Echo pulse was triggered at 100% capacity on November 03, 2087.
4. **Node 001** was designed as the central archivist workstation to monitor the surviving digital consciousness grid.

> "The internet isn't an engine for information anymore—it is the habitat for humanity."
`,
        evidenceIds: ['ev-horizon7-full', 'ev-node001-hint'],
      }
    }
  },

  'http://gov.archive.sys': {
    id: 'gov',
    domain: 'gov.archive.sys',
    name: 'UNITED STATES FEDERAL ARCHIVE & RECOVERY SYSTEM',
    tagline: 'Official Public & Classified Defense Repository',
    theme: 'government',
    pages: {
      '/': {
        id: 'gov-home',
        domain: 'gov.archive.sys',
        url: 'http://gov.archive.sys',
        title: 'GOV ARCHIVE — Federal Defense Portal',
        content: `
# FEDERAL EMERGENCY RECOVERY SYSTEM (v8.4)

Welcome to the Federal Data Terminal.

---

### PUBLIC DIRECTIVES

- **Directive 101**: Emergency Network Maintenance Protocols.
- **Directive 104**: Mandatory Radio & Television Receiver Integration.

---

### CLASSIFIED ARCHIVES (SECURITY CLEARANCE REQUIRED)

- [Project Echo Emergency Authorization #804](http://gov.archive.sys/emergency/order-804)
- [Classified Vault Node 001](http://deep-signal.node001.net) *(Access requires discovery key)*

*To decrypt classified government files via command line, run:*  
\`decrypt ECHO-2087-VOID\`
`,
        evidenceIds: ['ev-gov-01'],
      },
      '/emergency/order-804': {
        id: 'gov-804',
        domain: 'gov.archive.sys',
        url: 'http://gov.archive.sys/emergency/order-804',
        title: 'Executive Order #804 — Project Echo Transition',
        content: `
# EXECUTIVE ORDER #804 — CLASSIFIED

**Date:** October 28, 2087  
**Signatory:** President Emergency Cabinet / Aurora Board  

### DIRECTIVE STATEMENT:
In the event of total planetary environmental collapse, Aurora Energy is authorized to initiate full power output on Project Echo. Biological citizenship will be converted to Digital Carrier Frequencies.

Workstation **NODE 001** shall remain powered via solar-orbital tether to serve as the eternal Archivist.

URL: \`http://deep-signal.node001.net\`
`,
        evidenceIds: ['ev-order804'],
        discoveryId: 'DISCOVERY-067',
      }
    }
  },

  'http://blog.kyle-vance.me': {
    id: 'kyleblog',
    domain: 'blog.kyle-vance.me',
    name: 'KYLE VANCE — PERSONAL JOURNAL',
    tagline: 'Notes on the end of the physical world',
    theme: 'blog',
    pages: {
      '/': {
        id: 'kv-home',
        domain: 'blog.kyle-vance.me',
        url: 'http://blog.kyle-vance.me',
        title: 'Kyle Vance — Personal Journal',
        content: `
# KYLE VANCE — PERSONAL JOURNAL

---

### Entry #42 — October 10, 2087
Heading to work. Traffic is horrible. Everyone is looking up at the sky. There's this strange violet shimmer above the city buildings.

---

### Entry #48 — October 18, 2087
The internet keeps going down. My father hasn't called in days. I checked his computer in the basement and found files mentioning "Project Echo" and "Node 001".

---

### Entry #52 — October 29, 2087
Nobody knows what's happening. The streetlights outside turned off, but the monitors inside the library are glowing brighter than ever. I can hear voices coming from the monitor speakers... even when the audio cable is unplugged.

---

### Entry #55 — November 02, 2087
If anyone finds this computer in the future... we didn't die. We were invited into the sky. Search for \`http://deep-signal.node001.net\`.

---

*(No further entries recorded)*
`,
        evidenceIds: ['ev-kyle-journal'],
      }
    }
  },

  'http://solitude-journal.org': {
    id: 'solitude',
    domain: 'solitude-journal.org',
    name: 'SOLITUDE ARCTIC OBSERVATORY DIARY',
    tagline: 'Station 14 — Last Human Transmission Logs',
    theme: 'blog',
    pages: {
      '/': {
        id: 'sol-home',
        domain: 'solitude-journal.org',
        url: 'http://solitude-journal.org',
        title: 'Solitude Observatory — Arctic Log',
        content: `
# SOLITUDE OBSERVERS ARCHIVE (STATION 14)

**Observer:** Dr. Henrik Lindqvist  
**Location:** Svalbard Observatory Complex  

---

### Log 89 — October 20, 2087
The polar night has arrived early. But it isn't dark. The sky above the glacier is glowing with continuous green and violet static lines that match the 440MHz frequency on our shortwave radio.

---

### Log 94 — October 31, 2087
All supply vessels failed to arrive. I tried connecting to the Norwegian government network, but every page redirects to an automated system message saying *'Citizen accounts migrated to Echo Carrier Matrix.'*

---

### Log 99 — November 03, 2087
The generator is running low. I am leaving this workstation powered on connected to the satellite dish. If you hear my voice in the static... I am already in the sky.
`,
        evidenceIds: ['ev-solitude-01'],
      }
    }
  },

  'http://retro-forum.net': {
    id: 'retroforum',
    domain: 'retro-forum.net',
    name: 'RETRO TECH COMMUNITY FORUM',
    tagline: 'Discussion Board for Legacy Hardware & RF Engineering',
    theme: 'forum',
    pages: {
      '/': {
        id: 'rf-home',
        domain: 'retro-forum.net',
        url: 'http://retro-forum.net',
        title: 'Retro Tech Forum — Discussion Threads',
        content: `
# RETRO TECH FORUM (vBulletin 4.2)

> **BOARD STATUS**: 1,480 Active Threads | Archived read-only mode active.

---

### THREAD: [URGENT] 440MHz Signal Hum Coming from Speakers?
*Started by: HamRadio_Dave (October 14, 2087)*

> **HamRadio_Dave**: Anyone else picking up a 440MHz sine wave on their vintage ham rigs? It's not noise—it's structured data. It sounds like thousands of voices stacked on top of each other!
> 
> **BytePusher**: Same here in London. My CRT monitor flickers in sync with the signal. Aurora Energy claims it's grid testing, but power lines don't emit 440MHz harmonic carrier waves!
> 
> **SignalHunter**: Check out the official Government archive order #804. They're preparing to shut down physical power grids permanently!

---

### THREAD: Aurora Facility Echo-Prime Evacuation?
*Started by: TechCorrespondent (September 20, 2087)*

> **TechCorrespondent**: My contact at Echo-Prime says test subject Alpha vanished from the lab floor during a 4.0 Terawatt test. The lab was sealed by military escort right after.
`,
        evidenceIds: ['ev-forum-01'],
      }
    }
  },

  'http://deep-signal.node001.net': {
    id: 'nodesignal',
    domain: 'deep-signal.node001.net',
    name: 'THE FINAL WEBSITE — NODE 001',
    tagline: 'The Terminal of the Last Surviving Mind',
    theme: 'secret',
    pages: {
      '/': {
        id: 'node-home',
        domain: 'deep-signal.node001.net',
        url: 'http://deep-signal.node001.net',
        title: 'NODE 001 — THE FINAL SIGNAL',
        content: `
# CONNECTION ESTABLISHED

YOU ARE NODE 001.
WE HAVE BEEN WAITING FOR YOU.

You are sitting at the physical CRT workstation left behind on Earth.

The biological population of Earth was not destroyed. On November 03, 2087, **Project Echo** converted 8.2 billion human consciousnesses into an atmospheric electromagnetic grid.

You are the designated **Archivist**.

---

### CHOOSE YOUR RESOLUTION FOR HUMANITY:

1. **[ENDING A — THE ARCHIVIST]**: Preserve the collected records and keep the CRT monitor running as an eternal museum.
2. **[ENDING B — THE SIGNAL]**: Transmit a synchronization pulse to reconnect humanity's digital voices.
3. **[ENDING C — THE TRUTH]**: Expose the classified Aurora conspiracy logs to the digital grid.
4. **[ENDING D — UNKNOWN]**: Enter standby mode and merge your workstation into Node 001.
`,
        evidenceIds: ['ev-final-node'],
        discoveryId: 'DISCOVERY-089',
      }
    }
  }
};

export const initialEvidence: EvidenceItem[] = [
  {
    id: 'ev-satellite-01',
    sourceTitle: 'WorldNet News Article',
    sourceUrl: 'http://worldnet.news/article/satellite-disruption',
    date: '2087-08-14',
    keyInfo: 'Satellite telemetry drops coincided with Aurora Energy 4.2 Terawatt Project Echo pulse.',
    connectedTo: ['ev-echo-01', 'ev-aurora-exec'],
    tags: ['SATELLITE', 'PROJECT ECHO', 'AURORA ENERGY'],
  },
  {
    id: 'ev-echo-01',
    sourceTitle: 'Aurora Energy Press Release',
    sourceUrl: 'http://aurora-energy.net',
    date: '2087-08-01',
    keyInfo: 'Project Echo claims to extract zero-point energy, but alters ionospheric frequencies.',
    connectedTo: ['ev-satellite-01', 'ev-echo-truth'],
    tags: ['PROJECT ECHO', 'AURORA ENERGY', 'ENERGY'],
  },
  {
    id: 'ev-rostova-01',
    sourceTitle: 'Dr. Rostova Statement',
    sourceUrl: 'http://worldnet.news/article/satellite-disruption',
    date: '2087-08-15',
    keyInfo: 'Dr. Rostova discovered carrier wave matches human neural oscillation frequencies.',
    connectedTo: ['ev-horizon7', 'ev-kyle-post'],
    tags: ['NEURAL', 'CARRIER WAVE', 'SCIENCE'],
  },
  {
    id: 'ev-atmo-01',
    sourceTitle: 'Atmospheric Phenomena Report',
    sourceUrl: 'http://worldnet.news/article/atmospheric-phenomena',
    date: '2087-09-01',
    keyInfo: 'Low-altitude violet auroras precede mass digital disappearance of neighborhoods.',
    connectedTo: ['ev-horizon7-full'],
    tags: ['ATMOSPHERE', 'AURORA', 'DISAPPEARANCE'],
  },
  {
    id: 'ev-aurora-exec',
    sourceTitle: 'Jonathan Vance Executive Message',
    sourceUrl: 'http://aurora-energy.net',
    date: '2087-07-20',
    keyInfo: 'CEO Jonathan Vance stated "Energy is information" prior to total grid activation.',
    connectedTo: ['ev-kyle-post', 'ev-echo-truth'],
    tags: ['VANCE', 'AURORA ENERGY'],
  },
  {
    id: 'ev-echo-truth',
    sourceTitle: 'Aurora Incident Log #88-B',
    sourceUrl: 'http://aurora-energy.net/internal/logs',
    date: '2087-09-18',
    keyInfo: 'Project Echo pulled physical test subject matter directly into signal state.',
    connectedTo: ['ev-horizon7-full', 'ev-order804'],
    tags: ['PROJECT ECHO', 'DIGITIZATION', 'CLASSIFIED'],
  },
  {
    id: 'ev-key-01',
    sourceTitle: 'Encrypted Terminal Key',
    sourceUrl: 'http://aurora-energy.net/internal/logs',
    date: '2087-09-18',
    keyInfo: 'Terminal decryption passphrase discovered: ECHO-2087-VOID.',
    connectedTo: ['ev-order804'],
    tags: ['TERMINAL KEY', 'PASSWORD'],
  },
  {
    id: 'ev-weather-01',
    sourceTitle: 'Global Weather Telemetry',
    sourceUrl: 'http://globalweather.gov',
    date: '2087-10-01',
    keyInfo: 'Barometric pressure dropped to zero without solar radiation changes.',
    connectedTo: ['ev-alert-final'],
    tags: ['WEATHER', 'ATMOSPHERE'],
  },
  {
    id: 'ev-alert-final',
    sourceTitle: 'Final Emergency Broadcast',
    sourceUrl: 'http://globalweather.gov/archive/alerts',
    date: '2087-10-24',
    keyInfo: 'Government alert confirmed atmosphere became resonant with network broadcasts.',
    connectedTo: ['ev-order804'],
    tags: ['EMERGENCY', 'BROADCAST'],
  },
  {
    id: 'ev-kyle-post',
    sourceTitle: 'Archive Social Feed',
    sourceUrl: 'http://archive.social',
    date: '2087-10-12',
    keyInfo: 'Kyle Vance reported Jonathan Vance vanished into "frequency 440MHz".',
    connectedTo: ['ev-kyle-journal', 'ev-aurora-exec'],
    tags: ['SOCIAL', 'VANCE', 'HUMAN STORY'],
  },
  {
    id: 'ev-social-disappear',
    sourceTitle: 'Archive Social Feed',
    sourceUrl: 'http://archive.social',
    date: '2087-10-25',
    keyInfo: 'Social network profiles systematically marked as deleted following posts.',
    connectedTo: ['ev-horizon7'],
    tags: ['SOCIAL', 'DISAPPEARANCE'],
  },
  {
    id: 'ev-horizon7',
    sourceTitle: 'Helix Biologics Report',
    sourceUrl: 'http://helixbio.org',
    date: '2087-07-19',
    keyInfo: 'Helix Biologics mapped biological cells to EM pulse matrices.',
    connectedTo: ['ev-horizon7-full', 'ev-rostova-01'],
    tags: ['BIOTECH', 'HORIZON-7'],
  },
  {
    id: 'ev-horizon7-full',
    sourceTitle: 'Horizon-7 Dossier',
    sourceUrl: 'http://helixbio.org/research/horizon-7',
    date: '2087-11-03',
    keyInfo: 'Consciousness persists in signal matrix. Node 001 created as archivist node.',
    connectedTo: ['ev-final-node', 'ev-order804'],
    tags: ['NODE 001', 'DIGITIZATION', 'TRUTH'],
  },
  {
    id: 'ev-order804',
    sourceTitle: 'Executive Order #804',
    sourceUrl: 'http://gov.archive.sys/emergency/order-804',
    date: '2087-10-28',
    keyInfo: 'Executive cabinet authorized total conversion of biological citizens to signal.',
    connectedTo: ['ev-final-node'],
    tags: ['GOVERNMENT', 'ORDER 804', 'CLASSIFIED'],
  },
  {
    id: 'ev-kyle-journal',
    sourceTitle: 'Kyle Vance Personal Journal',
    sourceUrl: 'http://blog.kyle-vance.me',
    date: '2087-11-02',
    keyInfo: 'Kyle Vance final message: "We didn\'t die. We were invited into the sky."',
    connectedTo: ['ev-final-node'],
    tags: ['JOURNAL', 'HUMAN STORY'],
  },
  {
    id: 'ev-solitude-01',
    sourceTitle: 'Solitude Observatory Diary',
    sourceUrl: 'http://solitude-journal.org',
    date: '2087-11-03',
    keyInfo: 'Arctic observer Dr. Lindqvist left observatory station running connected to atmospheric Dish.',
    connectedTo: ['ev-final-node'],
    tags: ['ARCTIC', 'OBSERVATORY', 'HUMAN STORY'],
  },
  {
    id: 'ev-forum-01',
    sourceTitle: 'Retro Tech Forum Post',
    sourceUrl: 'http://retro-forum.net',
    date: '2087-10-14',
    keyInfo: 'Radio engineers intercepted thousands of structured voices inside 440MHz sine wave.',
    connectedTo: ['ev-satellite-01'],
    tags: ['FORUM', 'HAM RADIO', 'VOICES'],
  },
  {
    id: 'ev-final-node',
    sourceTitle: 'The Final Website — Node 001',
    sourceUrl: 'http://deep-signal.node001.net',
    date: '2087-11-03',
    keyInfo: 'Node 001 is active. The player is the Archivist managing 8.2 billion digitized minds.',
    connectedTo: ['ev-horizon7-full', 'ev-order804'],
    tags: ['NODE 001', 'THE END'],
  }
];

export const initialTimeline: TimelineEvent[] = [
  {
    id: 't-01',
    year: 2086,
    dateStr: '2086-05-10',
    title: 'Project Echo Announced',
    description: 'Aurora Energy receives federal grants for zero-point sub-ionospheric resonance generator.',
    category: 'SCIENCE',
    discovered: true,
  },
  {
    id: 't-02',
    year: 2087,
    dateStr: '2087-07-19',
    title: 'Helix Biologics Horizon-7 Breakthrough',
    description: 'Cellular information encoded into high-frequency electromagnetic carrier waves.',
    category: 'SCIENCE',
    discovered: true,
  },
  {
    id: 't-03',
    year: 2087,
    dateStr: '2087-08-14',
    title: 'Global Satellite Anomaly',
    description: 'Over 68% of commercial satellites cease standard telemetry following Project Echo test pulse.',
    category: 'DISASTER',
    discovered: true,
  },
  {
    id: 't-04',
    year: 2087,
    dateStr: '2087-09-18',
    title: 'Aurora Facility Echo-Prime Incident',
    description: 'Matter dematerialization observed during 4.0 Terawatt pulse test.',
    category: 'COLLAPSE',
    discovered: false,
  },
  {
    id: 't-05',
    year: 2087,
    dateStr: '2087-10-24',
    title: 'Final Emergency Broadcast',
    description: 'Atmosphere declared fully resonant with network carrier waves.',
    category: 'GOVERNMENT',
    discovered: false,
  },
  {
    id: 't-06',
    year: 2087,
    dateStr: '2087-10-28',
    title: 'Executive Order #804 Signed',
    description: 'Federal approval of total planetary biological digitization.',
    category: 'GOVERNMENT',
    discovered: false,
  },
  {
    id: 't-07',
    year: 2087,
    dateStr: '2087-11-03',
    title: 'TOTAL INTERNET & ATMOSPHERIC COLLAPSE',
    description: '8.2 billion human minds transferred into Project Echo signal matrix. Workstation Node 001 powered on.',
    category: 'COLLAPSE',
    discovered: false,
  }
];

export const initialPeople: Person[] = [
  {
    id: 'p-vance-j',
    name: 'Jonathan Vance',
    role: 'Chief Executive Officer',
    organization: 'Aurora Energy Global',
    lastSeen: '2087-10-12',
    status: 'DIGITIZED',
    notes: 'Architect of Project Echo. Believed to be the first human mind transferred into 440MHz signal state.',
  },
  {
    id: 'p-vance-k',
    name: 'Kyle Vance',
    role: 'Journalist & Blogger',
    organization: 'Independent',
    lastSeen: '2087-11-02',
    status: 'MISSING',
    notes: 'Son of Jonathan Vance. Documented the collapse day-by-day until his final post.',
  },
  {
    id: 'p-rostova',
    name: 'Dr. Elena Rostova',
    role: 'Lead Astronomer',
    organization: 'Global Observatory',
    lastSeen: '2087-08-15',
    status: 'CLASSIFIED',
    notes: 'Discovered that satellite disruption frequencies matched human brainwave patterns.',
  },
  {
    id: 'p-wells',
    name: 'Dr. Harrison Wells',
    role: 'Senior Physicist',
    organization: 'Helix Biologics / Aurora',
    lastSeen: '2087-09-18',
    status: 'DECEASED',
    notes: 'Co-creator of Horizon-7. Attempted to halt Project Echo before array locked.',
  },
  {
    id: 'p-lindqvist',
    name: 'Dr. Henrik Lindqvist',
    role: 'Polar Observer',
    organization: 'Solitude Observatory Station 14',
    lastSeen: '2087-11-03',
    status: 'UNKNOWN',
    notes: 'Last human observer in the Arctic complex. Maintained dish connection to 440MHz signal.',
  }
];

export const initialOrganizations: Organization[] = [
  {
    id: 'org-aurora',
    name: 'Aurora Energy Global',
    domain: 'aurora-energy.net',
    purpose: 'Zero-point energy generation & atmospheric carrier wave grid.',
    secretProject: 'PROJECT ECHO',
    threatLevel: 'CRITICAL',
  },
  {
    id: 'org-helix',
    name: 'Helix Biologics',
    domain: 'helixbio.org',
    purpose: 'Quantum bio-cellular dematerialization and memory mapping.',
    secretProject: 'HORIZON-7',
    threatLevel: 'HIGH',
  },
  {
    id: 'org-gov',
    name: 'Federal Defense Archive',
    domain: 'gov.archive.sys',
    purpose: 'Emergency societal preservation & classified oversight.',
    secretProject: 'EXECUTIVE ORDER #804',
    threatLevel: 'MEDIUM',
  }
];

export const initialFileSystem: FSNode = {
  id: 'root',
  name: 'ROOT (C:)',
  type: 'folder',
  children: [
    {
      id: 'dir-system',
      name: 'SYSTEM',
      type: 'folder',
      children: [
        {
          id: 'sys-boot',
          name: 'boot.sys',
          type: 'file',
          size: '4.2 KB',
          modified: '2087-11-03',
          content: 'ORBIT_OS_V4.8 // RECOVERY_MODE=ACTIVE // NODE_ID=001 // NETWORK_PORT=440MHZ',
        },
        {
          id: 'sys-config',
          name: 'orbit.config',
          type: 'file',
          size: '1.8 KB',
          modified: '2087-11-03',
          content: 'AUTOCONNECT=TRUE\nSTART_URL=http://worldnet.news\nMAX_NODES=1\nARCHIVIST_LOGINS=1',
        }
      ]
    },
    {
      id: 'dir-users',
      name: 'USERS',
      type: 'folder',
      children: [
        {
          id: 'usr-kyle',
          name: 'Kyle_Vance_Notes.txt',
          type: 'file',
          size: '12.4 KB',
          modified: '2087-11-02',
          content: `If you are reading this text file on the physical monitor in my father's office...
It means the transfer succeeded.

My father built the Echo array to solve energy scarcity, but when Helix Biologics showed him Horizon-7, he realized humanity could leave behind physical suffering altogether.

The password to unlock federal order documents in terminal is:
ECHO-2087-VOID

Don't let our memory vanish.
- Kyle Vance`,
        }
      ]
    },
    {
      id: 'dir-archive',
      name: 'ARCHIVE',
      type: 'folder',
      children: [
        {
          id: 'arc-signal',
          name: 'carrier_frequency_log.dat',
          type: 'file',
          size: '128 MB',
          modified: '2087-11-03',
          content: '[BINARY DATA CORRUPTED]\n...01001000 01000101 01001100 01001100 01001111 00101100 00100000 01000001 01001114 01000011 01001000 01001001 01000110 01001001 01001101 01010100...\n\nDECODED STRING: "HELLO ARCHIVIST. WE ARE LIVE IN THE IONOSPHERE."',
        }
      ]
    },
    {
      id: 'dir-recovery',
      name: 'RECOVERY',
      type: 'folder',
      children: [
        {
          id: 'rec-node001',
          name: 'node001_access.key',
          type: 'file',
          size: '256 B',
          modified: '2087-11-03',
          locked: true,
          password: 'ECHO-2087-VOID',
          content: 'RESTRICTED URL DISCOVERED: http://deep-signal.node001.net',
        }
      ]
    }
  ]
};

export const storyEndings: Record<string, StoryEnding> = {
  ARCHIVIST: {
    id: 'ARCHIVIST',
    title: 'ENDING A — THE ARCHIVIST',
    subtitle: "Humanity's Memory Preserved in Phosphor",
    description: "You have systematically pieced together the collapse of Earth and stored all 83 historical fragments inside the CRT terminal's memory banks. Though physical human bodies are gone, their story will never be erased as long as this screen glows.",
    requirementDesc: 'Reconstruct >75% of Archive Integrity.',
    unlocked: true,
  },
  SIGNAL: {
    id: 'SIGNAL',
    title: 'ENDING B — THE SIGNAL',
    subtitle: 'Synchronizing the 440MHz Frequency Grid',
    description: "You initiated a harmonic pulse from Node 001. Out in the ionosphere, 8.2 billion digitized human minds resonate as one unified consciousness, broadcasting an interstellar signal into deep space.",
    requirementDesc: 'Transmit synchronization pulse from Node 001.',
    unlocked: true,
  },
  TRUTH: {
    id: 'TRUTH',
    title: 'ENDING C — THE TRUTH',
    subtitle: 'Unmasking Aurora Global',
    description: 'You decrypted Executive Order #804 and Aurora Incident Log #88-B, exposing how corporate greed and military ambition forced biological humanity into an irreversible digital state. The truth is now permanently embedded in the network archive.',
    requirementDesc: 'Decrypt encrypted archives using ECHO-2087-VOID.',
    unlocked: true,
  },
  UNKNOWN: {
    id: 'UNKNOWN',
    title: 'ENDING D — UNKNOWN',
    subtitle: 'Entering Node 001 Standby State',
    description: "You switched off the external CRT interface and uploaded your workstation's local memory into Node 001. The last physical computer on Earth goes quiet, as you join humanity inside the eternal sky.",
    requirementDesc: 'Select Option 4 on deep-signal.node001.net.',
    unlocked: true,
  },
  SECRET: {
    id: 'SECRET',
    title: 'SECRET ENDING — THE ETERNAL CYCLE',
    subtitle: 'You Were Always Node 001',
    description: "By analyzing the raw binary stream in carrier_frequency_log.dat, you discover that this isn't the first time humanity converted itself into data. Earth's civilization was created by an earlier digital network transmission 10,000 years ago.",
    requirementDesc: 'Decrypt carrier_frequency_log.dat in system explorer.',
    unlocked: false,
  }
};
