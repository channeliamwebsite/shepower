import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { FOCUS_AREAS } from '../data/summitData';
import {
  createInquiryReference,
  validateInquiryForm,
  type InquiryFormValues,
  type InquiryMode,
  type SubmittedInquiryRecord,
} from '../utils/summitLogic';

interface InquiryModalProps {
  isOpen: boolean;
  initialMode: InquiryMode;
  initialDomain?: string;
  onClose: () => void;
  onSubmitted: (record: SubmittedInquiryRecord) => void;
  existingSubmission: SubmittedInquiryRecord | null;
}

export function InquiryModal({
  isOpen,
  initialMode,
  initialDomain = FOCUS_AREAS[0].title,
  onClose,
  onSubmitted,
  existingSubmission,
}: InquiryModalProps) {
  const [mode, setMode] = useState<InquiryMode>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [focusDomain, setFocusDomain] = useState(initialDomain);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormValues, string>>>({});
  const [justSubmitted, setJustSubmitted] = useState<SubmittedInquiryRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      if (initialDomain) {
        setFocusDomain(initialDomain);
      }
      setErrors({});
      setJustSubmitted(null);
    }
  }, [isOpen, initialMode, initialDomain]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const values: InquiryFormValues = {
      mode,
      fullName,
      email,
      phone,
      organization,
      focusDomain,
      notes,
    };

    const validation = validateInquiryForm(values);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const now = Date.now();
    const record: SubmittedInquiryRecord = {
      ...values,
      referenceId: createInquiryReference(mode, email, now),
      submittedAt: new Date(now).toISOString(),
    };
    setErrors({});
    setJustSubmitted(record);
    onSubmitted(record);
  };

  const activeReceipt = justSubmitted;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#173B68]/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#FAFCFE] text-[#173B68] border border-[#A9C5DF]/70 p-7 sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close registration dialog"
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-[#A9C5DF]/60 text-[#173B68] hover:bg-[#173B68] hover:text-[#FAFCFE] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="pr-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#285A91]">
                SHE POWER 2027 · Kochi
              </p>
              <h2
                id="inquiry-modal-title"
                className="mt-2 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#173B68]"
              >
                {activeReceipt
                  ? 'Your Submission Is Confirmed'
                  : mode === 'partner'
                  ? 'Partner With She Power'
                  : 'Register Your Interest'}
              </h2>
            </div>

            {!activeReceipt && (
              <div
                role="tablist"
                aria-label="Inquiry type"
                className="mt-6 grid grid-cols-2 border border-[#A9C5DF]/70 bg-[#E8F1F8] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'register'}
                  onClick={() => {
                    setMode('register');
                    setErrors({});
                  }}
                  className={`py-2.5 px-3 text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    mode === 'register'
                      ? 'bg-[#173B68] text-[#FAFCFE]'
                      : 'text-[#173B68]/75 hover:text-[#173B68]'
                  }`}
                >
                  Delegate Pass
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'partner'}
                  onClick={() => {
                    setMode('partner');
                    setErrors({});
                  }}
                  className={`py-2.5 px-3 text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    mode === 'partner'
                      ? 'bg-[#173B68] text-[#FAFCFE]'
                      : 'text-[#173B68]/75 hover:text-[#173B68]'
                  }`}
                >
                  Partnership
                </button>
              </div>
            )}

            {existingSubmission && !activeReceipt && (
              <div className="mt-5 p-4 bg-[#E8F1F8] border border-[#A9C5DF] text-xs text-[#173B68] flex flex-wrap items-center justify-between gap-2">
                <span>
                  Previous {existingSubmission.mode === 'partner' ? 'partnership' : 'delegate'} inquiry
                  saved ({existingSubmission.referenceId}).
                </span>
                <span className="text-[#285A91] font-semibold">
                  Submit below to update or add another
                </span>
              </div>
            )}

            {activeReceipt ? (
              <div className="mt-8 space-y-6">
                <div className="p-6 bg-[#E8F1F8] border border-[#A9C5DF]/70 space-y-4">
                  <div className="flex items-center gap-3 text-[#173B68]">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#173B68] text-[#FAFCFE]">
                      <Check className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-[#285A91]">
                        Reference Number
                      </div>
                      <div className="font-serif text-2xl font-semibold tabular-nums">
                        {activeReceipt.referenceId}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-[#173B68]/85">
                    Thank you, <span className="font-semibold">{activeReceipt.fullName}</span>. Our
                    Channeliam summit secretariat in Kochi has recorded your{' '}
                    {activeReceipt.mode === 'partner'
                      ? 'strategic partnership inquiry'
                      : 'delegate registration interest'}{' '}
                    for the <span className="font-semibold">{activeReceipt.focusDomain}</span>{' '}
                    track and will contact you at{' '}
                    <span className="font-semibold">{activeReceipt.email}</span>.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-7 py-3.5 bg-[#173B68] text-[#FAFCFE] hover:bg-[#285A91] text-xs font-semibold uppercase tracking-[0.18em] cursor-pointer transition-colors"
                  >
                    Return to Summit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="inquiry-full-name"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#285A91] mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="inquiry-full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Meera Nambiar"
                      className="w-full px-4 py-3 bg-[#FAFCFE] border border-[#A9C5DF] text-sm text-[#173B68] placeholder:text-[#668BAF]/60 focus:outline-none focus:border-[#173B68]"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#285A91] mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="meera@company.in"
                      className="w-full px-4 py-3 bg-[#FAFCFE] border border-[#A9C5DF] text-sm text-[#173B68] placeholder:text-[#668BAF]/60 focus:outline-none focus:border-[#173B68]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="inquiry-phone"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#285A91] mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98470 00000"
                      className="w-full px-4 py-3 bg-[#FAFCFE] border border-[#A9C5DF] text-sm text-[#173B68] placeholder:text-[#668BAF]/60 focus:outline-none focus:border-[#173B68]"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-organization"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#285A91] mb-2"
                    >
                      Organization / Venture {mode === 'partner' ? '*' : '(Optional)'}
                    </label>
                    <input
                      id="inquiry-organization"
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Organization or Independent"
                      className="w-full px-4 py-3 bg-[#FAFCFE] border border-[#A9C5DF] text-sm text-[#173B68] placeholder:text-[#668BAF]/60 focus:outline-none focus:border-[#173B68]"
                    />
                    {errors.organization && (
                      <p className="mt-1.5 text-xs text-red-700">{errors.organization}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-domain"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#285A91] mb-2"
                  >
                    {mode === 'partner' ? 'Partnership Track Alignment *' : 'Primary Leadership Track *'}
                  </label>
                  <select
                    id="inquiry-domain"
                    value={focusDomain}
                    onChange={(e) => setFocusDomain(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAFCFE] border border-[#A9C5DF] text-sm text-[#173B68] focus:outline-none focus:border-[#173B68]"
                  >
                    {FOCUS_AREAS.map((area) => (
                      <option key={area.number} value={area.title}>
                        {area.number} — {area.title}
                      </option>
                    ))}
                    <option value="Entrepreneurs">Entrepreneurs & Founders</option>
                    <option value="Technology">Technology & Product</option>
                    <option value="Policy & Impact">Policy & Social Impact</option>
                    <option value="Finance & Culture">Finance, Venture & Culture</option>
                  </select>
                  {errors.focusDomain && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.focusDomain}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-notes"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#285A91] mb-2"
                  >
                    Note to Curators (Optional)
                  </label>
                  <textarea
                    id="inquiry-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      mode === 'partner'
                        ? 'Share your brand partnership vision or institutional collaboration goals.'
                        : 'Tell us what conversations or connections you are hoping to explore in Kochi.'
                    }
                    className="w-full px-4 py-3 bg-[#FAFCFE] border border-[#A9C5DF] text-sm text-[#173B68] placeholder:text-[#668BAF]/60 focus:outline-none focus:border-[#173B68] resize-none"
                  />
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[#A9C5DF]/50">
                  <span className="text-xs text-[#668BAF]">
                    Organised by Channeliam · Kochi 2027
                  </span>
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#173B68] text-[#FAFCFE] hover:bg-[#285A91] text-xs font-semibold uppercase tracking-[0.18em] cursor-pointer transition-colors"
                  >
                    {mode === 'partner' ? 'Submit Partnership Inquiry' : 'Confirm Interest'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
