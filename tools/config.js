/**
 * Home Services Content Factory — shared config (Phase 8)
 * Internal developer utility. Not production code, not served as a page,
 * no dependencies, no network calls. Conforms to docs/HOME-SERVICES-*.md.
 */

// Single placeholder phone config. NEVER hardcode a real number here.
// All generated CTAs reference this token; the real number is installed
// once (in production hvac.html / per-category config) by a human.
const PHONE_PLACEHOLDER = 'REPLACE_WITH_APPROVED_NUMBER';

// The 16 Home Services categories (slug -> display label).
const CATEGORIES = {
  'hvac': 'Heating & Cooling (HVAC)',
  'plumbing': 'Plumbing',
  'electrical': 'Electrical',
  'roofing': 'Roofing',
  'windows': 'Windows',
  'gutters': 'Gutters',
  'water-damage': 'Water Damage',
  'pest-control': 'Pest Control',
  'home-security': 'Home Security',
  'insulation': 'Insulation',
  'solar': 'Solar',
  'flooring': 'Flooring',
  'kitchen-remodeling': 'Kitchen Remodeling',
  'bathroom-remodeling': 'Bathroom Remodeling',
  'garage-doors': 'Garage Doors',
  'foundation-repair': 'Foundation Repair',
  'appliance-repair': 'Appliance Repair'
};

// Existing design-system class names (do NOT invent new ones).
const DESIGN = {
  hero: 'fe-hero',
  info: 'fe-info',
  infoGrid: 'fe-info-grid',
  infoCard: 'fe-info-card',
  deepdive: 'fe-deepdive',
  fallbackGrid: 'fe-fallback-grid',
  fallbackCard: 'fe-fallback-card',
  disclaimer: 'fe-disclaimer',
  container: 'container',
  kicker: 'kicker',
  lede: 'lede',
  stickyCall: 'sticky-call',
  btnPrimary: 'btn btn-primary'
};

// Page types -> required sections (used by generator + validator).
const PAGE_TYPES = {
  'pillar':        { sections: ['hero','how-it-works','decisions','costs','maintenance','call-a-pro','related','faq'], words: [1800,3000], faq: [5,8] },
  'supporting':    { sections: ['hero','overview','subtopics','call-a-pro','related'],                                 words: [1000,1800], faq: [0,5] },
  'cost-guide':    { sections: ['hero','range','factors','by-type','budget','related','faq'],                          words: [1200,2000], faq: [4,6] },
  'maintenance':   { sections: ['hero','why','tasks','seasonal','diy-vs-pro','related','faq'],                         words: [900,1600],  faq: [3,5] },
  'troubleshooting':{ sections: ['hero','symptoms','causes','safe-checks','stop-call-pro','related','faq'],            words: [1000,1800], faq: [4,6] },
  'seasonal':      { sections: ['hero','why-season','checklist','schedule-pro','related'],                             words: [700,1300],  faq: [0,4] },
  'faq-page':      { sections: ['hero','faq','cta'],                                                                   words: [0,0],       faq: [8,20] },
  'local':         { sections: ['hero','local-context','local-cost','choose-pro','related','faq'],                     words: [700,1400],  faq: [3,5] },
  'tool-landing':  { sections: ['hero','what-it-does','tool-slot','transparency','related','faq'],                     words: [500,1000],  faq: [3,5] }
};

// Canonical cross-service relationship map (Spec §4.1). Flagship-first.
const RELATIONSHIPS = {
  'hvac': ['windows','home-security','insulation'],
  'windows': ['hvac','insulation','solar'],
  'roofing': ['gutters','insulation','water-damage'],
  'gutters': ['roofing','water-damage','foundation-repair'],
  'water-damage': ['plumbing','hvac','foundation-repair'],
  'plumbing': ['water-damage','appliance-repair','bathroom-remodeling'],
  'electrical': ['home-security','solar','appliance-repair'],
  'home-security': ['hvac','electrical','garage-doors'],
  'pest-control': ['insulation','roofing','water-damage'],
  'insulation': ['hvac','windows','roofing'],
  'solar': ['electrical','windows','roofing'],
  'flooring': ['water-damage','bathroom-remodeling','kitchen-remodeling'],
  'kitchen-remodeling': ['plumbing','electrical','appliance-repair','flooring'],
  'bathroom-remodeling': ['plumbing','flooring','water-damage'],
  'garage-doors': ['home-security','electrical','insulation'],
  'foundation-repair': ['gutters','water-damage','insulation'],
  'appliance-repair': ['plumbing','electrical','kitchen-remodeling']
};

// Why-link copy hints (editor refines). Keyed "from->to".
const LINK_REASONS = {
  'windows->hvac': 'how windows affect heating and cooling load',
  'roofing->gutters': 'how roofing and drainage work together',
  'gutters->water-damage': 'how poor drainage leads to moisture problems',
  'water-damage->plumbing': 'how pipe leaks cause water damage',
  'pest-control->insulation': 'how rodents damage insulation and ductwork',
  'home-security->hvac': 'smart thermostats and smart-home integration'
};

// Words/phrases that must NOT appear (compliance pre-screen).
const PROHIBITED = [
  'free', 'guaranteed', 'guarantee', 'best in', '#1', 'number one',
  'act now', 'limited time', 'instant', 'risk-free', 'miracle',
  'cheapest', 'lowest price ever', 'no risk', 'hurry'
];

// The platform flagship (listed first in Related blocks when relevant).
const FLAGSHIP = 'hvac';

module.exports = {
  PHONE_PLACEHOLDER, CATEGORIES, DESIGN, PAGE_TYPES,
  RELATIONSHIPS, LINK_REASONS, PROHIBITED, FLAGSHIP
};
