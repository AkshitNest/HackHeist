import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function useCountdown(targetDate){
  const [now, setNow] = useState(Date.now())
  useEffect(()=>{
    const id = setInterval(()=> setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, targetDate - now)
  const s = Math.floor(diff/1000)
  const days = Math.floor(s / 86400)
  const hours = Math.floor((s % 86400) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  return { days, hours, minutes, seconds }
}

function Box({ value, label }){
  const formatted = useMemo(()=> String(value).padStart(2, '0'), [value])
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
      transition={{ duration: 0.35, type: 'spring', stiffness: 220, damping: 18 }}
      style={{ transformPerspective: 700 }}
      className="relative rounded-2xl bg-gradient-to-b from-heist-red to-heist-red/60 px-9 py-7 text-center border border-white/10 shadow-soft hover:shadow-xl"
    >
      <div className="text-5xl md:text-6xl font-extrabold tracking-tight">{formatted}</div>
      <div className="mt-1 text-sm uppercase tracking-wider text-white/90">{label}</div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10"></div>
    </motion.div>
  )
}

function ParticlesTiny(){
  const ref = useRef(null)
  const raf = useRef(0)
  useEffect(()=>{
    const el = ref.current
    if(!el) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth/el.clientHeight, 0.1, 100)
    camera.position.z = 5
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)
    const g = new THREE.BufferGeometry()
    const n = 180
    const pos = new Float32Array(n*3)
    for(let i=0;i<n;i++){
      pos[i*3] = (Math.random()-0.5)*6
      pos[i*3+1] = (Math.random()-0.5)*2
      pos[i*3+2] = (Math.random()-0.5)*3
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos,3))
    const m = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.3 })
    const p = new THREE.Points(g, m)
    scene.add(p)
    const animate = ()=>{
      p.rotation.y += 0.002
      renderer.render(scene,camera)
      raf.current = requestAnimationFrame(animate)
    }
    animate()
    return ()=>{ cancelAnimationFrame(raf.current); m.dispose(); g.dispose(); renderer.dispose(); el.removeChild(renderer.domElement) }
  }, [])
  return <div ref={ref} className="absolute inset-0 -z-10" aria-hidden />
}

export default function Countdown({ target }){
  const { days, hours, minutes, seconds } = useCountdown(target)
  return (
    <div className="relative">
      <ParticlesTiny />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Box value={days} label="Days" />
        <Box value={hours} label="Hours" />
        <Box value={minutes} label="Minutes" />
        <Box value={seconds} label="Seconds" />
      </div>
    </div>
  )
}


