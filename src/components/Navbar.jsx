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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <nav 
        className="bg-black/40 backdrop-blur-2xl rounded-full shadow-2xl border border-white/10 px-6 py-3 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(179,0,0,0.3)]"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white font-semibold hover:opacity-90 transition-opacity">
            <MaskLogo />
            <span className="tracking-tight text-lg font-bold" style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>Hack Heist Season 2</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <a href="#about" className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">About</a>
            <a href="#prizes" className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">Loot</a>
            <a href="#partners" className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">Partners</a>
            <a href="#tracks" className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">Tracks</a>
            <a href="#past" className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">Past Heists</a>
            <a href="#team" className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">Our Team</a>
            <a href="#join" className="text-sm text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all">Join Us</a>
            <Link 
              to="/register" 
              className="ml-2 inline-flex items-center rounded-full bg-heist-red text-white px-5 py-2 text-sm font-semibold shadow-lg hover:shadow-xl hover:bg-red-700 transition-all duration-300 hover:scale-105"
            >
              Register
            </Link>
          </div>
          <button 
            aria-controls="mobile-menu" 
            aria-expanded={open} 
            onClick={()=>setOpen(v=>!v)} 
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-heist-red transition-all"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </nav>
      <div ref={panelRef} id="mobile-menu" role="dialog" aria-modal="true" className={`md:hidden fixed inset-y-0 right-0 w-72 bg-black/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl transform transition-transform rounded-l-3xl ${open? 'translate-x-0':'translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-semibold"><MaskLogo /><span style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>Hack Heist</span></div>
          <button aria-label="Close menu" onClick={()=>setOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-all">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-4 space-y-2">
          {[['#about','About'],['#prizes','Loot'],['#partners','Partners'],['#tracks','Tracks'],['#past','Past Heists'],['#team','Our Team'],['#join','Join Us']].map(([to,label])=> (
            <a key={to} href={to} className="block rounded-2xl px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-white transition-all">{label}</a>
          ))}
          <Link to="/register" className="block text-center rounded-2xl bg-heist-red text-white px-4 py-3 font-semibold hover:bg-red-700 transition-all hover:scale-105 shadow-lg">Register</Link>
        </div>
      </div>
    </header>
  )
}


