/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

export default function ConceptCard({ title, description, imageSrc, features, index }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const springConfig = { stiffness: 100, damping: 30, bounce: 0 };
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), springConfig);
    const yText = useSpring(useTransform(scrollYProgress, [0, 1], [-50, 50]), springConfig);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Accordion State
    const [expandedFeature, setExpandedFeature] = useState(null);

    // 3D Tilt Effect on Hover
    const [hoverData, setHoverData] = useState({ x: 0, y: 0, width: 1, height: 1, hover: false });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setHoverData({ x, y, width: rect.width, height: rect.height, hover: true });
    };

    const handleMouseLeave = () => {
        setHoverData((prev) => ({ ...prev, hover: false }));
    };

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity }}
            className={`w-full max-w-7xl mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center py-24 px-6 relative z-10`}
        >
            {/* Image Container with 3D Interaction */}
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 1000 }}
                className="flex-1 w-full relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden cursor-crosshair group"
            >
                <motion.div
                    animate={{
                        rotateX: hoverData.hover ? -(hoverData.y / hoverData.height - 0.5) * 25 : 0,
                        rotateY: hoverData.hover ? (hoverData.x / hoverData.width - 0.5) * 25 : 0,
                        scale: hoverData.hover ? 1.05 : 1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="w-full h-full relative"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Main Image */}
                    <motion.div
                        initial={{ scale: 1.1, filter: "blur(10px)", opacity: 0 }}
                        whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
                    >
                        <motion.img
                            src={imageSrc}
                            alt={title}
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 8 + (index % 3) * 2, // Slight variation per card
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-full h-full object-cover mix-blend-lighten group-hover:opacity-100 transition-opacity duration-700"
                            style={{ y }}
                        />

                        {/* Scanning Line Effect */}
                        <motion.div
                            animate={{ top: ["-10%", "110%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                            className="absolute left-0 right-0 h-[2px] bg-orange-500/50 blur-[1px] pointer-events-none z-10"
                            style={{ boxShadow: "0 0 10px rgba(249, 115, 22, 0.8)" }}
                        />
                    </motion.div>

                    {/* Glass Overlay on Hover */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-2xl border border-white/10"
                        style={{
                            background: hoverData.hover
                                ? `radial-gradient(circle at ${hoverData.x}px ${hoverData.y}px, rgba(255,255,255,0.1) 0%, transparent 40%)`
                                : 'transparent'
                        }}
                    />

                    {/* Decorative Elements */}
                    <div 
                        className="absolute top-4 left-4 font-mono text-[10px] text-orange-500 tracking-widest border border-orange-500/30 px-2 py-1 bg-black/50 backdrop-blur-md rounded transition-transform duration-500"
                        style={{ transform: hoverData.hover ? "translateZ(50px)" : "translateZ(0px)", transformStyle: "preserve-3d" }}
                    >
                        FIG. 0{index + 1}
                    </div>

                    {/* Live Coordinate Tracker */}
                    <AnimatePresence>
                        {hoverData.hover && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
                                className="absolute top-4 right-4 font-mono text-[9px] text-white/50 tracking-widest flex flex-col items-end gap-1 pointer-events-none"
                            >
                                <span className="text-orange-500">SYS_TRACKING</span>
                                <span>X: {Math.round(hoverData.x)}px</span>
                                <span>Y: {Math.round(hoverData.y)}px</span>
                            </motion.div>
                        )}
                    </AnimatePresence>



                    {/* Technical Specs Text Overlay */}
                    <div 
                        className="absolute bottom-16 left-4 right-4 pointer-events-none opacity-40 mix-blend-overlay hidden md:block transition-transform duration-500"
                        style={{ transform: hoverData.hover ? "translateZ(30px)" : "translateZ(0px)", transformStyle: "preserve-3d" }}
                    >
                        <div className="font-mono text-[8px] tracking-[0.3em] uppercase text-white leading-loose break-words whitespace-pre-wrap">
                            &gt; INITIATING SEQUENCE_0{index + 1}...<br />
                            &gt; EVALUATING VECTOR_FIELD [(X*T),(Y*T),(Z*T)]<br />
                            &gt; ALL SYSTEMS NOMINAL<br />

                            {features.map(f => `> [${f.title}] `)}
                        </div>
                    </div>

                    {/* Audio/Signal Bars */}
                    <div 
                        className="absolute bottom-4 right-4 flex gap-1 transition-transform duration-500"
                        style={{ transform: hoverData.hover ? "translateZ(50px)" : "translateZ(0px)", transformStyle: "preserve-3d" }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={hoverData.hover ? { height: [4, 12 + Math.random() * 10, 4] } : { height: 4 }}
                                transition={{ duration: 0.5 + Math.random() * 0.5, delay: i * 0.1, repeat: hoverData.hover ? Infinity : 0 }}
                                className="w-1 bg-orange-500 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Content Container */}
            <motion.div
                className="flex-1 w-full flex flex-col justify-center"
                style={{ y: yText }}
            >
                <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="h-[1px] w-12 bg-orange-500" />
                        <span className="font-mono text-xs tracking-[0.2em] text-orange-500 uppercase">System Overview</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h2>

                    <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
                        {description}
                    </p>

                    <div className="space-y-4">
                        {features.map((feature, i) => {
                            const isExpanded = expandedFeature === i;

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                                    whileHover={{ x: 10, backgroundColor: "rgba(249, 115, 22, 0.05)" }}
                                    onClick={() => setExpandedFeature(isExpanded ? null : i)}
                                    className={`group flex gap-4 p-4 border rounded-lg transition-all cursor-pointer overflow-hidden ${isExpanded ? 'border-orange-500/50 bg-orange-500/5' : 'border-zinc-900 hover:border-orange-500/30'}`}
                                >
                                    <div className={`font-mono text-sm transition-transform ${isExpanded ? 'text-orange-400 scale-110' : 'text-orange-600 group-hover:text-orange-500'}`}>0{i + 1}.</div>
                                    <div className="flex-1">
                                        <h4 className="text-zinc-100 font-bold uppercase tracking-tight text-sm mb-1">{feature.title}</h4>
                                        <p className="text-zinc-500 text-xs font-mono mb-2">{feature.desc}</p>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/50 pt-3 mt-1">
                                                        {feature.details}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
