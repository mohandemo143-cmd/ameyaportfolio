import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProject } from "@/lib/projects";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 border-b border-foreground/5 bg-surface overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-background" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="relative z-10 container mx-auto max-w-5xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm mb-8 text-foreground/40 font-medium animate-fade-in">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/#work" className="hover:text-primary transition-colors">Work</Link>
            <ChevronRight size={14} />
            <span className="text-foreground/70">{project.title}</span>
          </div>

          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            {project.tag}
          </span>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/60 max-w-3xl leading-relaxed">
            {project.desc}
          </p>
        </div>
      </section>

      {/* --- CASE STUDY CONTENT --- */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          
          {/* Challenge & Solution Grid */}
          <div className="grid md:grid-cols-2 gap-10 mb-24">
            <div className="group relative p-8 rounded-3xl transition-all duration-500 hover:bg-surface hover:shadow-2xl border border-transparent hover:border-foreground/5">
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="text-xs uppercase tracking-[0.3em] text-foreground/40 mb-5">01. The Challenge</h2>
              <p className="text-lg leading-relaxed text-foreground/80 group-hover:text-foreground/90 transition-colors">
                {project.challenge}
              </p>
            </div>
            <div className="group relative p-8 rounded-3xl transition-all duration-500 hover:bg-surface hover:shadow-2xl border border-transparent hover:border-foreground/5">
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="text-xs uppercase tracking-[0.3em] text-foreground/40 mb-5">02. The Solution</h2>
              <p className="text-lg leading-relaxed text-foreground/80 group-hover:text-foreground/90 transition-colors">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-24">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-foreground/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-6 text-foreground/20 text-2xl">✦</span>
            </div>
          </div>

          {/* Features & Tech Stack */}
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-semibold mb-8 text-foreground/90">Key Features</h2>
              <ul className="space-y-4">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="group flex items-start gap-4 p-3 -mx-3 rounded-xl transition-all duration-300 hover:bg-surface/50">
                    <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-[0_0_12px_-3px_var(--primary)] group-hover:scale-125 transition-transform" />
                    <span className="text-lg text-foreground/75 group-hover:text-foreground/90 transition-colors leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-8 text-foreground/90">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full border border-foreground/10 bg-surface/50 backdrop-blur-sm text-sm text-foreground/80 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default hover:-translate-y-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-32 text-center border-t border-foreground/5 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)/5%,_transparent_60%)]" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-medium mb-8 max-w-2xl mx-auto bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
            Ready to bring your vision to life?
          </h2>
          <p className="text-foreground/50 mb-10 text-lg max-w-xl mx-auto">
            Let's collaborate and craft something exceptional together.
          </p>
          <Link 
            href="/#contact" 
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold transition-all duration-500 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
      
    </main>
  );
}