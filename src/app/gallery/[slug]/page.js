import { getProject } from "@/lib/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/ui/Nav";

function Tile({ image, index, total }) {
  const aspectClass = image.ratio === "16:9" ? "aspect-video" : "aspect-[4/3]";

  return (
    <a
      href={`#photo-${index}`}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] transition-all duration-400 ease-out hover:border-primary/30 hover:shadow-[0_20px_50px_-18px_var(--color-primary)] ${aspectClass}`}
    >
      <img
        src={image.src}
        alt={image.alt || "Project photo"}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.06]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/65 via-background/0 to-background/0 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

      <div className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-foreground/10 bg-background/50 opacity-0 backdrop-blur-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-foreground">
          <path d="M9 3H3v6M15 21h6v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="absolute bottom-3 left-3 translate-y-1 rounded-full border border-foreground/10 bg-background/50 px-2.5 py-1 text-xs font-medium tracking-wide text-foreground/80 opacity-0 backdrop-blur-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
        {String(index + 1).padStart(2, "0")} / {total}
      </div>
    </a>
  );
}

function LightboxOverlay({ image, index, total }) {
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  return (
    <div
      id={`photo-${index}`}
      className="lightbox-target fixed inset-0 z-50 hidden items-center justify-center bg-background/90 backdrop-blur-xl"
    >
      <a
        href="#"
        aria-label="Close"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/80 backdrop-blur-md transition hover:border-primary/40 hover:text-foreground"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </a>

      <a
        href={`#photo-${prevIndex}`}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/80 backdrop-blur-md transition hover:border-primary/40 hover:text-foreground sm:left-6"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <a
        href={`#photo-${nextIndex}`}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/80 backdrop-blur-md transition hover:border-primary/40 hover:text-foreground sm:right-6"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <img
        src={image.src}
        alt={image.alt || "Project photo"}
        className="max-h-[82vh] max-w-[90vw] rounded-2xl border border-foreground/10 object-contain shadow-2xl"
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/70 backdrop-blur-md">
        {index + 1} / {total}
      </div>
    </div>
  );
}

export default async function GalleryPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const total = project.gallery.length;

  return (
    <main className="min-h-screen bg-background">
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
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">
              {project.tag}
            </p>
            <h1 className="text-balance text-4xl font-medium md:text-6xl">
              {project.title} <span className="font-display italic text-secondary">Gallery</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground/60">
              {project.desc}
            </p>
          </div>

          {/* SIMPLE GRID
            Medium, uniform thumbnails regardless of their 4:3 or 16:9 ratio.
            Click any photo to expand it full-size and browse the whole set.
          */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {project.gallery.map((image, index) => (
              <Tile key={index} image={image} index={index} total={total} />
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox overlays, one per image, toggled via :target */}
      {project.gallery.map((image, index) => (
        <LightboxOverlay key={`lightbox-${index}`} image={image} index={index} total={total} />
      ))}

      <style>{`
        .lightbox-target:target {
          display: flex;
        }
      `}</style>
    </main>
  );
}