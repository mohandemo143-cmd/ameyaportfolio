"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Magnetic } from "./Magnetic";
import Logo from "./logo";

const items = ["Work", "Stack", "Contact"];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-5 z-50 w-[92%] max-w-fit -translate-x-1/2 md:w-auto"
    >
      {/* Main Floating Pill - Reduced vertical padding (py-1 on mobile, py-1.5 on desktop) */}
      <div className="glass flex w-full items-center justify-between gap-2 rounded-full px-2 py-1 sm:px-3 sm:py-1.5">
        
        {/* Logo Container - Scaled down further to prevent vertical stretching */}
        <div className="flex w-[100px] shrink-0 items-center overflow-hidden pl-2 sm:w-[120px]">
          <div className="origin-left scale-[0.55] sm:scale-[0.65]">
            <Logo />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((i) => {
            const section = i.toLowerCase();
            return (
              <a
                key={i}
                href={`/#${section}`}
                /* Reduced link padding from py-1.5 to py-1 */
                className="rounded-full px-3 py-1 text-sm font-medium text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground"
              >
                {i}
              </a>
            );
          })}
        </nav>

        {/* Right Side: CTA (Desktop) & Hamburger (Mobile) */}
        <div className="flex shrink-0 items-center">
          
          {/* Desktop CTA */}
          <div className="hidden sm:block">
            <Magnetic>
              <a
                href="/#contact"
                /* Reduced button padding from py-2 to py-1.5 */
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                Start a project <span aria-hidden>→</span>
              </a>
            </Magnetic>
          </div>

          {/* Mobile Menu Button - Shrunk slightly to match slimmer height */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-foreground transition hover:bg-foreground/20 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Remains the same) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass absolute left-0 top-full mt-2 w-full rounded-2xl p-4 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {items.map((i) => {
                const section = i.toLowerCase();
                return (
                  <a
                    key={i}
                    href={`/#${section}`}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 transition hover:bg-foreground/5 hover:text-foreground"
                  >
                    {i}
                  </a>
                );
              })}
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex justify-center rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition hover:bg-foreground/90 sm:hidden"
              >
                Start a project →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}