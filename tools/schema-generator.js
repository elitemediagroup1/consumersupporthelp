/**
 * Tool 2 — Schema Generator (Phase 8)
 * Emits JSON-LD by page type. Schema text is derived from supplied content
 * so it MATCHES visible text. Never emits Review/AggregateRating.
 * Internal utility: returns objects/strings for human review. No network calls.
 */
const SITE = 'https://consumersupporthelp.com';
const ORG_NAME = 'ConsumersSupportHelp';

function breadcrumb(category, label, pageType, title, slug) {
  const items = [{ name: 'Home', url: SITE + '/' }, { name: 'Home Services', url: SITE + '/home-services' }];
  items.push({ name: label, url: SITE + '/' + category });
  if (pageType !== 'pillar') items.push({ name: title, url: SITE + '/' + category + '/' + slug });
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: it.url
    }))
  };
}

function article(title, description, url, imageUrl, dateModified) {
  return {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: title, description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: imageUrl ? { '@type': 'ImageObject', url: imageUrl } : undefined,
    author: { '@type': 'Organization', name: ORG_NAME },
    publisher: { '@type': 'Organization', name: ORG_NAME },
    dateModified: dateModified || new Date().toISOString().slice(0, 10)
  };
}

// faqs: [{question, answer}] — visible text must equal these strings.
function faqPage(faqs) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null; // only when real FAQs
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question', name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  };
}

// steps: [{name, text}] — ONLY for genuine step-by-step instructional content.
function howTo(name, steps) {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return {
    '@context': 'https://schema.org', '@type': 'HowTo', name,
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text }))
  };
}

function service(label, description, url) {
  return {
    '@context': 'https://schema.org', '@type': 'Service',
    serviceType: label, description,
    provider: { '@type': 'Organization', name: ORG_NAME },
    areaServed: 'US', url
  };
}

/**
 * Build all schema appropriate to a page type.
 * cfg = { category, label, pageType, title, description, slug, imageUrl,
 *         faqs?, steps?, dateModified? }
 * Returns { blocks: [...], scriptTags: '<script type="application/ld+json">...' }
 */
function generateSchema(cfg) {
  const url = SITE + '/' + cfg.category + (cfg.pageType === 'pillar' ? '' : '/' + cfg.slug);
  const blocks = [];
  blocks.push(breadcrumb(cfg.category, cfg.label, cfg.pageType, cfg.title, cfg.slug));

  if (cfg.pageType === 'faq-page') {
    const fp = faqPage(cfg.faqs); if (fp) blocks.push(fp);
  } else if (cfg.pageType === 'tool-landing') {
    blocks.push(service(cfg.label, cfg.description, url));
    const fp = faqPage(cfg.faqs); if (fp) blocks.push(fp);
  } else {
    blocks.push(article(cfg.title, cfg.description, url, cfg.imageUrl, cfg.dateModified));
    const fp = faqPage(cfg.faqs); if (fp) blocks.push(fp);
    const ht = howTo(cfg.title, cfg.steps); if (ht) blocks.push(ht); // only if real steps
  }

  // strip undefined keys for clean output
  const clean = blocks.map(b => JSON.parse(JSON.stringify(b)));
  const scriptTags = clean
    .map(b => '<script type="application/ld+json">\n' + JSON.stringify(b, null, 2) + '\n</script>')
    .join('\n');
  return { blocks: clean, scriptTags };
}

module.exports = { generateSchema, breadcrumb, article, faqPage, howTo, service };
