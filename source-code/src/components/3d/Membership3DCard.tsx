import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface Membership3DCardProps {
  activeTier: 'FOUNDER' | 'GOLD' | 'BLACK';
  onSelectTier?: (tier: 'FOUNDER' | 'GOLD' | 'BLACK') => void;
}

// Generate high-resolution 2048x1296 canvas texture for realistic physical card
function createCardTexture(tier: 'FOUNDER' | 'GOLD' | 'BLACK', isBack = false): {
  diffuse: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
} {
  const width = 2048;
  const height = 1296;

  // Diffuse Canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Bump Canvas (grayscale height map)
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d')!;

  // Roughness Canvas (dark = glossy/specular, light = rough/matte)
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = width;
  roughCanvas.height = height;
  const rCtx = roughCanvas.getContext('2d')!;

  // 1. Base Backgrounds
  if (tier === 'FOUNDER') {
    // Obsidian Titanium Matte with subtle gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#101014');
    bgGrad.addColorStop(0.5, '#17171d');
    bgGrad.addColorStop(1, '#0b0b0e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, width, height);

    rCtx.fillStyle = '#b0b0b0'; // matte background
    rCtx.fillRect(0, 0, width, height);
  } else if (tier === 'GOLD') {
    // Rich Satin Champagne Gold
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#1a160f');
    bgGrad.addColorStop(0.5, '#292113');
    bgGrad.addColorStop(1, '#130f08');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, width, height);

    rCtx.fillStyle = '#909090';
    rCtx.fillRect(0, 0, width, height);
  } else {
    // Obsidian Black PVD
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#060608');
    bgGrad.addColorStop(0.5, '#0a0a0d');
    bgGrad.addColorStop(1, '#040405');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    bCtx.fillStyle = '#808080';
    bCtx.fillRect(0, 0, width, height);

    rCtx.fillStyle = '#a0a0a0';
    rCtx.fillRect(0, 0, width, height);
  }

  // 2. Micro Brushed Metal / Fine Texture Lines
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  for (let y = 0; y < height; y += 4) {
    ctx.beginPath();
    ctx.moveTo(0, y + (Math.random() * 2 - 1));
    ctx.lineTo(width, y + (Math.random() * 2 - 1));
    ctx.stroke();
  }
  ctx.restore();

  // 3. Subtle Guilloche / Architectural Watermark in Center
  ctx.save();
  ctx.globalAlpha = tier === 'GOLD' ? 0.07 : 0.04;
  ctx.strokeStyle = '#deb86a';
  ctx.lineWidth = 1.5;
  const cx = width / 2;
  const cy = height / 2;
  for (let r = 120; r <= 380; r += 20) {
    ctx.beginPath();
    for (let theta = 0; theta <= Math.PI * 2; theta += 0.05) {
      const radius = r + Math.sin(theta * 12) * 8;
      const x = cx + radius * Math.cos(theta);
      const y = cy + radius * Math.sin(theta);
      if (theta === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();

  // 4. Gold Palette Definitions
  const goldLight = '#fae4b2';
  const goldMid = '#d6b26d';
  const goldDark = '#947432';

  const goldGrad = ctx.createLinearGradient(100, 100, width - 100, height - 100);
  goldGrad.addColorStop(0, goldLight);
  goldGrad.addColorStop(0.3, goldMid);
  goldGrad.addColorStop(0.7, goldLight);
  goldGrad.addColorStop(1, goldDark);

  if (!isBack) {
    // ================= FRONT FACE =================
    // A. Double Pinstripe Perimeter with Chamfered Corners
    const p = 80;
    const inset = 24;

    // Outer gold border
    ctx.save();
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 4;
    ctx.strokeRect(p, p, width - p * 2, height - p * 2);

    // Inner gold border
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.6;
    ctx.strokeRect(p + inset, p + inset, width - (p + inset) * 2, height - (p + inset) * 2);
    ctx.restore();

    // Bump for borders
    bCtx.save();
    bCtx.strokeStyle = '#ffffff';
    bCtx.lineWidth = 4;
    bCtx.strokeRect(p, p, width - p * 2, height - p * 2);
    bCtx.lineWidth = 2;
    bCtx.strokeRect(p + inset, p + inset, width - (p + inset) * 2, height - (p + inset) * 2);
    bCtx.restore();

    // Roughness for borders (metallic glossy)
    rCtx.save();
    rCtx.strokeStyle = '#202020';
    rCtx.lineWidth = 6;
    rCtx.strokeRect(p, p, width - p * 2, height - p * 2);
    rCtx.restore();

    // B. Royal Crown & Crest Top Center
    const crestY = 220;
    ctx.save();
    ctx.fillStyle = goldGrad;
    ctx.shadowColor = 'rgba(214, 178, 109, 0.4)';
    ctx.shadowBlur = 12;

    // Crown Path
    ctx.beginPath();
    ctx.moveTo(cx - 50, crestY);
    ctx.lineTo(cx - 35, crestY - 45);
    ctx.lineTo(cx - 15, crestY - 20);
    ctx.lineTo(cx, crestY - 60); // Peak
    ctx.lineTo(cx + 15, crestY - 20);
    ctx.lineTo(cx + 35, crestY - 45);
    ctx.lineTo(cx + 50, crestY);
    ctx.closePath();
    ctx.fill();

    // Crown Base Arch & Jewels
    ctx.fillRect(cx - 52, crestY + 4, 104, 8);
    ctx.beginPath();
    ctx.arc(cx, crestY - 62, 5, 0, Math.PI * 2);
    ctx.arc(cx - 35, crestY - 47, 4, 0, Math.PI * 2);
    ctx.arc(cx + 35, crestY - 47, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Crown Bump & Gloss
    bCtx.save();
    bCtx.fillStyle = '#ffffff';
    bCtx.beginPath();
    bCtx.moveTo(cx - 50, crestY);
    bCtx.lineTo(cx - 35, crestY - 45);
    bCtx.lineTo(cx - 15, crestY - 20);
    bCtx.lineTo(cx, crestY - 60);
    bCtx.lineTo(cx + 15, crestY - 20);
    bCtx.lineTo(cx + 35, crestY - 45);
    bCtx.lineTo(cx + 50, crestY);
    bCtx.closePath();
    bCtx.fill();
    bCtx.fillRect(cx - 52, crestY + 4, 104, 8);
    bCtx.restore();

    rCtx.save();
    rCtx.fillStyle = '#101010';
    rCtx.fillRect(cx - 60, crestY - 70, 120, 90);
    rCtx.restore();

    // C. Top Typography: ROYAL CUT
    ctx.save();
    ctx.font = '600 38px "Cinzel", serif';
    ctx.fillStyle = goldGrad;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '14px';
    ctx.fillText('ROYAL CUT', cx + 7, 310);

    // Sub: THE ROYAL CLUB
    ctx.font = '500 20px "Cinzel", sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillStyle = '#d6b26d';
    ctx.fillText('THE ROYAL CLUB', cx + 4, 348);
    ctx.restore();

    // Bump for ROYAL CUT
    bCtx.save();
    bCtx.font = '600 38px "Cinzel", serif';
    bCtx.fillStyle = '#ffffff';
    bCtx.textAlign = 'center';
    bCtx.letterSpacing = '14px';
    bCtx.fillText('ROYAL CUT', cx + 7, 310);
    bCtx.font = '500 20px "Cinzel", sans-serif';
    bCtx.letterSpacing = '8px';
    bCtx.fillText('THE ROYAL CLUB', cx + 4, 348);
    bCtx.restore();

    // D. Center Tier Title (FOUNDERS VIP / ROYAL GOLD / OBSIDIAN BLACK)
    const tierTitle =
      tier === 'FOUNDER' ? 'FOUNDERS VIP' : tier === 'GOLD' ? 'ROYAL GOLD' : 'OBSIDIAN BLACK';
    const tierSerial =
      tier === 'FOUNDER' ? '001 / VIP' : tier === 'GOLD' ? '042 / GOLD' : '018 / OBSIDIAN';

    ctx.save();
    ctx.font = '700 68px "Bodoni Moda", "Cinzel", serif';
    ctx.fillStyle = goldGrad;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '12px';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 16;
    ctx.fillText(tierTitle, cx + 6, 560);
    ctx.restore();

    bCtx.save();
    bCtx.font = '700 68px "Bodoni Moda", "Cinzel", serif';
    bCtx.fillStyle = '#ffffff';
    bCtx.textAlign = 'center';
    bCtx.letterSpacing = '12px';
    bCtx.fillText(tierTitle, cx + 6, 560);
    bCtx.restore();

    // E. Center Editorial Tagline
    ctx.save();
    ctx.font = 'italic 400 32px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#f4ecd8';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '3px';
    ctx.fillText('CRAFTED FOR THOSE WHO SET THE STANDARD.', cx, 660);

    // F. Priority • Privilege • Prestige
    ctx.font = '600 22px "Cinzel", sans-serif';
    ctx.fillStyle = '#c5a059';
    ctx.letterSpacing = '8px';
    ctx.fillText('PRIORITY  •  PRIVILEGE  •  PRESTIGE', cx + 4, 750);
    ctx.restore();

    bCtx.save();
    bCtx.font = '600 22px "Cinzel", sans-serif';
    bCtx.fillStyle = '#d0d0d0';
    bCtx.textAlign = 'center';
    bCtx.letterSpacing = '8px';
    bCtx.fillText('PRIORITY  •  PRIVILEGE  •  PRESTIGE', cx + 4, 750);
    bCtx.restore();

    // G. Bottom Row Details
    // Left: MEMBER SINCE DAY ONE
    ctx.save();
    ctx.font = '600 18px "Cinzel", sans-serif';
    ctx.fillStyle = '#9e8c6e';
    ctx.textAlign = 'left';
    ctx.letterSpacing = '4px';
    ctx.fillText('MEMBER SINCE DAY ONE', p + 45, height - p - 45);

    // Right: SERIAL NUMBER
    ctx.font = '700 24px "Plus Jakarta Sans", monospace';
    ctx.fillStyle = goldLight;
    ctx.textAlign = 'right';
    ctx.letterSpacing = '4px';
    ctx.fillText(tierSerial, width - p - 45, height - p - 42);

    // Small Gold Monogram RC Emblem bottom-right
    ctx.font = '600 16px "Cinzel", serif';
    ctx.fillStyle = '#c5a059';
    ctx.fillText('NEW YORK', width - p - 45, height - p - 75);
    ctx.restore();

    bCtx.save();
    bCtx.font = '700 24px "Plus Jakarta Sans", monospace';
    bCtx.fillStyle = '#ffffff';
    bCtx.textAlign = 'right';
    bCtx.letterSpacing = '4px';
    bCtx.fillText(tierSerial, width - p - 45, height - p - 42);
    bCtx.restore();
  } else {
    // ================= BACK FACE =================
    // High-Gloss Black Magnetic Security Band
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 160, width, 220);

    bCtx.fillStyle = '#707070';
    bCtx.fillRect(0, 160, width, 220);

    rCtx.fillStyle = '#050505'; // glossy
    rCtx.fillRect(0, 160, width, 220);

    // Signature / Verification Strip
    ctx.fillStyle = '#1c1b20';
    ctx.fillRect(100, 440, width - 200, 140);
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 1;
    ctx.strokeRect(100, 440, width - 200, 140);

    ctx.font = 'italic 24px "Cormorant Garamond", cursive';
    ctx.fillStyle = '#8f887a';
    ctx.fillText('Authorized VIP Signature & Biometric Verification', 140, 520);

    // Back Legal & Concierge text
    ctx.save();
    ctx.font = '500 20px "Cinzel", sans-serif';
    ctx.fillStyle = goldGrad;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '4px';
    ctx.fillText('ROYAL CUT SALOON  •  PRIVATE MEMBERS COLLECTIVE', cx, 680);

    ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#80796f';
    ctx.fillText('2345 HEMPSTEAD TURNPIKE, EAST MEADOW, NY 11554', cx, 740);
    ctx.fillText('VIP CONCIERGE DIRECT: (516) 485-6184  •  NON-TRANSFERABLE CREDENTIAL', cx, 790);

    // Holographic RC seal
    const sealGrad = ctx.createRadialGradient(cx, 950, 10, cx, 950, 70);
    sealGrad.addColorStop(0, '#fae4b2');
    sealGrad.addColorStop(0.5, '#c5a059');
    sealGrad.addColorStop(1, '#57421c');
    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(cx, 950, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '700 24px "Cinzel", serif';
    ctx.fillStyle = '#121214';
    ctx.fillText('RC', cx, 958);
    ctx.restore();
  }

  const diffuse = new THREE.CanvasTexture(canvas);
  diffuse.anisotropy = 16;
  diffuse.needsUpdate = true;

  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.anisotropy = 16;
  bump.needsUpdate = true;

  const roughness = new THREE.CanvasTexture(roughCanvas);
  roughness.anisotropy = 16;
  roughness.needsUpdate = true;

  return { diffuse, bump, roughness };
}

export const Membership3DCard: React.FC<Membership3DCardProps> = ({
  activeTier,
  onSelectTier,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const cardGroup = new THREE.Group();
    cardGroupRef.current = cardGroup;
    scene.add(cardGroup);

    // Build Front & Back Textures
    const frontTex = createCardTexture(activeTier, false);
    const backTex = createCardTexture(activeTier, true);

    // Card Dimensions (Standard ratio 1.58:1)
    const cardW = 2.45;
    const cardH = 1.55;
    const cardThickness = 0.042;

    // Materials
    const goldColor =
      activeTier === 'FOUNDER' ? 0xd4af65 : activeTier === 'GOLD' ? 0xe2be74 : 0xb8924b;

    // Edge Frame Material (Polished Champagne Gold)
    const edgeMat = new THREE.MeshStandardMaterial({
      color: goldColor,
      metalness: 0.98,
      roughness: 0.16,
    });

    // Front Face Material
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex.diffuse,
      bumpMap: frontTex.bump,
      bumpScale: 0.004,
      roughnessMap: frontTex.roughness,
      metalness: activeTier === 'GOLD' ? 0.92 : 0.85,
      roughness: 0.24,
    });

    // Back Face Material
    const backMat = new THREE.MeshStandardMaterial({
      map: backTex.diffuse,
      bumpMap: backTex.bump,
      bumpScale: 0.003,
      roughnessMap: backTex.roughness,
      metalness: 0.85,
      roughness: 0.28,
    });

    // 6-Sided Card Box Material Array [right, left, top, bottom, front, back]
    const materials = [edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat];

    const cardGeo = new THREE.BoxGeometry(cardW, cardH, cardThickness, 32, 32, 4);
    const cardMesh = new THREE.Mesh(cardGeo, materials);
    cardGroup.add(cardMesh);

    // Polished Champagne Gold Rim Bevel Frame
    const frameGeo = new THREE.BoxGeometry(cardW + 0.02, cardH + 0.02, cardThickness - 0.005);
    const frameMesh = new THREE.Mesh(frameGeo, edgeMat);
    cardGroup.add(frameMesh);

    // Table / Ground Plane Soft Reflection
    const floorGeo = new THREE.PlaneGeometry(6, 4);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x050507,
      transparent: true,
      opacity: 0.65,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -1.25, 0.2);
    floorMesh.rotation.x = -Math.PI / 2.3;
    scene.add(floorMesh);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x22222a, 1.8);
    scene.add(ambientLight);

    // Key Warm Light
    const keyLight = new THREE.DirectionalLight(0xfffaea, 3.2);
    keyLight.position.set(2.8, 3.5, 4.5);
    scene.add(keyLight);

    // Dynamic Cursor Tracking Specular Light (Champagne Gold)
    const specularLight = new THREE.PointLight(0xf0c878, 4.8, 7.5);
    specularLight.position.set(0, 0.5, 3.2);
    scene.add(specularLight);

    // Rim Backlight (Cool Luxury Slate Blue)
    const rimLight = new THREE.PointLight(0x7692be, 2.2, 8);
    rimLight.position.set(-3, -1.5, -2.5);
    scene.add(rimLight);

    // Bottom Ambient Warm Glow
    const bottomGlow = new THREE.PointLight(0xc5a059, 1.8, 5);
    bottomGlow.position.set(0, -2, 2);
    scene.add(bottomGlow);

    // Smooth Cursor Tracking & Hover
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.75;
      targetY = y * 0.65;
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Damped mouse movement (lerp)
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Subtle resting float + gentle tilt
      const restingTiltY = Math.sin(elapsed * 0.7) * 0.06;
      const restingTiltX = Math.cos(elapsed * 0.5) * 0.04;
      const hoverLift = isHovered ? 0.08 : 0;

      cardGroup.rotation.y = restingTiltY + mouseX * 0.9;
      cardGroup.rotation.x = restingTiltX - mouseY * 0.8;
      cardGroup.position.y = Math.sin(elapsed * 1.1) * 0.03 + hoverLift;

      // Move specular highlight light with mouse
      specularLight.position.x = mouseX * 4.5;
      specularLight.position.y = -mouseY * 3.5 + 0.6;

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
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      frontTex.diffuse.dispose();
      frontTex.bump.dispose();
      frontTex.roughness.dispose();
      backTex.diffuse.dispose();
      backTex.bump.dispose();
      backTex.roughness.dispose();
    };
  }, [activeTier]);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Physical Card Stage */}
      <div className="relative w-full flex items-center justify-center">
        {/* Soft atmospheric background glow */}
        <div className="absolute w-[360px] h-[240px] rounded-full bg-[#c5a059]/10 blur-[80px] pointer-events-none -translate-y-4" />
        
        {/* 3D WebGL Canvas */}
        <div
          ref={containerRef}
          className="w-full h-[320px] sm:h-[380px] md:h-[420px] cursor-grab active:cursor-grabbing relative flex items-center justify-center z-10 select-none"
        />
      </div>

      {/* Realistic Table Reflection & Floor Base */}
      <div className="w-full max-w-[340px] sm:max-w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent -mt-3 mb-3" />

      {/* Interactive Guidance */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] text-[#9c8e76] uppercase font-sans-luxury">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
        <span>Hover & Drag to Inspect Metallic Engraving</span>
      </div>
    </div>
  );
};
