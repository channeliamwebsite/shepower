export interface StatHighlight {
  id: string;
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  detail: string;
}

export interface FocusArea {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  sessionCount: string;
  leadQuestion: string;
}

export type SpeakerCategory =
  | 'All Voices'
  | 'Entrepreneurs'
  | 'Technology'
  | 'Policy & Impact'
  | 'Finance & Culture';

export interface Speaker {
  id: string;
  slug: string;
  name: string;
  designation: string;
  organization: string;
  city: string;
  category: Exclude<SpeakerCategory, 'All Voices'>;
  background: string;
  sessionTopic: string;
  image: string;
  imagePosition?: string;
}

export interface PreviousEdition {
  editionNumber: string;
  editionLabel: string;
  year: string;
  theme: string;
  location: string;
  attendees: string;
  caption: string;
  quote: string;
  image: string;
  imageAlt: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_she_power_saree_1795431025067.jpg';
export const ABOUT_IMAGE = '/src/assets/images/about_summit_dialogue_1795431024388.jpg';

export const SUMMIT_STATS: StatHighlight[] = [
  {
    id: 'edition',
    target: 4,
    suffix: 'th',
    label: 'Edition',
    detail: 'Returning to Kochi with renewed architectural scale and global delegates',
  },
  {
    id: 'speakers',
    target: 20,
    suffix: '+',
    label: 'Inspiring Speakers',
    detail: 'Founders, technologists, public architects, authors, and capital stewards',
  },
  {
    id: 'participants',
    target: 1000,
    suffix: '+',
    label: 'Expected Participants',
    detail: 'Decision-makers, emerging entrepreneurs, and creative leaders across India',
  },
  {
    id: 'domains',
    target: 8,
    suffix: '',
    label: 'Leadership Domains',
    detail: 'Curated tracks spanning venture scale, deep tech, policy, culinary, and wealth',
  },
];

export const FOCUS_AREAS: FocusArea[] = [
  {
    number: '01',
    title: 'Women Entrepreneurs',
    subtitle: 'Building enduring enterprises from regional roots to global markets',
    description:
      'Candid boardroom dialogues on scaling independent brands, navigating supply chains, protecting equity, and designing resilient founder-led organizations.',
    image: '/src/assets/images/about_summit_dialogue_1795431024388.jpg',
    imageAlt: 'Indian women entrepreneurs conversing around a sunlit teak table in Kochi',
    sessionCount: '4 Keynotes · 2 Roundtables',
    leadQuestion: 'How do women-led enterprises expand across borders without losing cultural clarity?',
  },
  {
    number: '02',
    title: 'Women in Technology',
    subtitle: 'Engineering systems, AI architecture, and ethical product leadership',
    description:
      'Deep-dive perspectives from engineering VPs, deep-tech researchers, and SaaS founders shaping India’s next decade of software and hardware innovation.',
    image: '/src/assets/images/focus_women_tech_1795431025753.jpg',
    imageAlt: 'Indian woman technology founder working in a sunlit coastal glass studio',
    sessionCount: '3 Keynotes · 1 Architecture Lab',
    leadQuestion: 'What changes when women architect the foundational algorithms of tomorrow?',
  },
  {
    number: '03',
    title: 'Homemakers to Business Owners',
    subtitle: 'Transforming household mastery and community trust into commercial ventures',
    description:
      'Practical pathways from kitchen tables and craft studios to registered companies—covering formalization, digital commerce, working capital, and brand storytelling.',
    image: '/src/assets/images/edition_legacy_panel_1795431043413.jpg',
    imageAlt: 'Women founders sharing stories on a serene Kerala backwaters terrace',
    sessionCount: '2 Workshops · 3 Founder Stories',
    leadQuestion: 'How does lived domestic discipline become an asymmetric entrepreneurial advantage?',
  },
  {
    number: '04',
    title: 'Women in Government',
    subtitle: 'Public administration, civic architecture, and institutional reform',
    description:
      'Conversations with civil servants, municipal leaders, and policy strategists driving inclusive infrastructure, digital governance, and regional economic equity.',
    image: '/src/assets/images/speaker_policy_saree_1795431023736.jpg',
    imageAlt: 'Senior Indian woman policymaker in a refined steel-blue handloom saree',
    sessionCount: '2 Policy Dialogues · 1 Fireside',
    leadQuestion: 'How do civic institutions accelerate women-led economic participation at scale?',
  },
  {
    number: '05',
    title: 'Women Startups',
    subtitle: 'From zero-to-one conviction to institutional venture velocity',
    description:
      'High-candor sessions on product-market truth, early team design, unit economics, and pitching institutional seed and Series A capital across South India and beyond.',
    image: '/src/assets/images/speaker_founder_linen_1795431024654.jpg',
    imageAlt: 'Indian woman startup founder in minimal ice-blue handwoven cotton attire',
    sessionCount: '4 Pitch Salons · 2 Panels',
    leadQuestion: 'What unlocks venture velocity for first-time women founders outside metro hubs?',
  },
  {
    number: '06',
    title: 'Women Writers',
    subtitle: 'Literature, independent journalism, and cultural narrative authority',
    description:
      'Novelists, essayists, editors, and screenwriters reflect on voice, publishing autonomy, archival memory, and shaping modern South Asian discourse.',
    image: '/src/assets/images/speaker_author_studio_1795431025222.jpg',
    imageAlt: 'Indian woman author and creative director in a sunlit studio with books',
    sessionCount: '2 Literary Readings · 1 Panel',
    leadQuestion: 'Whose stories endure when women command the editorial lens?',
  },
  {
    number: '07',
    title: 'Food & Restaurant Businesses',
    subtitle: 'Culinary heritage, hospitality craft, and modern food enterprise',
    description:
      'Restaurateurs, artisanal food founders, and hospitality directors share blueprints on kitchen economics, farm-to-table sourcing, and enduring guest culture.',
    image: '/src/assets/images/focus_culinary_enterprise_1795431024608.jpg',
    imageAlt: 'Indian woman culinary entrepreneur plating coastal Kerala cuisine in a modern kitchen',
    sessionCount: '2 Culinary Showcases · 1 Panel',
    leadQuestion: 'How can regional culinary heritage scale with integrity and profitability?',
  },
  {
    number: '08',
    title: 'Financial Growth & Empowerment',
    subtitle: 'Capital literacy, angel investing, and intergenerational wealth stewardship',
    description:
      'Demystifying balance sheets, private wealth portfolios, institutional credit, and angel syndicates led by women investment partners and CFOs.',
    image: '/src/assets/images/speaker_finance_tailored_1795431044597.jpg',
    imageAlt: 'Indian woman venture partner standing by sunlit glass windows',
    sessionCount: '3 Wealth Clinics · 1 Keynote',
    leadQuestion: 'What happens when more women move from earners to capital allocators?',
  },
];

export const SPEAKER_CATEGORIES: SpeakerCategory[] = [
  'All Voices',
  'Entrepreneurs',
  'Technology',
  'Policy & Impact',
  'Finance & Culture',
];

export const SPEAKERS: Speaker[] = [
  {
    id: 'spk-01',
    slug: 'meera-nambiar',
    name: 'Meera Nambiar',
    designation: 'Managing Director, South Asia Cloud Architecture',
    organization: 'VayuSystems',
    city: 'Bengaluru · Kochi',
    category: 'Technology',
    background:
      'Twenty years leading enterprise cloud infrastructure across Bengaluru and Singapore, mentoring 140+ women systems architects.',
    sessionTopic: 'Designing Resilient Sovereign AI Infrastructure',
    image: '/src/assets/images/speaker_exec_navy_1795431023362.jpg',
    imagePosition: '50% 18%',
  },
  {
    id: 'spk-02',
    slug: 'ananya-menon',
    name: 'Ananya Menon',
    designation: 'Founder & CEO',
    organization: 'Kaveri Craft & Looms',
    city: 'Kochi',
    category: 'Entrepreneurs',
    background:
      'Built a direct-to-global handloom enterprise partnering with 1,200 women weavers across Kerala and Tamil Nadu.',
    sessionTopic: 'From Regional Craft Collective to Global Luxury House',
    image: '/src/assets/images/speaker_founder_linen_1795431024654.jpg',
    imagePosition: '50% 15%',
  },
  {
    id: 'spk-03',
    slug: 'dr-radhika-iyer',
    name: 'Dr. Radhika Iyer',
    designation: 'Principal Advisor, Urban Economic Policy',
    organization: 'Civic Foresight Mission',
    city: 'Thiruvananthapuram',
    category: 'Policy & Impact',
    background:
      'Former municipal commissioner and development economist pioneering women-led micro-industrial corridors in South India.',
    sessionTopic: 'Civic Architecture for Inclusive Entrepreneurship',
    image: '/src/assets/images/speaker_policy_saree_1795431023736.jpg',
    imagePosition: '50% 15%',
  },
  {
    id: 'spk-04',
    slug: 'kavitha-sreedhar',
    name: 'Kavitha Sreedhar',
    designation: 'Novelist & Editorial Director',
    organization: 'Malabar Folio Press',
    city: 'Kozhikode',
    category: 'Finance & Culture',
    background:
      'Award-winning bilingual author and independent publisher championing contemporary South Indian women essayists.',
    sessionTopic: 'Narrative Sovereignty in the Digital Age',
    image: '/src/assets/images/speaker_author_studio_1795431025222.jpg',
    imagePosition: '50% 20%',
  },
  {
    id: 'spk-05',
    slug: 'nandini-verma',
    name: 'Nandini Verma',
    designation: 'General Partner',
    organization: 'BlueHorizon Capital',
    city: 'Mumbai',
    category: 'Finance & Culture',
    background:
      'Leads a $180M early-growth fund backing women founders across climate tech, fintech, and consumer wellness.',
    sessionTopic: 'Capital Allocation Through a Long-Horizon Lens',
    image: '/src/assets/images/speaker_finance_tailored_1795431044597.jpg',
    imagePosition: '50% 20%',
  },
  {
    id: 'spk-06',
    slug: 'lakshmi-kurup',
    name: 'Lakshmi Kurup',
    designation: 'Chef-Patron & Hospitality Founder',
    organization: 'The Spice Courtyard',
    city: 'Fort Kochi',
    category: 'Entrepreneurs',
    background:
      'Transformed a heritage family courtyard kitchen into one of South India’s most celebrated coastal dining destinations.',
    sessionTopic: 'The Unit Economics of Heritage Hospitality',
    image: '/src/assets/images/focus_culinary_enterprise_1795431024608.jpg',
    imagePosition: '50% 20%',
  },
  {
    id: 'spk-07',
    slug: 'shreya-deshpande',
    name: 'Shreya Deshpande',
    designation: 'Co-Founder & CTO',
    organization: 'Nirmaan BioRobotics',
    city: 'Pune',
    category: 'Technology',
    background:
      'Robotics engineer building precision diagnostic automation deployed across 300+ regional clinics.',
    sessionTopic: 'Deep-Tech Hardware Beyond Metro Ecosystems',
    image: '/src/assets/images/focus_women_tech_1795431025753.jpg',
    imagePosition: '68% 22%',
  },
  {
    id: 'spk-08',
    slug: 'devika-warrier',
    name: 'Devika Warrier',
    designation: 'Chief Executive Officer',
    organization: 'Channeliam & She Power',
    city: 'Kochi',
    category: 'Entrepreneurs',
    background:
      'Media entrepreneur and community architect who founded Channeliam to amplify regional founders and women leaders.',
    sessionTopic: 'Building Platforms That Compound Ambition',
    image: '/src/assets/images/hero_she_power_saree_1795431025067.jpg',
    imagePosition: '50% 18%',
  },
  {
    id: 'spk-09',
    slug: 'priya-subramanian',
    name: 'Priya Subramanian',
    designation: 'VP of Product Design',
    organization: 'Veridian FinTech',
    city: 'Chennai',
    category: 'Technology',
    background:
      'Pioneered voice-first vernacular banking interfaces serving 14 million women micro-merchants across India.',
    sessionTopic: 'Designing Trustworthy Financial Products for Bharat',
    image: '/src/assets/images/speaker_exec_navy_1795431023362.jpg',
    imagePosition: '48% 15%',
  },
  {
    id: 'spk-10',
    slug: 'revathi-krishnan',
    name: 'Revathi Krishnan',
    designation: 'Founder',
    organization: 'Sahyadri Botanicals',
    city: 'Munnar',
    category: 'Entrepreneurs',
    background:
      'Started crafting botanical skincare from home before scaling exports to 11 countries with zero external debt.',
    sessionTopic: 'From Home Lab to Export-Ready Brand',
    image: '/src/assets/images/speaker_founder_linen_1795431024654.jpg',
    imagePosition: '52% 16%',
  },
  {
    id: 'spk-11',
    slug: 'asha-george-ias',
    name: 'Asha George',
    designation: 'Director, Digital Public Infrastructure',
    organization: 'State Innovation Council',
    city: 'Kochi',
    category: 'Policy & Impact',
    background:
      'Spearheaded Kerala’s women startup grant architecture and district-level digital maker spaces.',
    sessionTopic: 'Public Capital as a Catalyst for First-Time Founders',
    image: '/src/assets/images/speaker_policy_saree_1795431023736.jpg',
    imagePosition: '48% 16%',
  },
  {
    id: 'spk-12',
    slug: 'roshni-pillai',
    name: 'Roshni Pillai',
    designation: 'Chief Financial Officer',
    organization: 'Meridian Marine Logistics',
    city: 'Kochi · Dubai',
    category: 'Finance & Culture',
    background:
      'Stewards cross-border maritime trade finance and corporate treasury strategy across the Arabian Sea corridor.',
    sessionTopic: 'Balance-Sheet Discipline for High-Growth Founders',
    image: '/src/assets/images/speaker_finance_tailored_1795431044597.jpg',
    imagePosition: '52% 20%',
  },
  {
    id: 'spk-13',
    slug: 'mythili-rao',
    name: 'Mythili Rao',
    designation: 'Culinary Historian & Author',
    organization: 'Coastline Tables',
    city: 'Mangaluru',
    category: 'Finance & Culture',
    background:
      'Chronicles heirloom coastal recipes and mentors women-led regional cloud kitchens and boutique bakeries.',
    sessionTopic: 'Storytelling as Commercial Moat in Food',
    image: '/src/assets/images/speaker_author_studio_1795431025222.jpg',
    imagePosition: '50% 18%',
  },
  {
    id: 'spk-14',
    slug: 'divya-chatterjee',
    name: 'Divya Chatterjee',
    designation: 'Head of Applied AI',
    organization: 'Sagar HealthTech',
    city: 'Hyderabad',
    category: 'Technology',
    background:
      'Leads clinical machine learning teams improving maternal diagnostics in tier-2 and tier-3 hospitals.',
    sessionTopic: 'Applied AI with Measurable Human Outcomes',
    image: '/src/assets/images/focus_women_tech_1795431025753.jpg',
    imagePosition: '66% 24%',
  },
  {
    id: 'spk-15',
    slug: 'farah-habib',
    name: 'Farah Habib',
    designation: 'Founder & Creative Lead',
    organization: 'Atelier Noor Architecture',
    city: 'Kochi',
    category: 'Entrepreneurs',
    background:
      'Architectural studio crafting climate-responsive coastal workspaces and civic cultural pavilions.',
    sessionTopic: 'Spatial Leadership & Sustainable Studio Growth',
    image: '/src/assets/images/speaker_founder_linen_1795431024654.jpg',
    imagePosition: '50% 18%',
  },
  {
    id: 'spk-16',
    slug: 'gayathri-balan',
    name: 'Gayathri Balan',
    designation: 'Managing Trustee',
    organization: 'Dakshin Women Angel Network',
    city: 'Chennai · Kochi',
    category: 'Finance & Culture',
    background:
      'Mobilized 220 women angel investors to back 48 early-stage startups led by diverse founders.',
    sessionTopic: 'Why Women Angels Reshape Venture Outcomes',
    image: '/src/assets/images/speaker_finance_tailored_1795431044597.jpg',
    imagePosition: '50% 22%',
  },
  {
    id: 'spk-17',
    slug: 'sujatha-mohan',
    name: 'Sujatha Mohan',
    designation: 'Commissioner, Rural Enterprise Mission',
    organization: 'Livelihood Collective',
    city: 'Thrissur',
    category: 'Policy & Impact',
    background:
      'Scaled cooperative procurement networks connecting 35,000 rural women producers to urban retail.',
    sessionTopic: 'Cooperative Scale in the Platform Economy',
    image: '/src/assets/images/speaker_policy_saree_1795431023736.jpg',
    imagePosition: '50% 14%',
  },
  {
    id: 'spk-18',
    slug: 'tara-thomas',
    name: 'Tara Thomas',
    designation: 'Founder',
    organization: 'Malabar Artisanal Roasters',
    city: 'Wayanad · Kochi',
    category: 'Entrepreneurs',
    background:
      'Specialty coffee entrepreneur building direct-trade partnerships with estates and modern café formats.',
    sessionTopic: 'Craft Beverage Brands Built for Global Shelves',
    image: '/src/assets/images/focus_culinary_enterprise_1795431024608.jpg',
    imagePosition: '50% 18%',
  },
  {
    id: 'spk-19',
    slug: 'sneha-kulkarni',
    name: 'Sneha Kulkarni',
    designation: 'Senior Investigative Editor',
    organization: 'The Southern Chronicle',
    city: 'Bengaluru',
    category: 'Policy & Impact',
    background:
      'Economic journalist chronicling South India’s changing labor markets, technology policy, and women’s wealth.',
    sessionTopic: 'Writing the Economic History We Are Living',
    image: '/src/assets/images/speaker_author_studio_1795431025222.jpg',
    imagePosition: '50% 16%',
  },
  {
    id: 'spk-20',
    slug: 'vidya-rajagopal',
    name: 'Vidya Rajagopal',
    designation: 'Partner, Enterprise Growth',
    organization: 'Kora Digital Ventures',
    city: 'Bengaluru',
    category: 'Technology',
    background:
      'Advises B2B SaaS founders on international go-to-market strategy and executive leadership transitions.',
    sessionTopic: 'Crossing the $10M ARR Inflection Point',
    image: '/src/assets/images/speaker_exec_navy_1795431023362.jpg',
    imagePosition: '50% 16%',
  },
];

export const PREVIOUS_EDITIONS: PreviousEdition[] = [
  {
    editionNumber: '03',
    editionLabel: '3rd Edition',
    year: '2025',
    theme: 'Architects of Tomorrow',
    location: 'Grand Hyatt Bolgatty · Kochi',
    attendees: '950+ Delegates · 24 Speakers',
    caption:
      'A landmark convergence of founders, technologists, and policy leaders examining capital access, AI readiness, and regional enterprise.',
    quote: 'When one woman claims room at the table, she redesigns the blueprint of the room itself.',
    image: '/src/assets/images/edition_legacy_keynote_1795431045299.jpg',
    imageAlt: 'Packed Kochi auditorium illuminated in deep ocean blue during 3rd Edition keynote',
  },
  {
    editionNumber: '02',
    editionLabel: '2nd Edition',
    year: '2024',
    theme: 'Voice, Venture & Visibility',
    location: 'Le Méridien Pavilion · Kochi',
    attendees: '750+ Delegates · 19 Speakers',
    caption:
      'Expanded into eight dedicated leadership salons—bridging homemakers launching first ventures with institutional investors and writers.',
    quote: 'Visibility is not vanity; it is economic infrastructure for the next generation.',
    image: '/src/assets/images/edition_legacy_panel_1795431043413.jpg',
    imageAlt: 'Four women leaders in a serene coastal terrace panel overlooking Kerala backwaters',
  },
  {
    editionNumber: '01',
    editionLabel: '1st Edition',
    year: '2023',
    theme: 'The Inaugural Spark',
    location: 'Centre for Performing Arts · Kochi',
    attendees: '500+ Delegates · 15 Speakers',
    caption:
      'Where Channeliam’s vision took physical form—gathering Kerala’s boldest women entrepreneurs, creators, and educators under one roof.',
    quote: 'Every movement begins as an intimate room full of people unwilling to wait.',
    image: '/src/assets/images/about_summit_dialogue_1795431024388.jpg',
    imageAlt: 'Inaugural edition roundtable dialogue with women founders in Kochi',
  },
];
