import React, { useEffect, useRef, useState } from 'react';

interface LiveGhatEffectsProps {
  className?: string;
  showControls?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
  curlFreq: number;
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface Diya {
  xPct: number; // percentage of canvas width
  yPct: number; // percentage of canvas height
  speed: number;
  amplitude: number;
  flameFlicker: number;
  scale: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const LiveGhatEffects: React.FC<LiveGhatEffectsProps> = ({
  className = "absolute inset-0 pointer-events-auto z-10",
  showControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Controls state
  const [effectsEnabled, setEffectsEnabled] = useState<boolean>(true);
  const [waterMotion, setWaterMotion] = useState<boolean>(true);
  const [incenseSmoke, setIncenseSmoke] = useState<boolean>(true);
  const [floatingDiyas, setFloatingDiyas] = useState<boolean>(true);
  const [sunbeams, setSunbeams] = useState<boolean>(true);
  const [soundPlaying, setSoundPlaying] = useState<boolean>(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState<boolean>(false);

  // SVG turbulence frequency for water ripple displacement
  const [svgTurbulenceFreq, setSvgTurbulenceFreq] = useState<string>("0.01 0.02");

  // Audio Context Ref for synthesised divine ambient sound (River flow + Bell chime)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioNodesRef = useRef<{ noiseNode?: AudioNode; gainNode?: GainNode; intervalId?: number }>({});

  // Particles & Objects Refs
  const smokeParticlesRef = useRef<Particle[]>([]);
  const emberParticlesRef = useRef<Ember[]>([]);
  const diyasRef = useRef<Diya[]>([
    { xPct: 0.22, yPct: 0.82, speed: 0.0003, amplitude: 3, flameFlicker: 0, scale: 0.9 },
    { xPct: 0.45, yPct: 0.86, speed: 0.0004, amplitude: 4, flameFlicker: 1.2, scale: 1.1 },
    { xPct: 0.68, yPct: 0.81, speed: 0.00025, amplitude: 3.5, flameFlicker: 2.4, scale: 1.0 },
    { xPct: 0.85, yPct: 0.88, speed: 0.00035, amplitude: 2.5, flameFlicker: 0.8, scale: 0.8 },
  ]);
  const ripplesRef = useRef<Ripple[]>([]);

  // Interactive mouse click ripple handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !waterMotion) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only create ripples if clicked in lower 50% (water area)
    if (y > rect.height * 0.45) {
      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: 60 + Math.random() * 40,
        alpha: 0.9,
      });
    }
  };

  // Sound Engine setup (Synthesizes soft river water sound and gentle temple bell chime)
  const toggleSound = () => {
    if (soundPlaying) {
      // Stop sound
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      if (audioNodesRef.current.intervalId) {
        window.clearInterval(audioNodesRef.current.intervalId);
      }
      setSoundPlaying(false);
    } else {
      // Start divine ambient sound
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // 1. Synthesize Pink Noise for gentle river water background sound
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.015; // Soft volume
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Lowpass filter for water softness
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        const waterGain = ctx.createGain();
        waterGain.gain.setValueAtTime(0.25, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(waterGain);
        waterGain.connect(ctx.destination);
        whiteNoise.start();

        // 2. Periodic Temple Bell Chime synthesis
        const playBell = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
          const bellCtx = audioCtxRef.current;
          const osc1 = bellCtx.createOscillator();
          const osc2 = bellCtx.createOscillator();
          const bellGain = bellCtx.createGain();

          // Bell frequencies (E5 and B5 harmonic blend)
          const baseFreq = 659.25; // E5 frequency
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(baseFreq, bellCtx.currentTime);
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(baseFreq * 2.76, bellCtx.currentTime);

          bellGain.gain.setValueAtTime(0.08, bellCtx.currentTime);
          bellGain.gain.exponentialRampToValueAtTime(0.0001, bellCtx.currentTime + 3.5);

          osc1.connect(bellGain);
          osc2.connect(bellGain);
          bellGain.connect(bellCtx.destination);

          osc1.start();
          osc2.start();
          osc1.stop(bellCtx.currentTime + 3.6);
          osc2.stop(bellCtx.currentTime + 3.6);
        };

        // Trigger bell every 6 to 9 seconds
        playBell();
        const bellInterval = window.setInterval(() => {
          playBell();
        }, 7500);

        audioNodesRef.current.intervalId = bellInterval;
        setSoundPlaying(true);
      } catch (err) {
        console.error("Audio init error:", err);
      }
    }
  };

