import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, text, center = true }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-14`}>
      <p className="text-sky-400 font-semibold tracking-[0.25em] text-xs uppercase mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
      {text && <p className="mt-4 text-slate-400 text-lg">{text}</p>}
    </Reveal>
  );
}
