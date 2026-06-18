/**
 * Tool 3 — Metadata Generator (Phase 8)
 * Produces title, description, canonical, Open Graph, Twitter, image metadata
 * per publishing standards. Flags hype words. Internal utility, no network.
 */
const { PROHIBITED } = require('./config');
const SITE = 'https://consumersupporthelp.com';
const DEFAULT_OG_IMAGE = SITE + '/images/og-default.webp'; // licensed asset, placeholder name

function clamp(str, max) {
  if (!str) return '';
  str = String(str).trim().replace(/\s+/g, ' ');
  return str.length <= max ? str : str.slice(0, max - 1).trimEnd() + '\u2026';
}

function findHype(text) {
  const lower = (text || '').toLowerCase();
  return PROHIBITED.filter(w => lower.includes(w.toLowerCase()));
}

/**
 * cfg = { category, pageType, title, description, slug, imageUrl, imageAlt }
 * Returns { meta, headFragment, warnings[] }
 */
function generateMetadata(cfg) {
  const warnings = [];
  const canonical = SITE + '/' + cfg.category + (cfg.pageType === 'pillar' ? '' : '/' + cfg.slug);
  const title = clamp(cfg.title, 60);
  const description = clamp(cfg.description, 155);
  if (cfg.title && cfg.title.length > 60) warnings.push('Title exceeded 60 chars; truncated.');
  if (cfg.description && cfg.description.length > 155) warnings.push('Description exceeded 155 chars; truncated.');

  const hype = findHype(title + ' ' + description);
  if (hype.length) warnings.push('Hype/prohibited words detected: ' + hype.join(', '));

  const image = cfg.imageUrl || DEFAULT_OG_IMAGE;
  const imageAlt = cfg.imageAlt || cfg.title || '';

  const meta = {
    title, description, canonical,
    og: {
      'og:type': 'article', 'og:title': title, 'og:description': description,
      'og:url': canonical, 'og:image': image, 'og:site_name': 'ConsumersSupportHelp'
    },
    twitter: {
      'twitter:card': 'summary_large_image', 'twitter:title': title,
      'twitter:description': description, 'twitter:image': image
    },
    image: { url: image, alt: imageAlt, format: 'webp' }
  };

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const lines = [];
  lines.push('<title>' + esc(title) + '</title>');
  lines.push('<meta name="description" content="' + esc(description) + '">');
  lines.push('<link rel="canonical" href="' + esc(canonical) + '">');
  Object.entries(meta.og).forEach(([k, v]) => lines.push('<meta property="' + k + '" content="' + esc(v) + '">'));
  Object.entries(meta.twitter).forEach(([k, v]) => lines.push('<meta name="' + k + '" content="' + esc(v) + '">'));
  const headFragment = lines.join('\n');

  return { meta, headFragment, warnings };
}

module.exports = { generateMetadata, clamp, findHype };
