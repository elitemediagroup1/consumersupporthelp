/**
 * Tool 4 — Internal Linking Assistant (Phase 8)
 * Given category + pageType, recommends incoming/outgoing links, related
 * services, and breadcrumb position from the canonical relationship map
 * (Spec section 4.1). Returns RECOMMENDATIONS for human confirmation.
 * Internal utility, no network.
 */
const { CATEGORIES, RELATIONSHIPS, LINK_REASONS, FLAGSHIP } = require('./config');
const SITE = 'https://consumersupporthelp.com';

function label(cat) { return CATEGORIES[cat] || cat; }
function url(cat) { return SITE + '/' + cat; }

function reason(from, to) {
  return LINK_REASONS[from + '->' + to] || ('how ' + label(from) + ' relates to ' + label(to));
}

// Order siblings so the flagship (hvac) leads when present.
function flagshipFirst(list) {
  const arr = list.slice();
  arr.sort((a, b) => (a === FLAGSHIP ? -1 : b === FLAGSHIP ? 1 : 0));
  return arr;
}

/**
 * cfg = { category, pageType, title?, slug? }
 * Returns {
 *   breadcrumb:[...], outgoing:{pillarUpLink, laterals:[]},
 *   incoming:[], relatedServices:[], notes:[]
 * }
 */
function recommendLinks(cfg) {
  const cat = cfg.category;
  const siblings = flagshipFirst(RELATIONSHIPS[cat] || []);
  const notes = [];

  // Breadcrumb position
  const breadcrumb = [
    { name: 'Home', url: SITE + '/' },
    { name: 'Home Services', url: SITE + '/home-services' },
    { name: label(cat), url: url(cat) }
  ];
  if (cfg.pageType !== 'pillar' && cfg.title) {
    breadcrumb.push({ name: cfg.title, url: url(cat) + '/' + (cfg.slug || '') });
  }

  // Outgoing links
  const outgoing = {
    pillarUpLink: cfg.pageType === 'pillar'
      ? null
      : { anchor: label(cat) + ' Help Center', href: url(cat), note: 'up-link to category pillar' },
    laterals: siblings.slice(0, 3).map(s => ({
      anchor: label(s), href: url(s), reason: reason(cat, s)
    }))
  };
  if (cfg.pageType === 'pillar') notes.push('Pillar links DOWN to its supporting guides (added as they are built).');

  // Related Services block (3-5, flagship-first)
  const relatedServices = siblings.slice(0, 5).map(s => ({
    anchor: label(s), href: url(s), reason: reason(cat, s),
    flagship: s === FLAGSHIP
  }));
  if (relatedServices.length < 3) notes.push('Fewer than 3 siblings in map; editor should add relevant ones.');

  // Incoming links: any category whose map references this one should point here.
  const incoming = Object.keys(RELATIONSHIPS)
    .filter(other => other !== cat && RELATIONSHIPS[other].includes(cat))
    .map(other => ({
      fromCategory: other, fromLabel: label(other),
      suggestedAnchor: label(cat), reason: reason(other, cat)
    }));

  notes.push('All links must be real crawlable <a href> anchors (not JS-only). Confirm each is genuinely helpful before adding.');

  return { breadcrumb, outgoing, incoming, relatedServices, notes };
}

module.exports = { recommendLinks, flagshipFirst, reason };
