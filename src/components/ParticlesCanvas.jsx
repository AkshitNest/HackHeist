import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticlesCanvas(){
  const ref = useRef(null)
  const raf = useRef(0)
  useEffect(()=>{
    const container = ref.current
    if(!container) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth/container.clientHeight, 0.1, 100)
    camera.position.z = 8
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // particles
    const count = 600
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    for(let i=0;i<count;i++){
      positions[i*3+0] = (Math.random()-0.5)*20
      positions[i*3+1] = (Math.random()-0.5)*12
      positions[i*3+2] = (Math.random()-0.5)*10
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({ color: 0xb30000, size: 0.03, transparent: true, opacity: 0.65 })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const mouse = { x: 0, y: 0 }
    function onMouse(e){
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX-rect.left)/rect.width - 0.5) * 2
      mouse.y = ((e.clientY-rect.top)/rect.height - 0.5) * -2
    }
    window.addEventListener('mousemove', onMouse)

    function onResize(){
      renderer.setSize(container.clientWidth, container.clientHeight)
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    const animate = ()=>{
      const t = clock.getElapsedTime()
      points.rotation.y = t * 0.05
      camera.position.x += (mouse.x - camera.position.x) * 0.04
      camera.position.y += (mouse.y - camera.position.y) * 0.04
      camera.lookAt(0,0,0)
      renderer.render(scene, camera)
      raf.current = requestAnimationFrame(animate)
    }
    animate()

    return ()=>{
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      material.dispose(); geometry.dispose(); renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])
  return <div ref={ref} className="absolute inset-0 -z-10" aria-hidden />
}


