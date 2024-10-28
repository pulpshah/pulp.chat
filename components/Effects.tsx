"use client"
import React, { useEffect, useRef, useState } from 'react';

// SoftGlowFx Component
const SoftGlowFx: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="soft-glow">
      {children}
      <style jsx>{`
        .soft-glow {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.7), 
                       0 0 10px rgba(173, 216, 230, 0.6),
                       0 0 20px rgba(173, 216, 230, 0.5);
          color: #e0e0e0;
          transition: text-shadow 0.3s ease;
        }
        .soft-glow:hover {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.8),
                       0 0 15px rgba(173, 216, 230, 0.8),
                       0 0 25px rgba(173, 216, 230, 0.7);
        }
      `}</style>
    </div>
  );
};

// HardGlowFx Component
const HardGlowFx: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="hard-glow">
      {children}
      <style jsx>{`
        .hard-glow {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
                       0 0 20px rgba(255, 0, 0, 0.7),
                       0 0 30px rgba(255, 0, 0, 0.6),
                       0 0 40px rgba(255, 0, 0, 0.5);
          color: #ff6666;
          font-weight: bold;
          transition: text-shadow 0.3s ease;
        }
        .hard-glow:hover {
          text-shadow: 0 0 18px rgba(255, 255, 255, 1),
                       0 0 25px rgba(255, 69, 0, 0.8),
                       0 0 40px rgba(255, 69, 0, 0.7),
                       0 0 50px rgba(255, 69, 0, 0.6);
        }
      `}</style>
    </div>
  );
};

const CyberFx: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="hologram">
      {children}
      <style jsx>{`
        .hologram {
          font-weight: bold;
          color: #ffffff;
          background: linear-gradient(45deg, #00e4ff, #00ffab, #00e4ff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: hologramShift 2s ease infinite, flicker 0.15s infinite alternate;
        }

        @keyframes hologramShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes flicker {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const RedactFx: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRedacted, setIsRedacted] = useState(true);

  return (
    <div className="redact-effect" onClick={() => setIsRedacted(!isRedacted)}>
      <span className="text-content">{children}</span>
      {isRedacted && <div className="redact-overlay"></div>}
      <style jsx>{`
        .redact-effect {
          position: relative;
          display: inline-block;
          cursor: pointer;
          overflow: hidden;
          color: inherit;
        }

        .redact-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          animation: redact-animation 1s ease forwards;
          z-index: 1;
        }

        @keyframes redact-animation {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

interface SparkleFxProps {
  text: string;
  speed?: 'slow' | 'medium' | 'fast';
}


const CustomSparkleFx: React.FC<SparkleFxProps> = ({ text, speed = 'medium' }) => {
  const sparkleAnimationDuration = speed === 'slow' ? '2s' : speed === 'fast' ? '0.5s' : '1s';

  return (
    <div className="sparkle-text">
      {text.split('').map((char, index) => (
        <span key={index} className="sparkle-letter">
          {char}
          <span className="sparkle-overlay"></span>
        </span>
      ))}
      <style jsx>{`
        .sparkle-text {
          display: inline-flex;
          position: relative;
          overflow: hidden;
          font-weight: bold;
          font-size: 1.2em;
          color: #333;
        }

        .sparkle-letter {
          position: relative;
          display: inline-block;
          margin-right: 0.05em;
        }

        .sparkle-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent 60%);
          opacity: 0;
          animation: sparkle-animation ${sparkleAnimationDuration} infinite;
        }

        @keyframes sparkle-animation {
          0% {
            transform: scale(0.5) translate(-50%, -50%);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) translate(50%, 50%);
            opacity: 1;
          }
          100% {
            transform: scale(0.5) translate(50%, 50%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};




export { SoftGlowFx, HardGlowFx, CyberFx, RedactFx, CustomSparkleFx};
