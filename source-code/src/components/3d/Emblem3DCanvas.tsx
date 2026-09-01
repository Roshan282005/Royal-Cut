import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Emblem3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = width < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.5);

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
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Group
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Metallic Gold & Titanium Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.95,
      roughness: 0.18,
    });

    const darkGoldMat = new THREE.MeshStandardMaterial({
      color: 0x8a6e35,
      metalness: 0.9,
      roughness: 0.3,
    });

    // Outer Octagonal / Torus Luxury Crest Ring
    const outerRingGeo = new THREE.TorusGeometry(1.3, 0.07, 16, isMobile ? 32 : 64);
    const outerRing = new THREE.Mesh(outerRingGeo, goldMat);
    emblemGroup.add(outerRing);

    // Inner Concentric Beveled Ring
    const innerRingGeo = new THREE.TorusGeometry(1.05, 0.04, 16, isMobile ? 32 : 64);
    const innerRing = new THREE.Mesh(innerRingGeo, darkGoldMat);
    emblemGroup.add(innerRing);

    // Crown / Crest Geometry (3 Stylized Royal Spikes)
    const crownCenterGeo = new THREE.ConeGeometry(0.24, 0.75, 4);
    const crownCenter = new THREE.Mesh(crownCenterGeo, goldMat);
    crownCenter.position.set(0, 0.25, 0);
    emblemGroup.add(crownCenter);

    const crownLeftGeo = new THREE.ConeGeometry(0.18, 0.55, 4);
    const crownLeft = new THREE.Mesh(crownLeftGeo, goldMat);
    crownLeft.position.set(-0.35, 0.15, 0);
    crownLeft.rotation.z = 0.3;
    emblemGroup.add(crownLeft);

    const crownRight = new THREE.Mesh(crownLeftGeo, goldMat);
    crownRight.position.set(0.35, 0.15, 0);
    crownRight.rotation.z = -0.3;
    emblemGroup.add(crownRight);

    // Crossed Master Barber Scissors in Crest
    const bladeGeo = new THREE.BoxGeometry(0.04, 1.1, 0.02);
    const blade1 = new THREE.Mesh(bladeGeo, goldMat);
    blade1.position.set(0, -0.2, 0.02);
    blade1.rotation.z = Math.PI / 4;
    emblemGroup.add(blade1);

    const blade2 = new THREE.Mesh(bladeGeo, goldMat);
    blade2.position.set(0, -0.2, 0.02);
    blade2.rotation.z = -Math.PI / 4;
    emblemGroup.add(blade2);

    // Center Diamond Gem Inlay
    const gemGeo = new THREE.OctahedronGeometry(0.16, 0);
    const gem = new THREE.Mesh(gemGeo, goldMat);
    gem.position.set(0, -0.2, 0.04);
    emblemGroup.add(gem);

    // Floating Champagne Sparkles
    const particleCount = isMobile ? 25 : 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdeb86a,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222228, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffecd0, 4);
    dirLight1.position.set(3, 4, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.PointLight(0xc5a059, 3.5, 8);
    dirLight2.position.set(-3, -2, 3);
    scene.add(dirLight2);

    // Animation
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      emblemGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.35;
      emblemGroup.rotation.x = Math.cos(elapsed * 0.3) * 0.15;
      emblemGroup.position.y = Math.sin(elapsed * 0.8) * 0.08;

      particles.rotation.y = elapsed * 0.015;

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
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[280px] sm:h-[340px] pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    />
  );
};
