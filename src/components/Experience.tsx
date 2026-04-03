"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceStat {
  label: string;
  value: string;
}

interface ExperienceCard {
  date: string;
  icon: string;
  title: string;
  role: string;
  stats: ExperienceStat[];
}

const experiences: ExperienceCard[] = [
  {
    date: "Oct 2024 — Present",
    icon: "finance",
    title: "Morgan Stanley",
    role: "Data Engineer",
    stats: [
      { label: "Data Masking & Security", value: "Snowflake" },
      { label: "Pipeline Architecture", value: "Python/DB2" },
    ],
  },
  {
    date: "Jul 2024 — Oct 2024",
    icon: "account_balance",
    title: "BMO",
    role: "Senior Specialist, Data Analytics",
    stats: [
      { label: "ML Forecasting", value: "R² 97.85%" },
      { label: "ETL Pipeline", value: "Power BI/DAX" },
    ],
  },
  {
    date: "May 2023 — Aug 2023",
    icon: "lightbulb",
    title: "RBC Amplify",
    role: "Data Scientist",
    stats: [
      { label: "Call Summarization", value: "NLP/LLM" },
      { label: "Credit Loss Reduction", value: "1.2% PCL" },
    ],
  },
  {
    date: "May 2022 — Aug 2022",
    icon: "trending_up",
    title: "BMO",
    role: "Data Analyst",
    stats: [
      { label: "Credit Risk Forecasting", value: "SQL/SAS" },
      { label: "Dashboard Viz", value: "Power BI" },
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const title = titleRef.current;
    if (!section || !container || !title) return;

    const ctx = gsap.context(() => {
      // Title reveal animation
      gsap.fromTo(
        title,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Horizontal scroll - calculate how far to scroll
      const cards = container.querySelectorAll<HTMLElement>(".experience-card");
      const totalWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth + 64; // 64px for right padding

      // Pinned horizontal scroll tween
      const scrollTween = gsap.to(container, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Card scale-in using the horizontal scroll as containerAnimation
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.95, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 85%",
              end: "left 60%",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-surface-container-low relative overflow-hidden"
    >
      {/* Centered content wrapper */}
      <div className="flex flex-col justify-center min-h-screen py-16">
        {/* Header row */}
        <div className="px-8 md:px-16 mb-12 flex justify-between items-end">
          <div>
            <span className="font-label text-[10px] tracking-[0.5em] text-primary uppercase">
              Legacy &amp; Impact
            </span>
            <h3
              ref={titleRef}
              className="font-headline text-5xl sm:text-6xl md:text-8xl mt-4 font-bold tracking-tighter"
            >
              The Tenure
            </h3>
          </div>
          <div className="text-right hidden sm:block">
            <p className="font-label text-[12px] text-white/30 uppercase">
              01 / 04 — Institutions
            </p>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={containerRef}
          className="flex gap-8 md:gap-12 px-8 md:px-16 items-stretch"
        >
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[38vw] glass-morphism p-8 sm:p-10 md:p-12 rounded-xl border border-white/5 group hover:bg-primary/5 transition-all duration-700 flex flex-col"
            >
              {/* Top row: date + icon */}
              <div className="flex justify-between items-start mb-8">
                <p className="font-label text-xs text-primary">{exp.date}</p>
                <span className="material-symbols-outlined text-3xl text-white/20 group-hover:text-primary transition-colors duration-500">
                  {exp.icon}
                </span>
              </div>

              {/* Accent line */}
              <div className="w-12 h-px bg-white/10 mb-8 transition-all duration-700 group-hover:w-full group-hover:bg-primary/30" />

              {/* Title */}
              <h4 className="font-headline text-3xl sm:text-5xl font-bold mb-2">
                {exp.title}
              </h4>

              {/* Role */}
              <p className="font-label text-xs sm:text-sm text-primary/80 uppercase tracking-[0.2em] mb-10">
                {exp.role}
              </p>

              {/* Stats - pushed to bottom */}
              <div className="space-y-4 mt-auto">
                {exp.stats.map((stat, statIndex) => (
                  <div
                    key={statIndex}
                    className="flex justify-between items-center border-b border-white/5 pb-2"
                  >
                    <span className="text-on-surface-variant font-light text-sm">
                      {stat.label}
                    </span>
                    <span className="font-label text-xs">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
