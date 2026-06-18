/**
 * Tool 5 — QA Validator (Phase 8)
 * Static checks on an HTML string against the publishing checklist.
 * Returns { pass, errors[], warnings[], summary }. Regex-based (no DOM/deps).
 * A clean run is NECESSARY but NOT SUFFICIENT — human QA still signs.
 */
const { PAGE_TYPES, PROHIBITED, PHONE_PLACEHOLDER } = require('./config');

function countMatches(html, re) { return (html.match(re) || []).length; }

function headingHierarchyOk(html) {
  const levels = (html.match(/<h([1-6])\b/gi) || []).map(t => parseInt(t.match(/h([1-6])/i)[1], 10));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) return false; // skipped a level going deeper
  }
  return true;
}

/**
 * validate(html, opts) ; opts = { pageType, requireImages? }
 */
function validate(html, opts) {
  opts = opts || {};
  const errors = [], warnings = [];
  const spec = PAGE_TYPES[opts.pageType] || null;

  // 1. H1 count
  const h1 = countMatches(html, /<h1\b/gi);
  if (h1 !== 1) errors.push('H1 count is ' + h1 + ' (expected exactly 1).');

  // 2. schema present
  if (!/application\/ld\+json/.test(html)) errors.push('No JSON-LD schema found.');

  // 3. missing alt text
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const missingAlt = imgs.filter(t => !/\balt\s*=/.test(t)).length;
  if (missingAlt > 0) errors.push(missingAlt + ' <img> missing alt attribute.');

  // 4. CTA placement + uses placeholder config (no hardcoded number)
  if (!/data-call=/.test(html)) errors.push('No click-to-call CTA ([data-call]) found.');
  if (!html.includes(PHONE_PLACEHOLDER)) warnings.push('Placeholder phone config token not present (ok only if approved number installed).');
  // crude hardcoded-number detection: tel: link or formatted phone literals
  if (/tel:\+?\d{7,}/.test(html) || /\(\d{3}\)\s*\d{3}-\d{4}/.test(html)) {
    errors.push('Possible hardcoded phone number detected — CTAs must use the single config.');
  }

  // 5. FAQ count vs page-type range
  const faqCount = countMatches(html, /itemprop="name"|"@type":\s*"Question"/g);
  if (spec && spec.faq) {
    const [lo, hi] = spec.faq;
    if (faqCount < lo) warnings.push('FAQ count ' + faqCount + ' below recommended ' + lo + '.');
    if (hi && faqCount > hi) warnings.push('FAQ count ' + faqCount + ' above recommended ' + hi + '.');
  }

  // 6. heading hierarchy
  if (!headingHierarchyOk(html)) errors.push('Heading hierarchy skips a level.');

  // 7. required sections per page type
  if (spec) {
    if (!/Related Home Services/i.test(html) && spec.sections.includes('related'))
      errors.push('Missing "Related Home Services" section.');
    if (spec.sections.includes('faq') && !/frequently asked questions/i.test(html))
      warnings.push('FAQ section heading not found.');
  } else {
    warnings.push('Unknown pageType; section checks skipped.');
  }

  // 8. placeholder phone config intact (already covered in #4 warnings)

  // 9. prohibited words
  const lower = html.toLowerCase();
  const hits = PROHIBITED.filter(w => new RegExp('\\b' + w.toLowerCase().replace(/[.*+?^$()|[\]\\]/g, '\\$&') + '\\b').test(lower));
  if (hits.length) errors.push('Prohibited words found: ' + hits.join(', '));

  // 10. image filenames (WebP, responsive sizing hints)
  imgs.forEach(t => {
    const src = (t.match(/src\s*=\s*"([^"]+)"/) || [])[1] || '';
    if (src && !/\.webp(\?|$)/i.test(src)) warnings.push('Image not WebP: ' + src);
    if (src && !/(\b\d{3,4}\b|srcset)/.test(t)) warnings.push('Image may lack responsive sizing: ' + src);
  });

  // 11. internal links (pillar up-link / related block presence)
  const internalLinks = (html.match(/href="https:\/\/consumersupporthelp\.com\/[^"#][^"]*"/g) || []).length
    + (html.match(/href="\/[a-z][^"]*"/g) || []).length;
  if (internalLinks < 2) warnings.push('Few internal links detected (' + internalLinks + '); confirm pillar up-link + related block.');

  const pass = errors.length === 0;
  const summary = pass
    ? 'PASS (static): ' + warnings.length + ' warning(s). Human QA sign-off still required.'
    : 'FAIL (static): ' + errors.length + ' error(s), ' + warnings.length + ' warning(s).';
  return { pass, errors, warnings, summary };
}

module.exports = { validate, headingHierarchyOk };
