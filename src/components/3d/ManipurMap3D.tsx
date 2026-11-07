/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TOURISM_SPOTS } from '../../data/manipurKnowledge';
import { TourismSpot } from '../../types';
import { MapPin, Compass, Navigation, Info, ExternalLink } from 'lucide-react';

interface ManipurMap3DProps {
  onSelectSpot?: (spot: TourismSpot) => void;
}

export const ManipurMap3D: React.FC<ManipurMap3DProps> = ({ onSelectSpot }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSpot, setSelectedSpot] = useState<TourismSpot | null>(TOURISM_SPOTS[0]);
  const [cameraView, setCameraView] = useState<'valley' | 'overview' | 'shirui'>('overview');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 3.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(3, 5, 2);
    scene.add(keyLight);

    const purpleFill = new THREE.DirectionalLight(0xa855f7, 2.0);
    purpleFill.position.set(-3, 4, -2);
    scene.add(purpleFill);

    // Procedural Manipur Terrain Map (Valley surrounded by 9 mountain ridges)
    const terrainGroup = new THREE.Group();
    scene.add(terrainGroup);

    const terrainWidth = 4.2;
    const terrainHeight = 4.6;
    const segments = 48;
    const terrainGeom = new THREE.PlaneGeometry(terrainWidth, terrainHeight, segments, segments);
    terrainGeom.rotateX(-Math.PI / 2);

    const posAttr = terrainGeom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);

      // Distance from central valley (Imphal)
      const distFromCenter = Math.sqrt(x * x + z * z);
      
      // Valleys stay low; outer boundaries rise into Ukhrul, Senapati, Tamenglong, Churachandpur hills
      let elevation = 0;
      if (distFromCenter > 0.9) {
        elevation = Math.pow((distFromCenter - 0.9) * 0.9, 1.4);
        elevation += Math.sin(x * 6) * 0.08 + Math.cos(z * 5) * 0.08;
      }

      // Loktak lake depression in south-west
      const distToLoktak = Math.sqrt(Math.pow(x - (-0.3), 2) + Math.pow(z - 0.8, 2));
      if (distToLoktak < 0.65) {
        elevation = -0.06;
      }

      // Shirui Kashong peak elevation in north-east
      const distToShirui = Math.sqrt(Math.pow(x - 0.8, 2) + Math.pow(z - (-0.9), 2));
      if (distToShirui < 0.5) {
        elevation = 0.55 + Math.cos(distToShirui * 5) * 0.15;
      }

      posAttr.setY(i, elevation);
    }
    terrainGeom.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.35,
      roughness: 0.75,
      metalness: 0.2,
      wireframe: false,
    });
    const terrainMesh = new THREE.Mesh(terrainGeom, terrainMat);
    terrainGroup.add(terrainMesh);

    // Holographic elevation grid lines
    const gridOverlayMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const gridMesh = new THREE.Mesh(terrainGeom, gridOverlayMat);
    gridMesh.position.y += 0.005;
    terrainGroup.add(gridMesh);

    // Loktak Water Surface disc
    const waterGeom = new THREE.CircleGeometry(0.55, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const waterMesh = new THREE.Mesh(waterGeom, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(-0.3, -0.04, 0.8);
    terrainGroup.add(waterMesh);

    // Floating Phumdis on Loktak Lake (3 small green-gold circular discs)
    const phumdiMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      emissive: 0x14532d,
      roughness: 0.9,
    });
    [
      { x: -0.28, z: 0.75, r: 0.09 },
      { x: -0.38, z: 0.88, r: 0.07 },
      { x: -0.18, z: 0.82, r: 0.08 },
    ].forEach((p) => {
      const pGeom = new THREE.CylinderGeometry(p.r, p.r, 0.02, 16);
      const pMesh = new THREE.Mesh(pGeom, phumdiMat);
      pMesh.position.set(p.x, -0.025, p.z);
      terrainGroup.add(pMesh);
    });

    // 3D Landmark Beacon Pins
    const pinGroup = new THREE.Group();
    terrainGroup.add(pinGroup);

    const pinMeshes: { mesh: THREE.Mesh; spot: TourismSpot }[] = [];

    TOURISM_SPOTS.forEach((spot) => {
      const pinSubGroup = new THREE.Group();
      pinSubGroup.position.set(spot.coordinates.x, spot.coordinates.y + 0.15, spot.coordinates.z);

      // Glowing beacon pillar
      const beaconGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 12);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: spot.id === 'loktak-lake' ? 0x38bdf8 : spot.id === 'kangla-fort' ? 0xf59e0b : 0xd946ef,
        transparent: true,
        opacity: 0.9,
      });
      const beacon = new THREE.Mesh(beaconGeom, beaconMat);
      beacon.position.y = 0.175;
      pinSubGroup.add(beacon);

      // Pulsing head sphere
      const headGeom = new THREE.SphereGeometry(0.06, 16, 16);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: spot.id === 'loktak-lake' ? 0x0284c7 : 0xa855f7,
        emissiveIntensity: 1.8,
      });
      const headMesh = new THREE.Mesh(headGeom, headMat);
      headMesh.position.y = 0.35;
      pinSubGroup.add(headMesh);

      pinGroup.add(pinSubGroup);
      pinMeshes.push({ mesh: headMesh, spot });
    });

    // Raycasting for interactive pin clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinMeshes.map(p => p.mesh));

      if (intersects.length > 0) {
        const hit = pinMeshes.find(p => p.mesh === intersects[0].object);
        if (hit) {
          setSelectedSpot(hit.spot);
          onSelectSpot?.(hit.spot);
        }
      }
    };

    container.addEventListener('click', handleClick);

    // Subtle gentle terrain rotation
    let frameId = 0;
    let clock = new THREE.Clock();

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Slow terrain rotation
      terrainGroup.rotation.y = elapsed * 0.04;

      // Pulse landmark pins
      pinMeshes.forEach((item, idx) => {
        const s = 1 + Math.sin(elapsed * 3 + idx) * 0.15;
        item.mesh.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(frameId);
      terrainGeom.dispose();
      terrainMat.dispose();
      gridOverlayMat.dispose();
      waterGeom.dispose();
      waterMat.dispose();
      phumdiMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraView]);

  return (
    <div className="relative w-full h-[540px] rounded-2xl overflow-hidden glass-panel border border-slate-700/80 shadow-2xl flex flex-col md:flex-row">
      {/* 3D Map Viewport */}
      <div className="relative flex-1 h-full min-h-[320px]">
        <div ref={mountRef} className="w-full h-full cursor-pointer" />

        {/* Viewport Overlay Controls */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-cyan-300 font-medium flex items-center gap-1.5 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" /> 3D Topographical Manipur
          </span>
        </div>

        {/* Legend / Quick Landmark Selectors */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none z-10">
          {TOURISM_SPOTS.slice(0, 5).map((spot) => (
            <button
              key={spot.id}
              onClick={() => {
                setSelectedSpot(spot);
                onSelectSpot?.(spot);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 backdrop-blur-md border ${
                selectedSpot?.id === spot.id
                  ? 'bg-purple-600/80 text-white border-purple-400 shadow-lg shadow-purple-500/25'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {spot.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Landmark Detail Card */}
      {selectedSpot && (
        <div className="w-full md:w-80 lg:w-96 p-5 bg-slate-900/95 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[11px] font-semibold text-purple-400 tracking-wider uppercase">
                  {selectedSpot.district}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {selectedSpot.name}
                </h3>
                <p className="text-xs text-slate-400 font-serif mt-0.5">
                  {selectedSpot.nativeName}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-[10px] font-medium shrink-0">
                {selectedSpot.distanceFromImphal} from Imphal
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedSpot.description}
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-400 block font-medium text-[11px] mb-0.5">
                  Significance:
                </span>
                <span className="text-slate-200">
                  {selectedSpot.significance}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <span className="text-slate-400 block font-medium text-[11px] mb-0.5">
                  Best Time To Visit:
                </span>
                <span className="text-emerald-400 font-medium">
                  {selectedSpot.bestSeason}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {selectedSpot.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-800/40 text-[10px] text-purple-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
            <button
              onClick={() => onSelectSpot?.(selectedSpot)}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" /> Ask AI About This Spot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
