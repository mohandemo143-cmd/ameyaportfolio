"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ExternalLink, Images } from "lucide-react";

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
          <ProjectCard key={p.title} project={p} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index: i, total }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [3, -3]);

  return (
    <div ref={ref} className="sticky px-6" style={{ top: `${80 + i * 12}px`, marginBottom: i === total - 1 ? "0" : "8vh" }}>
      <motion.article
        style={{ scale, y }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-[var(--shadow-lift)]"
      >
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface md:aspect-auto">
            <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-90`} />
            <motion.div style={{ rotate }} className="absolute inset-8 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md">
              <div className="flex h-7 items-center gap-1.5 border-b border-white/20 px-3">
                <span className="h-2 w-2 rounded-full bg-white/60" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
                <span className="h-2 w-2 rounded-full bg-white/30" />
              </div>
              <div className="grid h-[calc(100%-1.75rem)] grid-cols-3 gap-2 p-3">
                <div className="col-span-1 rounded-lg bg-white/20" />
                <div className="col-span-2 space-y-2">
                  <div className="h-1/3 rounded-lg bg-white/30" />
                  <div className="h-1/3 rounded-lg bg-white/20" />
                  <div className="h-1/4 rounded-lg bg-white/15" />
                </div>
              </div>
            </motion.div>
            <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> 0{i + 1} · {p.tag}
            </div>
          </div>
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <h3 className="text-3xl font-medium md:text-4xl">{p.title}</h3>
              <p className="mt-4 text-foreground/60">{p.desc}</p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-foreground/10 bg-surface px-3 py-1 text-xs text-foreground/70">{s}</span>
                ))}
              </div>
              <div className="flex items-baseline justify-between border-t border-foreground/10 pt-4">
                <span className="text-xs uppercase tracking-widest text-foreground/40">Outcome</span>
                <span className="font-display text-xl italic text-secondary">{p.result}</span>
              </div>

              <div className="relative pt-2">
                <button
                  onClick={() => setOpen((o) => !o)}
                  className="group inline-flex w-full items-center justify-between rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
                >
                  <span>Explore project</span>
                  <span className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
                </button>

                <motion.div
                  initial={false}
                  animate={open ? { height: "auto", opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center justify-center gap-2 rounded-full border border-foreground/10 bg-surface px-4 py-3 text-sm font-medium transition hover:border-foreground/30 hover:bg-foreground/5"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit app
                    </a>
                    <Link
                      href={`/gallery/${p.slug}`}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary to-secondary px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      <Images className="h-4 w-4" />
                      View gallery
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}