// Procedural Web Audio Synthesizer Engine for CRT Monitor & Orbit OS

class SoundEngine {
  private ctx: AudioContext | null = null;
  private humOsc: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  
  // Ambient Synth Pad Generators
  private padOscs: OscillatorNode[] = [];
  private padGain: GainNode | null = null;
  private lfoOsc: OscillatorNode | null = null;

  // Radio Static Generator
  private radioNoiseNode: AudioBufferSourceNode | null = null;
  private radioGain: GainNode | null = null;

  public masterVolume: number = 0.8;
  public humVolume: number = 0.4;
  public uiVolume: number = 0.7;
  public ambientVolume: number = 0.5;
  public musicVolume: number = 0.6;
  public isMuted: boolean = false;
  public isRadioActive: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public updateVolumes(master: number, hum: number, ui: number, ambient: number, music: number, muted: boolean) {
    this.masterVolume = master;
    this.humVolume = hum;
    this.uiVolume = ui;
    this.ambientVolume = ambient;
    this.musicVolume = music;
    this.isMuted = muted;

    if (this.humGain && this.ctx) {
      const targetHum = this.isMuted ? 0 : this.masterVolume * this.humVolume * 0.05;
      this.humGain.gain.setTargetAtTime(targetHum, this.ctx.currentTime, 0.1);
    }

    if (this.padGain && this.ctx) {
      const targetPad = this.isMuted ? 0 : this.masterVolume * this.ambientVolume * this.musicVolume * 0.04;
      this.padGain.gain.setTargetAtTime(targetPad, this.ctx.currentTime, 0.2);
    }
  }

  public playPowerClick() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.09);

    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.8, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.1);

    this.startHum();
    this.startAmbient();
  }

  public startHum() {
    this.initCtx();
    if (!this.ctx || this.humOsc) return;

    const t = this.ctx.currentTime;
    this.humOsc = this.ctx.createOscillator();
    this.humGain = this.ctx.createGain();

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, t);

    this.humOsc.type = 'sine';
    this.humOsc.frequency.setValueAtTime(60, t); // 60Hz mains hum

    const initialHum = this.isMuted ? 0 : this.masterVolume * this.humVolume * 0.04;
    this.humGain.gain.setValueAtTime(initialHum, t);

    this.humOsc.connect(filter);
    filter.connect(this.humGain);
    this.humGain.connect(this.ctx.destination);

    this.humOsc.start(t);
  }

  public stopHum() {
    if (this.humOsc && this.ctx) {
      try {
        this.humOsc.stop();
        this.humOsc.disconnect();
      } catch (e) {}
      this.humOsc = null;
      this.humGain = null;
    }
  }

  public startAmbient() {
    this.initCtx();
    if (!this.ctx || this.padOscs.length > 0) return;

    const t = this.ctx.currentTime;
    this.padGain = this.ctx.createGain();

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);

    // Create LFO filter modulation for subtle evolving atmospheric swell
    this.lfoOsc = this.ctx.createOscillator();
    this.lfoOsc.type = 'sine';
    this.lfoOsc.frequency.setValueAtTime(0.15, t); // Very slow swell

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, t);
    this.lfoOsc.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    this.lfoOsc.start(t);

    // Eerie ambient chord: A minor 9 (A1, E2, G2, C3, B3)
    const frequencies = [55.0, 82.41, 98.0, 130.81, 246.94];
    this.padOscs = frequencies.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), t);
      osc.connect(filter);
      osc.start(t);
      return osc;
    });

    const targetGain = this.isMuted ? 0 : this.masterVolume * this.ambientVolume * this.musicVolume * 0.035;
    this.padGain.gain.setValueAtTime(targetGain, t);

    filter.connect(this.padGain);
    this.padGain.connect(this.ctx.destination);
  }

  public toggleRadioStatic(enable: boolean) {
    this.initCtx();
    if (!this.ctx) return;

    if (enable && !this.radioNoiseNode) {
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      this.radioNoiseNode = this.ctx.createBufferSource();
      this.radioNoiseNode.buffer = buffer;
      this.radioNoiseNode.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.Q.setValueAtTime(3.0, t);

      this.radioGain = this.ctx.createGain();
      const targetVal = this.isMuted ? 0 : this.masterVolume * 0.15;
      this.radioGain.gain.setValueAtTime(targetVal, t);

      this.radioNoiseNode.connect(filter);
      filter.connect(this.radioGain);
      this.radioGain.connect(this.ctx.destination);

      this.radioNoiseNode.start(t);
      this.isRadioActive = true;
    } else if (!enable && this.radioNoiseNode) {
      try {
        this.radioNoiseNode.stop();
        this.radioNoiseNode.disconnect();
      } catch (e) {}
      this.radioNoiseNode = null;
      this.radioGain = null;
      this.isRadioActive = false;
    }
  }

  public playBootBeep() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(880, t);

    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.17);
  }

  public playKeyClick() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.005;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800 + Math.random() * 500, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.006);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  public playDiskSeek() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(250 + Math.random() * 600, t);

    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  public playModemConnect() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.linearRampToValueAtTime(2400, t + 0.12);
    osc.frequency.linearRampToValueAtTime(800, t + 0.25);

    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  public playGlitch() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    noise.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  public playDiscovery() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.07);

      gain.gain.setValueAtTime(0, t + i * 0.07);
      gain.gain.linearRampToValueAtTime(this.masterVolume * this.uiVolume * 0.3, t + i * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(t + i * 0.07);
      osc.stop(t + i * 0.07 + 0.26);
    });
  }
}

export const soundEngine = new SoundEngine();
