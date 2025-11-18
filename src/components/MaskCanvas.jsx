import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { usePerformance } from '../hooks/usePerformance'

export default function ParticlesCanvas() {
  const ref = useRef(null)
  const raf = useRef(0)
  const { settings } = usePerformance()

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: settings.antialias,
    })
    renderer.setPixelRatio(settings.pixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const aspect = container.clientWidth / container.clientHeight

    // === RAW SMOKE VIDEO LAYER ===
    const video = document.createElement('video')
    video.src = '/videos/smoke-bg.mp4'
    video.loop = true
    video.muted = true
    video.playbackRate = 1.0
    video.autoplay = true
    video.playsInline = true
    video.load()
    video.play().catch(() => console.warn('Autoplay blocked'))

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat

    const smokeGeometry = new THREE.PlaneGeometry(24 * aspect, 24)
    const smokeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1, // full video visibility
    })
    const smokePlane = new THREE.Mesh(smokeGeometry, smokeMaterial)
    smokePlane.position.z = -7.5
    scene.add(smokePlane)

    // === LIGHT SUBTLE RED BACKGRADIENT (BEHIND SMOKE) ===
    const redGeometry = new THREE.PlaneGeometry(50 * aspect, 30)
    const redMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          float leftFade = smoothstep(0.0, 0.25, 1.0 - vUv.x);
          float rightFade = smoothstep(0.0, 0.25, vUv.x);
          vec3 redTint = vec3(0.12, 0.0, 0.0);
          float alpha = max(leftFade, rightFade) * 0.4; // much lighter
          gl_FragColor = vec4(redTint, alpha);
        }
      `,
    })
    const redPlane = new THREE.Mesh(redGeometry, redMaterial)
    redPlane.position.z = -9 // sits behind smoke video
    scene.add(redPlane)

    // === Resize Handling ===
    const onResize = () => {
      const aspect = container.clientWidth / container.clientHeight
      renderer.setSize(container.clientWidth, container.clientHeight)
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      smokePlane.scale.set(aspect, 1, 1)
      redPlane.scale.set(aspect, 1, 1)
    }
    window.addEventListener('resize', onResize)

    // === Animate (minor drift only) ===
    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      smokePlane.position.x = Math.sin(t * 0.02) * 0.2
      renderer.render(scene, camera)
      raf.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', onResize)
      smokeMaterial.dispose()
      smokeGeometry.dispose()
      redMaterial.dispose()
      redGeometry.dispose()
      renderer.dispose()
      video.pause()
      container.removeChild(renderer.domElement)
    }
  }, [settings])

  return <div ref={ref} className="absolute inset-0 -z-10" aria-hidden />
}
