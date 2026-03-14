import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TapeReveal({ 
  children, 
  text = "CAUTION", 
  tapeColor = "bg-orange-500", 
  textColor = "text-black",
  customRotation = -2
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div 
      className="relative inline-block cursor-grab active:cursor-grabbing group"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onClick={() => setIsRevealed(!isRevealed)}
    >
      {/* The actual content being revealed */}
      <div className={`transition-opacity duration-700 ease-out ${isRevealed ? 'opacity-100' : 'opacity-10'}`}>
        {children}
      </div>

      {/* The tape covering it */}
      <motion.div
        initial={false}
        animate={isRevealed ? {
          y: -40,
          x: 40,
          rotate: customRotation + 25,
          opacity: 0,
          scale: 1.1,
          filter: "blur(4px)"
        } : {
          y: 0,
          x: 0,
          rotate: customRotation,
          opacity: 1,
          scale: 1.05,
          filter: "blur(0px)"
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className={`absolute inset-0 z-10 flex items-center justify-center overflow-hidden ${tapeColor} shadow-[0_8px_30px_rgb(0,0,0,0.5)]`}
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(0,0,0,0.1) 15px, rgba(0,0,0,0.1) 30px)",
          clipPath: "polygon(2% 0%, 98% 3%, 100% 98%, 1% 95%)" // Slightly jagged edges for a "ripped" look
        }}
      >
        <div className={`font-black uppercase tracking-[0.3em] text-xs sm:text-sm md:text-xl whitespace-nowrap px-8 ${textColor} opacity-80 mix-blend-overlay`}>
          {text} &nbsp;&nbsp;&nbsp; {text} &nbsp;&nbsp;&nbsp; {text}
        </div>
        <div className={`absolute font-black uppercase tracking-[0.3em] text-xs sm:text-sm md:text-xl whitespace-nowrap px-8 ${textColor}`}>
          {text} &nbsp;&nbsp;&nbsp; {text} &nbsp;&nbsp;&nbsp; {text}
        </div>
      </motion.div>
    </div>
  );
}
