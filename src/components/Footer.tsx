"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const coordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant social links stagger in from left
      const links = linksRef.current.filter(Boolean);
      if (links.length > 0) {
        gsap.fromTo(
          links,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Coordinates ticker animation
      if (coordsRef.current) {
        const coordEl = coordsRef.current;
        const targetLat = 43.6532;
        const targetLon = 79.3832;

        const obj = { lat: 0, lon: 0 };
        gsap.to(obj, {
          lat: targetLat,
          lon: targetLon,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: coordEl,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            coordEl.textContent = `${obj.lat.toFixed(4)} N, ${obj.lon.toFixed(4)} W`;
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/ananyaluthra",
      className:
        "font-headline text-4xl sm:text-6xl md:text-[8rem] font-bold tracking-tighter hover:italic text-white hover:text-primary transition-all duration-700 leading-none",
    },
    {
      label: "GitHub",
      href: "https://github.com/ananyaluthra",
      className:
        "font-headline text-4xl sm:text-6xl md:text-[8rem] font-bold tracking-tighter hover:italic text-white/60 hover:text-primary hover:translate-x-4 transition-all duration-700 leading-none",
    },
    {
      label: "Read.cv",
      href: "#",
      className:
        "font-headline text-4xl sm:text-6xl md:text-[8rem] font-bold tracking-tighter hover:italic text-white/60 hover:text-primary hover:translate-x-4 transition-all duration-700 leading-none",
    },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden flex flex-col gap-12 px-8 md:px-16 py-24 bg-black"
      ref={footerRef}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
        <div className="flex flex-col gap-4">
          {socialLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { linksRef.current[i] = el; }}
              className={link.className}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="text-right flex flex-col gap-8">
          <div className="font-label text-[10px] tracking-[0.4em] uppercase text-white/40">
            Headquarters
          </div>
          <div className="font-headline text-2xl text-white font-light tracking-widest">
            TORONTO,
            <br />
            CANADA
          </div>
          <div
            ref={coordsRef}
            className="mt-8 font-body text-xs text-white/60 italic"
          >
            43.6532 N, 79.3832 W
          </div>
        </div>
      </div>

      <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-sm font-label uppercase tracking-[0.3em] text-white/40">
          Data-Crafted in Toronto 2025
        </div>
        <div className="flex gap-8">
          <span className="font-label text-[10px] text-white/20 uppercase tracking-widest">
            Orchid Logic v2.0
          </span>
          <span className="font-label text-[10px] text-white/20 uppercase tracking-widest">
            Built with precision
          </span>
        </div>
      </div>
    </footer>
  );
}
