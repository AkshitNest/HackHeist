import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'
import BasicPage from './pages/BasicPage'
import Preloader from './components/Preloader'
import { useState, useEffect } from "react";

export default function App() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fake minimum wait + real page load
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!loaded && <Preloader />}   {/* 👈 show preloader */}

      {/* hide site until loaded */}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/about"
              element={
                <BasicPage title="About">
                  We bring hackers together for a cinematic 24h build.
                </BasicPage>
              }
            />
            <Route
              path="/schedule"
              element={
                <BasicPage title="Schedule">
                  See the timeline on the home page.
                </BasicPage>
              }
            />
            <Route
              path="/sponsors"
              element={
                <BasicPage title="Sponsors">
                  Become a partner — contact us.
                </BasicPage>
              }
            />
            <Route
              path="/contact"
              element={
                <BasicPage title="Contact">
                  Email us: crew@hackheist.dev
                </BasicPage>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
