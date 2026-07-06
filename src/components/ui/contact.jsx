"use client";

import { motion } from "motion/react";
import { Magnetic } from "./Magnetic";
import { useState } from "react";

const fields = [
  { n: "name", l: "Your name", t: "text", p: "Jane Doe" },
  { n: "email", l: "Work email", t: "email", p: "jane@company.com" },
  { n: "company", l: "Company", t: "text", p: "Acme Corp" },
  { n: "budget", l: "Budget range", t: "text", p: "₹10L – ₹1Cr+" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  
  return (
    <section id="contact" className="relative bg-surface px-6 py-32">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">Get in touch</p>
          <h2 className="mt-3 text-balance text-4xl font-medium leading-tight md:text-5xl">
            Tell us what you're <em className="font-display italic text-secondary">building</em>.
          </h2>
          <p className="mt-6 max-w-md text-foreground/60">
            We reply within one business day. For urgent engagements, mention it in your message and we'll prioritize.
          </p>
          <dl className="mt-12 space-y-6">
            {[
              ["Email", "hello@ameyait.com"],
              ["Headquarters", "Hyderabad · India"],
              ["Hours", "Mon–Fri · 9am – 7pm IST"],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-foreground/10 pt-4">
                <dt className="text-xs uppercase tracking-widest text-foreground/40">{k}</dt>
                <dd className="mt-1 text-lg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="glass relative h-fit space-y-5 rounded-3xl p-8 md:p-10"
        >
          {fields.map((f, i) => (
            <motion.div 
              key={f.n} 
              initial={{ opacity: 0, y: 12 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <label className="text-xs uppercase tracking-widest text-foreground/50">{f.l}</label>
              <input 
                required 
                name={f.n} 
                type={f.t} 
                placeholder={f.p} 
                className="mt-2 w-full rounded-xl border border-foreground/10 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" 
              />
            </motion.div>
          ))}
          <motion.div 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.5 }}
          >
            <label className="text-xs uppercase tracking-widest text-foreground/50">Project</label>
            <textarea 
              required 
              rows={4} 
              placeholder="A few lines on what you're building…" 
              className="mt-2 w-full rounded-xl border border-foreground/10 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" 
            />
          </motion.div>
          <Magnetic>
            <button 
              type="submit" 
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:bg-secondary md:w-auto md:px-10"
            >
              {sent ? "Thanks — we'll be in touch ✓" : "Send message →"}
            </button>
          </Magnetic>
        </motion.form>
      </div>
    </section>
  );
}