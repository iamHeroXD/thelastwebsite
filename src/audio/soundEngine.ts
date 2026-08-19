// Procedural Web Audio Engine for CRT Monitor & Orbit OS

class SoundEngine {
  private ctx: AudioContext | null = null;
  private humOsc: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  public masterVolume: number = 0.8;
  public humVolume: number = 0.5;
  public uiVolume: number = 0.7;
  public ambientVolume: number = 0.6;
  public isMuted: boolean = false;

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

  public updateVolumes(master: number, hum: number, ui: number, ambient: number, muted: boolean) {
    this.masterVolume = master;
    this.humVolume = hum;
    this.uiVolume = ui;
    this.ambientVolume = ambient;
    this.isMuted = muted;

    if (this.humGain && this.ctx) {
      const targetHum = this.isMuted ? 0 : this.masterVolume * this.humVolume * 0.05;
      this.humGain.gain.setTargetAtTime(targetHum, this.ctx.currentTime, 0.1);
    }

    if (this.ambientGain && this.ctx) {
      const targetAmb = this.isMuted ? 0 : this.masterVolume * this.ambientVolume * 0.04;
      this.ambientGain.gain.setTargetAtTime(targetAmb, this.ctx.currentTime, 0.2);
    }
  }

  public playPowerClick() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.08);

    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.8, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);

    // Start CRT electrical hum when powered on
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
    if (!this.ctx || this.ambientOsc1) return;

    const t = this.ctx.currentTime;
    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc2 = this.ctx.createOscillator();
    this.ambientGain = this.ctx.createGain();

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, t);

    // Dark moody detuned drone
    this.ambientOsc1.type = 'sine';
    this.ambientOsc1.frequency.setValueAtTime(55, t); // A1 note
    this.ambientOsc2.type = 'triangle';
    this.ambientOsc2.frequency.setValueAtTime(55.4, t); // Detuned

    const initialAmb = this.isMuted ? 0 : this.masterVolume * this.ambientVolume * 0.03;
    this.ambientGain.gain.setValueAtTime(initialAmb, t);

    this.ambientOsc1.connect(filter);
    this.ambientOsc2.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    this.ambientOsc1.start(t);
    this.ambientOsc2.start(t);
  }

  public playBootBeep() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(880, t); // Vintage POST beep

    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  public playKeyClick() {
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    // Short noise click
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
    filter.frequency.setValueAtTime(1800 + Math.random() * 400, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.005);

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
    osc.frequency.setValueAtTime(200 + Math.random() * 600, t);

    gain.gain.setValueAtTime(this.masterVolume * this.uiVolume * 0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.025);
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
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
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
