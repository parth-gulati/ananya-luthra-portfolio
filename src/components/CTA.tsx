"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal: animate each .reveal-word span
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".reveal-word");

        if (words.length > 0) {
          gsap.fromTo(
            words,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // Buttons fade in
      gsap.from(".cta-actions", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-actions",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="studio"
      className="py-24 sm:py-48 px-6 sm:px-8 md:px-16 text-center relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Pulsing radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,131,212,0.15),transparent_50%)] pulse-glow" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="font-label text-[10px] tracking-[0.8em] text-white/30 uppercase mb-12 block">
          Let&apos;s Connect
        </span>

        <h2
          ref={headlineRef}
          className="font-headline text-[11vw] sm:text-[10vw] md:text-[8vw] font-extrabold uppercase leading-[0.85] tracking-tighter mb-12 sm:mb-20"
        >
          <span className="reveal-word inline-block text-white">Drop</span>{" "}
          <span className="reveal-word inline-block text-white">A</span>{" "}
          <span className="reveal-word inline-block text-white">Line.</span>
          <br />
          <span className="reveal-word inline-block text-primary italic font-light">
            Let&apos;s
          </span>{" "}
          <span className="reveal-word inline-block text-primary italic font-light">
            Talk.
          </span>
        </h2>

        <div className="cta-actions flex flex-col md:flex-row justify-center items-center gap-12">
          <a
            href="mailto:ananya.luthra@mail.mcgill.ca"
            className="iridescent-btn px-16 py-6 rounded-xl text-black font-label text-xs tracking-widest uppercase font-bold"
          >
            Initiate Contact
          </a>
          <a
            href="#"
            className="font-label text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-2"
          >
            Download Resume{" "}
            <span className="material-symbols-outlined text-sm">download</span>
          </a>
        </div>
      </div>
    </section>
  );
}
