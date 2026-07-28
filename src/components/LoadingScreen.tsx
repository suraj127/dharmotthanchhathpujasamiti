import React, { useEffect, useState } from 'react';
import { OFFICIAL_LOGO_URL } from '../constants';

interface LoadingScreenProps {
  onFinished?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Show the logo loading animation for 1.8 seconds then fade out smoothly
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onFinished) onFinished();
      }, 500); // 500ms fade transition
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#FAF8F5] flex flex-col items-center justify-center transition-opacity duration-500 select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Radiant Subtle Backlight Glow */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#ff9933]/15 blur-3xl animate-pulse pointer-events-none" />

      {/* Logo Container with Smooth Scale Pulse & Halo Ring */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Outer Golden Ring */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ff9933]/40 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-dotted border-[#8f4e00]/30 animate-[spin_6s_linear_infinite_reverse]" />

          {/* Official Emblem Logo */}
          <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center p-2 rounded-full bg-white/80 shadow-lg backdrop-blur-sm animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="पूर्वांचल लोक संस्कृति मंच"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Minimalist Spinner Dots */}
        <div className="flex items-center gap-1.5 mt-6">
          <span className="w-2 h-2 rounded-full bg-[#ff9933] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-[#b6171e] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-[#8f4e00] animate-bounce" />
        </div>
      </div>
    </div>
  );
};
