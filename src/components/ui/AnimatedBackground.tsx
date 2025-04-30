import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 5;

    const animate = () => {
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose(); // cleanup GPU resources
    };
  }, []);

  return <div className="absolute inset-0 -z-10" ref={mountRef} />;
}
