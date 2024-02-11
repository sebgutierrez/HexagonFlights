

import React, { useLayoutEffect, useRef, useCallback } from 'react'
import { Canvas, useThree, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import { Color, Vector3 } from 'three'

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
  const ref = useRef()
  const blue = new Color('rgba(87, 135, 255, 1)')
  const teal = new Color('rgba(0, 183, 144,1)')
  const orange = new Color('rgba(255, 120, 64, 1)')
  const yellow = new Color('rgba(247, 163, 0, 1)')
  const purple = new Color('rgba(210, 125, 255, 1)')
  const white = new Color('rgba(255, 255, 255, 1)')

  const colors = [teal, orange, blue, yellow, purple]

  const largeNodes = [
    { x: 0, y: 0, color: blue },
    { x: 100, y: 20, color: blue },
    { x: -30, y: 50, color: teal },
    { x: -120, y: 60, color: purple },
    { x: 80, y: -70, color: orange },
    { x: -80, y: -40, color: yellow }
  ]

  let t = 0
  let f = 0.001
  let a = 0.3
  const graph = useCallback(
    (x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a
    },
    [t, f, a]
  )

  const { viewport } = useThree()

  useFrame(({ mouse }) => {
    t += 15
    const matrix = ref.current.matrix.clone()
    for (let i = 0; i < 1500; ++i) {
      const x = ((i % 50) - 25) * 5
      const y = (Math.floor(i / 50) - 15) * 5
      // if (t === 15 && x === 0 && y === 0) {
      //   console.log(ref.current)
      // }
      const largeNode = largeNodes.filter((e) => e.x === x && e.y === y)
      if (largeNode.length === 1) {
        // const mousePos = new Vector3((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
        // const nodePos = new Vector3(x, y, 0)
        // const distance = nodePos.distanceTo(mousePos)
        // const factor = map(distance, 10, 0, 2.5, 8, true)
        // const scale = new Vector3(factor, factor, 0)
        // const scaledMatrix = matrix.clone()
        // scaledMatrix.scale(scale)
        // scaledMatrix.setPosition(x + graph(x, y), y + graph(x, y), 0)
        // ref.current.setMatrixAt(i, scaledMatrix)
        // // ref.current.setColorAt(i, largeNode[0].color)
        // ref.current.instanceMatrix.needsUpdate = true
        // ref.current.instanceColor.needsUpdate = true
      } else {
        const mousePos = new Vector3((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
        const nodePos = new Vector3(x, y, 0)
        const distance = nodePos.distanceTo(mousePos)
        const offset = map(distance, 15, 0, 0, 1, true)
        if ((mouse.y * viewport.height) / 2 > y) {
          matrix.setPosition(x + graph(x, y) + offset, y + graph(x, y), 0)
        } else {
          matrix.setPosition(x + graph(x, y), y + graph(x, y) + offset, 0)
        }
        // matrix.setPosition(x + graph(x, y), y + graph(x, y) - offset, 0)
        ref.current.setMatrixAt(i, matrix)
        ref.current.instanceMatrix.needsUpdate = true
      }
    }
    ref.current.needsUpdate = true
  })

  useLayoutEffect(() => {
    const transform = new THREE.Matrix4()
    // const scale = new Vector3(2.5, 2.5, 2.5)

    for (let i = 0; i < 1500; ++i) {
      const x = ((i % 50) - 25) * 5
      const y = (Math.floor(i / 50) - 15) * 5

      const largeNode = largeNodes.filter((e) => e.x === x && e.y === y)
      // const col = blue.lerp(teal, map(x + y, 100, 200, 0, 1, true))
      if (largeNode.length !== 1) {
        // ref.current.setColorAt(i, largeNode[0].color)
        transform.setPosition(x, y, 0)
      }
      // ref.current.setColorAt(i, white)
      ref.current.setColorAt(i, white)
      ref.current.setMatrixAt(i, transform)
      ref.current.instanceColor.needsUpdate = true
      ref.current.instanceMatrix.needsUpdate = true
    }
  }, [colors, largeNodes])
  return (
    <instancedMesh ref={ref} args={[null, null, 10000]}>
      <circleGeometry attach="geometry" args={[0.2]}></circleGeometry>
      <meshPhongMaterial attach="material" opacity={0.6} />
    </instancedMesh>
  )
}

function LargeDots() {
  const ref = useRef()

  // let t = 0
  // let f = 0.003
  // let a = 0.4
  // const graph = useCallback(
  //   (x, z) => {
  //     return Math.sin(f * (x ** 2 + z ** 2 + t)) * a
  //   },
  //   [t, f, a]
  // )

  // useFrame(() => {
  //   t += 15

  //   const matrix = new THREE.Matrix4()
  //   // console.log(ref.current)
  //   for (let i = 0; i < 1500; ++i) {
  //     const x = ((i % 50) - 25) * 5
  //     const y = (Math.floor(i / 50) - 15) * 5

  //     // const scale = new Vector3(2, Math.sin(y), 2)
  //     matrix.setPosition(x, y + graph(x, y), 0)
  //     // matrix.scale(scale)
  //     ref.current.setMatrixAt(i, matrix)
  //     ref.current.instanceMatrix.needsUpdate = true
  //   }
  //   ref.current.needsUpdate = true
  // })
  const blue = new Color('rgba(87, 135, 255, 1)')
  const teal = new Color('rgba(0, 183, 144,1)')
  const orange = new Color('rgba(255, 120, 64, 1)')
  const yellow = new Color('rgba(247, 163, 0, 1)')
  const purple = new Color('rgba(210, 125, 255, 1)')
  const white = new Color('rgba(255, 255, 255, 1)')

  const colors = [teal, orange, blue, yellow, purple]

  const largeNodes = [
    { x: 0, y: 0, color: blue },
    { x: 100, y: 20, color: blue },
    { x: -30, y: 50, color: teal },
    { x: -120, y: 60, color: purple },
    { x: 80, y: -70, color: orange },
    { x: -80, y: -40, color: yellow }
  ]

  let t = 0
  let f = 0.001
  let a = 0.5
  const graph = useCallback(
    (x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a
    },
    [t, f, a]
  )

  const { viewport } = useThree()
  useFrame(({ mouse }) => {
    t += 15
    const matrix = new THREE.Matrix4()
    for (let i = 0; i < 1500; ++i) {
      const x = ((i % 50) - 25) * 5
      const y = (Math.floor(i / 50) - 15) * 5
      // if (t === 15 && x === 0 && y === 0) {
      //   console.log(ref.current)
      // }
      const largeNode = largeNodes.filter((e) => e.x === x && e.y === y)
      if (largeNode.length === 1) {
        const mousePos = new Vector3((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
        const nodePos = new Vector3(x, y, 0)
        const distance = nodePos.distanceTo(mousePos)
        const factor = map(distance, 10, 0, 1.5, 3, true)
        const offset = map(distance, 15, 0, 0, 1, true)
        const scale = new Vector3(factor, factor, 1)
        const scaledMatrix = matrix.clone()
        scaledMatrix.scale(scale)
        // if (mouse.x > x) {
        scaledMatrix.setPosition(x + graph(x, y), y + graph(x, y) + offset, 0)
        // } else {
        //   scaledMatrix.setPosition(x + graph(x, y), y + graph(x, y) - offset, offset)
        // }
        ref.current.setMatrixAt(i, scaledMatrix)
        // ref.current.setColorAt(i, largeNode[0].color)
        ref.current.instanceMatrix.needsUpdate = true
        ref.current.instanceColor.needsUpdate = true
      }
    }
    ref.current.needsUpdate = true
  })

  useLayoutEffect(() => {
    const transform = new THREE.Matrix4()
    // const scale = new Vector3(2.5, 2.5, 2.5)

    for (let i = 0; i < 1500; ++i) {
      const x = ((i % 50) - 25) * 5
      const y = (Math.floor(i / 50) - 15) * 5

      const largeNode = largeNodes.filter((e) => e.x === x && e.y === y)
      // const col = blue.lerp(teal, map(x + y, 100, 200, 0, 1, true))
      if (largeNode.length === 1) {
        transform.setPosition(x, y, 0)

        ref.current.setColorAt(i, largeNode[0].color)
        ref.current.setMatrixAt(i, transform)

        ref.current.instanceColor.needsUpdate = true
        ref.current.instanceMatrix.needsUpdate = true
      }
      // ref.current.setColorAt(i, white)
    }
  }, [colors, largeNodes])
  return (
    <instancedMesh ref={ref} args={[null, null, 10000]}>
      <sphereGeometry args={[0.5, 12, 12]} />
      <meshPhongMaterial shininess={0} emissive={0x414244} emissiveIntensity={1} attach="material" opacity={1} />
    </instancedMesh>
  )
}

function Light() {
  const { viewport } = useThree()
  // viewport = canvas in 3d units (meters)

  const light = useRef()
  const obj = useRef()

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    light.current.position.set(x, y, 10)

    // Move the object3D target
    // Divide cursor position so it's slightly from mouse
    obj.current.position.set(x / 20, y / 20, -10)

    // Point the light at the object3D target
    light.current.target = obj.current
  })

  return (
    <spotLight penumbra={1} intensity={1} ref={light} color={0xffffff}>
      <object3D ref={obj} position={[0, 0, 0]} />
    </spotLight>
  )
}

export default function App() {
  return (
    <Canvas orthographic camera={{ zoom: 10 }} colorManagement={false}>
      <color attach="background" args={['#121315']} />
      <Dots />
      <LargeDots />
      <Light />
    </Canvas>
  )
}
