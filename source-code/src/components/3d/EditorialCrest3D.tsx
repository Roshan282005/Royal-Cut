import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface EditorialCrest3DProps {
  className?: string;
}

export const EditorialCrest3D: React.FC<EditorialCrest3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;
    const isMobile = window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2);

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 40);
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
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Master Crest Group
    const crestGroup = new THREE.Group();
    scene.add(crestGroup);

    // 2. Physical Luxury Materials
    // Brushed Champagne Gold
    const champagneGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd8b874,
      roughness: 0.24,
      metalness: 0.92,
    });

    // Polished Mirror Gold Bevel
    const polishedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xfcf4dc,
      roughness: 0.1,
      metalness: 0.98,
    });

    // Dark Obsidian / Gunmetal Core Plate
    const obsidianCoreMat = new THREE.MeshStandardMaterial({
      color: 0x121217,
      roughness: 0.42,
      metalness: 0.88,
    });

    // 3. Heraldic Shield Medallion (Beveled Octagonal Plaque)
    // Octagonal Outer Bevel Ring (Extruded shape)
    const shieldShape = new THREE.Shape();
    const r = 1.35;
    const cut = 0.42;
    shieldShape.moveTo(-r + cut, r);
    shieldShape.lineTo(r - cut, r);
    shieldShape.lineTo(r, r - cut);
    shieldShape.lineTo(r, -r + cut);
    shieldShape.lineTo(r - cut, -r);
    shieldShape.lineTo(-r + cut, -r);
    shieldShape.lineTo(-r, -r + cut);
    shieldShape.lineTo(-r, r - cut);
    shieldShape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: isMobile ? 3 : 5,
    };

    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeo.center();
    const shieldMesh = new THREE.Mesh(shieldGeo, polishedGoldMat);
    crestGroup.add(shieldMesh);

    // Dark Obsidian Inset Center Plate
    const innerShape = new THREE.Shape();
    const inR = 1.2;
    const inCut = 0.38;
    innerShape.moveTo(-inR + inCut, inR);
    innerShape.lineTo(inR - inCut, inR);
    innerShape.lineTo(inR, inR - inCut);
    innerShape.lineTo(inR, -inR + inCut);
    innerShape.lineTo(inR - inCut, -inR);
    innerShape.lineTo(-inR + inCut, -inR);
    innerShape.lineTo(-inR, -inR + inCut);
    innerShape.lineTo(-inR, inR - inCut);
    innerShape.closePath();

    const innerGeo = new THREE.ShapeGeometry(innerShape);
    const innerMesh = new THREE.Mesh(innerGeo, obsidianCoreMat);
    innerMesh.position.z = 0.082;
    crestGroup.add(innerMesh);

    // Inner Fine Gold Inscription Border
    const innerBorderGeo = new THREE.RingGeometry(1.02, 1.05, isMobile ? 32 : 48);
    const innerBorderMesh = new THREE.Mesh(innerBorderGeo, champagneGoldMat);
    innerBorderMesh.position.z = 0.085;
    crestGroup.add(innerBorderMesh);

    // 4. Architectural Crown & Shears Relief
    const emblemGroup = new THREE.Group();
    emblemGroup.position.set(0, 0, 0.09);

    // Crossed Master Blades (Handcrafted shear relief)
    const bladeGeo = new THREE.BoxGeometry(0.04, 1.25, 0.02);
    const blade1 = new THREE.Mesh(bladeGeo, champagneGoldMat);
    blade1.rotation.z = Math.PI / 4;
    emblemGroup.add(blade1);

    const blade2 = new THREE.Mesh(bladeGeo, champagneGoldMat);
    blade2.rotation.z = -Math.PI / 4;
    emblemGroup.add(blade2);

    // Geometric Diamond Center Star
    const diamondGeo = new THREE.OctahedronGeometry(0.18, 0);
    const diamondMesh = new THREE.Mesh(diamondGeo, polishedGoldMat);
    diamondMesh.position.z = 0.04;
    emblemGroup.add(diamondMesh);

    // Crown Finial at Top of Shield
    const crownBaseGeo = new THREE.BoxGeometry(0.55, 0.04, 0.02);
    const crownBase = new THREE.Mesh(crownBaseGeo, champagneGoldMat);
    crownBase.position.set(0, 0.72, 0);
    emblemGroup.add(crownBase);

    const crownSpikeGeo = new THREE.ConeGeometry(0.12, 0.35, 4);
    const crownSpikeCenter = new THREE.Mesh(crownSpikeGeo, polishedGoldMat);
    crownSpikeCenter.position.set(0, 0.88, 0);
    emblemGroup.add(crownSpikeCenter);

    const crownSpikeLeft = new THREE.Mesh(crownSpikeGeo, champagneGoldMat);
    crownSpikeLeft.position.set(-0.22, 0.84, 0);
    crownSpikeLeft.scale.set(0.8, 0.8, 0.8);
    crownSpikeLeft.rotation.z = 0.2;
    emblemGroup.add(crownSpikeLeft);

    const crownSpikeRight = new THREE.Mesh(crownSpikeGeo, champagneGoldMat);
    crownSpikeRight.position.set(0.22, 0.84, 0);
    crownSpikeRight.scale.set(0.8, 0.8, 0.8);
    crownSpikeRight.rotation.z = -0.2;
    emblemGroup.add(crownSpikeRight);

    crestGroup.add(emblemGroup);

    // 5. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x181820, 2.2);
    scene.add(ambientLight);

    // Warm Directional Studio Light
    const keyLight = new THREE.DirectionalLight(0xfff3df, 4.0);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    // Warm Champagne Gold Rim Light
    const rimLight = new THREE.PointLight(0xd8b874, 3.5, 8);
    rimLight.position.set(-3, -2, 3);
    scene.add(rimLight);

    // Cursor Follow Light for dynamic surface sheen
    const cursorLight = new THREE.PointLight(0xffeed0, 2.5, 5);
    cursorLight.position.set(0, 0, 3);
    scene.add(cursorLight);

    // 6. Controlled Mouse Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Controlled tilt: maximum 0.08 rad (4.5 degrees)
      targetRotY = Math.max(-0.08, Math.min(0.08, x * 0.08));
      targetRotX = Math.max(-0.06, Math.min(0.06, -y * 0.06));

      cursorLight.position.x = x * 2.0;
      cursorLight.position.y = y * 2.0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation for rotation
      currentRotX += (targetRotX - currentRotX) * 0.04;
      currentRotY += (targetRotY - currentRotY) * 0.04;

      // Restrained breathing float (under 1.5 degrees)
      crestGroup.rotation.y = currentRotY + Math.sin(elapsed * 0.35) * 0.015;
      crestGroup.rotation.x = currentRotX + Math.cos(elapsed * 0.28) * 0.01;
      crestGroup.position.y = Math.sin(elapsed * 0.5) * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shieldGeo.dispose();
      innerGeo.dispose();
      innerBorderGeo.dispose();
      bladeGeo.dispose();
      diamondGeo.dispose();
      crownBaseGeo.dispose();
      crownSpikeGeo.dispose();
      champagneGoldMat.dispose();
      polishedGoldMat.dispose();
      obsidianCoreMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
