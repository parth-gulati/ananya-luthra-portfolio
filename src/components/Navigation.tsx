"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Experience", href: "#work" },
  { label: "Strategy", href: "#process" },
  { label: "Projects", href: "#insights" },
  { label: "Contact", href: "#studio" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lastScrollY = useRef(0);
  const tween = useRef<gsap.core.Tween | null>(null);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (delta > 10 && currentY > 100) {
        // Scrolling down
        if (!tween.current || tween.current.reversed()) {
          tween.current = gsap.to(nav, {
            y: -120,
            duration: 0.4,
            ease: "power3.inOut",
          });
        }
      } else if (delta < -5) {
        // Scrolling up
        if (tween.current) {
          tween.current.reverse();
        } else {
          gsap.to(nav, { y: 0, duration: 0.4, ease: "power3.inOut" });
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic hover effect
  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    const el = linkRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.15;
    const dy = (e.clientY - centerY) * 0.15;
    const clamp = (v: number, max: number) =>
      Math.max(-max, Math.min(max, v));

    gsap.to(el, {
      x: clamp(dx, 4),
      y: clamp(dy, 4),
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    const el = linkRefs.current[index];
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-8 md:px-16 py-10 flex items-center justify-between"
    >
      {/* Logo */}
      <a
        href="#"
        className="font-headline text-3xl font-bold tracking-tighter text-white"
      >
        A.L
      </a>

      {/* Center nav links - hidden on mobile */}
      <ul className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((link, i) => (
          <li key={link.label}>
            <a
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              href={link.href}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="magnetic-link font-label text-[11px] tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors duration-300 inline-block"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Connect button */}
      <a
        href="#studio"
        className="font-label text-[11px] tracking-[0.3em] uppercase text-white border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
      >
        Connect
      </a>
    </nav>
  );
}
