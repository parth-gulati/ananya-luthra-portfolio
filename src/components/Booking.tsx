"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Google Calendar appointment schedule (1 hr consultation, Google Meet).
// Get this URL from Google Calendar > Appointment schedules > Share > "Website embed" / booking page link.
const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ezNBRLZUUnDyga-SbSoqiWcjyZoC8D0DOMLajg5aXynYTsEnuxeE_8gZQYMRgmP9CXrfvXhgE?gv=true";

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".booking-inner", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="book"
      ref={sectionRef}
      className="pt-0 pb-24 sm:pb-40 px-6 sm:px-8 md:px-16 relative overflow-hidden"
    >
      <div className="booking-inner relative z-10 max-w-5xl mx-auto text-center">
        <span className="font-label text-[10px] tracking-[0.8em] text-white/30 uppercase mb-12 block">
          Book A Session
        </span>

        <h2 className="font-headline text-[9vw] sm:text-[7vw] md:text-[5vw] font-extrabold uppercase leading-[0.9] tracking-tighter mb-6 text-white">
          1 Hour{" "}
          <span className="text-primary italic font-light">Consultation</span>
        </h2>

        <p className="font-body text-sm text-white/50 max-w-xl mx-auto mb-12 sm:mb-16">
          Pick a time that works for you — if it&apos;s on the calendar, it
          already works for me :)
        </p>

        <div className="rounded-xl overflow-hidden border border-white/10 bg-white">
          <iframe
            src={BOOKING_URL}
            title="Book a 1 hour consultation on Google Meet"
            className="w-full h-[70vh] min-h-[600px] border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
