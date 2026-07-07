export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background px-6 pb-12 pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <h3 className="text-balance text-[clamp(3rem,12vw,10rem)] font-medium leading-none tracking-tight">
          AmeyaIT<span className="text-primary">.</span>
        </h3>
        <div className="mt-12 grid gap-12 border-t border-foreground/10 pt-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="max-w-sm text-sm text-foreground/55">
              Software studio building enterprise platforms, AI systems and digital products for ambitious teams.
            </p>
          </div>
          {[
            { h: "Studio", l: ["Work", "Services", "Process", "Contact"] },
            { h: "Contact", l: ["info@ameyait.com", "+91 7993174833", "3rd floor, Plot No. 37/A, Vengal Rao Nagar, Sunder Nagar, Hyderabad, Telangana 500038"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="text-xs uppercase tracking-widest text-foreground/40">{c.h}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {c.l.map((i) => (<li key={i} className="text-foreground/70 transition hover:text-foreground">{i}</li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-foreground/10 pt-6 text-xs text-foreground/45 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Ameya IT Solutions. All rights reserved.</span>
          <span>Crafted with care · Built to ship</span>
        </div>
      </div>
    </footer>
  );
}