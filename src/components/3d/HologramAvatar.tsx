/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { AvatarState } from '../../types';
import { Volume2, Mic, Sparkles, ChevronDown, ChevronUp, Eye } from 'lucide-react';

interface HologramAvatarProps {
  state: AvatarState;
  onStateChange?: (state: AvatarState) => void;
  interactive?: boolean;
  compact?: boolean;
}

export const HologramAvatar: React.FC<HologramAvatarProps> = ({
  state = 'idle',
  onStateChange,
  interactive = true,
  compact = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [activeVoiceMode, setActiveVoiceMode] = useState<string>('Female (Linthoi)');
  const [hologramColor, setHologramColor] = useState<'cyan-purple' | 'emerald' | 'gold'>('cyan-purple');

  // Mutable refs for animation loop
  const stateRef = useRef<AvatarState>(state);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const speechPhaseRef = useRef<number>(0);
  const blinkTimerRef = useRef<number>(0);
  const isBlinkingRef = useRef<boolean>(false);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || (compact ? 320 : 600);
    const height = container.clientHeight || (compact ? 320 : 500);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, compact ? 3.4 : 3.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Studio Environment map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting rig: Warm directional key + Cool ambient/rim
    const keyLight = new THREE.DirectionalLight(0x7c3aed, 2.5);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x06b6d4, 2.2);
    fillLight.position.set(-2.5, 1, 2);
    scene.add(fillLight);

    const backRimLight = new THREE.DirectionalLight(0xec4899, 3.0);
    backRimLight.position.set(0, 3, -3);
    scene.add(backRimLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x1e1b4b, 1.2);
    scene.add(hemiLight);

    // Assembly of 3D Holographic AI Avatar (Multi-part procedural group)
    const avatarGroup = new THREE.Group();
    avatarGroup.position.set(0, -0.45, 0);
    scene.add(avatarGroup);

    // Head base group for rotation/head-tracking
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.95, 0);
    avatarGroup.add(headGroup);

    // Material definitions (Translucent holographic glass & glowing accents)
    const primaryGlowColor = new THREE.Color(hologramColor === 'emerald' ? 0x10b981 : hologramColor === 'gold' ? 0xf59e0b : 0x06b6d4);
    const secondaryGlowColor = new THREE.Color(hologramColor === 'emerald' ? 0x065f46 : hologramColor === 'gold' ? 0xb45309 : 0x7c3aed);

    const holoMaterial = new THREE.MeshPhysicalMaterial({
      color: primaryGlowColor,
      emissive: secondaryGlowColor,
      emissiveIntensity: 0.45,
      metalness: 0.1,
      roughness: 0.2,
      transmission: isSoftwareGl ? 0 : 0.65,
      transparent: true,
      opacity: isSoftwareGl ? 0.75 : 0.9,
      wireframe: false,
    });

    const wireframeOverlayMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    const eyeGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0x67e8f9,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.9,
    });

    const jawMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.3,
    });

    // 1. Cranium / Head Dome
    const craniumGeom = new THREE.SphereGeometry(0.52, 32, 24);
    craniumGeom.scale(0.85, 1.05, 0.95);
    const craniumMesh = new THREE.Mesh(craniumGeom, holoMaterial);
    headGroup.add(craniumMesh);

    // Wireframe halo shell
    const craniumWire = new THREE.Mesh(craniumGeom, wireframeOverlayMaterial);
    craniumWire.scale.set(1.02, 1.02, 1.02);
    headGroup.add(craniumWire);

    // 2. Visor / Face Plate
    const visorGeom = new THREE.CylinderGeometry(0.42, 0.38, 0.32, 24, 1, false, -Math.PI / 2.5, Math.PI / 1.25);
    const visorMesh = new THREE.Mesh(visorGeom, holoMaterial);
    visorMesh.position.set(0, 0.04, 0.22);
    headGroup.add(visorMesh);

    // 3. Left & Right Glowing Eyes
    const eyeGeom = new THREE.SphereGeometry(0.065, 16, 16);
    eyeGeom.scale(1.4, 0.7, 0.5);

    const leftEye = new THREE.Mesh(eyeGeom, eyeGlowMaterial);
    leftEye.position.set(0.16, 0.06, 0.42);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeom, eyeGlowMaterial);
    rightEye.position.set(-0.16, 0.06, 0.42);
    headGroup.add(rightEye);

    // Eyelids for natural blinking
    const eyelidGeom = new THREE.BoxGeometry(0.16, 0.08, 0.08);
    const eyelidMaterial = new THREE.MeshBasicMaterial({ color: 0x0f172a });

    const leftEyelid = new THREE.Mesh(eyelidGeom, eyelidMaterial);
    leftEyelid.position.set(0.16, 0.12, 0.44);
    leftEyelid.scale.set(1, 0.01, 1);
    headGroup.add(leftEyelid);

    const rightEyelid = new THREE.Mesh(eyelidGeom, eyelidMaterial);
    rightEyelid.position.set(-0.16, 0.12, 0.44);
    rightEyelid.scale.set(1, 0.01, 1);
    headGroup.add(rightEyelid);

    // 4. Articulated Jaw / Mouth Aperture for Lip-Sync
    const jawGeom = new THREE.BoxGeometry(0.24, 0.09, 0.14);
    const jawMesh = new THREE.Mesh(jawGeom, jawMaterial);
    jawMesh.position.set(0, -0.25, 0.35);
    headGroup.add(jawMesh);

    const mouthGlowGeom = new THREE.PlaneGeometry(0.14, 0.035);
    const mouthGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const mouthGlow = new THREE.Mesh(mouthGlowGeom, mouthGlowMat);
    mouthGlow.position.set(0, -0.22, 0.43);
    headGroup.add(mouthGlow);

    // 5. Neural Holographic Circlet / Crown (Manipuri Crown/Kajenglei inspired motif)
    const crownGeom = new THREE.TorusGeometry(0.55, 0.022, 16, 48);
    const crownMat = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      emissive: 0xa855f7,
      emissiveIntensity: 1.4,
      metalness: 0.9,
      roughness: 0.15,
    });
    const crownMesh = new THREE.Mesh(crownGeom, crownMat);
    crownMesh.rotation.x = Math.PI / 2.3;
    crownMesh.position.set(0, 0.32, 0);
    headGroup.add(crownMesh);

    // 6. Neck & Collar Rings
    const neckGeom = new THREE.CylinderGeometry(0.16, 0.22, 0.32, 20);
    const neckMesh = new THREE.Mesh(neckGeom, holoMaterial);
    neckMesh.position.set(0, 0.62, 0);
    avatarGroup.add(neckMesh);

    // 7. Shoulders & Torso Silhouette
    const chestGeom = new THREE.CylinderGeometry(0.48, 0.32, 0.55, 24);
    chestGeom.scale(1.2, 1, 0.75);
    const chestMesh = new THREE.Mesh(chestGeom, holoMaterial);
    chestMesh.position.set(0, 0.22, 0);
    avatarGroup.add(chestMesh);

    // Torso Core Reactor (Manipuri Lotus / Pakhangba Coil emblem)
    const coreGeom = new THREE.TorusGeometry(0.14, 0.024, 16, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 2.0,
      metalness: 0.95,
      roughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreMesh.position.set(0, 0.24, 0.28);
    avatarGroup.add(coreMesh);

    // 8. Holographic Base Emitter & Contact Grounding
    const baseRingGeom = new THREE.RingGeometry(0.65, 0.85, 32);
    const baseRingMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const baseRing = new THREE.Mesh(baseRingGeom, baseRingMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.set(0, -0.44, 0);
    avatarGroup.add(baseRing);

    // Contact shadow disc
    const contactShadowGeom = new THREE.CircleGeometry(0.95, 32);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      color: 0x020617,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeom, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, -0.45, 0);
    scene.add(contactShadow);

    // 9. Floating Holographic Particles
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x38bdf8);
    const c2 = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.8 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.2) * 1.8;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;

      const mixed = c1.clone().lerp(c2, Math.random());
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    avatarGroup.add(particles);

    // Mouse tracking listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePosRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle container resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Software WebGL pacing per skill directives
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const status = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const currentState = stateRef.current;

      // 1. Natural idle floating breathing kinematics
      const breathe = Math.sin(elapsed * 1.5) * 0.025;
      avatarGroup.position.y = -0.45 + breathe;

      // Crown rotation
      crownMesh.rotation.z = elapsed * 0.4;
      baseRing.rotation.z = -elapsed * 0.3;
      particles.rotation.y = elapsed * 0.15;

      // 2. Smooth Head Tracking (Damped Exponential Kinematics)
      const targetHeadX = THREE.MathUtils.clamp(-mousePosRef.current.y * 0.25, -0.3, 0.3);
      const targetHeadY = THREE.MathUtils.clamp(mousePosRef.current.x * 0.45, -0.5, 0.5);

      headGroup.rotation.x = THREE.MathUtils.damp(headGroup.rotation.x, targetHeadX, 4, delta);
      headGroup.rotation.y = THREE.MathUtils.damp(headGroup.rotation.y, targetHeadY, 4, delta);

      // 3. Eye Blinking Mechanism
      blinkTimerRef.current += delta;
      if (blinkTimerRef.current > 3.5 + Math.random() * 2) {
        isBlinkingRef.current = true;
        blinkTimerRef.current = 0;
      }

      if (isBlinkingRef.current) {
        leftEyelid.scale.y = 1.0;
        rightEyelid.scale.y = 1.0;
        if (blinkTimerRef.current > 0.18) {
          isBlinkingRef.current = false;
          leftEyelid.scale.y = 0.01;
          rightEyelid.scale.y = 0.01;
        }
      }

      // 4. Behavioral State Kinematics
      if (currentState === 'speaking') {
        speechPhaseRef.current += delta * 14;
        const jawOpen = Math.abs(Math.sin(speechPhaseRef.current)) * 0.08 + Math.cos(speechPhaseRef.current * 0.7) * 0.03;
        jawMesh.position.y = -0.25 - jawOpen;
        mouthGlow.scale.set(1 + jawOpen * 6, 1 + jawOpen * 8, 1);
        mouthGlowMat.opacity = 0.6 + Math.sin(speechPhaseRef.current) * 0.3;
        coreMat.emissiveIntensity = 2.4 + Math.sin(speechPhaseRef.current * 2) * 0.8;
      } else if (currentState === 'listening') {
        jawMesh.position.y = -0.25;
        mouthGlow.scale.set(1, 1, 1);
        mouthGlowMat.opacity = 0.4;
        headGroup.rotation.z = THREE.MathUtils.damp(headGroup.rotation.z, 0.08, 3, delta); // attentive tilt
        coreMat.emissiveIntensity = 2.0 + Math.sin(elapsed * 4) * 0.5;
      } else if (currentState === 'thinking') {
        jawMesh.position.y = -0.25;
        headGroup.rotation.x = THREE.MathUtils.damp(headGroup.rotation.x, -0.15, 3, delta); // looking slightly upward
        crownMesh.rotation.z = elapsed * 1.8; // accelerated neural ring
        coreMat.emissiveIntensity = 1.5 + Math.sin(elapsed * 6) * 1.0;
      } else {
        // Idle
        jawMesh.position.y = -0.25;
        mouthGlow.scale.set(1, 1, 1);
        mouthGlowMat.opacity = 0.3;
        headGroup.rotation.z = THREE.MathUtils.damp(headGroup.rotation.z, 0, 3, delta);
        coreMat.emissiveIntensity = 1.8 + Math.sin(elapsed * 2) * 0.4;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      // Clean resource disposal
      craniumGeom.dispose();
      visorGeom.dispose();
      eyeGeom.dispose();
      jawGeom.dispose();
      crownGeom.dispose();
      neckGeom.dispose();
      chestGeom.dispose();
      coreGeom.dispose();
      particleGeom.dispose();
      holoMaterial.dispose();
      eyeGlowMaterial.dispose();
      jawMaterial.dispose();
      crownMat.dispose();
      coreMat.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [compact, hologramColor]);

  // Handle voice synthesis test
  const speakSample = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      
      onStateChange?.('speaking');
      utterance.onend = () => {
        onStateChange?.('idle');
      };
      utterance.onerror = () => {
        onStateChange?.('idle');
      };
      window.speechSynthesis.speak(utterance);
    } else {
      onStateChange?.('speaking');
      setTimeout(() => onStateChange?.('idle'), 3000);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      />

      {/* Hologram Aura Ambient Rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[360px] h-[360px] rounded-full border border-cyan-500/10 animate-ping opacity-20 duration-1000" />
        <div className="w-[280px] h-[280px] rounded-full border border-purple-500/20 blur-sm pointer-events-none" />
      </div>

      {/* State status badge (Top center) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-lg backdrop-blur-md">
        <span className={`w-2 h-2 rounded-full ${
          state === 'speaking' ? 'bg-cyan-400' :
          state === 'listening' ? 'bg-emerald-400' :
          state === 'thinking' ? 'bg-purple-400' : 'bg-slate-400'
        }`} />
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
          Avatar: {state}
        </span>
      </div>

      {/* Collapsible Ergonomic Bottom Control Dock per Three.js guidelines */}
      {interactive && !compact && (
        <div 
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-[560px] transition-all duration-300 z-20 ${
            controlsCollapsed ? 'translate-y-[84%]' : 'translate-y-0'
          }`}
        >
          {/* Collapse/Expand Toggle Button */}
          <div className="flex justify-center -mb-2">
            <button
              onClick={() => setControlsCollapsed(!controlsCollapsed)}
              className="px-3 py-1 rounded-t-lg bg-slate-900 border-t border-x border-slate-700 text-[11px] font-medium text-slate-400 hover:text-cyan-400 flex items-center gap-1 shadow-md transition-colors"
            >
              {controlsCollapsed ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" /> Show Avatar Controls
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" /> Hide Controls
                </>
              )}
            </button>
          </div>

          {/* Unified Bottom Control Panel */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Quick State Simulation Pills */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onStateChange?.('idle')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  state === 'idle'
                    ? 'bg-slate-700 text-cyan-300 font-semibold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                Idle
              </button>
              <button
                onClick={() => onStateChange?.('listening')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  state === 'listening'
                    ? 'bg-emerald-900/80 text-emerald-300 font-semibold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mic className="w-3 h-3" /> Listen
              </button>
              <button
                onClick={() => onStateChange?.('thinking')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  state === 'thinking'
                    ? 'bg-purple-900/80 text-purple-300 font-semibold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" /> Think
              </button>
              <button
                onClick={() => speakSample('Khurumjari! I am Manipur AI, your state assistant.')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  state === 'speaking'
                    ? 'bg-cyan-900/80 text-cyan-300 font-semibold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Volume2 className="w-3 h-3" /> Speak
              </button>
            </div>

            {/* Hologram Aura Color Switcher */}
            <div className="flex items-center gap-1.5 border-l border-slate-700/60 pl-3">
              <span className="text-slate-400 text-[11px] hidden sm:inline">Color:</span>
              <button
                onClick={() => setHologramColor('cyan-purple')}
                title="Neon Cyan & Purple"
                className={`w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 border ${
                  hologramColor === 'cyan-purple' ? 'border-white ring-1 ring-cyan-400' : 'border-transparent opacity-70'
                }`}
              />
              <button
                onClick={() => setHologramColor('emerald')}
                title="Keibul Emerald"
                className={`w-4 h-4 rounded-full bg-emerald-400 border ${
                  hologramColor === 'emerald' ? 'border-white ring-1 ring-emerald-400' : 'border-transparent opacity-70'
                }`}
              />
              <button
                onClick={() => setHologramColor('gold')}
                title="Royal Kangla Gold"
                className={`w-4 h-4 rounded-full bg-amber-400 border ${
                  hologramColor === 'gold' ? 'border-white ring-1 ring-amber-400' : 'border-transparent opacity-70'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
