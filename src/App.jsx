import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ConceptCard from './components/ConceptCard';
import TapeReveal from './components/TapeReveal';
import CustomCursor from './components/CustomCursor';
import TechMarquee from './components/TechMarquee';


const BackgroundParticle = ({ delay = 0, size = "w-32 h-32", position = "top-10 left-10", duration = 20, reverse = false }) => (
  <motion.div
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 0.1, rotate: reverse ? -360 : 360 }}
    transition={{ opacity: { duration: 2, delay }, rotate: { duration, repeat: Infinity, ease: "linear" } }}
    className={`absolute ${position} ${size} pointer-events-none z-0`}
  >
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-orange-500/20 w-full h-full" strokeWidth="1">
      <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="30" strokeDasharray="2 6" />
      <path d="M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M25 75 L75 25" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  </motion.div>
);

// Magnetic Link for Navbar
const MagneticLink = ({ children, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={() => setIsHovered(true)}
      style={{ x, y }}
      className="relative cursor-pointer px-4 py-2 flex items-center justify-center group"
    >
      {/* Background Hover Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-white/10 rounded-full blur-md"
      />

      <motion.span
        animate={{ color: isHovered ? '#f97316' : '#ffffff80' }}
        transition={{ duration: 0.2 }}
        className="relative z-10 transition-colors duration-200"
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const concepts = [
    {
      title: "Geared Synthesis",
      description: "Precision-engineered gear trains form the backbone of mechanical advantage. By altering torque and speed ratios, these interwoven teeth transmit power seamlessly across diverse applications, from timepieces to heavy industrial machinery. Exploring involute profiles ensures zero-slip engagement.",
      imageSrc: "/assets/gears.png",
      features: [
        {
          title: "Torque Multiplication",
          desc: "Mechanical advantage scaling",
          details: "Through calculating gear ratios (N2/N1 = T2/T1), torque can be exponentially multiplied at the cost of rotational speed, an essential principle in vehicle transmissions and heavy lifting equipment."
        },
        {
          title: "Kinematic Coupling",
          desc: "Synchronized power transmission",
          details: "Involute gear profiles guarantee a constant velocity ratio and minimize vibration. This precise geometric meshing is critical in high-speed applications like aerospace turbines."
        }
      ]
    },
    {
      title: "IC Engine Dynamics",
      description: "The internal combustion engine remains a marvel of thermodynamics. Harnessing controlled explosive forces, it converts chemical energy into kinetic motion through precisely timed cycles of intake, compression, power, and exhaust. High-temperature alloys and fluid dynamics define modern efficiency.",
      imageSrc: "/assets/ic_engine.png",
      features: [
        {
          title: "Thermodynamic cycles",
          desc: "Otto and Diesel efficiency",
          details: "Operating on the principles of adiabatic compression and isochoric heat addition, modern engines strive for theoretical thermal efficiencies while balancing emissions via EGR and catalytic systems."
        },
        {
          title: "Volumetric Engineering",
          desc: "Optimized airflow dynamics",
          details: "Variable valve timing (VVT) and forced induction (turbocharging) manipulate intake manifold pressures, dramatically increasing the volumetric efficiency (VE) across RPM bands."
        }
      ]
    },
    {
      title: "Robotic Automation",
      description: "The synthesis of kinematics, sensors, and control systems. Modern robotics pushes the boundaries of manufacturing, featuring multi-axis articulated arms capable of millimeter precision in the most demanding environments. Closed-loop feedback systems offer near real-time path adjustment.",
      imageSrc: "/assets/robotics.png",
      features: [
        {
          title: "Inverse Kinematics",
          desc: "Complex motion trajectory",
          details: "Solving non-linear equations to determine joint angles for a desired end-effector position. This mathematical framework allows 6-axis arms to follow perfectly linear paths in 3D Cartesian space."
        },
        {
          title: "Closed-loop Control",
          desc: "Real-time error correction",
          details: "High-frequency feedback loops continuously sample encoder data, adjusting motor current via PID controllers to eliminate steady-state error and counter external physical disturbances."
        }
      ]
    },
    {
      title: "CNC Machining",
      description: "Computer Numerical Control represents the pinnacle of subtractive manufacturing. By translating digital CAD models into precise G-code, these multi-axis mills and lathes sculpt complex geometries from solid billets with micrometer accuracy, revolutionizing both rapid prototyping and mass production.",
      imageSrc: "/assets/cnc_machine.png",
      features: [
        {
          title: "Subtractive Manufacturing",
          desc: "Precision material removal",
          details: "Tool steel or carbide cutters rotating at 10,000+ RPM shear away stock material. Coolant flow and feed rates are heavily optimized to maximize tool life and achieve mirror-finish tolerances."
        },
        {
          title: "Multi-axis Interpolation",
          desc: "Complex 3D toolpaths",
          details: "Simultaneous 5-axis movement (X, Y, Z, A, B) allows single-setup machining of highly organic shapes, such as aerospace impellers, drastically reducing setup time and alignment errors."
        }
      ]
    },
    {
      title: "Servo Systems",
      description: "Servo mechanisms provide the heartbeat of precision automation. Utilizing sophisticated closed-loop control algorithms, they guarantee accurate positioning, velocity, and acceleration against dynamic loads. Advanced encoders ensure micro-degree feedback resolution.",
      imageSrc: "/assets/servo.png",
      features: [
        {
          title: "PID Feedback Loops",
          desc: "Error-driven corrective action",
          details: "Proportional, Integral, and Derivative algorithms eliminate positioning errors. The P term drives the motion, I corrects long-term offsets, and D dampens oscillations for smooth settling."
        },
        {
          title: "High-Torque Density",
          desc: "Compact electro-mechanical power",
          details: "Rare-earth neodymium magnets combined with advanced winding techniques allow modern servos to deliver extraordinary peak torques in exceptionally small frame sizes."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-orange-500/30 selection:text-white cursor-none overflow-hidden sm:overflow-auto">
      <CustomCursor />
      
      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-amber-400 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="bg-noise" />

      {/* Navbar Overlay */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none"
      >

        <div className="absolute inset-0 bg-black/20 backdrop-blur-md border-b border-white/5 mask-image-gradient" />

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto cursor-pointer relative z-10"
        >
          <img src="/assets/logo.png" alt="MechaPEF Logo" className="h-10 w-auto bg-white/90 px-3 py-1.5 rounded-lg shadow-lg shadow-orange-500/10 transition-shadow hover:shadow-orange-500/30" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.5 }
            }
          }}
          className="text-[9px] sm:text-xs font-mono tracking-widest uppercase flex gap-2 pointer-events-auto relative z-10 overflow-x-auto no-scrollbar pr-2 max-w-[60vw] sm:max-w-none"
        >
          {['Systems', 'Kinematics', 'Dynamics', 'Manufacturing', 'Control'].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { y: -20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="flex-shrink-0"
            >
              <MagneticLink href={`#${item.toLowerCase()}`}>
                {item}
              </MagneticLink>
            </motion.div>
          ))}
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={{ y: yHero, opacity: opacityHero }}
        className="relative h-[100dvh] flex flex-col items-center justify-center p-6 text-center z-10 overflow-hidden"
      >
        <BackgroundParticle delay={0.5} size="w-96 h-96" position="-top-20 -left-20" duration={40} />
        <BackgroundParticle delay={1.5} size="w-64 h-64" position="bottom-20 -right-10" duration={30} reverse={true} />
        <BackgroundParticle delay={2.0} size="w-[500px] h-[500px]" position="top-1/4 -right-32" duration={60} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="border border-orange-500/30 rounded-full px-4 py-1.5 mb-8 bg-orange-500/10 backdrop-blur-sm text-orange-500 text-xs font-mono font-medium tracking-widest uppercase shadow-[0_0_15px_rgba(249,115,22,0.2)]"
          >
            MECHANICAL WEBPAGE SHOWCASE
          </motion.div>

          <motion.h1
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-8 flex flex-col items-center relative"
          >
            <motion.span
              initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.6, type: "spring" }}
              className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 block pb-2 hover:from-orange-400 hover:to-zinc-500 transition-colors duration-500"
            >
              Mastering
            </motion.span>
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative group"
            >
              <TapeReveal text="KINEMATICS | DYNAMICS | CONTROL" customRotation={-3}>
                <span className="text-white block">Mechanics</span>
              </TapeReveal>
            </motion.div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-2xl text-zinc-400 text-base md:text-xl font-light mb-16 px-4 mt-4"
          >
            Explore the core pillars of mechanical engineering through highly interactive, state-of-the-art visual concepts. Form meets function.
          </motion.p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4 absolute bottom-12"
          >
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em]">Scroll to initialize</span>
            <ArrowDown className="text-orange-500" size={20} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Scrolling Tech Banner Divider */}
      <TechMarquee text="SYSTEM OPTIMAL • PRECISION VERIFIED • TOLERANCE SECURED • " direction={1} speed={30} />

      {/* Concepts Sections */}
      <section className="relative z-20 bg-black/40 backdrop-blur-2xl border-t border-zinc-900 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-gradient-to-b from-orange-500 to-transparent" />

        <div className="flex flex-col gap-12 lg:gap-0 pt-32">
          {concepts.map((concept, idx) => (
            <React.Fragment key={idx}>
              <ConceptCard
                index={idx}
                title={concept.title}
                description={concept.description}
                imageSrc={concept.imageSrc}
                features={concept.features}
              />
              {/* Insert reversed marquee after specific sections for visual break */}
              {idx === 1 && (
                <div className="my-12 relative z-30">
                  <TechMarquee text="AUTOMATION ACTIVE • KINEMATICS ENGAGED • " direction={-1} speed={25} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-zinc-900 bg-zinc-950/80 px-6 py-20 overflow-hidden flex flex-col items-center justify-center group overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center relative z-10"
        >
          <motion.h2
            whileHover={{ scale: 1.05 }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white group-hover:text-zinc-300 transition-colors cursor-pointer"
          >
            Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 group-hover:from-orange-400 group-hover:to-amber-400 transition-all">The Future</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] md:text-xs text-zinc-500 font-mono tracking-[0.2em] uppercase max-w-lg mx-auto leading-loose border-t border-zinc-900 pt-6"
          >
            Mechanical Webpage Showcase<br />Interactive Engineering Concepts<br />Building the Systems of Tomorrow
          </motion.p>
        </motion.div>
      </footer>
    </div>
  );
}