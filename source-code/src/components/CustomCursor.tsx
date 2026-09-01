import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    if (window.matchMedia('(pointer: fine)').matches) {
      setEnabled(true);
    } else {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"], canvas, .cursor-interactive');
      if (interactiveEl) {
        setHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor-text');
        setHoverText(customText || null);
      } else {
        setHovered(false);
        setHoverText(null);
      }
    };

    const handleMouseDown = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(0.85)`;
      }
    };

    const handleMouseUp = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${hovered ? 1.6 : 1})`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth Lerp loop for ring
    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${hovered ? 1.6 : 1})`;
      }

      animFrame.current = requestAnimationFrame(render);
    };

    animFrame.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [hovered]);

  if (!enabled) return null;

  return (
    <>
      {/* Small precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#deb86a] pointer-events-none z-[9999] mix-blend-screen transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      />

      {/* Smooth outer ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border pointer-events-none z-[9998] transition-colors duration-300 flex items-center justify-center ${
          hovered
            ? 'border-[#c5a059] bg-[#c5a059]/10 shadow-[0_0_15px_rgba(197,160,89,0.3)]'
            : 'border-[#c5a059]/40 bg-transparent'
        }`}
        style={{ willChange: 'transform' }}
      >
        {hoverText && (
          <span className="text-[7px] font-mono tracking-widest text-[#f5ecd8] uppercase font-bold select-none">
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
};
