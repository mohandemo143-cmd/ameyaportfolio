import { CTA } from "@/components/ui/CTA";
import { Contact } from "@/components/ui/contact";
import { Cursor } from "@/components/ui/cursor";
import { Work } from "@/components/ui/work";
import Testimonials from "@/components/ui/Testimonials";
import { Why } from "@/components/ui/Why";
// ✅ UPDATED IMPORT: Pulling in the new ServicesCarousel component
import { ServicesCarousel } from "@/components/ui/techstack";

export default function Home() {
  return (
    <div id="top" className="flex flex-col w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-hero grain px-6 pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6">
            Welcome to Ameya IT
          </p>
          <h1 className="text-balance text-6xl md:text-8xl lg:text-[100px] font-medium leading-[1.05] tracking-tight text-foreground">
            Building the <span className="font-display italic text-secondary">future</span> of digital products.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-foreground/65">
            We are a software studio building enterprise platforms, AI systems,
            and digital products for ambitious teams.
          </p>
          <div className="mt-12">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              Explore Our Work
            </a>
          </div>
        </div>
      </section>

      {/* WORK SECTION */}
      <section id="work" className="w-full">
        <Work />
      </section>

      {/* STACK / TECH SECTION */}
      <section id="stack" className="w-full">
        {/* ✅ UPDATED COMPONENT: Using the new carousel */}
        <ServicesCarousel />
      </section>

      {/* TESTIMONIALS (Optional - you can keep or move) */}
      <section className="w-full">
        <Testimonials />
      </section>

      {/* WHY SECTION (Optional) */}
      {/* <section className="w-full">
        <Why />
      </section> */}

      {/* CONTACT SECTION */}
      <section id="contact" className="w-full">
        <CTA />
        <Cursor />
        <Contact />
      </section>
    </div>
  );
}