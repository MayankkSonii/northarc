import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ThreeDCanvas — WebGL-based 3D particle constellation network using Three.js.
 * 
 * - Offloads all line and node rendering to the GPU via WebGL, ensuring 60fps scrolling.
 * - Uses IntersectionObserver to pause the render loop when off-screen.
 * - Simulates mouse interaction (push force).
 * - Generates custom particle texture dynamically via canvas to avoid external asset loading.
 */
export function ThreeDCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Get CSS variables for colors (fallbacks if variables aren't found)
    const getCssVar = (name: string) => {
      if (typeof window === "undefined") return "";
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    };

    const colorHex = getCssVar("--color-primary") || "#1D75FF";
    const colors = [colorHex, getCssVar("--color-secondary") || "#4D94FF", "#ffffff"];

    // Pre-parse primary color hex to THREE.Color
    const particleColor = new THREE.Color(colorHex);

    // Setup Scene, Camera & WebGLRenderer
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a circular particle dot texture dynamically via Canvas
    const createCircleTexture = () => {
      const size = 64;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = size;
      tempCanvas.height = size;
      const ctx = tempCanvas.getContext("2d");
      if (ctx) {
        // Draw a soft glowing dot
        const gradient = ctx.createRadialGradient(
          size / 2, size / 2, 0,
          size / 2, size / 2, size / 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(tempCanvas);
    };

    const dotTexture = createCircleTexture();

    // Configuration
    const numParticles = 80;
    const maxDistance = 6.0;
    const positions = new Float32Array(numParticles * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const initialCoords: { x: number; y: number; z: number }[] = [];

    // Helper bounds
    const aspect = width / height;
    const viewWidth = 24 * aspect;
    const viewHeight = 24;

    // Initialize particles positions inside camera frustum
    for (let i = 0; i < numParticles; i++) {
      const x = (Math.random() - 0.5) * viewWidth;
      const y = (Math.random() - 0.5) * viewHeight;
      const z = (Math.random() - 0.5) * 8; // slight depth

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialCoords.push({ x, y, z });
      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.005,
      });
    }

    // Points Buffer Geometry
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.65,
      map: dotTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: particleColor,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // Line Segments Geometry
    // We allocate a maximum potential number of line vertices
    const maxLines = 180;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineColors = new Float32Array(maxLines * 2 * 3);
    
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Mouse event tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Map to normalized device coordinates (-1 to +1)
      mouseRef.current.targetX = (clientX / width) * 2 - 1;
      mouseRef.current.targetY = -(clientY / height) * 2 + 1;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Handle Resize
    const handleResize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Render loop state
    let isVisible = true;
    let animationFrameId: number;

    // Use IntersectionObserver to stop render loop when hero is scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Tick
    const posAttr = pointsGeometry.getAttribute("position") as THREE.BufferAttribute;
    const linePosAttr = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
    const lineColorAttr = lineGeometry.getAttribute("color") as THREE.BufferAttribute;

    const tick = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      // 3D coordinates for mouse force
      const mouse3D = new THREE.Vector3(
        mouseRef.current.x * (viewWidth / 2),
        mouseRef.current.y * (viewHeight / 2),
        0
      );

      // Move particles
      for (let i = 0; i < numParticles; i++) {
        let px = posAttr.getX(i);
        let py = posAttr.getY(i);
        let pz = posAttr.getZ(i);

        px += velocities[i].x;
        py += velocities[i].y;
        pz += velocities[i].z;

        // Contain bounds
        const boundaryX = viewWidth / 2 + 1;
        const boundaryY = viewHeight / 2 + 1;
        if (Math.abs(px) > boundaryX) velocities[i].x *= -1;
        if (Math.abs(py) > boundaryY) velocities[i].y *= -1;
        if (Math.abs(pz) > 4) velocities[i].z *= -1;

        // Mouse repelling force
        if (mouseRef.current.active) {
          const dx = px - mouse3D.x;
          const dy = py - mouse3D.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < 20) { // mouse radius squared
            const dist = Math.sqrt(dSq);
            const force = (4.5 - dist) / 4.5;
            if (force > 0) {
              px += (dx / dist) * force * 0.07;
              py += (dy / dist) * force * 0.07;
            }
          }
        }

        // Return slightly to initial coordinates (spring force)
        const init = initialCoords[i];
        px += (init.x - px) * 0.003;
        py += (init.y - py) * 0.003;

        posAttr.setXYZ(i, px, py, pz);
      }
      posAttr.needsUpdate = true;

      // Rebuild lines
      let lineIdx = 0;
      for (let i = 0; i < numParticles; i++) {
        if (lineIdx >= maxLines) break;

        const x1 = posAttr.getX(i);
        const y1 = posAttr.getY(i);
        const z1 = posAttr.getZ(i);

        for (let j = i + 1; j < numParticles; j++) {
          if (lineIdx >= maxLines) break;

          const x2 = posAttr.getX(j);
          const y2 = posAttr.getY(j);
          const z2 = posAttr.getZ(j);

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDistance) * 0.22;

            // Set line start vertex
            linePosAttr.setXYZ(lineIdx * 2, x1, y1, z1);
            lineColorAttr.setXYZ(lineIdx * 2, particleColor.r, particleColor.g, particleColor.b);

            // Set line end vertex
            linePosAttr.setXYZ(lineIdx * 2 + 1, x2, y2, z2);
            lineColorAttr.setXYZ(lineIdx * 2 + 1, particleColor.r, particleColor.g, particleColor.b);

            // Update line opacity dynamically using colors attribute if required
            // We use vertexColors, so setting color channels matches target alpha
            const rVal = particleColor.r * alpha;
            const gVal = particleColor.g * alpha;
            const bVal = particleColor.b * alpha;
            
            lineColorAttr.setXYZ(lineIdx * 2, rVal, gVal, bVal);
            lineColorAttr.setXYZ(lineIdx * 2 + 1, rVal, gVal, bVal);

            lineIdx++;
          }
        }
      }

      // Tell Three.js how many lines to draw
      lineGeometry.setDrawRange(0, lineIdx * 2);
      linePosAttr.needsUpdate = true;
      lineColorAttr.needsUpdate = true;

      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      dotTexture.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        id="three-d-network"
        className="w-full h-full block opacity-35"
      />
    </div>
  );
}