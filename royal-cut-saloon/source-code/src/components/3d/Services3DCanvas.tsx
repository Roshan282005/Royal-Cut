import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Services3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = width < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.2);

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
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Group for the 3D craftsmanship tools
    const toolGroup = new THREE.Group();
    scene.add(toolGroup);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.95,
      roughness: 0.15,
    });

    const polishedTitanium = new THREE.MeshStandardMaterial({
      color: 0xe0e0e8,
      metalness: 0.9,
      roughness: 0.2,
    });

    const darkObsidian = new THREE.MeshStandardMaterial({
      color: 0x141418,
      metalness: 0.4,
      roughness: 0.5,
    });

    // 1. Master Barber Shears
    const shearsGroup = new THREE.Group();

    // Blade 1
    const bladeGeo = new THREE.BoxGeometry(0.04, 1.3, 0.015);
    const blade1 = new THREE.Mesh(bladeGeo, polishedTitanium);
    blade1.position.set(0, 0.2, 0);
    shearsGroup.add(blade1);

    // Blade 2 (crossed)
    const blade2 = new THREE.Mesh(bladeGeo, polishedTitanium);
    blade2.position.set(0, 0.2, 0.01);
    blade2.rotation.z = -0.3;
    shearsGroup.add(blade2);

    // Pivot Screw (Gold)
    const pivotGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
    const pivot = new THREE.Mesh(pivotGeo, goldMaterial);
    pivot.rotation.x = Math.PI / 2;
    pivot.position.set(0, -0.15, 0.01);
    shearsGroup.add(pivot);

    // Finger Rings (Gold)
    const ringGeo = new THREE.TorusGeometry(0.12, 0.03, 16, 32);
    const ring1 = new THREE.Mesh(ringGeo, goldMaterial);
    ring1.position.set(-0.12, -0.65, 0);
    shearsGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, goldMaterial);
    ring2.position.set(0.14, -0.68, 0.01);
    ring2.rotation.z = 0.2;
    shearsGroup.add(ring2);

    shearsGroup.position.set(-0.6, 0.1, 0);
    shearsGroup.rotation.z = 0.25;
    shearsGroup.scale.set(0.9, 0.9, 0.9);
    toolGroup.add(shearsGroup);

    // 2. Straight Razor
    const razorGroup = new THREE.Group();

    // Handle (Dark Obsidian Wood)
    const handleGeo = new THREE.BoxGeometry(0.08, 1.1, 0.03);
    const handle = new THREE.Mesh(handleGeo, darkObsidian);
    handle.position.set(0, -0.4, 0);
    handle.rotation.z = 0.2;
    razorGroup.add(handle);

    // Razor Blade (Polished Steel with Gold Spine)
    const razorBladeGeo = new THREE.BoxGeometry(0.18, 1.0, 0.015);
    const razorBlade = new THREE.Mesh(razorBladeGeo, polishedTitanium);
    razorBlade.position.set(0.12, 0.35, 0);
    razorBlade.rotation.z = -0.25;
    razorGroup.add(razorBlade);

    // Razor Gold Spine Trim
    const spineGeo = new THREE.BoxGeometry(0.04, 1.02, 0.025);
    const spine = new THREE.Mesh(spineGeo, goldMaterial);
    spine.position.set(0.2, 0.35, 0);
    spine.rotation.z = -0.25;
    razorGroup.add(spine);

    // Razor Hinge Pin (Gold)
    const hingeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.05, 16);
    const hinge = new THREE.Mesh(hingeGeo, goldMaterial);
    hinge.rotation.x = Math.PI / 2;
    hinge.position.set(0.02, 0, 0);
    razorGroup.add(hinge);

    razorGroup.position.set(0.65, -0.1, 0.1);
    razorGroup.rotation.z = -0.3;
    razorGroup.scale.set(0.85, 0.85, 0.85);
    toolGroup.add(razorGroup);

    // 3. Subtle floating gold halo / luxury ring behind
    const ringAccentGeo = new THREE.TorusGeometry(1.6, 0.02, 16, isMobile ? 32 : 64);
    const ringAccent = new THREE.Mesh(ringAccentGeo, goldMaterial);
    ringAccent.position.set(0, 0, -0.4);
    toolGroup.add(ringAccent);

    // Subtle Champagne particles
    const particleCount = isMobile ? 20 : 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdeb86a,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting setup for rich metallic reflections
    const ambientLight = new THREE.AmbientLight(0x222228, 1.4);
    scene.add(ambientLight);

    const warmLight = new THREE.DirectionalLight(0xffecd0, 4.5);
    warmLight.position.set(3, 4, 5);
    scene.add(warmLight);

    const goldPointLight = new THREE.PointLight(0xc5a059, 3.2, 8);
    goldPointLight.position.set(-3, -2, 3);
    scene.add(goldPointLight);

    const coolRimLight = new THREE.PointLight(0x8899bb, 2.0, 6);
    coolRimLight.position.set(0, 3, -2);
    scene.add(coolRimLight);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation for parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Gentle organic oscillation
      toolGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.2 + mouseX;
      toolGroup.rotation.x = Math.cos(elapsed * 0.4) * 0.12 - mouseY;
      toolGroup.position.y = Math.sin(elapsed * 0.7) * 0.06;

      shearsGroup.rotation.z = 0.25 + Math.sin(elapsed * 0.8) * 0.05;
      blade2.rotation.z = -0.3 + Math.sin(elapsed * 1.2) * 0.08;

      ringAccent.rotation.z = elapsed * 0.05;
      particles.rotation.y = elapsed * 0.02;

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
      window.removeEventListener('mousemove', handleMouseMove);
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
      className="w-full h-[220px] sm:h-[260px] pointer-events-none flex items-center justify-center relative z-10"
      aria-hidden="true"
    />
  );
};
