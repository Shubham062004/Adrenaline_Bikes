
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import heroimg from '../assests/heroimg.png';

// Simple motorcycle model
function Motorcycle(props) {
  const group = useRef(null);

  // Use a simple animation that gently rocks the bike
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group} position={props.position} scale={props.scale}>
      {/* Main body */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#9b87f5" metalness={0.8} roughness={0.2} />
        <boxGeometry args={[2, 0.4, 0.8]} />
      </mesh>

      {/* Seat */}
      <mesh castShadow position={[0.3, 0.8, 0]} rotation={[0, 0, -0.2]}>
        <meshStandardMaterial color="#222" roughness={0.8} />
        <boxGeometry args={[1.2, 0.2, 0.6]} />
      </mesh>

      {/* Front fairing */}
      <mesh castShadow position={[-0.8, 0.7, 0]} rotation={[0, 0, -0.5]}>
        <meshStandardMaterial color="#9b87f5" metalness={0.8} roughness={0.2} />
        <boxGeometry args={[0.8, 0.4, 0.7]} />
      </mesh>

      {/* Handlebars */}
      <mesh castShadow position={[-0.7, 1, 0]} rotation={[0, 0, 0.8]}>
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        <cylinderGeometry args={[0.05, 0.05, 0.7, 16]} />
      </mesh>

      {/* Wheels */}
      <mesh castShadow position={[-1, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.5} />
        <torusGeometry args={[0.25, 0.08, 16, 32]} />
      </mesh>

      <mesh castShadow position={[1, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.5} />
        <torusGeometry args={[0.25, 0.08, 16, 32]} />
      </mesh>

      {/* Exhaust */}
      <mesh castShadow position={[1, 0.4, 0.2]} rotation={[0, 0, 0.1]}>
        <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
        <cylinderGeometry args={[0.08, 0.06, 0.8, 16]} />
      </mesh>
    </group>
  );
}

interface ModelViewerProps {
  className?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  className = ""
}) => {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <img src={heroimg} alt="" className='mt-20' />
      {/* <Canvas shadows dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50} />
        <Motorcycle position={[0, -0.5, 0]} scale={[1.2, 1.2, 1.2]} />
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.5}
          scale={10}
          blur={1.5}
          far={1}
        />
        {/* Removed Environment component that was causing HDR loading issues 
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
      </Canvas> */}
      {/* <div className="absolute bottom-5 left-0 right-0 flex justify-center text-xs text-gray-500 pointer-events-none">
        Rocket Riders X1000
      </div> */}
    </div>
  );
};

export default ModelViewer;
