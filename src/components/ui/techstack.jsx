"use client";

import React, { forwardRef, useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

// ============================================================================
// 1. ServiceCard - Display card with animated glowing border
// ============================================================================

export const ServiceCard = forwardRef((
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
    lg: "py-3 px-6 text-base md:py-4 md:px-8 md:text-lg lg:text-xl whitespace-nowrap",
  };

  return (
    <div
      ref={ref}
      className={`relative group border-none bg-transparent p-0 outline-none transition-transform duration-300 hover:scale-105 hover:z-50 ${className}`}
      {...props}
    >
      <div className="relative rounded-full overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,180,216,0.3)] p-[3px]">
        {/* Animated Conic Gradient Background */}
        <div
          className="absolute -inset-[100%] z-0 opacity-80 group-hover:opacity-100 motion-safe:animate-[spin_4s_linear_infinite] transition-opacity duration-300"
          style={{
            background: "conic-gradient(from 0deg, var(--primary, #00b4d8), var(--secondary, #90e0ef), var(--background, #03045e), var(--primary, #00b4d8))",
          }}
        />

        {/* Inner Card Body */}
        <div
          className={`relative z-10 rounded-full flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-sm transition-colors duration-200 ${sizeStyles[size]}`}
        >
          <span className="font-medium tracking-wide text-neutral-800 dark:text-neutral-100 px-2 drop-shadow-sm">
            {children}
          </span>
        </div>
      </div>
    </div>
  );
});

ServiceCard.displayName = "ServiceCard";

// ============================================================================
// 2. ServicesCarousel - Interactive 3D Carousel
// ============================================================================

const services = [
  "MVP & Product Dev",
  "SME App Development",
  "Cross-Platform Apps",
  "E-commerce Mobile Apps",
  "App Modernization",
  "AI-Powered Apps",
  "Custom ERPs",
  "Inventory Systems",
  "CRM Systems",
  "Hospital Management",
  "School & College Mgmt",
  "Business Management"
];

export function ServicesCarousel() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wheelTimeout = useRef(null);
  
  const prefersReducedMotion = useReducedMotion();
  const total = services.length;

  // Responsive check for card spacing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (dragging || isHovered || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 2200); 

    return () => clearInterval(interval);
  }, [dragging, isHovered, prefersReducedMotion, total]);

  // --- Interaction Handlers ---

  const handlePointerDown = (e) => {
    setDragging(true);
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!currentX) return;

    const deltaX = currentX - dragStartX;
    const swipeThreshold = 50; // How far to drag before triggering a slide

    if (deltaX > swipeThreshold) {
      setActive((prev) => (prev - 1 + total) % total); // Swipe right (prev)
      setDragStartX(currentX);
    } else if (deltaX < -swipeThreshold) {
      setActive((prev) => (prev + 1) % total); // Swipe left (next)
      setDragStartX(currentX);
    }
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  // Wheel scroll handling with throttle to prevent rapid spinning
  const handleWheel = (e) => {
    if (wheelTimeout.current) return;

    // React to horizontal or vertical scrolling
    if (e.deltaX > 20 || e.deltaY > 20) {
      setActive((prev) => (prev + 1) % total);
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null }, 300);
    } else if (e.deltaX < -20 || e.deltaY < -20) {
      setActive((prev) => (prev - 1 + total) % total);
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null }, 300);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div className="container mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 opacity-80">
          Our Expertise
        </p>
        <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
          Comprehensive IT Solutions.
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          From MVP ideation to complex enterprise management systems, we build scalable software tailored to your business needs.
        </p>
      </div>

      <div
        ref={ref}
        role="region"
        tabIndex={0}
        aria-label="Our Services"
        // Touch & Mouse events for Swiping
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        // Hover events to pause auto-scroll
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // Wheel event for trackpad/mouse scrolling
        onWheel={handleWheel}
        className="relative mt-16 h-[200px] w-full touch-pan-y select-none outline-none cursor-grab active:cursor-grabbing"
      >
        {services.map((service, index) => {
          let offset = index - active;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          // Hide elements that are too far away for performance and visual clarity
          const isVisible = Math.abs(offset) <= (isMobile ? 2 : 3); 
          // Adjust gap width based on screen size
          const ITEM_WIDTH = isMobile ? 260 : 380; 

          return (
            <motion.div
              key={index}
              animate={{
                x: `calc(50% + ${offset * ITEM_WIDTH}px - 50%)`,
                opacity: isVisible ? 1 - Math.abs(offset) * (isMobile ? 0.35 : 0.25) : 0, 
                scale: isVisible ? 1 - Math.abs(offset) * 0.1 : 0.8,
                zIndex: 20 - Math.abs(offset),
                // Slight Y offset for a curved carousel feel
                y: `calc(-50% + ${Math.abs(offset) * 10}px)`
              }}
              transition={prefersReducedMotion
                ? { duration: 0.2 }
                : { type: "spring", damping: 25, stiffness: 120 }
              }
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                isVisible ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              {isVisible && (
                <ServiceCard size="lg">
                  {service}
                </ServiceCard>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}