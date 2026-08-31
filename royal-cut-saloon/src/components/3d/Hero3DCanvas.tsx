import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect device characteristics
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2);

    // 1. Scene, Fog, Camera
    const scene = new THREE.Scene();
    // Deep atmospheric studio fog
    scene.fog = new THREE.FogExp2(0x070709, 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      80
    );
    // Position camera for cinematic perspective
    camera.position.set(0, 0.6, 5.8);

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

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // ==========================================
    // 2. LUXURY STUDIO MATERIALS DEFINITION
    // ==========================================

    // A. Premium Black Italian Leather (Tufted Barber Chair)
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x141418,
      roughness: 0.52,
      metalness: 0.12,
    });

    // B. Mirror-Polished Chrome (Hydraulics & Arms)
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f5,
      roughness: 0.08,
      metalness: 0.98,
    });

    // C. 18K Champagne Gold (Crown, Accents, Pivot Screws)
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      roughness: 0.18,
      metalness: 0.94,
    });

    // D. Dark Brushed Titanium / Obsidian Steel
    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x1b1b22,
      roughness: 0.32,
      metalness: 0.85,
    });

    // E. Surgical Japanese Blade Steel (Sharp cutting edge)
    const bladeSteelMat = new THREE.MeshStandardMaterial({
      color: 0xe8e8f0,
      roughness: 0.12,
      metalness: 0.95,
    });

    // F. Smoked Amber Potion Glass (Luxury Grooming Bottle)
    const amberGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x2e190a,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 0.8,
      transparent: true,
      opacity: 0.9,
    });

    // Master Root Group
    const masterSceneGroup = new THREE.Group();
    scene.add(masterSceneGroup);

    // ==========================================
    // 3. LEFT SIDE: BESPOKE LUXURY BARBER CHAIR
    // ==========================================
    const chairGroup = new THREE.Group();

    // 3.1 Base: Solid Chrome Disc & Floor Collar
    const baseDiscGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.1, isMobile ? 24 : 48);
    const baseDisc = new THREE.Mesh(baseDiscGeo, chromeMat);
    baseDisc.position.y = -1.5;
    chairGroup.add(baseDisc);

    // Gold Beveled Base Ring
    const baseRingGeo = new THREE.TorusGeometry(1.22, 0.03, 16, isMobile ? 24 : 48);
    const baseRing = new THREE.Mesh(baseRingGeo, goldMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -1.45;
    chairGroup.add(baseRing);

    // 3.2 Hydraulic Column & Gold Lock Collar
    const hydraulicColumnGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.85, 24);
    const hydraulicColumn = new THREE.Mesh(hydraulicColumnGeo, chromeMat);
    hydraulicColumn.position.y = -1.05;
    chairGroup.add(hydraulicColumn);

    const hydraulicCollarGeo = new THREE.TorusGeometry(0.27, 0.04, 16, 32);
    const hydraulicCollar = new THREE.Mesh(hydraulicCollarGeo, goldMat);
    hydraulicCollar.rotation.x = Math.PI / 2;
    hydraulicCollar.position.y = -0.85;
    chairGroup.add(hydraulicCollar);

    // Hydraulic Recline Foot Pedal
    const pumpPedalGeo = new THREE.BoxGeometry(0.08, 0.05, 0.6);
    const pumpPedal = new THREE.Mesh(pumpPedalGeo, chromeMat);
    pumpPedal.position.set(-0.35, -1.2, 0.3);
    pumpPedal.rotation.y = -0.4;
    chairGroup.add(pumpPedal);

    const pedalTipGeo = new THREE.BoxGeometry(0.18, 0.04, 0.12);
    const pedalTip = new THREE.Mesh(pedalTipGeo, goldMat);
    pedalTip.position.set(-0.55, -1.2, 0.55);
    chairGroup.add(pedalTip);

    // 3.3 Heavy Chrome Undercarriage Frame
    const frameGeo = new THREE.BoxGeometry(0.9, 0.15, 0.9);
    const frameMesh = new THREE.Mesh(frameGeo, chromeMat);
    frameMesh.position.y = -0.6;
    chairGroup.add(frameMesh);

    // 3.4 Footrest Assembly
    const footrestArmGeo = new THREE.BoxGeometry(0.65, 0.06, 0.55);
    const footrestArm = new THREE.Mesh(footrestArmGeo, chromeMat);
    footrestArm.position.set(0, -0.9, 0.8);
    footrestArm.rotation.x = 0.22;
    chairGroup.add(footrestArm);

    // Gold Footplate with Engraved Texture
    const footplateGeo = new THREE.BoxGeometry(0.62, 0.04, 0.38);
    const footplate = new THREE.Mesh(footplateGeo, goldMat);
    footplate.position.set(0, -0.88, 0.85);
    footplate.rotation.x = 0.22;
    chairGroup.add(footplate);

    // 3.5 Seat Cushion (Tufted Black Italian Leather)
    const seatCushionGeo = new THREE.CylinderGeometry(0.88, 0.82, 0.32, isMobile ? 24 : 40);
    const seatCushion = new THREE.Mesh(seatCushionGeo, leatherMat);
    seatCushion.position.y = -0.38;
    chairGroup.add(seatCushion);

    // Gold Perimeter Piping on Seat
    const seatPipingGeo = new THREE.TorusGeometry(0.86, 0.035, 12, isMobile ? 24 : 40);
    const seatPiping = new THREE.Mesh(seatPipingGeo, goldMat);
    seatPiping.rotation.x = Math.PI / 2;
    seatPiping.position.y = -0.24;
    chairGroup.add(seatPiping);

    // 3.6 Backrest (Ergonomic Recline with Gold Crown Spine)
    const backrestGroup = new THREE.Group();
    backrestGroup.position.set(0, 0.32, -0.5);
    backrestGroup.rotation.x = -0.16; // Elegant luxury recline angle

    // Backrest Cushion
    const backCushionGeo = new THREE.BoxGeometry(1.15, 1.05, 0.24);
    const backCushion = new THREE.Mesh(backCushionGeo, leatherMat);
    backrestGroup.add(backCushion);

    // Chrome Back Frame & Side Rails
    const backFrameGeo = new THREE.BoxGeometry(1.22, 1.1, 0.08);
    const backFrame = new THREE.Mesh(backFrameGeo, chromeMat);
    backFrame.position.z = -0.14;
    backrestGroup.add(backFrame);

    // Gold Top Crest Bar on Backrest
    const backTopBarGeo = new THREE.BoxGeometry(1.24, 0.08, 0.26);
    const backTopBar = new THREE.Mesh(backTopBarGeo, goldMat);
    backTopBar.position.y = 0.55;
    backrestGroup.add(backTopBar);

    // 3.7 Luxury Adjustable Headrest
    const headrestGeo = new THREE.BoxGeometry(0.65, 0.32, 0.16);
    const headrest = new THREE.Mesh(headrestGeo, leatherMat);
    headrest.position.set(0, 0.85, -0.05);
    backrestGroup.add(headrest);

    // Dual Chrome Support Rods
    [-0.18, 0.18].forEach((xPos) => {
      const rodGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 16);
      const rod = new THREE.Mesh(rodGeo, chromeMat);
      rod.position.set(xPos, 0.65, -0.05);
      backrestGroup.add(rod);
    });

    chairGroup.add(backrestGroup);

    // 3.8 Sculpted Chrome & Leather Armrests
    [-0.75, 0.75].forEach((xPos) => {
      const armFrameGroup = new THREE.Group();
      armFrameGroup.position.set(xPos, 0.02, -0.1);

      // Curved Support Struts
      const armStrutGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.65, 16);
      const armStrut = new THREE.Mesh(armStrutGeo, chromeMat);
      armStrut.rotation.z = xPos > 0 ? -0.25 : 0.25;
      armFrameGroup.add(armStrut);

      // Leather Top Pad
      const armPadGeo = new THREE.BoxGeometry(0.18, 0.08, 0.78);
      const armPad = new THREE.Mesh(armPadGeo, leatherMat);
      armPad.position.set(xPos > 0 ? 0.08 : -0.08, 0.26, 0);
      armFrameGroup.add(armPad);

      // Gold End Caps
      const armCapGeo = new THREE.BoxGeometry(0.2, 0.04, 0.82);
      const armCap = new THREE.Mesh(armCapGeo, goldMat);
      armCap.position.set(xPos > 0 ? 0.08 : -0.08, 0.31, 0);
      armFrameGroup.add(armCap);

      chairGroup.add(armFrameGroup);
    });

    // 3.9 Recline Hydraulic Adjustment Lever
    const reclineLeverGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12);
    const reclineLever = new THREE.Mesh(reclineLeverGeo, chromeMat);
    reclineLever.position.set(0.68, -0.3, 0.2);
    reclineLever.rotation.z = 0.5;
    reclineLever.rotation.x = -0.3;
    chairGroup.add(reclineLever);

    const reclineKnobGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const reclineKnob = new THREE.Mesh(reclineKnobGeo, goldMat);
    reclineKnob.position.set(0.85, -0.12, 0.1);
    chairGroup.add(reclineKnob);

    // Position Chair gracefully on the LEFT side of hero
    if (isMobile) {
      chairGroup.position.set(0, -0.6, -1.8);
      chairGroup.rotation.set(0.1, 0.45, 0);
      chairGroup.scale.set(0.7, 0.7, 0.7);
    } else {
      chairGroup.position.set(-2.6, -0.15, -0.4);
      chairGroup.rotation.set(0.08, 0.55, -0.04);
      chairGroup.scale.set(0.96, 0.96, 0.96);
    }

    masterSceneGroup.add(chairGroup);

    // ========================================================
    // 4. RIGHT SIDE: FLOATING PRECISION TOOLS & GROOMING ELIXIR
    // ========================================================
    const toolsGroup = new THREE.Group();

    // 4.1 Master Professional Barber Scissors (Floating)
    const scissorAssembly = new THREE.Group();

    // Titanium Blade 1
    const scissorBlade1Geo = new THREE.BoxGeometry(0.035, 1.4, 0.015);
    const scissorBlade1 = new THREE.Mesh(scissorBlade1Geo, bladeSteelMat);
    scissorBlade1.position.set(0, 0.35, 0);
    scissorAssembly.add(scissorBlade1);

    // Titanium Blade 2 (Micro scissor opening)
    const scissorBlade2Geo = new THREE.BoxGeometry(0.035, 1.4, 0.015);
    const scissorBlade2 = new THREE.Mesh(scissorBlade2Geo, bladeSteelMat);
    scissorBlade2.position.set(0, 0.35, 0.01);
    scissorBlade2.rotation.z = -0.18;
    scissorAssembly.add(scissorBlade2);

    // 18K Gold Pivot Screw & Gemstone Indentation
    const pivotScrewGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.045, 24);
    const pivotScrew = new THREE.Mesh(pivotScrewGeo, goldMat);
    pivotScrew.rotation.x = Math.PI / 2;
    pivotScrew.position.set(0, -0.05, 0.01);
    scissorAssembly.add(pivotScrew);

    // Gold Finger Rings & Tang
    const ring1Geo = new THREE.TorusGeometry(0.13, 0.035, 16, 32);
    const ring1 = new THREE.Mesh(ring1Geo, goldMat);
    ring1.position.set(-0.14, -0.62, 0);
    scissorAssembly.add(ring1);

    const ring2 = new THREE.Mesh(ring1Geo, goldMat);
    ring2.position.set(0.14, -0.68, 0.01);
    ring2.rotation.z = 0.18;
    scissorAssembly.add(ring2);

    // Finger Tang / Rest (Ergonomic curve)
    const tangGeo = new THREE.ConeGeometry(0.035, 0.16, 12);
    const tang = new THREE.Mesh(tangGeo, goldMat);
    tang.position.set(0.28, -0.74, 0.01);
    tang.rotation.z = -0.8;
    scissorAssembly.add(tang);

    scissorAssembly.position.set(0.3, 0.6, 0.2);
    scissorAssembly.rotation.set(-0.3, 0.2, 0.35);
    scissorAssembly.scale.set(0.85, 0.85, 0.85);
    toolsGroup.add(scissorAssembly);

    // 4.2 Artisanal Japanese Straight Razor (Open 145°)
    const razorAssembly = new THREE.Group();

    // Dark Ebony / Obsidian Scale Handle
    const razorHandleGeo = new THREE.BoxGeometry(0.07, 1.25, 0.035);
    const razorHandle = new THREE.Mesh(razorHandleGeo, darkSteelMat);
    razorHandle.position.set(0, -0.42, 0);
    razorHandle.rotation.z = 0.25;
    razorAssembly.add(razorHandle);

    // Gold Handle Rivets
    [-0.8, -0.1].forEach((yPos) => {
      const rivetGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.05, 12);
      const rivet = new THREE.Mesh(rivetGeo, goldMat);
      rivet.rotation.x = Math.PI / 2;
      rivet.position.set(-yPos * 0.25, yPos, 0);
      razorAssembly.add(rivet);
    });

    // Japanese Carbon Steel Blade
    const razorBladeGeo = new THREE.BoxGeometry(0.2, 1.1, 0.018);
    const razorBlade = new THREE.Mesh(razorBladeGeo, bladeSteelMat);
    razorBlade.position.set(0.16, 0.42, 0);
    razorBlade.rotation.z = -0.32;
    razorAssembly.add(razorBlade);

    // 18K Gold Inlay Spine Strip
    const razorSpineGeo = new THREE.BoxGeometry(0.045, 1.12, 0.03);
    const razorSpine = new THREE.Mesh(razorSpineGeo, goldMat);
    razorSpine.position.set(0.25, 0.42, 0);
    razorSpine.rotation.z = -0.32;
    razorAssembly.add(razorSpine);

    // Gold Pivot Pin
    const razorPivotPinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16);
    const razorPivotPin = new THREE.Mesh(razorPivotPinGeo, goldMat);
    razorPivotPin.rotation.x = Math.PI / 2;
    razorPivotPin.position.set(0.02, 0, 0);
    razorAssembly.add(razorPivotPin);

    razorAssembly.position.set(1.1, -0.2, -0.1);
    razorAssembly.rotation.set(0.25, -0.45, -0.2);
    razorAssembly.scale.set(0.8, 0.8, 0.8);
    toolsGroup.add(razorAssembly);

    // 4.3 Luxury Smoked Amber Glass Beard Elixir Bottle
    const elixirBottleGroup = new THREE.Group();

    // Cylindrical Amber Glass Bottle Body
    const bottleBodyGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.75, 32);
    const bottleBody = new THREE.Mesh(bottleBodyGeo, amberGlassMat);
    elixirBottleGroup.add(bottleBody);

    // Gold Foil Brand Label Band
    const bottleLabelGeo = new THREE.CylinderGeometry(0.265, 0.285, 0.35, 32);
    const bottleLabel = new THREE.Mesh(bottleLabelGeo, goldMat);
    bottleLabel.position.y = -0.02;
    elixirBottleGroup.add(bottleLabel);

    // Bottle Shoulder & Neck
    const bottleNeckGeo = new THREE.CylinderGeometry(0.12, 0.24, 0.2, 24);
    const bottleNeck = new THREE.Mesh(bottleNeckGeo, amberGlassMat);
    bottleNeck.position.y = 0.44;
    elixirBottleGroup.add(bottleNeck);

    // Gold Screw Cap Collar
    const goldCapGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.12, 24);
    const goldCap = new THREE.Mesh(goldCapGeo, goldMat);
    goldCap.position.y = 0.58;
    elixirBottleGroup.add(goldCap);

    // Black Rubber Dropper Bulb
    const dropperBulbGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const dropperBulb = new THREE.Mesh(dropperBulbGeo, darkSteelMat);
    dropperBulb.position.y = 0.68;
    dropperBulb.scale.set(0.9, 1.2, 0.9);
    elixirBottleGroup.add(dropperBulb);

    elixirBottleGroup.position.set(-0.2, -0.85, 0.4);
    elixirBottleGroup.rotation.set(0.2, 0.3, -0.15);
    elixirBottleGroup.scale.set(0.95, 0.95, 0.95);
    toolsGroup.add(elixirBottleGroup);

    // Position Tools group on the RIGHT side
    if (isMobile) {
      toolsGroup.position.set(1.4, -0.4, -1.2);
      toolsGroup.scale.set(0.65, 0.65, 0.65);
    } else {
      toolsGroup.position.set(2.4, 0.1, -0.2);
      toolsGroup.scale.set(1.0, 1.0, 1.0);
    }

    masterSceneGroup.add(toolsGroup);

    // ========================================================
    // 5. CENTER BACKGROUND: 3D METALLIC ROYAL CUT EMBLEM
    // ========================================================
    const emblemGroup = new THREE.Group();

    // 5.1 Shield Frame (Outer 18K Gold Beveled Ring)
    const emblemRingGeo = new THREE.TorusGeometry(1.65, 0.04, 16, isMobile ? 32 : 64);
    const emblemRing = new THREE.Mesh(emblemRingGeo, goldMat);
    emblemGroup.add(emblemRing);

    // Inner Concentric Bevel
    const innerRingGeo = new THREE.TorusGeometry(1.42, 0.02, 16, isMobile ? 32 : 64);
    const innerRing = new THREE.Mesh(innerRingGeo, goldMat);
    emblemGroup.add(innerRing);

    // 5.2 3-Peak Royal Crown atop Emblem
    const crownCenterGeo = new THREE.ConeGeometry(0.28, 0.65, 4);
    const crownCenter = new THREE.Mesh(crownCenterGeo, goldMat);
    crownCenter.position.set(0, 0.52, 0);
    emblemGroup.add(crownCenter);

    const crownSideGeo = new THREE.ConeGeometry(0.2, 0.48, 4);
    const crownLeft = new THREE.Mesh(crownSideGeo, goldMat);
    crownLeft.position.set(-0.38, 0.42, 0);
    crownLeft.rotation.z = 0.3;
    emblemGroup.add(crownLeft);

    const crownRight = new THREE.Mesh(crownSideGeo, goldMat);
    crownRight.position.set(0.38, 0.42, 0);
    crownRight.rotation.z = -0.3;
    emblemGroup.add(crownRight);

    // 5.3 Interlocking RC Monogram (3D Sculpted Geometric Form)
    // Monogram Base Shield Plate
    const shieldPlateGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.04, 32);
    const shieldPlate = new THREE.Mesh(shieldPlateGeo, darkSteelMat);
    shieldPlate.rotation.x = Math.PI / 2;
    shieldPlate.position.set(0, -0.1, -0.02);
    emblemGroup.add(shieldPlate);

    // Monogram 'R' and 'C' Crossed Golden Scepters
    const scepter1Geo = new THREE.CylinderGeometry(0.03, 0.03, 1.4, 16);
    const scepter1 = new THREE.Mesh(scepter1Geo, goldMat);
    scepter1.rotation.z = Math.PI / 4;
    scepter1.position.set(0, -0.1, 0.02);
    emblemGroup.add(scepter1);

    const scepter2 = new THREE.Mesh(scepter1Geo, goldMat);
    scepter2.rotation.z = -Math.PI / 4;
    scepter2.position.set(0, -0.1, 0.02);
    emblemGroup.add(scepter2);

    // Central Radiant Star Gem
    const gemGeo = new THREE.OctahedronGeometry(0.18, 0);
    const gem = new THREE.Mesh(gemGeo, goldMat);
    gem.position.set(0, -0.1, 0.06);
    emblemGroup.add(gem);

    // Position Emblem behind center text in 3D space
    emblemGroup.position.set(0, 0.5, -1.8);
    emblemGroup.scale.set(0.9, 0.9, 0.9);
    masterSceneGroup.add(emblemGroup);

    // ========================================================
    // 6. FOREGROUND: SPARKLING CHAMPAGNE MICRO-PARTICLES
    // ========================================================
    const particleCount = isMobile ? 35 : 90;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 11;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5 + 1.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xdeb86a,
      size: isMobile ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ========================================================
    // 7. CINEMATIC STUDIO LIGHTING SYSTEM
    // ========================================================
    // 7.1 Soft Ambient Fill
    const ambientLight = new THREE.AmbientLight(0x121218, 2.2);
    scene.add(ambientLight);

    // 7.2 Warm Gold Studio Key Spotlight
    const keySpotLight = new THREE.SpotLight(0xffecd0, 7.5);
    keySpotLight.position.set(3.5, 6, 5);
    keySpotLight.angle = Math.PI / 4;
    keySpotLight.penumbra = 0.7;
    keySpotLight.decay = 1.6;
    keySpotLight.distance = 20;
    keySpotLight.castShadow = !isMobile;
    scene.add(keySpotLight);

    // 7.3 Warm Gold Rim Light (Highlights Chair Leather & Razor spine)
    const goldRimLight = new THREE.PointLight(0xc5a059, 4.5, 12);
    goldRimLight.position.set(-4.5, 3.5, 1.5);
    scene.add(goldRimLight);

    // 7.4 Cool Chrome Specular Light (Crisp reflections on steel)
    const coolChromeLight = new THREE.PointLight(0x94b3e8, 3.0, 10);
    coolChromeLight.position.set(4, 2, -2.5);
    scene.add(coolChromeLight);

    // 7.5 Dynamic Interactive Cursor Light
    const cursorLight = new THREE.PointLight(0xffdf9e, 2.5, 8);
    cursorLight.position.set(0, 1, 3);
    scene.add(cursorLight);

    // ========================================================
    // 8. INTERACTION: MOUSE PARALLAX & SCROLL DEPTH
    // ========================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.45;
      targetMouseY = y * 0.35;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = container.clientHeight || 800;
      scrollProgress = Math.min(scrollY / heroHeight, 1.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========================================================
    // 9. ANIMATION RENDER LOOP (CONTROLLED & EXPENSIVE)
    // ========================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damped interpolation for parallax
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;

      // Dynamic cursor light follow
      cursorLight.position.x = mouseX * 5;
      cursorLight.position.y = 1 + mouseY * 4;

      // Subtle Camera Parallax (controlled, never disorienting)
      camera.position.x = mouseX * 0.6;
      camera.position.y = 0.6 + mouseY * 0.4 - scrollProgress * 0.8;
      camera.lookAt(0, 0.2 - scrollProgress * 0.4, 0);

      // Chair gentle organic breathing
      chairGroup.rotation.y = 0.55 + Math.sin(elapsed * 0.35) * 0.05 + mouseX * 0.3;
      chairGroup.position.y = (isMobile ? -0.6 : -0.15) + Math.sin(elapsed * 0.5) * 0.03;

      // Tools organic floating motion
      scissorAssembly.rotation.z = 0.35 + Math.sin(elapsed * 0.6) * 0.04;
      scissorBlade2.rotation.z = -0.18 + Math.sin(elapsed * 1.1) * 0.03;

      razorAssembly.rotation.y = -0.45 + Math.cos(elapsed * 0.4) * 0.06;
      razorAssembly.position.y = -0.2 + Math.sin(elapsed * 0.7) * 0.04;

      elixirBottleGroup.rotation.y = 0.3 + Math.sin(elapsed * 0.5) * 0.08;
      elixirBottleGroup.position.y = -0.85 + Math.cos(elapsed * 0.6) * 0.03;

      // Subtle Background Emblem Rotation
      emblemGroup.rotation.z = Math.sin(elapsed * 0.2) * 0.04;
      emblemGroup.rotation.y = mouseX * 0.2;

      // Gentle Champagne Particle Drift
      particles.rotation.y = elapsed * 0.015;
      particles.rotation.x = Math.sin(elapsed * 0.01) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero-3d-viewport"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
