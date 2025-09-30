import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

function MaskLogo({ className = 'w-8 h-8' }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="absolute inset-0 rounded-full bg-heist-red/80 blur"></div>
      <div className="absolute inset-[3px] rounded-full bg-black border border-white/10"></div>
      <div className="absolute inset-0 grid place-items-center text-white font-black text-xs">HH</div>
    </div>
  )
}

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    function onKey(e){ if(e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/50 border-b border-white/10">
      <nav className="container flex items-center justify-between py-3" aria-label="Global">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <MaskLogo />
          <span className="tracking-tight">Hack Heist Season 2</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm text-gray-300 hover:text-white">About</a>
          <a href="#prizes" className="text-sm text-gray-300 hover:text-white">Loot</a>
          <a href="#partners" className="text-sm text-gray-300 hover:text-white">Partners</a>
          <a href="#tracks" className="text-sm text-gray-300 hover:text-white">Tracks</a>
          <a href="#past" className="text-sm text-gray-300 hover:text-white">Past Heists</a>
          <a href="#team" className="text-sm text-gray-300 hover:text-white">Our Team</a>
          <a href="#join" className="text-sm text-gray-300 hover:text-white">Join Us</a>
          <Link to="/register" className="inline-flex items-center rounded-full bg-heist-red text-white px-4 py-2 text-sm font-semibold shadow-soft focus:outline-none focus:ring-2 focus:ring-heist-red/60">Register</Link>
        </div>
        <button aria-controls="mobile-menu" aria-expanded={open} onClick={()=>setOpen(v=>!v)} className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-heist-red">
          <span className="sr-only">Open main menu</span>
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </nav>
      <div ref={panelRef} id="mobile-menu" role="dialog" aria-modal="true" className={`md:hidden fixed inset-y-0 right-0 w-72 bg-black/95 border-l border-white/10 shadow-soft transform transition-transform ${open? 'translate-x-0':'translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-semibold"><MaskLogo /><span>Hack Heist</span></div>
          <button aria-label="Close menu" onClick={()=>setOpen(false)} className="p-2 rounded-md hover:bg-white/10">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-4 space-y-2">
          {[['#about','About'],['#prizes','Loot'],['#partners','Partners'],['#tracks','Tracks'],['#past','Past Heists'],['#team','Our Team'],['#join','Join Us']].map(([to,label])=> (
            <a key={to} href={to} className="block rounded-xl px-3 py-2 text-gray-200 hover:bg-white/10">{label}</a>
          ))}
          <Link to="/register" className="block text-center rounded-xl bg-heist-red text-white px-4 py-2 font-semibold">Register</Link>
        </div>
      </div>
    </header>
  )
}


