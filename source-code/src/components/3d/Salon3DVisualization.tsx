import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw } from 'lucide-react';

export const Salon3DVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'PANORAMA' | 'STATION' | 'LOUNGE'>('PANORAMA');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = width < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0c10, 0.05);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Materials
    const marbleFloorMat = new THREE.MeshStandardMaterial({
      color: 0x121216,
      roughness: 0.18,
      metalness: 0.25,
    });

    const darkWallMat = new THREE.MeshStandardMaterial({
      color: 0x09090c,
      roughness: 0.85,
      metalness: 0.1,
    });

    const mirrorGlassMat = new THREE.MeshStandardMaterial({
      color: 0x222630,
      roughness: 0.05,
      metalness: 0.95,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      roughness: 0.2,
      metalness: 0.92,
    });

    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.5,
      metalness: 0.2,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xdcdce0,
      roughness: 0.1,
      metalness: 0.95,
    });

    const salonGroup = new THREE.Group();
    scene.add(salonGroup);

    // 1. Black Marble Floor
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMesh = new THREE.Mesh(floorGeo, marbleFloorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.05;
    salonGroup.add(floorMesh);

    // 2. Back Feature Wall with Architectural Vertical Slats
    const wallGeo = new THREE.PlaneGeometry(16, 6);
    const wallMesh = new THREE.Mesh(wallGeo, darkWallMat);
    wallMesh.position.set(0, 3, -4);
    salonGroup.add(wallMesh);

    // Vertical Gold Trim Slats
    for (let i = -7; i <= 7; i += 1.4) {
      const slatGeo = new THREE.BoxGeometry(0.04, 5.8, 0.04);
      const slatMesh = new THREE.Mesh(slatGeo, goldAccentMat);
      slatMesh.position.set(i, 3, -3.95);
      salonGroup.add(slatMesh);
    }

    // 3. Three Master Barber Stations with Backlit Illuminated Mirrors
    const stationPositions = [-3.2, 0, 3.2];

    stationPositions.forEach((x) => {
      // Marble Countertop
      const counterGeo = new THREE.BoxGeometry(2.4, 0.85, 0.9);
      const counterMesh = new THREE.Mesh(counterGeo, marbleFloorMat);
      counterMesh.position.set(x, 0.42, -3.2);
      salonGroup.add(counterMesh);

      // Gold Trim on Counter
      const counterTrimGeo = new THREE.BoxGeometry(2.44, 0.04, 0.94);
      const counterTrim = new THREE.Mesh(counterTrimGeo, goldAccentMat);
      counterTrim.position.set(x, 0.85, -3.2);
      salonGroup.add(counterTrim);

      // Arching Luxury Mirror
      const mirrorGeo = new THREE.BoxGeometry(1.6, 2.4, 0.06);
      const mirrorMesh = new THREE.Mesh(mirrorGeo, mirrorGlassMat);
      mirrorMesh.position.set(x, 2.3, -3.9);
      salonGroup.add(mirrorMesh);

      // Gold Mirror Frame
      const frameGeo = new THREE.BoxGeometry(1.7, 2.5, 0.04);
      const frameMesh = new THREE.Mesh(frameGeo, goldAccentMat);
      frameMesh.position.set(x, 2.3, -3.92);
      salonGroup.add(frameMesh);

      // Warm Mirror Backlight
      const stationLight = new THREE.PointLight(0xffdfa0, 2.2, 5);
      stationLight.position.set(x, 2.4, -3.5);
      salonGroup.add(stationLight);

      // Barber Chair in front of each station
      const chair = new THREE.Group();
      // Base
      const chairBase = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.08, 24), chromeMat);
      chairBase.position.y = 0.04;
      chair.add(chairBase);
      // Shaft
      const chairShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.45, 16), chromeMat);
      chairShaft.position.y = 0.3;
      chair.add(chairShaft);
      // Cushion
      const chairCushion = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.48, 0.2, 24), leatherMat);
      chairCushion.position.y = 0.55;
      chair.add(chairCushion);
      // Backrest
      const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.14), leatherMat);
      chairBack.position.set(0, 0.95, 0.3);
      chair.add(chairBack);
      // Armrests
      [-0.45, 0.45].forEach((ax) => {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.45), goldAccentMat);
        arm.position.set(ax, 0.85, 0.05);
        chair.add(arm);
      });

      chair.position.set(x, 0, -1.8);
      salonGroup.add(chair);
    });

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x181822, 1.4);
    scene.add(ambientLight);

    const ceilingPendant1 = new THREE.PointLight(0xffecd0, 3.5, 12);
    ceilingPendant1.position.set(0, 4.5, 1);
    scene.add(ceilingPendant1);

    const ceilingPendant2 = new THREE.PointLight(0xc5a059, 2.5, 10);
    ceilingPendant2.position.set(-3, 4, 0);
    scene.add(ceilingPendant2);

    const ceilingPendant3 = new THREE.PointLight(0xc5a059, 2.5, 10);
    ceilingPendant3.position.set(3, 4, 0);
    scene.add(ceilingPendant3);

    // Camera viewpoints
    let targetCamPos = new THREE.Vector3(0, 1.6, 5);
    let targetLookAt = new THREE.Vector3(0, 1.5, -2);

    if (activeView === 'STATION') {
      targetCamPos.set(0, 1.4, 0.8);
      targetLookAt.set(0, 1.8, -3.8);
    } else if (activeView === 'LOUNGE') {
      targetCamPos.set(-4, 1.9, 3.5);
      targetLookAt.set(1.5, 1.2, -2.5);
    } else {
      targetCamPos.set(0, 1.7, 4.8);
      targetLookAt.set(0, 1.4, -2.5);
    }

    // Gentle camera orbit / mouse drag
    let isDragging = false;
    let previousMouseX = 0;
    let orbitAngle = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      previousMouseX = e.clientX;
      orbitAngle += deltaX * 0.005;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation towards target
      camera.position.lerp(targetCamPos, 0.05);

      // Subtle atmospheric oscillation
      if (!isDragging) {
        orbitAngle += 0.001;
      }

      const currentX = targetCamPos.x + Math.sin(orbitAngle + elapsed * 0.1) * 0.4;
      camera.position.x = currentX;
      camera.lookAt(targetLookAt);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeView]);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-xl overflow-hidden border border-zinc-800 bg-[#0a0a0d] shadow-2xl">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Control Overlay */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="bg-[#09090c]/85 border border-[#c5a059]/30 rounded-lg px-3.5 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
            <p className="text-xs font-serif-display tracking-widest text-[#f0dfbe] uppercase">
              3D ARCHITECTURAL LOUNGE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {(['PANORAMA', 'STATION', 'LOUNGE'] as const).map((view) => (
            <button
              key={view}
              id={`salon-view-${view.toLowerCase()}`}
              onClick={() => setActiveView(view)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wider transition-all backdrop-blur-md ${
                activeView === view
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'bg-black/60 text-zinc-300 border border-zinc-800 hover:border-[#c5a059]/40'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-zinc-400 pointer-events-none">
        <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded backdrop-blur-md">
          <RotateCw className="w-3 h-3 text-[#c5a059]" />
          <span>Click & Drag to Orbit Camera</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded backdrop-blur-md">
          <Eye className="w-3 h-3 text-[#c5a059]" />
          <span>Custom Belmont Chairs • Black Marble • Warm Brass</span>
        </div>
      </div>
    </div>
  );
};
