import test from 'node:test';
import assert from 'node:assert/strict';
import { SPEAKERS } from '../data/summitData';
import {
  clampIndex,
  createInquiryReference,
  filterSpeakersByCategory,
  formatStatValue,
  validateInquiryForm,
} from './summitLogic';

test('filterSpeakersByCategory returns all speakers for All Voices', () => {
  const all = filterSpeakersByCategory(SPEAKERS, 'All Voices');
  assert.equal(all.length, 20);
});

test('filterSpeakersByCategory filters accurately by domain track', () => {
  const tech = filterSpeakersByCategory(SPEAKERS, 'Technology');
  assert.ok(tech.length >= 4);
  assert.ok(tech.every((s) => s.category === 'Technology'));
});

test('clampIndex bounds indices cleanly', () => {
  assert.equal(clampIndex(-2, 5), 0);
  assert.equal(clampIndex(2, 5), 2);
  assert.equal(clampIndex(9, 5), 4);
  assert.equal(clampIndex(1, 0), 0);
});

test('formatStatValue formats edition, percentages, and thousands cleanly', () => {
  assert.equal(formatStatValue(4, 'th'), '04th');
  assert.equal(formatStatValue(20, '+'), '20+');
  assert.equal(formatStatValue(1000, '+'), '1,000+');
  assert.equal(formatStatValue(8, ''), '8');
});

test('validateInquiryForm catches invalid email, missing name, and missing partner org', () => {
  const invalid = validateInquiryForm({
    mode: 'partner',
    fullName: 'A',
    email: 'invalid-email',
    phone: '123',
    organization: '',
    focusDomain: '',
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.organization);
  assert.ok(invalid.errors.focusDomain);
});

test('validateInquiryForm passes for valid delegate submission', () => {
  const valid = validateInquiryForm({
    mode: 'register',
    fullName: 'Meera Menon',
    email: 'meera@example.com',
    phone: '+91 98470 12345',
    organization: '',
    focusDomain: 'Women in Technology',
    notes: 'Looking forward to the Kochi summit.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('createInquiryReference generates deterministic prefixed reference codes', () => {
  assert.equal(
    createInquiryReference('register', 'ananya@kochi.in', 1795431021234),
    'SP27-DEL-ANAN-1234'
  );
  assert.equal(
    createInquiryReference('partner', 'a@b.co', 1795431020042),
    'SP27-PRT-AXXX-0042'
  );
});
