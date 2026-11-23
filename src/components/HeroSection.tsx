import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/summitData';
import type { InquiryMode } from '../utils/summitLogic';
import { EditorialImage } from './EditorialImage';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onExplore: () => void;
  onOpenInquiry: (mode: InquiryMode) => void;
}

export function HeroSection({ onExplore, onOpenInquiry }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Initial cinematic reveal
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.09, opacity: 0.75 },
          { scale: 1.0, opacity: 1, duration: 1.6, ease: 'power3.out' }
        );

        gsap.to(bgRef.current, {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (contentRef.current) {
        const lines = contentRef.current.querySelectorAll('[data-hero-stagger]');
        gsap.fromTo(
          lines,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.11,
            delay: 0.15,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#173B68] text-[#FAFCFE] flex flex-col justify-end"
    >
      {/* Parallax Cinematic Backdrop */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform pointer-events-none"
      >
        <EditorialImage
          src={HERO_IMAGE}
          alt="Confident Indian woman in an ivory cream handloom saree standing in an illuminated glass and stone architectural atrium"
          loading="eager"
          objectPosition="54% 22%"
          className="w-full h-full object-cover"
          fallbackTitle="SHE POWER 2027 — Kochi"
        />
      </div>

      {/* Measured Deep Ocean Blue editorial scrims for >=4.5:1 text legibility */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#173B68]/92 via-[#173B68]/58 to-[#285A91]/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none bg-gradient-to-t from-[#173B68]/95 via-[#173B68]/45 to-transparent"
      />

      {/* Asymmetric Editorial Foreground */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-28 pb-12 md:pb-16">
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end"
        >
          {/* Left Dominant Identity */}
          <div className="lg:col-span-8 space-y-6">
            <div
              data-hero-stagger
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm font-medium uppercase tracking-[0.22em] text-[#E8F1F8]"
            >
              <span>2027 Edition</span>
              <span aria-hidden="true" className="text-[#A9C5DF]">
                ·
              </span>
              <span>Women’s Leadership Summit</span>
              <span aria-hidden="true" className="text-[#A9C5DF]">
                ·
              </span>
              <span>Kochi, South India</span>
            </div>

            <div data-hero-stagger className="overflow-hidden">
              <h1
                className="font-serif font-medium tracking-[-0.02em] leading-[0.9] text-[#FAFCFE]"
                style={{ fontSize: 'clamp(3.75rem, 9.2vw, 8.25rem)' }}
              >
                SHE POWER
              </h1>
            </div>

            <p
              data-hero-stagger
              className="max-w-xl text-base md:text-lg leading-relaxed text-[#E8F1F8]/95 font-normal"
            >
              Convening founders, technologists, creators, homemakers-turned-entrepreneurs,
              and architects of public life for an extraordinary chapter of leadership in Kochi.
            </p>

            <div
              data-hero-stagger
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <MagneticButton variant="light" onClick={onExplore}>
                <span>Explore the Summit</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton variant="outline-light" onClick={() => onOpenInquiry('partner')}>
                <span>Become a Partner</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Curatorial Note + Minimal Scroll Indicator */}
          <div className="lg:col-span-4 flex flex-col lg:items-end justify-end gap-8">
            <div
              data-hero-stagger
              className="border-t border-[#A9C5DF]/40 pt-4 max-w-xs lg:text-right"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#A9C5DF]">
                Organised by Channeliam
              </p>
              <p className="mt-1.5 font-serif italic text-lg text-[#FAFCFE]/90">
                Fourth annual gathering of ambition, capital, and cultural voice.
              </p>
            </div>

            <a
              data-hero-stagger
              href="#highlights"
              onClick={(e) => {
                e.preventDefault();
                onExplore();
              }}
              aria-label="Scroll to summit highlights"
              className="hidden sm:inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[#E8F1F8]/80 hover:text-[#FAFCFE] transition-colors group"
            >
              <span>Scroll to explore</span>
              <span className="relative w-px h-10 bg-[#A9C5DF]/40 overflow-hidden">
                <span className="absolute top-0 left-0 w-full h-1/2 bg-[#FAFCFE] animate-[pulse_2.2s_ease-in-out_infinite]" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
