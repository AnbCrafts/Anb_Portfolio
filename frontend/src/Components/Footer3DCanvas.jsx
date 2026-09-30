import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Footer3DCanvas Component
 * Renders a vibrant, glowing 3D particle terrain wave using Three.js in the Footer background.
 */
export default function Footer3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 26);
    camera.lookAt(0, 0, 0);

    // 2. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3. Create 3D Wave Grid Geometry
    const cols = 55;
    const rows = 38;
    const count = cols * rows;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyanColor = new THREE.Color("#38bdf8");
    const indigoColor = new THREE.Color("#433bff");
    const brightBlueColor = new THREE.Color("#60a5fa");

    let idx = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const posX = (x - cols / 2) * 1.35;
        const posZ = (z - rows / 2) * 1.15;
        const posY = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 1.8;

        positions[idx * 3] = posX;
        positions[idx * 3 + 1] = posY;
        positions[idx * 3 + 2] = posZ;

        // Color blend based on depth
        const factor = z / rows;
        const mixColor = indigoColor.clone().lerp(factor > 0.4 ? cyanColor : brightBlueColor, factor);
        colors[idx * 3] = mixColor.r;
        colors[idx * 3 + 1] = mixColor.g;
        colors[idx * 3 + 2] = mixColor.b;

        idx++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Luminous Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const waveMesh = new THREE.Points(geometry, material);
    scene.add(waveMesh);

    // Mouse Tracking for subtle camera sway
    let mouseX = 0;
    let targetX = 0;

    const handleMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0004;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 4. Animation Loop: Dynamic 3D Wave Motion
    let animationFrameId;
    let step = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      step += 0.028;
      targetX += (mouseX - targetX) * 0.04;

      const pos = geometry.attributes.position.array;
      let pIdx = 0;
      for (let x = 0; x < cols; x++) {
        for (let z = 0; z < rows; z++) {
          pos[pIdx * 3 + 1] =
            Math.sin(x * 0.35 + step) * 1.4 + Math.cos(z * 0.35 + step) * 1.4;
          pIdx++;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      waveMesh.rotation.y = targetX * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* High-visibility Canvas container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full opacity-75" />
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#050315]/80 via-[#050315]/40 to-transparent pointer-events-none" />
    </div>
  );
}
