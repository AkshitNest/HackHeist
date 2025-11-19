import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { usePerformance, useMousePosition } from '../hooks/usePerformance'

function MaskModel({ mousePosition, animationSpeed = 1, ...props }) {
  const meshRef = useRef()
  const { scene } = useGLTF('/models/mask.glb')

  useFrame((state) => {
    if (!meshRef.current || !mousePosition) return

    const bias = -0.2
    const targetY = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      bias + (mousePosition.x - 0.5) * 0.8,
      0.04 * animationSpeed
    )

    const targetX = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      (mousePosition.y - 0.5) * 0.4,
      0.04 * animationSpeed
    )

    meshRef.current.rotation.set(targetX, targetY, 0)
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.15
  })


  return (
    <group ref={meshRef} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

function Lights() {
  return (
    <>
      <directionalLight
        position={[-6, 6, 5]}
        intensity={2.8}
        color="#ffffff"
        castShadow
      />
      <pointLight 
        position={[3, 4, 6]}
        intensity={1.6}
        color="#ff3e3e"
      />
      <pointLight
        position={[-3, -2, 4]}
        intensity={0.6}
        color="#ffffff"
      />
      <ambientLight intensity={0.45} />

    </>
  )
}

function SmokeBackground() {
  const materialRef = useRef()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh position={[0, 0, -6]}>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          // Smooth random noise
          float noise(vec2 p) {
            return sin(p.x) * sin(p.y);
          }

          void main() {
            vec2 pos = vUv * 3.0;
            float n = noise(pos + uTime * 0.15) + noise(pos * 0.6 - uTime * 0.1);
            n = smoothstep(-0.3, 1.0, n);
            vec3 color = mix(vec3(0.02, 0.0, 0.0), vec3(0.3, 0.0, 0.0), n);
            gl_FragColor = vec4(color, 0.25); // 25% opacity smoke
          }
        `}
      />
    </mesh>
  )
}


function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
    </div>
  )
}

function MaskGlow() {
  const glowMap = useTexture('/textures/radial-red-glow.png', undefined, (err) => {
    console.error("Glow texture failed to load:", err)
  })

  return glowMap ? (
    <mesh position={[0, 1.2, -1.2]} scale={[5, 5, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={glowMap}
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  ) : null
}

export default function Mask() {
  const mousePosition = useMousePosition(16)
  const { settings, isLowPowerMode } = usePerformance()

  return (
    <div className="w-full h-full">
      <div className="absolute inset-0">
        <Canvas
          shadows
          gl={{ alpha: true, antialias: true }}
          camera={{
            position: [0, 0, 11], // move back to reveal full top
            fov: 50,
            near: 0.1,
            far: 100
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Lights />
            <SmokeBackground />
            <mesh position={[0, -1.5, -2]} rotation={[-Math.PI/2, 0, 0]}>
              <planeGeometry args={[10, 10]} />
              <shadowMaterial opacity={0.25} />
            </mesh>

            <MaskGlow />

            {/* Contact shadow beneath mask */}
            <mesh position={[0, 0.8, -0.5]} rotation={[-0.2, 0, 0]}>
              <circleGeometry args={[2.5, 32]} />
              <meshBasicMaterial 
                color="#000000" 
                transparent 
                opacity={0.3}
                depthWrite={false}
              />
            </mesh>

            <MaskModel
              mousePosition={mousePosition}
              animationSpeed={settings.animationSpeed}
              scale={2.5}
              position={[0, 1.2, 0]}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-none">
        <Suspense fallback={<Loader />}>
          <div />
        </Suspense>
      </div>
    </div>
  )
}

useGLTF.preload('/models/mask.glb')
