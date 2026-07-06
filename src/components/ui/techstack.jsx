"use client";

import React, { forwardRef, useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

// ============================================================================
// 1. TechCard - Display card with animated glowing border
// ============================================================================

export const TechCard = forwardRef((
  {
    children,
    size = "lg",
    className = "",
    ...props
  },
  ref
) => {
  const sizeStyles = {
    sm: "py-2 px-6 text-sm",
    md: "py-3 px-8 text-base",
    lg: "py-4 px-10 text-xl",
  };

  return (
    <div
      ref={ref}
      className={`relative group border-none bg-transparent p-0 outline-none ${className}`}
      {...props}
    >
      <div className="relative rounded-full overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,180,216,0.3)] p-[3px]">
        {/* Animated Conic Gradient Background (mimics the testimonial coloring) */}
        <div
          className="absolute -inset-[100%] z-0 opacity-90 motion-safe:animate-[spin_4s_linear_infinite]"
          style={{
            background: "conic-gradient(from 0deg, var(--primary), var(--secondary), var(--background), var(--primary))",
          }}
        />

        {/* Inner Card Body */}
        <div
          className={`relative z-10 rounded-full flex items-center justify-center bg-white dark:bg-black transition-colors duration-200 ${sizeStyles[size]}`}
        >
          <span className="font-medium tracking-tight text-neutral-900 dark:text-white px-4">
            {children}
          </span>
        </div>
      </div>
    </div>
  );
});

TechCard.displayName = "TechCard";

// ============================================================================
// 2. TechStack - Auto-scrolling Carousel
// ============================================================================

const techStack = [
  "React", "Next.js", "Flutter", "Node.js", "Java",
  "SAP", "AWS", "Azure", "OpenAI", "LangChain"
];

export function TechStack() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const total = techStack.length;

  // Auto-scroll logic: adding 1 makes the items move right-to-left
  // Set to 1800ms for a faster, but readable speed.
  useEffect(() => {
    if (dragging || isHovered || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 1800); 

    return () => clearInterval(interval);
  }, [dragging, isHovered, prefersReducedMotion, total]);

  const goTo = useCallback((index) => {
    let next = index % total;
    if (next < 0) next += total;
    setActive(next);
  }, [total]);

  const updateFromPointer = useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const progress = (clientX - rect.left) / rect.width;
    const index = Math.floor(progress * total);
    goTo(index);
  }, [total, goTo]);

  function handlePointerDown(e) {
    setDragging(true);
    updateFromPointer(e.clientX);
  }

  function handlePointerMove(e) {
    if (!dragging) return;
    updateFromPointer(e.clientX);
  }

  function handlePointerUp() {
    setDragging(false);
  }

  return (
    // Reduced padding from py-32 to py-16 to make the section smaller top/bottom
    <section className="relative py-16 overflow-hidden bg-background">
      <div className="container mx-auto max-w-7xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">
          Our Stack
        </p>
        <h2 className="mt-3 text-balance text-4xl font-medium leading-tight md:text-5xl">
          Powered by modern tools.
        </h2>
      </div>

      <div
        ref={ref}
        role="region"
        tabIndex={0}
        aria-label="Technology Stack"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative mt-12 h-[120px] w-full touch-pan-y select-none outline-none cursor-grab active:cursor-grabbing"
      >
        {techStack.map((tech, index) => {
          // Calculate circular offset so items wrap around infinitely
          let offset = index - active;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isVisible = Math.abs(offset) <= 4;
          const ITEM_WIDTH = 250; // Distance between items

          return (
            <motion.div
              key={index}
              animate={{
                x: `calc(50% + ${offset * ITEM_WIDTH}px - 50%)`,
                opacity: isVisible ? 1 : 0,
                scale: 1,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={prefersReducedMotion
                ? { duration: 0.2 }
                : { type: "spring", damping: 22, stiffness: 140 }
              }
              className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {isVisible && (
                <TechCard size="lg">
                  {tech}
                </TechCard>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}