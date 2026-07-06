"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const x = useMotionValue(0); 
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  
  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}