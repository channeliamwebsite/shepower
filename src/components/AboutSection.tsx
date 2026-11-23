import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_IMAGE } from '../data/summitData';
import { EditorialImage } from './EditorialImage';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imageFrameRef.current && imageInnerRef.current) {
        gsap.fromTo(
          imageFrameRef.current,
          { clipPath: 'inset(14% 0% 0% 0%)', opacity: 0.35 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageFrameRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          imageInnerRef.current,
          { scale: 1.08, y: -12 },
          {
            scale: 1.0,
            y: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      if (textColRef.current) {
        const blocks = textColRef.current.querySelectorAll('[data-about-reveal]');
        gsap.fromTo(
          blocks,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textColRef.current,
              start: 'top 78%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#E8F1F8] text-[#173B68] py-24 md:py-36 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Editorial Narrative */}
          <div ref={textColRef} className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-8">
              <div data-about-reveal className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-[#285A91]">
                <span>01</span>
                <span className="w-8 h-px bg-[#285A91]/40" aria-hidden="true" />
                <span>What Is She Power</span>
              </div>

              <h2
                data-about-reveal
                className="font-serif font-medium tracking-[-0.02em] leading-[1.04] text-[#173B68] text-balance"
                style={{ fontSize: 'clamp(2.5rem, 4.4vw, 4rem)' }}
              >
                More Than a Summit.
                <br />A Movement of Possibilities.
              </h2>

              <div data-about-reveal className="space-y-5 max-w-xl text-base md:text-[17px] leading-[1.75] text-[#173B68]/85">
                <p className="first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-[#173B68]">
                  Conceived and curated by Channeliam, She Power exists to dissolve the
                  artificial boundaries between boardrooms, neighbourhood workshops, research
                  labs, and cultural salons. Here, established enterprise founders sit beside
                  homemakers launching their first venture, senior public administrators,
                  restaurateurs, and literary voices.
                </p>
                <p>
                  Returning to Kochi for its 4th Edition in 2027, the summit rejects performative
                  panels in favour of unhurried mentorship, cross-sector capital introductions,
                  and practical dialogue that turns quiet conviction into measurable momentum.
                </p>
              </div>
            </div>

            <blockquote
              data-about-reveal
              className="mt-12 pt-8 pb-6 border-t border-b border-[#668BAF]/40 max-w-xl"
            >
              <p className="font-serif italic text-xl md:text-2xl leading-snug text-[#173B68]">
                “When women across industries gather with candour and capital in the same room,
                individual ambition becomes collective architecture.”
              </p>
              <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-[#285A91]">
                Channeliam Curatorial Charter · Kochi
              </footer>
            </blockquote>
          </div>

          {/* Right Authentic Documentary Photography with Scroll Curtain Reveal */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <figure className="h-full flex flex-col">
              <div
                ref={imageFrameRef}
                className="relative w-full aspect-[4/3] lg:flex-1 lg:min-h-[480px] overflow-hidden bg-[#A9C5DF]/30"
              >
                <div ref={imageInnerRef} className="w-full h-full will-change-transform">
                  <EditorialImage
                    src={ABOUT_IMAGE}
                    alt="Women entrepreneurs, creators, and executives seated around a sunlit teak table in Kochi during a She Power leadership roundtable"
                    className="w-full h-full object-cover"
                    fallbackTitle="She Power Leadership Roundtable · Kochi"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-xs text-[#285A91]">
                <span className="font-serif italic text-sm">
                  Fig. 01 — Cross-disciplinary leadership salon, Kochi pavilion
                </span>
                <span className="uppercase tracking-[0.18em] whitespace-nowrap shrink-0">
                  Archive · Channeliam
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
