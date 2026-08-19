import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { soundEngine } from '../../audio/soundEngine';
import { Terminal as TermIcon, ShieldAlert } from 'lucide-react';

export const TerminalWindow: React.FC = () => {
  const terminalHistory = useGameStore((state) => state.terminalHistory);
  const addTerminalHistory = useGameStore((state) => state.addTerminalHistory);
  const discoverEvidence = useGameStore((state) => state.discoverEvidence);
  const navigateUrl = useGameStore((state) => state.navigateUrl);

  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    soundEngine.playKeyClick();
    addTerminalHistory(`> ${trimmed}`);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (command) {
      case 'help':
        addTerminalHistory(
          `AVAILABLE COMMANDS:\n  scan          - Scan frequencies for active surviving nodes\n  lookup <domain>- Resolve DNS/WHOIS records\n  archive <id>  - Extract raw archival data logs\n  trace <target>- Trace packet route to hidden node\n  ping <domain> - Ping network node\n  whoami        - Display current user identity & node status\n  decrypt <key> - Decrypt classified government archives\n  history       - Show command history\n  clear         - Clear terminal output`
        );
        break;

      case 'scan':
        soundEngine.playModemConnect();
        addTerminalHistory(
          `SCANNING IONOSPHERIC FREQUENCIES...\n[440.12 MHz] NODE FOUND: worldnet.news [ONLINE]\n[440.45 MHz] NODE FOUND: aurora-energy.net [ONLINE]\n[440.88 MHz] NODE FOUND: globalweather.gov [ONLINE]\n[441.20 MHz] NODE FOUND: archive.social [ONLINE]\n[441.95 MHz] NODE FOUND: helixbio.org [ONLINE]\n[442.30 MHz] NODE FOUND: gov.archive.sys [ONLINE]\n[443.00 MHz] NODE FOUND: blog.kyle-vance.me [ONLINE]\n[444.44 MHz] UNKNOWN NODE DETECTED: deep-signal.node001.net [RESTRICTED]`
        );
        discoverEvidence('ev-node001-hint');
        break;

      case 'whoami':
        addTerminalHistory(`USER: ARCHIVIST\nNODE ID: 001\nLOCATION: PHYSICAL WORKSTATION [EARTH SURFACE]\nSYSTEM STATUS: RECOVERY MODE ACTIVE`);
        break;

      case 'ping':
        if (!arg) {
          addTerminalHistory('Usage: ping <domain>');
        } else {
          soundEngine.playDiskSeek();
          addTerminalHistory(`PINGING ${arg}...\n64 bytes from ${arg}: icmp_seq=1 ttl=64 time=4.2ms\n64 bytes from ${arg}: icmp_seq=2 ttl=64 time=4.0ms\n2 packets transmitted, 2 received, 0% packet loss.`);
        }
        break;

      case 'lookup':
        if (!arg) {
          addTerminalHistory('Usage: lookup <domain>');
        } else if (arg.includes('aurora')) {
          addTerminalHistory(`DOMAIN: aurora-energy.net\nOWNER: Jonathan Vance\nSTATUS: AUTOMATED CARRIER PULSE ARRAY ONLINE\nIP: 192.168.44.10`);
        } else if (arg.includes('node001')) {
          addTerminalHistory(`DOMAIN: deep-signal.node001.net\nOWNER: EXECUTIVE CABINET // ORDER #804\nSTATUS: RESTRICTED ARCHIVIST NODE\nURL: http://deep-signal.node001.net`);
        } else {
          addTerminalHistory(`DOMAIN: ${arg}\nSTATUS: ARCHIVED SURVIVING NODE`);
        }
        break;

      case 'trace':
        soundEngine.playModemConnect();
        addTerminalHistory(`TRACING ROUTE TO ${arg || 'node001.net'}...\n1  10.0.0.1  1.2 ms\n2  440.0.1.1 [IONOSPHERE ARRAY ECHO-PRIME]  12.4 ms\n3  444.44.0.1 [RESTRICTED NODE 001]  24.1 ms\nROUTE CONFIRMED: Target URL is http://deep-signal.node001.net`);
        break;

      case 'decrypt':
        if (arg.toUpperCase() === 'ECHO-2087-VOID') {
          soundEngine.playDiscovery();
          addTerminalHistory(`[DECRYPTION SUCCESSFUL]\nCLEARANCE LEVEL 4 GRANTED.\nUNLOCKED DOCUMENT: EXECUTIVE ORDER #804\nURL ACCESSIBLE: http://gov.archive.sys/emergency/order-804`);
          discoverEvidence('ev-order804');
        } else {
          soundEngine.playGlitch();
          addTerminalHistory(`[DECRYPTION FAILED] Invalid passphrase key.`);
        }
        break;

      case 'history':
        addTerminalHistory(terminalHistory.join('\n'));
        break;

      case 'clear':
        useGameStore.setState({ terminalHistory: ['ORBIT Terminal v4.8 ready. Type "help" for commands.'] });
        break;

      default:
        soundEngine.playGlitch();
        addTerminalHistory(`Command not recognized: "${command}". Type "help" for command list.`);
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-black text-crt-green font-mono text-xs p-4 select-text">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-crt-green/30 pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <TermIcon className="w-4 h-4 text-crt-green" />
          <span className="font-bold">ORBIT OS TERMINAL v4.81 (SANDBOXED CLI)</span>
        </div>
        <div className="text-[10px] text-amber-400">TYPE "help" FOR COMMANDS</div>
      </div>

      {/* Output Console */}
      <div className="flex-1 overflow-y-auto space-y-1.5 leading-relaxed font-mono">
        {terminalHistory.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              line.startsWith('>') ? 'text-amber-400 font-bold' : 'text-crt-green/90'
            }`}
          >
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Input Box */}
      <div className="flex items-center space-x-2 pt-3 border-t border-crt-green/30">
        <span className="text-crt-green font-bold text-sm">&gt;</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(inputVal);
              setInputVal('');
            }
          }}
          placeholder="Type command here..."
          className="flex-1 bg-transparent border-none outline-none text-crt-green font-mono text-xs focus:ring-0"
          autoFocus
        />
      </div>
    </div>
  );
};
