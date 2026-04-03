"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 600;
const SPHERE_RADIUS = 1.5;
const COLOR = new THREE.Color("#ff83d4");

const vertexShader = `
  attribute float aSize;
  attribute float aOffset;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    // Breathing: oscillate position along the normal direction
    vec3 pos = position;
    float breath = sin(uTime * 0.8 + aOffset * 6.2831) * 0.08;
    pos += normalize(position) * breath;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size attenuation
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    // Fade particles that are further away slightly
    vAlpha = 0.4 + 0.6 * smoothstep(-8.0, -2.0, mvPosition.z);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    // Circular soft particle
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.15, 0.5, dist);
    gl_FragColor = vec4(uColor, alpha * vAlpha);
  }
`;

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Setup ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    // --- Particles ---
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const offsets = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Fibonacci sphere distribution for even spacing
      const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((Math.sqrt(5) - 1) / 2) * i * Math.PI * 2;

      positions[i * 3] = Math.cos(theta) * radiusAtY * SPHERE_RADIUS;
      positions[i * 3 + 1] = y * SPHERE_RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * SPHERE_RADIUS;

      sizes[i] = 1.5 + Math.random() * 2.5;
      offsets[i] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: COLOR },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Mouse tracking ---
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- Resize ---
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // --- Animation loop ---
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsed;

      // Mouse-driven rotation target
      targetRotation.x = mouse.y * 0.4;
      targetRotation.y = mouse.x * 0.4;

      // Lerp toward target rotation
      points.rotation.x += (targetRotation.x - points.rotation.x) * 0.03;
      points.rotation.y += (targetRotation.y - points.rotation.y) * 0.03;

      // Slow ambient Y rotation
      points.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        left: "-2%",
        bottom: "0%",
        width: "30%",
        height: "40%",
        pointerEvents: "none",
      }}
    />
  );
}
