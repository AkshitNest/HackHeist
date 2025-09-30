export default function Footer(){
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container py-8 grid gap-8 md:grid-cols-3 text-gray-300">
        <div>
          <div className="text-white font-semibold">Hack Heist</div>
          <p className="mt-2 text-sm">The ultimate college hackathon. Dark-mode-first. High drama.</p>
        </div>
        <div>
          <div className="text-white font-semibold">Sponsors</div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="h-10 rounded-xl bg-white/5 border border-white/10" />
            ))}
          </div>
        </div>
        <div>
          <div className="text-white font-semibold">Follow</div>
          <div className="mt-2 flex gap-3">
            {['twitter','github','instagram'].map((s)=> (
              <a key={s} href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/10" aria-label={s}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Hack Heist</div>
    </footer>
  )
}


