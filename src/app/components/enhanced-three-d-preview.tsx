// components/EnhancedThreeDPreview.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface SewingPoint {
  x: number;
  y: number;
  piece: string;
  id: number;
}

interface SewingPair {
  front: SewingPoint;
  back: SewingPoint;
}

interface ThreeDPreviewProps {
  frontPieceData: string | null;
  backPieceData: string | null;
  sewingPairs: SewingPair[];
}

export default function EnhancedThreeDPreview({
  frontPieceData,
  backPieceData,
  sewingPairs,
}: ThreeDPreviewProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // These values from SVG’s viewBox.
  const svgW = 137.461;
  const svgH = 193.406;
  // container dimensions in TwoDPatternView.
  const containerWidth = 400;
  const containerHeight = 500;

  function convertSewingPoint(point: SewingPoint): THREE.Vector3 {
    const rawX = (point.x / containerWidth) * svgW;
    const rawY = (point.y / containerHeight) * svgH;
    const centeredX = rawX - svgW / 2;
    const centeredY = -(rawY - svgH / 2);
    return new THREE.Vector3(centeredX, centeredY, 0);
  }

  function centerGeometry(mesh: THREE.Mesh) {
    mesh.geometry.translate(-svgW / 2, -svgH / 2, 0);
  }

  useEffect(() => {
    if (!mountRef.current || !frontPieceData || !backPieceData) return;
    setLoading(true);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 5000);
    camera.position.set(0, 0, 600);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(200, 200, 300);
    scene.add(dirLight);

    const loader = new SVGLoader();
    function loadShapes(svgStr: string): THREE.Shape[] {
      const parsed = loader.parse(svgStr);
      const shapes: THREE.Shape[] = [];
      parsed.paths.forEach(path => {
        shapes.push(...path.toShapes(true));
      });
      return shapes;
    }

    const frontShapes = loadShapes(frontPieceData);
    const backShapes = loadShapes(backPieceData);

    function createMesh(shapes: THREE.Shape[], color: number): THREE.Mesh {
      const geometry = new THREE.ExtrudeGeometry(shapes, {
        steps: 1,
        depth: 2,
        bevelEnabled: false,
      });
      const material = new THREE.MeshPhongMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const mesh = new THREE.Mesh(geometry, material);
      centerGeometry(mesh);
      mesh.scale.y = -1;
      return mesh;
    }

    const frontMesh = createMesh(frontShapes, 0x4a90e2);
    const backMesh = createMesh(backShapes, 0x50e3c2);

    // --- Assemble the Pieces (Flat) ---
    frontMesh.position.set(0, 0, 0);
    scene.add(frontMesh);

    if (sewingPairs.length > 0) {
      // Use the first sewing pair as the seam reference.
      const pair = sewingPairs[0];
      const frontSeamPt = convertSewingPoint(pair.front);
      const backSeamPt = convertSewingPoint(pair.back);

      // Compute the midpoint and the seam axis.
      const seamMid = new THREE.Vector3()
        .addVectors(frontSeamPt, backSeamPt)
        .multiplyScalar(0.5);
      const seamAxis = new THREE.Vector3()
        .subVectors(backSeamPt, frontSeamPt)
        .normalize();

      // Create a pivot group at the seam midpoint.
      const pivotGroup = new THREE.Group();
      pivotGroup.position.copy(seamMid);
      scene.add(pivotGroup);

      // Position the back mesh relative to the pivot.
      backMesh.position.sub(seamMid);
      pivotGroup.add(backMesh);

      // In assembled view the fold angle is zero.
      const foldAngle = 0;
      pivotGroup.rotateOnAxis(seamAxis, foldAngle);

      // ---  Draw a crease along the seam ---
      const seamLength = frontSeamPt.distanceTo(backSeamPt);
      const creaseThickness = 0.5;
      const creaseGeom = new THREE.BoxGeometry(
        creaseThickness,
        seamLength,
        creaseThickness
      );
      const creaseMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
      const creaseMesh = new THREE.Mesh(creaseGeom, creaseMat);
      creaseMesh.position.copy(seamMid);
      creaseMesh.lookAt(backSeamPt);
      scene.add(creaseMesh);
    } else {
      backMesh.position.set(0, 0, 0);
      scene.add(backMesh);
    }

    // ---  Draw Sewing Pair Markers ---
    sewingPairs.forEach(pair => {
      const fPt = convertSewingPoint(pair.front);
      const bPt = convertSewingPoint(pair.back);
      const lineGeom = new THREE.BufferGeometry().setFromPoints([fPt, bPt]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(lineGeom, lineMat);
      scene.add(line);

      const sphereGeo = new THREE.SphereGeometry(2);
      const frontDot = new THREE.Mesh(
        sphereGeo,
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
      );
      frontDot.position.copy(fPt);
      scene.add(frontDot);
      const backDot = new THREE.Mesh(
        sphereGeo,
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      );
      backDot.position.copy(bPt);
      scene.add(backDot);
    });

    // --- Animation Loop and Resize Handler ---
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    setLoading(false);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
      if (mountRef.current) mountRef.current.innerHTML = '';
    };
  }, [frontPieceData, backPieceData, sewingPairs]);

  return (
    <div className='relative'>
      <div
        ref={mountRef}
        className='w-full h-[600px] bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-inner'
      />
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg'>
          <div className='text-gray-800'>
            Please select at least two sewing points...
          </div>
        </div>
      )}
    </div>
  );
}
