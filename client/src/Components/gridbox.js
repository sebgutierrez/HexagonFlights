import * as THREE from 'three'
import React, { useMemo, useEffect, useRef, useCallback, useLayoutEffect} from 'react'
import { useThree, useFrame, extend, Canvas} from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { Vector3 } from 'three';
import { MeshDistortMaterial, MeshWobbleMaterial, shaderMaterial} from '@react-three/drei'


extend({ EffectComposer, ShaderPass, SavePass, RenderPass })

// Shader that composites the r,g,b channels of 3 textures, respectively
const dotShaderMaterial = {
  uniforms: {
    color: { value: new THREE.Color(0xff0000) }, // Default color red
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

// Create a ShaderMaterial component
const CustomShaderMaterial = shaderMaterial(
  // Uniforms
  { color: new THREE.Color(0xff0000) }, // Initial color
  // Vertex Shader
  dotShaderMaterial.vertexShader,
  // Fragment Shader
  dotShaderMaterial.fragmentShader
);
extend ()


const constrain = function (n, low, high) {
    return Math.max(Math.min(n, high), low)
  }
  
  const map = function (n, start1, stop1, start2, stop2, withinBounds) {
    const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
    if (!withinBounds) {
      return newval
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2)
    } else {
      return constrain(newval, stop2, start2)
    }
  }
  
  function Dots() {
    const ref = useRef();
    const { viewport, pointer } = useThree();
    const dotSize = .5; // Size of the dots
  
    // Adjust these values based on how densely you want to fill the screen
    const numDotsX = 100; // Number of dots along the X axis
    const numDotsY = 60; // Number of dots along the Y axis
  
    useFrame(() => {
      const mousePos = new Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      );
  
      for (let i = 0; i < numDotsX * numDotsY; ++i) {
        const x = ((i % numDotsX) / numDotsX) * viewport.width - (viewport.width / 2);
        const y = (Math.floor(i / numDotsX) / numDotsY) * viewport.height - (viewport.height / 2);
  
        // Adjust the position slightly towards the mouse
        const direction = mousePos.clone().sub(new Vector3(x, y, 0)).normalize().multiplyScalar(1);
        const newPosition = new Vector3(x + direction.x, y + direction.y, 0);
  
        const matrix = new THREE.Matrix4();
        matrix.setPosition(newPosition);
  
        ref.current.setMatrixAt(i, matrix);
      }
      ref.current.instanceMatrix.needsUpdate = true;
    });
  
    return (
      <instancedMesh ref={ref} args={[null, null, numDotsX * numDotsY]} >
        <circleGeometry attach="geometry" args={[dotSize, 12]} />
        <MeshWobbleMaterial factor={20} speed={.6} color='#000'/>
     </instancedMesh>
    );
  }  

  function Light() {
    const { viewport } = useThree()
    // viewport = canvas in 3d units (meters)
  
    const light = useRef()
    const obj = useRef()
  
    useFrame(({ pointer }) => {
      const x = (pointer.x * viewport.width) / 2
      const y = (pointer.y * viewport.height) / 2
      light.current.position.set(x, y, 10)
  
      // Move the object3D target
      // Divide cursor position so it's slightly from mouse
      obj.current.position.set(x / 20, y / 20, -10)
  
      // Point the light at the object3D target
      light.current.target = obj.current
    })
  
    return (
      <spotLight penumbra={1} intensity={1} ref={light} color='#fff'>
        <object3D ref={obj} position={[0, 0, 0]} />
      </spotLight>
    )
  }
  
  export  function Background() {
    return (
        <Canvas
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 100], fov: 75 }}
      >
         <color attach="background" args={['#fff']} />
        <Dots />
        <Light />
        {/* <ambientLight intensity={.5} color='#ff0' /> */}
        </Canvas>
    )
  }
  