  // Main Canvas Render & Animation Loop
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resizeCanvas = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Incense stick emitters (3 locations: bottom-left thali, bottom-right thali, center ghat)
    const getEmitterPoints = (w: number, h: number) => [
      { x: w * 0.18, y: h * 0.88, rate: 0.7 }, // Left Puja Thali
      { x: w * 0.82, y: h * 0.85, rate: 0.7 }, // Right Puja Thali
      { x: w * 0.50, y: h * 0.92, rate: 0.5 }, // Center Ghat Offering
    ];

    const render = () => {
      time += 0.016; // Approx 60 FPS delta
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      if (effectsEnabled) {
        // --- 1. SVG WATER RIPPLE TURBULENCE FREQUENCY ANIMATION ---
        if (waterMotion) {
          const freqX = (0.008 + Math.sin(time * 1.2) * 0.003).toFixed(4);
          const freqY = (0.015 + Math.cos(time * 0.9) * 0.005).toFixed(4);
          setSvgTurbulenceFreq(`${freqX} ${freqY}`);
        }

        // --- 2. DIVINE SUNBEAMS & GOLD GLOW (Top Right Sunrise Rays) ---
        if (sunbeams) {
          ctx.save();
          const sunX = width * 0.72;
          const sunY = height * 0.22;

          // Soft Pulsing Radial Sunlight Glow
          const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, width * 0.45);
          const pulseOpacity = 0.18 + Math.sin(time * 2) * 0.05;
          sunGlow.addColorStop(0, `rgba(255, 220, 120, ${pulseOpacity})`);
          sunGlow.addColorStop(0.5, `rgba(255, 150, 40, ${pulseOpacity * 0.6})`);
          sunGlow.addColorStop(1, 'rgba(255, 100, 0, 0)');
          ctx.fillStyle = sunGlow;
          ctx.fillRect(0, 0, width, height);

          // Rotating Golden Rays
          const numRays = 8;
          ctx.translate(sunX, sunY);
          ctx.rotate(time * 0.04);
          for (let i = 0; i < numRays; i++) {
            ctx.rotate((Math.PI * 2) / numRays);
            const rayGrad = ctx.createLinearGradient(0, 0, width * 0.6, 0);
            rayGrad.addColorStop(0, 'rgba(255, 235, 150, 0.15)');
            rayGrad.addColorStop(0.6, 'rgba(255, 180, 50, 0.05)');
            rayGrad.addColorStop(1, 'rgba(255, 140, 0, 0)');

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(width * 0.6, -20);
            ctx.lineTo(width * 0.6, 20);
            ctx.closePath();
            ctx.fillStyle = rayGrad;
            ctx.fill();
          }
          ctx.restore();

          // Gold Dust / Sacred Air Sparks
          ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
          for (let p = 0; p < 15; p++) {
            const px = (Math.sin(time * 0.5 + p * 99) * 0.4 + 0.5) * width;
            const py = (Math.cos(time * 0.3 + p * 33) * 0.3 + 0.35) * height;
            const pSize = 1 + Math.sin(time * 3 + p) * 0.8;
            ctx.beginPath();
            ctx.arc(px, py, Math.max(0.5, pSize), 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // --- 3. MOVING WATER SHIMMER & RIPPLE LINES ---
        if (waterMotion) {
          const waterStartY = height * 0.48;
          const waterHeight = height - waterStartY;

          ctx.save();
          ctx.globalCompositeOperation = 'screen';

          // Multi-layer Sine Wave Shimmer Reflections
          const numWaves = 12;
          for (let i = 0; i < numWaves; i++) {
            const waveY = waterStartY + (waterHeight / numWaves) * i + Math.sin(time * 2 + i) * 2;
            const waveSpeed = 1.5 + (i % 3) * 0.5;
            const waveOpacity = 0.08 + Math.sin(time * 1.5 + i * 0.7) * 0.05;

            ctx.beginPath();
            ctx.moveTo(0, waveY);
            for (let x = 0; x <= width; x += 20) {
              const sineVal = Math.sin(x * 0.015 + time * waveSpeed + i * 1.2) * (2 + i * 0.4);
              ctx.lineTo(x, waveY + sineVal);
            }
            ctx.strokeStyle = `rgba(255, 210, 120, ${waveOpacity})`;
            ctx.lineWidth = 1.5 + i * 0.2;
            ctx.stroke();
          }

          // Render Click Ripples
          for (let r = ripplesRef.current.length - 1; r >= 0; r--) {
            const ripple = ripplesRef.current[r];
            ripple.radius += 1.2;
            ripple.alpha -= 0.015;

            if (ripple.alpha <= 0 || ripple.radius >= ripple.maxRadius) {
              ripplesRef.current.splice(r, 1);
              continue;
            }

            ctx.beginPath();
            ctx.ellipse(ripple.x, ripple.y, ripple.radius, ripple.radius * 0.4, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 230, 160, ${ripple.alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          ctx.restore();
        }

        // --- 4. FLOATING CLAY DIYAS ON MOVING WATER ---
        if (floatingDiyas) {
          const diyas = diyasRef.current;
          diyas.forEach((diya, idx) => {
            diya.xPct += diya.speed;
            if (diya.xPct > 1.05) diya.xPct = -0.05; // Loop back around

            const diyaX = diya.xPct * width;
            const bobbing = Math.sin(time * 2.5 + idx * 1.5) * diya.amplitude;
            const diyaY = diya.yPct * height + bobbing;
            const s = diya.scale;

            ctx.save();
            ctx.translate(diyaX, diyaY);

            // Water Ripple Around Diya Base
            ctx.beginPath();
            ctx.ellipse(0, 4 * s, 18 * s, 6 * s, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 200, 100, ${0.3 + Math.sin(time * 4 + idx) * 0.15})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Clay Diya Vessel (Mitti Ka Diya)
            ctx.beginPath();
            ctx.ellipse(0, 0, 14 * s, 6 * s, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#8b4513'; // Terracotta reddish brown
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#5c2e0b';
            ctx.stroke();

            // Oil / Pradip Pool
            ctx.beginPath();
            ctx.ellipse(0, -1 * s, 10 * s, 4 * s, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#d4a359';
            ctx.fill();

            // Diya Flame Aura / Outer Glow
            const flicker = Math.sin(time * 12 + idx * 3) * 3 + Math.cos(time * 17) * 2;
            const flameGlowRadius = (16 + flicker) * s;
            const flameGlow = ctx.createRadialGradient(0, -6 * s, 2, 0, -6 * s, flameGlowRadius);
            flameGlow.addColorStop(0, 'rgba(255, 230, 100, 0.9)');
            flameGlow.addColorStop(0.4, 'rgba(255, 140, 0, 0.5)');
            flameGlow.addColorStop(1, 'rgba(255, 60, 0, 0)');

            ctx.fillStyle = flameGlow;
            ctx.beginPath();
            ctx.arc(0, -6 * s, flameGlowRadius, 0, Math.PI * 2);
            ctx.fill();

            // Inner Bright Teardrop Flame Shape
            ctx.beginPath();
            ctx.moveTo(0, -14 * s - flicker * 0.5);
            ctx.bezierCurveTo(4 * s, -8 * s, 4 * s, -3 * s, 0, -2 * s);
            ctx.bezierCurveTo(-4 * s, -3 * s, -4 * s, -8 * s, 0, -14 * s - flicker * 0.5);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // Flame Base Orange Glow
            ctx.beginPath();
            ctx.arc(0, -4 * s, 3 * s, 0, Math.PI * 2);
            ctx.fillStyle = '#ff4500';
            ctx.fill();

            // Mirror Flame Water Reflection below Diya
            const reflGrad = ctx.createLinearGradient(0, 4 * s, 0, 16 * s);
            reflGrad.addColorStop(0, 'rgba(255, 170, 0, 0.4)');
            reflGrad.addColorStop(1, 'rgba(255, 80, 0, 0)');
            ctx.fillStyle = reflGrad;
            ctx.fillRect(-6 * s, 4 * s, 12 * s, 12 * s);

            ctx.restore();
          });
        }

        // --- 5. INCENSE STICK SMOKE & EMBER SPARKS SYSTEM (अगरबत्ती / धूप धुआँ) ---
        if (incenseSmoke) {
          const emitters = getEmitterPoints(width, height);

          // Emit new smoke & embers
          emitters.forEach((emitter) => {
            // Draw Incense Stick Base & Glowing Red Ember Tip
            ctx.save();
            ctx.translate(emitter.x, emitter.y);

            // Incense Stick Thin Line
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(2, 18);
            ctx.strokeStyle = '#3d2516';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Glowing Ember Tip (अगरबत्ती का लाल अंगारा)
            const emberPulse = 0.7 + Math.sin(time * 8 + emitter.x) * 0.3;
            const emberGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 8);
            emberGlow.addColorStop(0, `rgba(255, 255, 200, ${emberPulse})`);
            emberGlow.addColorStop(0.3, `rgba(255, 100, 0, ${emberPulse * 0.8})`);
            emberGlow.addColorStop(1, 'rgba(255, 0, 0, 0)');
            ctx.fillStyle = emberGlow;
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Spawn Smoke Particle
            if (Math.random() < emitter.rate) {
              smokeParticlesRef.current.push({
                x: emitter.x + (Math.random() - 0.5) * 4,
                y: emitter.y - 2,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -0.8 - Math.random() * 0.6,
                radius: 4 + Math.random() * 4,
                maxRadius: 35 + Math.random() * 25,
                alpha: 0.45 + Math.random() * 0.2,
                life: 0,
                maxLife: 180 + Math.random() * 90,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.02,
                curlFreq: 0.015 + Math.random() * 0.02,
              });
            }

            // Spawn Golden Ember Spark
            if (Math.random() < 0.15) {
              emberParticlesRef.current.push({
                x: emitter.x + (Math.random() - 0.5) * 3,
                y: emitter.y - 2,
                vx: (Math.random() - 0.5) * 0.6,
                vy: -1.2 - Math.random() * 0.8,
                size: 1 + Math.random() * 1.5,
                alpha: 0.9,
                life: 0,
                maxLife: 50 + Math.random() * 40,
              });
            }
          });

          // Render & Update Smoke Particles
          ctx.save();
          const particles = smokeParticlesRef.current;
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.life++;

            // Physics: Rising + Sine Wind Turbulence
            const lifePct = p.life / p.maxLife;
            p.y += p.vy;
            p.x += p.vx + Math.sin(p.life * p.curlFreq) * 0.7;
            p.radius += (p.maxRadius - p.radius) * 0.012;
            p.rotation += p.rotSpeed;

            // Fade in initially, fade out slowly
            let currentAlpha = p.alpha;
            if (lifePct < 0.15) {
              currentAlpha = (lifePct / 0.15) * p.alpha;
            } else {
              currentAlpha = (1 - (lifePct - 0.15) / 0.85) * p.alpha;
            }

            if (p.life >= p.maxLife || currentAlpha <= 0) {
              particles.splice(i, 1);
              continue;
            }

            // Draw Soft Blurred Smoke Puff
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);

            const smokeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
            // Incense smoke has a soft warm ivory / silky grey tint
            smokeGrad.addColorStop(0, `rgba(255, 245, 235, ${currentAlpha * 0.5})`);
            smokeGrad.addColorStop(0.4, `rgba(220, 210, 205, ${currentAlpha * 0.3})`);
            smokeGrad.addColorStop(0.8, `rgba(180, 170, 165, ${currentAlpha * 0.1})`);
            smokeGrad.addColorStop(1, 'rgba(150, 140, 135, 0)');

            ctx.fillStyle = smokeGrad;
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Render & Update Ember Sparks
          const embers = emberParticlesRef.current;
          for (let e = embers.length - 1; e >= 0; e--) {
            const emb = embers[e];
            emb.life++;
            emb.x += emb.vx + (Math.random() - 0.5) * 0.3;
            emb.y += emb.vy;
            emb.alpha -= 0.018;

            if (emb.life >= emb.maxLife || emb.alpha <= 0) {
              embers.splice(e, 1);
              continue;
            }

            ctx.beginPath();
            ctx.arc(emb.x, emb.y, emb.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 180, 40, ${emb.alpha})`;
            ctx.shadowColor = '#ff4500';
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [effectsEnabled, waterMotion, incenseSmoke, floatingDiyas, sunbeams]);

  return (
    <div ref={containerRef} className={className}>
      {/* SVG Turbulence Displacement Filter overlay for realistic fluid image wave effect */}
      <svg className="hidden">
        <defs>
          <filter id="water-wave-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={svgTurbulenceFreq}
              numOctaves="2"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={waterMotion && effectsEnabled ? "12" : "0"}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Dynamic Overlay Canvas for Smoke, Diyas, Ripples & Sunbeams */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        title="क्लिक करके जल में तरंग उत्पन्न करें (Click to create water ripples)"
        className="w-full h-full block cursor-pointer transition-opacity duration-500"
      />

      {/* Floating Sleek Glassmorphism Control Pill */}
      {showControls && (
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 select-none">
          {/* Main Toggle Pill */}
          <div className="flex items-center gap-1.5 bg-[#2e1500]/70 backdrop-blur-md border border-amber-300/40 text-amber-100 px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold">
            <button
              onClick={() => setEffectsEnabled(!effectsEnabled)}
              className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors"
            >
              <span className={`material-symbols-outlined text-base ${effectsEnabled ? 'text-amber-400 animate-pulse' : 'text-gray-400'}`}>
                {effectsEnabled ? 'auto_awesome' : 'motion_photos_paused'}
              </span>
              <span>{effectsEnabled ? 'सजीव घाट (Live)' : 'स्थिर दृश्य (Paused)'}</span>
            </button>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              title={soundPlaying ? "ध्वनि बंद करें (Mute Ambient Sound)" : "पवित्र घाट ध्वनि चालू करें (Play Ghat Ambient Sound)"}
              className={`p-1 rounded-full transition-all cursor-pointer ${soundPlaying ? 'bg-amber-500 text-black shadow-sm' : 'hover:bg-white/20 text-amber-200'}`}
            >
              <span className="material-symbols-outlined text-sm">
                {soundPlaying ? 'volume_up' : 'volume_off'}
              </span>
            </button>

            {/* Sub-settings Toggle */}
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer text-amber-200"
              title="प्रभाव सेटिंग्स (Effect Settings)"
            >
              <span className="material-symbols-outlined text-sm">tune</span>
            </button>
          </div>

          {/* Expanded Settings Menu */}
          {showSettingsMenu && (
            <div className="absolute top-10 right-0 mt-2 w-52 bg-[#1c0d02]/95 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-3 shadow-2xl space-y-2 text-xs text-amber-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="font-bold text-amber-300 pb-1 border-b border-amber-500/20 flex justify-between items-center">
                <span>सजीव प्रभाव विकल्प</span>
                <span className="text-[10px] text-amber-200/60">Live FX</span>
              </div>

              {/* Water Wave Toggle */}
              <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1 rounded-lg">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-cyan-400">waves</span>
                  जल तरंगें (Water Motion)
                </span>
                <input
                  type="checkbox"
                  checked={waterMotion}
                  onChange={(e) => setWaterMotion(e.target.checked)}
                  className="accent-amber-500 rounded cursor-pointer"
                />
              </label>

              {/* Incense Smoke Toggle */}
              <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1 rounded-lg">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-amber-300">air</span>
                  धूप/अगरबत्ती धुआँ (Smoke)
                </span>
                <input
                  type="checkbox"
                  checked={incenseSmoke}
                  onChange={(e) => setIncenseSmoke(e.target.checked)}
                  className="accent-amber-500 rounded cursor-pointer"
                />
              </label>

              {/* Diyas Toggle */}
              <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1 rounded-lg">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-orange-400">flame</span>
                  बहते दीये (Floating Diyas)
                </span>
                <input
                  type="checkbox"
                  checked={floatingDiyas}
                  onChange={(e) => setFloatingDiyas(e.target.checked)}
                  className="accent-amber-500 rounded cursor-pointer"
                />
              </label>

              {/* Sunbeams Toggle */}
              <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1 rounded-lg">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-yellow-400">wb_sunny</span>
                  सूर्य किरणें (Sunbeams)
                </span>
                <input
                  type="checkbox"
                  checked={sunbeams}
                  onChange={(e) => setSunbeams(e.target.checked)}
                  className="accent-amber-500 rounded cursor-pointer"
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
