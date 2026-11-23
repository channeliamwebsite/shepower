import type { Speaker, SpeakerCategory } from '../data/summitData';

export type InquiryMode = 'register' | 'partner';

export interface InquiryFormValues {
  mode: InquiryMode;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  focusDomain: string;
  notes: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormValues, string>>;
}

export interface SubmittedInquiryRecord extends InquiryFormValues {
  referenceId: string;
  submittedAt: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGITS_MIN = 7;
const PHONE_DIGITS_MAX = 15;

export function filterSpeakersByCategory(
  speakers: Speaker[],
  category: SpeakerCategory
): Speaker[] {
  if (category === 'All Voices') {
    return speakers;
  }
  return speakers.filter((speaker) => speaker.category === category);
}

export function clampIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  if (index < 0) return 0;
  if (index >= total) return total - 1;
  return index;
}

export function formatStatValue(value: number, suffix: string): string {
  const formattedNumber =
    value >= 1000
      ? value.toLocaleString('en-US')
      : value < 10 && suffix === 'th'
      ? String(value).padStart(2, '0')
      : String(value);
  return `${formattedNumber}${suffix}`;
}

export function validateInquiryForm(values: InquiryFormValues): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormValues, string>> = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const trimmedEmail = values.email.trim();
  if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }

  const phoneDigits = values.phone.replace(/\D/g, '');
  if (
    !values.phone.trim() ||
    phoneDigits.length < PHONE_DIGITS_MIN ||
    phoneDigits.length > PHONE_DIGITS_MAX
  ) {
    errors.phone = 'Please enter a valid contact phone number (7–15 digits).';
  }

  if (values.mode === 'partner' && !values.organization.trim()) {
    errors.organization = 'Please specify your organization or brand name for partnership inquiries.';
  }

  if (!values.focusDomain.trim()) {
    errors.focusDomain = 'Please select your primary domain of interest.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createInquiryReference(mode: InquiryMode, email: string, timestampMs: number): string {
  const prefix = mode === 'partner' ? 'SP27-PRT' : 'SP27-DEL';
  const cleanHandle = email
    .trim()
    .split('@')[0]
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, 4)
    .padEnd(4, 'X');
  const suffix = String(timestampMs % 10000).padStart(4, '0');
  return `${prefix}-${cleanHandle}-${suffix}`;
}
