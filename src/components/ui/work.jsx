"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";
// Removed unused lucide-react icons

export function Work() {
  const ref = useRef(null);
  return (
    <section id="work" ref={ref} className="relative bg-background">
      <div className="sticky top-0 z-0 mx-auto max-w-6xl px-6 pt-24">
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">Selected work</p>
        <h2 className="mt-3 max-w-3xl text-balance text-4xl font-medium leading-tight md:text-6xl">
          Products engineered like <em className="font-display italic text-secondary">flagships</em>.
        </h2>
      </div>

      <div className="relative z-10 mt-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index: i, total }) {
  const ref = useRef(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <div ref={ref} className="sticky px-6" style={{ top: `${80 + i * 12}px`, marginBottom: i === total - 1 ? "0" : "8vh" }}>
      <motion.article
        style={{ scale, y }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-[var(--shadow-lift)]"
      >
        <div className="grid gap-0 md:grid-cols-2">
          {/* Real Project Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-surface md:aspect-auto">
            <img
              src={p.gallery[0].src}
              alt={p.title}
              className="h-full w-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-40`} />
            
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> 0{i + 1} · {p.tag}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <h3 className="text-3xl font-medium md:text-4xl">{p.title}</h3>
              <p className="mt-4 text-foreground/60">{p.desc}</p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-foreground/10 bg-surface px-3 py-1 text-xs text-foreground/70">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-baseline justify-between border-t border-foreground/10 pt-4">
                <span className="text-xs uppercase tracking-widest text-foreground/40">Outcome</span>
                <span className="font-display text-xl italic text-secondary">{p.result}</span>
              </div>

              {/* Updated Case Study Button */}
              <div className="pt-2">
                <Link
                  href={`/work/${p.slug}`}
                  className="group inline-flex w-full items-center justify-between rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
                >
                  <span>View case study</span>
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}