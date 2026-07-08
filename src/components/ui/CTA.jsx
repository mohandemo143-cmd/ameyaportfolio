"use client";

import { motion } from "motion/react";
import { Magnetic } from "./Magnetic";

export function CTA() {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
      className="flex justify-center py-10"
    >
    
    </motion.div>
  );
}