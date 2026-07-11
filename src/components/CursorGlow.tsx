import React, { useEffect, useRef, useState } from "react";

/**
 * CursorGlow — a global radial-gradient orb that follows the mouse cursor,
 * adding depth and premium feel. Inspired by nudot.com.tw.
 *
 * - Works in both Dark and Light modes.
 * - Uses requestAnimationFrame with translate3d for hardware-accelerated 60fps performance (no layout thrashing).
 * - Non-intrusive: pointer-events: none.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: -999, y: -999 });
  const currentRef = useRef({ x: -999, y: -999 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If user has a touch device or prefers reduced motion, skip rendering
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    // Initialize position to mouse position on first move to prevent jumping from (-999, -999)
    let initialized = false;

    // Smooth follow using lerp in rAF
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const LERP_FACTOR = 0.08; // slightly softer lerp for premium ease-out feel

    const animate = () => {
      if (glowRef.current && posRef.current.x !== -999) {
        if (!initialized) {
          currentRef.current = { ...posRef.current };
          initialized = true;
        } else {
          currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, LERP_FACTOR);
          currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, LERP_FACTOR);
        }
        // translate3d uses GPU layer instead of CPU reflow
        glowRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
      aria-hidden="true"
    />
  );
}
