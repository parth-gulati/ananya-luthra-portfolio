"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topLabelRef = useRef<HTMLSpanElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text split animation on the heading
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: "chars" });

        if (split.chars) {
          gsap.set(split.chars, { y: 100, opacity: 0, rotateX: -80 });
          gsap.to(split.chars, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.03,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.3,
          });
        }
      }

      // 2. Background parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 3. Bottom row fade up
      if (bottomRowRef.current) {
        const children = bottomRowRef.current.children;
        gsap.from(children, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.4,
        });
      }

      // 4. Top label letterSpacing animation
      if (topLabelRef.current) {
        gsap.from(topLabelRef.current, {
          opacity: 0,
          letterSpacing: "1em",
          duration: 1.2,
          ease: "power3.out",
          delay: 0.1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-8 md:px-16 overflow-hidden"
    >
      {/* Background portrait with parallax */}
      <div ref={imageRef} className="absolute inset-0 opacity-60">
        <Image
          src="/images/ananya-portrait.jpeg"
          alt="Ananya Luthra"
          fill
          className="object-cover object-center brightness-75 contrast-125 hero-mask"
          priority
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 pointer-events-none" />

      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Content layer */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Top label */}
        <span
          ref={topLabelRef}
          className="font-label text-primary tracking-[0.6em] text-[10px] uppercase mb-12"
        >
          Engineering the Infinite
        </span>

        {/* Giant name */}
        <h1
          ref={headingRef}
          className="font-headline text-[12vw] md:text-[9vw] leading-[0.85] font-extrabold tracking-tighter uppercase text-center"
          style={{ perspective: "600px" }}
        >
          <span className="block">ANANYA</span>
          <span className="block text-outline">LUTHRA</span>
        </h1>

        {/* Bottom row */}
        <div
          ref={bottomRowRef}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mt-16 md:mt-24 gap-8"
        >
          {/* Left description */}
          <p className="text-xs uppercase tracking-widest text-on-surface-variant max-w-sm leading-relaxed">
            Data Engineer crafting scalable pipelines and analytics
            at the intersection of finance and technology.
          </p>

          {/* Right designation */}
          <div className="flex items-center gap-6">
            {/* Vertical divider */}
            <div className="w-px h-16 bg-white/20" />
            <div className="text-right">
              <span className="font-headline text-2xl sm:text-4xl italic text-primary block">
                The Data Chic
              </span>
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface-variant mt-2 block">
                Designation 001
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
