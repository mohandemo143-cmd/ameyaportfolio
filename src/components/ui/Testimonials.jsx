"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

function SectionHeader({ eyebrow, title }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-medium leading-tight md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Delivered our medical eCommerce platform with exceptional quality, performance, and a seamless user experience.",
    role: "CEO",
    org: "Surgical World",
  },
  {
    quote:
      "A reliable technology partner providing prompt support and dependable solutions whenever we need them.",
    role: "CEO",
    org: "Orange Solutions Pvt. Ltd.",
  },
  {
    quote:
      "Built a powerful YouTube analytics platform that gives us valuable insights and a competitive edge.",
    role: "Head of Operations",
    org: "Jaitra Media",
  },
  {
    quote:
      "Designed and delivered a modern, professional website that perfectly represents our brand.",
    role: "CTO",
    org: "VETECH NDT & Metallurgical",
  },
];
export default function Testimonials() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const wheelTimeout = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const total = testimonials.length;

  // Auto-scroll logic with pause on hover/drag
  useEffect(() => {
    if (dragging || isHovered || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [dragging, isHovered, prefersReducedMotion, total]);

  // Seamless looping navigation
  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((index) => {
    setActive((index + total) % total);
  }, [total]);

  // --- Interaction Handlers ---

  function handlePointerDown(e) {
    setDragging(true);
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX));
  }

  function handlePointerMove(e) {
    if (!dragging) return;
    
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!currentX) return;

    const deltaX = currentX - dragStartX;
    const swipeThreshold = 50; // Distance required to trigger slide

    if (deltaX > swipeThreshold) {
      goPrev(); // Swiping right pulls previous item
      setDragStartX(currentX);
    } else if (deltaX < -swipeThreshold) {
      goNext(); // Swiping left pulls next item
      setDragStartX(currentX);
    }
  }

  function handlePointerUp() {
    setDragging(false);
  }

  // Throttled Wheel/Trackpad support
  function handleWheel(e) {
    if (wheelTimeout.current) return;

    if (e.deltaX > 20 || e.deltaY > 20) {
      goNext();
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null }, 300);
    } else if (e.deltaX < -20 || e.deltaY < -20) {
      goPrev();
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null }, 300);
    }
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
    <section className="relative py-8 md:py-12">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Voices" title="Trusted by the ambitious." />
      </div>

      <div
        ref={ref}
        role="region"
        tabIndex={0}
        aria-label="Client Testimonials"
        // Touch & Swipe Events
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        // Wheel & Keyboard
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        // Hover (Auto-scroll Synergy)
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative mt-8 h-[360px] touch-pan-y select-none outline-none cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {testimonials.map((item, index) => {
          // Circular offset for infinite visual loop
          let offset = index - active;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isActive = offset === 0;

          return (
            <motion.div
              key={index}
              onClick={() => goTo(index)}
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
              className={`absolute left-1/2 top-1/2 w-[340px] -translate-x-1/2 -translate-y-1/2 ${isActive ? 'cursor-default' : 'cursor-pointer pointer-events-auto'}`}
            >
              <div className="glass relative overflow-hidden rounded-3xl p-8 shadow-sm">
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
                    <span className="font-mono normal-case tracking-normal text-foreground/40 line-clamp-1">{item.org}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="mt-2 flex items-center justify-center gap-6">
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