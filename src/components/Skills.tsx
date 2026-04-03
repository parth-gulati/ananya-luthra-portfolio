"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const skills: Skill[] = [
  {
    number: "01",
    title: "Snowflake",
    description:
      "Cloud Data Warehousing at scale. Designing multi-cluster virtual warehouses and secure data sharing.",
    tags: ["SQL", "Zero-Copy Clone"],
  },
  {
    number: "02",
    title: "Python & Spark",
    description:
      "High-concurrency data processing and functional programming for complex transformations.",
    tags: ["PySpark", "Pandas"],
  },
  {
    number: "03",
    title: "AWS Ecosystem",
    description:
      "Serverless architectures and managed services for robust, scalable infrastructure.",
    tags: ["Lambda", "S3 / Glue"],
  },
  {
    number: "04",
    title: "ML Models",
    description:
      "Integrating predictive analytics into production pipelines for real-time decisioning.",
    tags: ["Scikit-Learn", "XGBoost"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left title reveal
      const leftElements = leftRef.current?.children;
      if (leftElements) {
        gsap.from(Array.from(leftElements), {
          y: 60,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Grid cells stagger from bottom
      gsap.from(
        cellsRef.current.filter(Boolean),
        {
          y: 80,
          opacity: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cellsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Number counters scale-in
      gsap.from(
        numbersRef.current.filter(Boolean),
        {
          scale: 0,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: cellsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-32 px-8 md:px-16" ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left: sticky */}
        <div className="md:col-span-4 md:sticky md:top-32" ref={leftRef}>
          <span className="font-label text-[10px] tracking-[0.5em] text-primary uppercase">
            Stack Intelligence
          </span>
          <h3 className="font-headline text-5xl sm:text-6xl md:text-7xl mt-4 font-bold tracking-tighter italic leading-[0.9]">
            Engineered
            <br />
            To <span className="text-outline">Excel.</span>
          </h3>
          <p className="mt-8 text-on-surface-variant leading-relaxed max-w-xs text-sm font-light">
            A synthesis of cloud-native infrastructure and rigorous logic. My
            methodology prioritizes resilience and infinite scalability.
          </p>
        </div>

        {/* Right: 2x2 grid */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-outline-variant/20 rounded-xl overflow-hidden border border-outline-variant/30">
          {skills.map((skill, i) => (
            <div
              key={skill.number}
              ref={(el) => { cellsRef.current[i] = el; }}
              className="p-8 sm:p-10 md:p-12 bg-surface hover:bg-surface-container-highest transition-colors duration-500"
            >
              <p
                className="font-label text-primary mb-6 md:mb-8"
                ref={(el) => { numbersRef.current[i] = el; }}
              >
                {skill.number}
              </p>
              <h5 className="font-headline text-3xl mb-4 font-bold">
                {skill.title}
              </h5>
              <p className="text-on-surface-variant font-light mb-8 text-sm leading-relaxed">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-container-high text-[10px] font-label rounded-full uppercase tracking-widest text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
