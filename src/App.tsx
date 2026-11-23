import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { FOCUS_AREAS, type Speaker } from './data/summitData';
import type { InquiryMode, SubmittedInquiryRecord } from './utils/summitLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { FocusAreasSection } from './components/FocusAreasSection';
import { SpeakersSection } from './components/SpeakersSection';
import { PreviousEditionsSection } from './components/PreviousEditionsSection';
import { ClosingCtaSection } from './components/ClosingCtaSection';
import { Footer } from './components/Footer';
import { SpeakerModal } from './components/SpeakerModal';
import { InquiryModal } from './components/InquiryModal';

const STORAGE_KEY = 'she_power_2027_inquiry';

export default function App() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryMode, setInquiryMode] = useState<InquiryMode>('register');
  const [inquiryDomain, setInquiryDomain] = useState<string>(FOCUS_AREAS[0].title);
  const [savedSubmission, setSavedSubmission] = useState<SubmittedInquiryRecord | null>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SubmittedInquiryRecord) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!savedSubmission) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSubmission));
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [savedSubmission]);

  const handleOpenInquiry = (mode: InquiryMode, domain?: string) => {
    setInquiryMode(mode);
    if (domain) {
      setInquiryDomain(domain);
    }
    setInquiryOpen(true);
  };

  const handleExploreSummit = () => {
    const highlights = document.querySelector('#highlights');
    if (highlights) {
      highlights.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAFCFE] text-[#173B68] flex flex-col">
        <Navbar
          onOpenInquiry={(mode) => handleOpenInquiry(mode)}
          hasRegistered={Boolean(savedSubmission)}
        />

        <main className="flex-1">
          <HeroSection
            onExplore={handleExploreSummit}
            onOpenInquiry={(mode) => handleOpenInquiry(mode)}
          />

          <StatsSection />

          <AboutSection />

          <FocusAreasSection
            onSelectTrackForRegistration={(trackTitle) =>
              handleOpenInquiry('register', trackTitle)
            }
          />

          <SpeakersSection onSelectSpeaker={(speaker) => setSelectedSpeaker(speaker)} />

          <PreviousEditionsSection />

          <ClosingCtaSection
            onOpenInquiry={(mode) => handleOpenInquiry(mode)}
            savedReference={savedSubmission?.referenceId ?? null}
          />
        </main>

        <Footer onOpenInquiry={(mode) => handleOpenInquiry(mode)} />

        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
          onRegisterForSpeakerTrack={(category) => handleOpenInquiry('register', category)}
        />

        <InquiryModal
          isOpen={inquiryOpen}
          initialMode={inquiryMode}
          initialDomain={inquiryDomain}
          onClose={() => setInquiryOpen(false)}
          onSubmitted={(record) => setSavedSubmission(record)}
          existingSubmission={savedSubmission}
        />
      </div>
    </MotionConfig>
  );
}
