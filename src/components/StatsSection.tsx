import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SUMMIT_STATS } from '../data/summitData';
import { formatStatValue } from '../utils/summitLogic';

gsap.registerPlugin(ScrollTrigger);

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayValues, setDisplayValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(SUMMIT_STATS.map((s) => [s.id, s.target]))
  );
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          SUMMIT_STATS.forEach((stat) => {
            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: stat.target,
              duration: 1.45,
              ease: 'power2.out',
              onUpdate: () => {
                setDisplayValues((prev) => ({
                  ...prev,
                  [stat.id]: Math.round(proxy.val),
                }));
              },
              onComplete: () => {
                setDisplayValues((prev) => ({
                  ...prev,
                  [stat.id]: stat.target,
                }));
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="highlights"
      ref={sectionRef}
      aria-label="Summit highlights"
      className="bg-[#FAFCFE] text-[#173B68] border-b border-[#A9C5DF]/40"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-[#A9C5DF]/50">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#285A91]">
              Summit Scale · Kochi 2027
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-medium tracking-tight text-[#173B68]">
              A thousand voices, one architectural room.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#668BAF]">
            Built intentionally as a high-trust leadership convergence rather than a conventional conference floor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#A9C5DF]/40">
          {SUMMIT_STATS.map((stat, idx) => {
            const currentNum = displayValues[stat.id] ?? stat.target;
            const formatted = formatStatValue(currentNum, stat.suffix);
            return (
              <div
                key={stat.id}
                className={`py-10 lg:py-12 ${
                  idx === 0 ? 'lg:pr-10' : idx === 3 ? 'lg:pl-10' : 'lg:px-10'
                } ${idx % 2 === 1 ? 'sm:pl-8 lg:pl-10' : 'sm:pr-8 lg:pr-10'}`}
              >
                <div
                  className="font-serif font-medium tracking-[-0.03em] text-[#173B68] tabular-nums leading-none"
                  style={{ fontSize: 'clamp(3.25rem, 5.2vw, 5.25rem)' }}
                >
                  {formatted}
                </div>
                <div className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#285A91]">
                  {stat.label}
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[#173B68]/75 max-w-xs">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
