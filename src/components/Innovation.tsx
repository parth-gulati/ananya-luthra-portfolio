"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Innovation() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const largeCardRef = useRef<HTMLDivElement>(null);
  const smallCard1Ref = useRef<HTMLDivElement>(null);
  const smallCard2Ref = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title reveal
      const titleChildren = titleRef.current?.children;
      if (titleChildren) {
        gsap.from(Array.from(titleChildren), {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Cards stagger in from bottom
      gsap.from(
        [largeCardRef.current, smallCard1Ref.current, smallCard2Ref.current],
        {
          y: 100,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: largeCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Ken Burns scale animation on large card gradient
      if (gradientRef.current) {
        gsap.fromTo(
          gradientRef.current,
          { scale: 1 },
          {
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: largeCardRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="insights"
      className="py-32 px-8 md:px-16 bg-surface-container-low"
      ref={sectionRef}
    >
      <div className="mb-16" ref={titleRef}>
        <span className="font-label text-[10px] tracking-[0.5em] text-primary uppercase">
          The Lab
        </span>
        <h3 className="font-headline text-6xl md:text-8xl mt-4 font-bold tracking-tighter">
          Intellectual Property
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Large card */}
        <div
          ref={largeCardRef}
          className="md:col-span-2 relative h-[400px] sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5"
        >
          {/* Gradient background with Ken Burns */}
          <div
            ref={gradientRef}
            className="absolute inset-0 bg-gradient-to-br from-black via-surface-container-highest to-black"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,131,212,0.2),transparent_60%)]" />
          </div>

          <div className="relative z-10 flex flex-col justify-end h-full p-12">
            <span className="inline-block w-fit px-4 py-1.5 border border-primary/40 rounded-full font-label text-[10px] tracking-widest uppercase text-primary mb-6">
              Patent Pending
            </span>
            <h4 className="font-headline text-3xl sm:text-5xl font-bold mb-4">
              Smart Safety Jacket Infrastructure
            </h4>
            <p className="text-on-surface-variant text-sm font-light max-w-lg leading-relaxed mb-8">
              A cloud-integrated wearable system that monitors environmental
              hazards in real-time, relaying critical data through edge computing
              nodes to centralized safety dashboards.
            </p>
            <a
              href="#"
              className="group inline-flex items-center gap-3 font-label text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              Review Technical Specs
              <span className="block h-px bg-white/30 group-hover:w-16 w-8 transition-all duration-500" />
            </a>
          </div>
        </div>

        {/* Two small cards stacked */}
        <div className="flex flex-col gap-8">
          {/* Small card 1 */}
          <div
            ref={smallCard1Ref}
            className="flex-1 rounded-xl border border-white/10 backdrop-blur-md bg-white/5 p-10 flex flex-col justify-between"
          >
            <span className="material-symbols-outlined text-4xl text-primary mb-6">
              directions_car
            </span>
            <div>
              <h5 className="font-headline text-2xl font-bold mb-3">
                Car Innovation
              </h5>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                Next-gen automotive data relay systems for autonomous vehicle
                coordination.
              </p>
            </div>
          </div>

          {/* Small card 2 - hover turns pink */}
          <div
            ref={smallCard2Ref}
            className="group flex-1 rounded-xl border border-white/10 backdrop-blur-md bg-white/5 hover:bg-primary p-10 flex flex-col justify-between transition-colors duration-500"
          >
            <span className="material-symbols-outlined text-4xl text-primary group-hover:text-black mb-6 transition-colors duration-500">
              query_stats
            </span>
            <div>
              <h5 className="font-headline text-2xl font-bold mb-3 group-hover:text-black transition-colors duration-500 italic">
                Predictive Fluidity
              </h5>
              <p className="text-on-surface-variant group-hover:text-black/70 text-sm font-light leading-relaxed transition-colors duration-500">
                Mathematical models for liquidity forecasting in high-frequency
                trading.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
