"use client";

import { motion } from "motion/react";

const rows = [
  ["Discovery", "Templated audits", "Embedded with your team for 2 weeks"],
  ["Velocity", "Weeks of back-and-forth", "Working software in days"],
  ["Engineering", "Outsourced juniors", "Senior product engineers only"],
  ["Design", "Bolted-on", "Strategy → design → engineering in one room"],
  ["Ownership", "Hand-off and gone", "We operate what we build"],
  ["Outcomes", "Activity reports", "Business metrics we move"],
];

export function Why() {
  return (
    <section className="relative bg-background py-32 overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_0.8px,transparent_1px)] bg-[length:20px_20px] opacity-40 dark:bg-[radial-gradient(#27272a_0.8px,transparent_1px)]" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">Why Ameya</p>
          <h2 className="mt-3 max-w-3xl text-balance text-4xl font-medium md:text-6xl">
            The agency model,{" "}
            <em className="font-display italic text-secondary">retired</em>.
          </h2>
        </div>

        <div className="mt-20 relative">
          {/* Main Comparison Table */}
          <div className="grid gap-px overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/10 md:grid-cols-[1fr_1fr_1fr]">
            
            {/* Header Row */}
            <div className="bg-surface/90 backdrop-blur-xl p-8 text-xs uppercase tracking-widest text-foreground/40 border-b border-foreground/10">
              Dimension
            </div>
            <div className="bg-surface/90 backdrop-blur-xl p-8 text-xs uppercase tracking-widest text-foreground/40 border-b border-foreground/10">
              Traditional agencies
            </div>
            <div className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/90 p-8 text-xs uppercase tracking-widest text-white border-b border-white/10">
              <div className="absolute -inset-px bg-[conic-gradient(from_90deg,var(--primary),var(--secondary),transparent)] opacity-30 blur-xl" />
              Ameya IT Solutions
            </div>

            {rows.map(([dim, trad, us], i) => (
              <motion.div
                key={dim}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group contents"
              >
                {/* Dimension */}
                <div className="bg-surface/95 backdrop-blur-xl p-8 font-medium border-b border-foreground/10 flex items-center text-lg">
                  {dim}
                </div>

                {/* Traditional */}
                <div className="bg-surface/95 backdrop-blur-xl p-8 text-foreground/55 border-b border-foreground/10 group-hover:bg-red-500/5 transition-colors">
                  <div className="line-through decoration-foreground/30 decoration-2">
                    {trad}
                  </div>
                </div>

                {/* Ameya - Highlighted */}
                <div className="relative bg-gradient-to-br from-secondary/95 to-secondary p-8 text-white border-b border-white/10 group-hover:from-secondary group-hover:to-primary/90 transition-all duration-500 overflow-hidden">
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000" />
                  
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 text-2xl text-primary">→</span>
                    <span className="text-[17px] leading-tight font-light">{us}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative bottom accent */}
          <div className="flex justify-center mt-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}