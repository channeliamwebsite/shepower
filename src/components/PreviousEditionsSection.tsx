import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PREVIOUS_EDITIONS } from '../data/summitData';
import { clampIndex } from '../utils/summitLogic';
import { EditorialImage } from './EditorialImage';

gsap.registerPlugin(ScrollTrigger);

export function PreviousEditionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const frames = sectionRef.current?.querySelectorAll('[data-edition-parallax]');
      frames?.forEach((frame) => {
        gsap.fromTo(
          frame,
          { scale: 1.08 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToEdition = (index: number) => {
    const next = clampIndex(index, PREVIOUS_EDITIONS.length);
    setActiveIndex(next);
    if (trackRef.current) {
      const targetChild = trackRef.current.children[next] as HTMLElement | undefined;
      if (targetChild) {
        trackRef.current.scrollTo({
          left: targetChild.offsetLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleScrollSync = () => {
    if (!trackRef.current) return;
    const containerLeft = trackRef.current.scrollLeft;
    let closestIdx = 0;
    let minDiff = Number.POSITIVE_INFINITY;
    Array.from(trackRef.current.children).forEach((child, idx) => {
      const el = child as HTMLElement;
      const diff = Math.abs(el.offsetLeft - containerLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveIndex(closestIdx);
  };

  return (
    <section
      id="legacy"
      ref={sectionRef}
      className="bg-[#FAFCFE] text-[#173B68] py-20 md:py-28 overflow-hidden border-t border-[#A9C5DF]/40"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#A9C5DF]/50">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-[#285A91]">
              <span>04</span>
              <span className="w-8 h-px bg-[#285A91]/40" aria-hidden="true" />
              <span>Archival Retrospective · 2023–2025</span>
            </div>
            <h2
              className="mt-4 font-serif font-medium tracking-[-0.02em] leading-[1.04] text-[#173B68] text-balance"
              style={{ fontSize: 'clamp(2.5rem, 4.4vw, 4rem)' }}
            >
              Every Edition Leaves a Legacy.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end gap-5">
            <div className="flex items-center gap-6">
              {PREVIOUS_EDITIONS.map((ed, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={ed.editionNumber}
                    type="button"
                    onClick={() => goToEdition(idx)}
                    aria-pressed={isSelected}
                    className={`pb-1.5 text-xs font-semibold uppercase tracking-[0.2em] whitespace-nowrap shrink-0 cursor-pointer transition-colors border-b-2 ${
                      isSelected
                        ? 'text-[#173B68] border-[#173B68]'
                        : 'text-[#668BAF] border-transparent hover:text-[#285A91]'
                    }`}
                  >
                    {ed.year} · Ed. {ed.editionNumber}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goToEdition(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous edition"
                className="w-11 h-11 flex items-center justify-center border border-[#173B68]/30 text-[#173B68] hover:bg-[#173B68] hover:text-[#FAFCFE] disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goToEdition(activeIndex + 1)}
                disabled={activeIndex === PREVIOUS_EDITIONS.length - 1}
                aria-label="Next edition"
                className="w-11 h-11 flex items-center justify-center border border-[#173B68]/30 text-[#173B68] hover:bg-[#173B68] hover:text-[#FAFCFE] disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Cinematic Archival Gallery */}
        <div
          ref={trackRef}
          data-testid="legacy-gallery-track"
          onScroll={handleScrollSync}
          className="mt-12 flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {PREVIOUS_EDITIONS.map((edition) => (
            <article
              key={edition.editionNumber}
              className="w-[90vw] lg:w-[82%] shrink-0 snap-start grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
            >
              {/* Full-bleed photographic plate */}
              <div className="lg:col-span-8 relative aspect-[16/9] overflow-hidden bg-[#E8F1F8]">
                <div data-edition-parallax className="w-full h-full will-change-transform">
                  <EditorialImage
                    src={edition.image}
                    alt={edition.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackTitle={`${edition.editionLabel} (${edition.year})`}
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#173B68]/45 via-transparent to-transparent pointer-events-none"
                />
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-[#FAFCFE]">
                  <span className="font-serif text-4xl md:text-5xl font-medium tracking-tight">
                    {edition.editionNumber}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#E8F1F8]">
                    {edition.location}
                  </span>
                </div>
              </div>

              {/* Editorial Annotation Column */}
              <div className="lg:col-span-4 flex flex-col justify-between py-2">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#A9C5DF]/60 pb-3 text-xs uppercase tracking-[0.2em] text-[#285A91]">
                    <span>{edition.editionLabel}</span>
                    <span className="tabular-nums font-semibold">{edition.year}</span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-[#173B68]">
                    {edition.theme}
                  </h3>

                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#668BAF]">
                    {edition.attendees}
                  </p>

                  <p className="text-base leading-relaxed text-[#173B68]/80">
                    {edition.caption}
                  </p>
                </div>

                <blockquote className="mt-8 pt-5 border-t border-[#A9C5DF]/50">
                  <p className="font-serif italic text-xl leading-snug text-[#285A91]">
                    “{edition.quote}”
                  </p>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
