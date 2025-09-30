import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import maskUrl from '../assets/brand/mask-logo.jpg'

export default function MaskCanvas(){
  const ref = useRef(null)
  const requestRef = useRef(0)
  const stateRef = useRef({ rot: 0, scrollBase: 0, spinOffset: 0, hovering: false })

  useEffect(() => {
    const container = ref.current
    if(!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / 360, 0.1, 100)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, 360)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.background = 'transparent'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    const light = new THREE.DirectionalLight(0xffffff, 1.2)
    light.position.set(2, 2, 3)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))

    const geometry = new THREE.PlaneGeometry(18, 16)
    const material = new THREE.MeshStandardMaterial({ transparent: true, roughness: 0.6, metalness: 0.1 })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Rotating text beneath the mask
    const textCanvas = document.createElement('canvas')
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    textCanvas.width = 2048 * dpr
    textCanvas.height = 512 * dpr
    const tctx = textCanvas.getContext('2d')
    tctx.scale(dpr, dpr)
    const centerX = 1024
    const centerY = 256
    tctx.textAlign = 'center'
    tctx.textBaseline = 'middle'
    // Stroke for contrast
    tctx.lineWidth = 10
    tctx.strokeStyle = 'rgba(0,0,0,0.9)'
    tctx.font = '900 220px Inter, Arial, sans-serif'
    tctx.strokeText('HackHeist', centerX, centerY)
    // Fill with bright white and red glow
    tctx.shadowColor = 'rgba(179,0,0,0.9)'
    tctx.shadowBlur = 48
    tctx.fillStyle = '#ffffff'
    tctx.fillText('HackHeist', centerX, centerY)

    const textTex = new THREE.CanvasTexture(textCanvas)
    textTex.colorSpace = THREE.SRGBColorSpace
    const textMat = new THREE.MeshBasicMaterial({ map: textTex, transparent: true, depthWrite: false, depthTest: false, opacity: 1, color: 0xffffff })
    const textGeo = new THREE.PlaneGeometry(14, 4)
    const textMesh = new THREE.Mesh(textGeo, textMat)
    textMesh.position.y = -4.2
    textMesh.position.z = 0.02
    textMesh.renderOrder = 5
    scene.add(textMesh)

    // Redraw once again shortly to ensure web font availability in canvas
    setTimeout(() => {
      tctx.clearRect(0,0,textCanvas.width/dpr,textCanvas.height/dpr)
      tctx.lineWidth = 10
      tctx.strokeStyle = 'rgba(0,0,0,0.9)'
      tctx.font = '900 220px Inter, Arial, sans-serif'
      tctx.strokeText('HackHeist', centerX, centerY)
      tctx.shadowColor = 'rgba(179,0,0,0.9)'
      tctx.shadowBlur = 48
      tctx.fillStyle = '#ffffff'
      tctx.fillText('HackHeist', centerX, centerY)
      textTex.needsUpdate = true
    }, 600)

    // Robustly load image (JPG/PNG/SVG) by rasterizing into a CanvasTexture
    let disposed = false
    ;(async () => {
      try {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          if(disposed) return
          const size = 1536
          const canvas = document.createElement('canvas')
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext('2d')
          ctx.clearRect(0,0,size,size)
          // smart-fit: pad slightly and bias downward so the top stays visible
          const cover = Math.max(size / img.width, size / img.height)
          const contain = Math.min(size / img.width, size / img.height)
          const scale = Math.min(cover, contain * 1.02)
          const w = img.width * scale
          const h = img.height * scale
          const x = (size - w)/2
          const y = (size - h)/2 + size * 0.08 // shift down to reveal top fully
          ctx.drawImage(img, x, y, w, h)
          const texture = new THREE.CanvasTexture(canvas)
          texture.colorSpace = THREE.SRGBColorSpace
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
          material.map = texture
          material.needsUpdate = true
        }
        if(maskUrl.endsWith('.svg')){
          const svgText = await fetch(maskUrl).then(r => r.text())
          if(disposed) return
          const svgBlob = new Blob([svgText], { type: 'image/svg+xml' })
          const svgObjectUrl = URL.createObjectURL(svgBlob)
          img.onload = () => { /* onload set above will run */ }
          img.src = svgObjectUrl
        } else {
          img.src = maskUrl
        }
      } catch (e) {
        // Silent fallback: leave material without map
      }
    })()

    function onResize(){
      const w = container.clientWidth
      const h = 760
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    function onScroll(){
      const max = document.body.scrollHeight - window.innerHeight
      const scroll = window.scrollY / Math.max(1, max)
      stateRef.current.scrollBase = scroll * Math.PI * 2
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    function onEnter(){ stateRef.current.hovering = true }
    function onLeave(){ stateRef.current.hovering = false }
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)

    const tick = () => {
      const s = stateRef.current
      // spin acceleration on hover
      if(s.hovering){
        s.spinOffset += 0.08
      } else {
        s.spinOffset *= 0.94
      }
      const desired = s.scrollBase + s.spinOffset
      s.rot += (desired - s.rot) * 0.045
      mesh.rotation.y = s.rot * 0.35
      mesh.rotation.x = Math.sin(s.rot * 0.5) * 0.15
      mesh.position.y = Math.sin(s.rot * 0.25) * 0.6
      mesh.material.opacity = 0.12
      // sync text with mask rotation for cohesion
      textMesh.rotation.y = mesh.rotation.y
      textMesh.position.y = -5.0 + Math.sin(s.rot * 0.25) * 0.15
      renderer.render(scene, camera)
      requestRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(requestRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
      disposed = true
      renderer.dispose()
      material.dispose()
      geometry.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={ref} className="w-full h-[760px] cursor-pointer" aria-hidden />
  )
}


