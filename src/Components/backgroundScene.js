import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, Box, OrbitControls } from '@react-three/drei';


// Background Scene Component
const BackgroundScene = () => {
    return (
      <Canvas style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%' }}>
        <OrbitControls/>
        <ambientLight intensity={0.5} />
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]}/>
          <meshStandardMaterial color="royalblue" />
        </mesh>
      </Canvas>
    );
  };
export default BackgroundScene;
