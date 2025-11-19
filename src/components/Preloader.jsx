import React, { useEffect, useMemo, useState } from "react";
import "./Preloader.css";

const statusMessages = [
  "Hacking the System",
  "Cracking the Code",
  "Decrypting the Data",
  "Hacking the System",
  "Cracking the Code",
  "Decrypting the Data",
  "Hacking the System",
  "Cracking the Code",
  "Decrypting the Data",
];

const createCoins = () =>
  Array.from({ length: 60 }, (_, i) => ({
    id: i,
    delay: (Math.random() * 1.2).toFixed(2),
    duration: (1.2 + Math.random() * 0.8).toFixed(2),
    scale: 0.55 + Math.random() * 0.65,
    offset: -120 + (i % 24) * 10,
  }));

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const coins = useMemo(createCoins, []);

  useEffect(() => {
    const closeTimer = setTimeout(() => setIsClosing(true), 2600);
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(closeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (isClosing || !visible) return undefined;
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [isClosing, visible]);

  const statusText = statusMessages[statusIndex];

  if (!visible) return null;

  return (
    <div
      className={`preloader cyber-vault ${isClosing ? "preloader--hide" : ""}`}
      role="status"
      aria-live="assertive"
    >
      <div className="preloader__background" aria-hidden="true" />
      <div className="preloader__particles" aria-hidden="true" />

      <div className="preloader__coins" aria-hidden="true">
        {coins.map((coin) => (
          <span
            key={coin.id}
            className="coin"
            style={{
              "--coin-delay": `${coin.delay}s`,
              "--coin-duration": `${coin.duration}s`,
              "--coin-scale": coin.scale,
              "--coin-offset": `${coin.offset}px`,
            }}
          />
        ))}
      </div>

      <div className="vault" aria-hidden="true">
        <div className="vault__glow" />
        <div className="vault__door">
          <span className="vault__rim vault__rim--outer" />
          <span className="vault__rim vault__rim--inner" />

          <span className="vault__ring vault__ring--outer" />
          <span className="vault__ring vault__ring--mid" />
          <span className="vault__ring vault__ring--inner" />

          <div className="vault__handle">
            <span />
            <span />
            <span />
          </div>

          <div className="vault__center">
            <span className="vault__center-core" />
            <span className="vault__center-core vault__center-core--2" />
          </div>
        </div>
      </div>

      <div className="preloader__copy">
        <p className="preloader__eyebrow">Hack Heist Season 2</p>
        <h1 className="preloader__headline">BE READY TO HACK</h1>
        <p className="preloader__status">{statusText}</p>
      </div>

      <div className="preloader__progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
