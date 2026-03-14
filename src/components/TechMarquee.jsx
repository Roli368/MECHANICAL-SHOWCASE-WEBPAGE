import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TechMarquee({ text = "SYSTEM OPTIMAL • ", speed = 20, direction = 1 }) {
  const { scrollYProgress } = useScroll();
  const xTransform = useTransform(
    scrollYProgress, 
    [0, 1], 
    [direction === 1 ? 0 : -500, direction === 1 ? -500 : 0]
  );

  return (
    <div className="w-full overflow-hidden bg-orange-500 py-2 border-y border-orange-400 rotate-[-1deg] scale-105 my-24 z-30 relative shadow-[0_0_30px_rgba(249,115,22,0.3)]">
      <motion.div 
        style={{ x: xTransform }}
        className="flex whitespace-nowrap"
      >
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: speed,
            repeatType: "loop"
          }}
          className="flex whitespace-nowrap"
        >
          {/* Repeat text multiple times to ensure continuous scroll */}
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black font-black uppercase tracking-[0.5em] text-sm px-4">
              {text}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
