import { getProject } from "@/lib/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/ui/Nav";   // ← Import your Nav

export default async function GalleryPage({ params }) {
  const { slug } = await params;
  
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Add Navigation Here */}
      <Nav />

      <div className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl">
          
          {/* Back Button */}
          <Link 
            href="/#work" 
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition hover:text-foreground"
          >
            <span>←</span> Back to all work
          </Link>
          
          {/* Header section */}
          <div className="mt-8 border-b border-foreground/10 pb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
              {project.tag}
            </p>
            <h1 className="text-4xl font-medium md:text-6xl text-balance">
              {project.title} <span className="font-display italic text-secondary">Gallery</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground/60">
              {project.desc}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((image, index) => (
              <div 
                key={index} 
                className="group overflow-hidden rounded-2xl border border-foreground/5 bg-surface shadow-sm transition hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.caption} 
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-foreground/5 p-4">
                  <p className="text-sm font-medium text-foreground/80">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </main>
  );
}