/**
 * Tool 1 — Page Generator (Phase 8)
 * Composes a production-ready HTML STRING from structured inputs using the
 * existing design system. Builds STRUCTURE; humans write the prose in the
 * marked TODO slots. CTAs use the placeholder phone config (never hardcoded).
 * Internal utility: returns a string for human review. It does NOT write a
 * served page and makes no network calls.
 */
const { CATEGORIES, DESIGN, PAGE_TYPES, PHONE_PLACEHOLDER } = require('./config');
const { generateSchema } = require('./schema-generator');
const { generateMetadata } = require('./metadata-generator');
const { recommendLinks } = require('./internal-linking-assistant');

const SECTION_TITLES = {
  'hero': null, 'how-it-works': 'How it works', 'decisions': 'Key decisions (repair vs replace)',
  'costs': 'What it costs', 'maintenance': 'Maintenance basics', 'call-a-pro': 'When to call a pro',
  'overview': 'Overview', 'subtopics': 'What to know', 'range': 'Typical cost range',
  'factors': 'What affects cost', 'by-type': 'Cost by type', 'budget': 'Budgeting responsibly',
  'why': 'Why maintenance matters', 'tasks': 'Routine tasks', 'seasonal': 'Seasonal cadence',
  'diy-vs-pro': 'DIY vs. a professional', 'symptoms': 'Common symptoms',
  'causes': 'Likely causes (educational)', 'safe-checks': 'What you can safely check',
  'stop-call-pro': 'When to stop and call a pro', 'why-season': 'Why this season matters',
  'checklist': 'Checklist', 'schedule-pro': 'What to schedule with a pro',
  'local-context': 'Local context', 'local-cost': 'Typical local cost', 'choose-pro': 'Choosing a local pro',
  'what-it-does': 'What this tool does', 'tool-slot': 'The tool', 'transparency': 'How this is calculated',
  'related': 'Related Home Services', 'faq': 'Frequently asked questions', 'cta': null
};

function ctaModule(label) {
  // References the single placeholder config; falls back to in-page anchor.
  return [
    '  <div class="cta-module">',
    '    <a class="' + DESIGN.btnPrimary + '" data-call="' + PHONE_PLACEHOLDER + '" href="#get-help">',
    '      Talk to a ' + label + ' pro',
    '    </a>',
    '    <!-- data-call resolves to the approved number once installed; until then falls back to #get-help -->',
    '  </div>'
  ].join('\n');
}

function relatedBlock(related) {
  const cards = related.map(r =>
    '    <a class="' + DESIGN.fallbackCard + '" href="' + r.href + '">' +
    '<strong>' + r.anchor + '</strong><span>' + r.reason + '</span></a>'
  ).join('\n');
  return [
    '  <section class="' + DESIGN.info + '" aria-labelledby="related-h">',
    '    <h2 id="related-h">Related Home Services</h2>',
    '    <div class="' + DESIGN.fallbackGrid + '">',
    cards,
    '    </div>',
    '  </section>'
  ].join('\n');
}

function sectionStub(key, label) {
  if (key === 'hero') {
    return [
      '  <section class="' + DESIGN.hero + '">',
      '    <p class="' + DESIGN.kicker + '">' + label + '</p>',
      '    <h1>{{TITLE}}</h1>',
      '    <p class="' + DESIGN.lede + '"><!-- TODO: editorial lede --></p>',
      '  </section>'
    ].join('\n');
  }
  if (key === 'faq') {
    return [
      '  <section class="' + DESIGN.info + '" aria-labelledby="faq-h">',
      '    <h2 id="faq-h">Frequently asked questions</h2>',
      '    <!-- TODO: insert generated FAQ items; visible text MUST match FAQ schema -->',
      '  </section>'
    ].join('\n');
  }
  if (key === 'cta') return ctaModule(label);
  const title = SECTION_TITLES[key] || key;
  return [
    '  <section class="' + DESIGN.deepdive + '">',
    '    <h2>' + title + '</h2>',
    '    <!-- TODO: editorial draft for "' + title + '" -->',
    '  </section>'
  ].join('\n');
}

/**
 * cfg = { category, pageType, title, metaDescription, targetKeyword,
 *         supportingKeywords[], relatedServices[], cta, schema, slug?,
 *         faqs?, steps?, imageUrl?, imageAlt? }
 * Returns { html, meta, schema, links, warnings[] }
 */
function generatePage(cfg) {
  const warnings = [];
  const label = CATEGORIES[cfg.category] || cfg.category;
  const spec = PAGE_TYPES[cfg.pageType];
  if (!spec) throw new Error('Unknown pageType: ' + cfg.pageType);
  const slug = cfg.slug || cfg.pageType;

  // Tool 3 — metadata
  const md = generateMetadata({
    category: cfg.category, pageType: cfg.pageType, title: cfg.title,
    description: cfg.metaDescription, slug, imageUrl: cfg.imageUrl, imageAlt: cfg.imageAlt
  });
  warnings.push(...md.warnings);

  // Tool 2 — schema
  const schema = generateSchema({
    category: cfg.category, label, pageType: cfg.pageType, title: cfg.title,
    description: cfg.metaDescription, slug, imageUrl: cfg.imageUrl,
    faqs: cfg.faqs, steps: cfg.steps
  });

  // Tool 4 — links
  const links = recommendLinks({ category: cfg.category, pageType: cfg.pageType, title: cfg.title, slug });
  const related = (cfg.relatedServices && cfg.relatedServices.length)
    ? cfg.relatedServices.map(s => links.relatedServices.find(r => r.href.endsWith('/' + s)) || { anchor: s, href: 'https://consumersupporthelp.com/' + s, reason: '' })
    : links.relatedServices;

  // Build sections per page-type spec
  const bodyParts = spec.sections.map(key => {
    if (key === 'related') return relatedBlock(related);
    return sectionStub(key, label);
  });

  // Keyword comment for the editor (not stuffed into copy)
  const kwComment = '<!-- target: ' + (cfg.targetKeyword || '') +
    ' | supporting: ' + ((cfg.supportingKeywords || []).join(', ')) + ' -->';

  const html = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  ' + md.headFragment.split('\n').join('\n  '),
    '  ' + kwComment,
    '  <link rel="stylesheet" href="/assets/style.css">',
    '  ' + schema.scriptTags.split('\n').join('\n  '),
    '</head>',
    '<body>',
    '  <!-- header include -->',
    '  <main class="' + DESIGN.container + '">',
    bodyParts.join('\n\n').split('\n').join('\n  '),
    '',
    '    <section class="' + DESIGN.disclaimer + '">',
    '      <!-- required disclaimer text -->',
    '    </section>',
    '  </main>',
    '  <a class="' + DESIGN.stickyCall + '" data-call="' + PHONE_PLACEHOLDER + '" href="#get-help">Call a pro</a>',
    '  <!-- footer include -->',
    '</body>',
    '</html>'
  ].join('\n').replace(/\{\{TITLE\}\}/g, cfg.title || '');

  warnings.push('STRUCTURE ONLY: fill every TODO with human-written editorial copy before QA.');
  return { html, meta: md.meta, schema: schema.blocks, links, warnings };
}

module.exports = { generatePage };
