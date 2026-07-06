"use client";

import { motion } from "motion/react";
import { Magnetic } from "./Magnetic";

const items = ["Work", "Stack", "Contact"];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
    >
      <div className="glass flex items-center gap-2 rounded-full px-3 py-2">
        <a
          href="/#top"
          className="flex items-center gap-2 rounded-full px-3 py-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          <span className="text-sm font-semibold tracking-tight">Ameya IT</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((i) => {
            const section = i.toLowerCase();
            return (
              <a
                key={i}
                href={`/#${section}`}
                className="rounded-full px-3 py-1.5 text-sm text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground"
              >
                {i}
              </a>
            );
          })}
        </nav>

        <Magnetic>
          <a
            href="/#contact"
            className="ml-1 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            Start a project <span aria-hidden>→</span>
          </a>
        </Magnetic>
      </div>
    </motion.header>
  );
}