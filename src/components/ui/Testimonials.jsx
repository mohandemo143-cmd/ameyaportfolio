"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

function SectionHeader({ eyebrow, title }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-4xl font-medium leading-tight md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

const testimonials = [
  { quote: "Ameya rebuilt our HR backbone in months — what consultancies had failed to do in years.", role: "CHRO", org: "Global Manufacturing" },
  { quote: "The AI assessment platform transformed our campus hiring funnel. Pure engineering elegance.", role: "VP Talent", org: "Enterprise SaaS" },
  { quote: "Their SAP integration eliminated three layers of manual reconciliation overnight.", role: "CFO", org: "Multinational Logistics" },
  { quote: "Best technical partner we've worked with. Period.", role: "CTO", org: "Fintech Scale-up" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Auto-scroll logic with pause on hover
  useEffect(() => {
    if (dragging || isHovered || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [dragging, isHovered, prefersReducedMotion]);

  const goTo = useCallback((index) => {
    setActive(Math.max(0, Math.min(testimonials.length - 1, index)));
  }, []);

  const goNext = () => goTo(active + 1);
  const goPrev = () => goTo(active - 1);

  const updateFromPointer = useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const progress = (clientX - rect.left) / rect.width;
    const index = Math.min(
      testimonials.length - 1,
      Math.max(0, Math.floor(progress * testimonials.length))
    );
    goTo(index);
  }, [goTo]);

  // Click handler for individual cards
  const handleCardClick = (index) => {
    goTo(index);
  };

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

  function handleKeyDown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  }

  return (
    // Adjusted padding from py-32 to py-16 to reduce section spacing
    <section className="relative py-16">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Voices" title="Trusted by the ambitious." />
      </div>

      <div
        ref={ref}
        role="region"
        tabIndex={0}
        aria-label="Client Testimonials"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative mt-16 h-[420px] touch-pan-y select-none outline-none cursor-grab active:cursor-grabbing"
      >
        {testimonials.map((item, index) => {
          const offset = index - active;
          const isActive = offset === 0;

          return (
            <motion.div
              key={index}
              onClick={() => handleCardClick(index)}
              animate={{
                x: `calc(50% + ${offset * 360}px - 50%)`,
                scale: isActive ? 1 : 0.85,
                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.25,
                filter: isActive ? "blur(0px)" : `blur(${Math.abs(offset) * 2}px)`,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={prefersReducedMotion 
                ? { duration: 0.2 } 
                : { type: "spring", damping: 22, stiffness: 140 }
              }
              className="pointer-events-auto absolute left-1/2 top-1/2 w-[340px] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            >
              <div className="glass relative overflow-hidden rounded-3xl p-8">
                {isActive && (
                  <div
                    className="absolute -inset-px -z-10 rounded-3xl opacity-80 blur-md motion-safe:animate-[spin_6s_linear_infinite]"
                    style={{ 
                      background: "conic-gradient(from 0deg,var(--primary),var(--secondary),var(--background),var(--primary))" 
                    }}
                  />
                )}
                <span className="pointer-events-none absolute -top-3 left-5 font-display text-8xl leading-none text-foreground/10">"</span>
                <p className="relative font-display text-xl leading-snug text-foreground/90">{item.quote}</p>
                <div className="relative mt-6 flex items-center gap-3">
                  <span className="h-px w-6 bg-primary/60" />
                  <p className="text-xs uppercase tracking-[0.22em] text-foreground/50">
                    <span className="text-foreground/70">{item.role}</span>
                    <span className="mx-2 text-foreground/30">·</span>
                    <span className="font-mono normal-case tracking-normal text-foreground/40">{item.org}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={goPrev}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 transition-all hover:border-primary/50 hover:bg-primary/5 active:scale-95"
          aria-label="Previous testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/70 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className="group relative flex h-8 items-center px-1"
            >
              <span 
                className={`block h-1 rounded-full transition-all duration-300 ${
                  index === active 
                    ? "w-10 bg-primary shadow-[0_0_12px_var(--primary)]" 
                    : "w-4 bg-foreground/20 group-hover:bg-foreground/40"
                }`} 
              />
            </button>
          ))}
        </div>

        <button
          onClick={goNext}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 transition-all hover:border-primary/50 hover:bg-primary/5 active:scale-95"
          aria-label="Next testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground/70 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}