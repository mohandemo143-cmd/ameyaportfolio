"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  
  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    const tick = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      requestAnimationFrame(tick);
    };
    
    window.addEventListener("mousemove", onMove);
    const id = requestAnimationFrame(tick);
    
    return () => { 
      window.removeEventListener("mousemove", onMove); 
      cancelAnimationFrame(id); 
    };
  }, []);
  
  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-primary/40 mix-blend-difference md:block" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 rounded-full bg-primary md:block" />
    </>
  );
}