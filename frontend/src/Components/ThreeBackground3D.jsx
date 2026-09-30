import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ThreeBackground3D Component
 * Subtle, ultra-smooth 3D particle constellation & wireframe mesh.
 * Motion is damped for comfort, driven primarily by cursor movement
 * with a dark contrast overlay for crystal-clear text readability.
 */
export default function ThreeBackground3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 4. Create 3D Floating Particles Constellation
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color("#38bdf8");
    const indigoColor = new THREE.Color("#433bff");
    const lavenderColor = new THREE.Color("#a78bfa");

    const colorChoices = [cyanColor, indigoColor, lavenderColor];

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 16 + Math.random() * 12;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Soft, transparent particle material
    const material = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 5. Central Geometric Wireframe Icosahedron (Subtle, low-opacity)
    const geoWireframe = new THREE.IcosahedronGeometry(11, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x433bff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireframeMesh = new THREE.Mesh(geoWireframe, wireframeMaterial);
    scene.add(wireframeMesh);

    // Mouse Tracking Variables for smooth cursor-driven motion
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0004;
      mouseY = (e.clientY - windowHalfY) * 0.0004;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 6. Animation Loop (Ultra-slow drift + Cursor inertia)
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth interpolation for mouse movement
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      // Ultra-slow background rotation
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;
      particles.rotation.y += targetX * 0.25;
      particles.rotation.x += targetY * 0.25;

      wireframeMesh.rotation.y -= 0.0004;
      wireframeMesh.rotation.x -= 0.0002;
      wireframeMesh.rotation.y += targetX * 0.15;
      wireframeMesh.rotation.x += targetY * 0.15;

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
      geoWireframe.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full opacity-35"
      />
      {/* Dark Contrast Overlay for Eye Comfort & Clear Text Reading */}
      <div className="absolute inset-0 w-full h-full bg-[#050315]/75 backdrop-blur-[1px] pointer-events-none" />
    </div>
  );
}
