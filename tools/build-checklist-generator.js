/**
 * Tool 6 — Build Checklist Generator (Phase 8)
 * Produces the implementation report after a build, mirroring the report
 * format used in Phases 3-7. Internal utility; emits a Markdown string.
 */
const { PHONE_PLACEHOLDER } = require('./config');

/**
 * cfg = {
 *   page: { category, pageType, title, path },
 *   files: [ '...' ],
 *   commits: [ { hash, message } ],
 *   qa: { pass, errors:[], warnings:[], summary },   // from qa-validator
 *   phoneInstalled: bool, licensedImages: bool, complianceSignedOff: bool,
 *   qaSignedOff: bool, humanProseComplete: bool
 * }
 */
function generateReport(cfg) {
  const p = cfg.page || {};
  const lines = [];
  const tick = b => (b ? 'done' : 'PENDING');

  lines.push('# Build Report — ' + (p.title || '(untitled)'));
  lines.push('');
  lines.push('- **Category:** ' + (p.category || '?'));
  lines.push('- **Page type:** ' + (p.pageType || '?'));
  lines.push('- **Path:** ' + (p.path || '(not yet placed)'));
  lines.push('');

  lines.push('## Files changed');
  (cfg.files || []).forEach(f => lines.push('- ' + f));
  if (!cfg.files || !cfg.files.length) lines.push('- (none recorded)');
  lines.push('');

  lines.push('## Commits');
  (cfg.commits || []).forEach(c => lines.push('- \`' + (c.hash || 'TBD') + '\` ' + (c.message || '')));
  if (!cfg.commits || !cfg.commits.length) lines.push('- (none recorded)');
  lines.push('');

  lines.push('## QA (automated pre-screen)');
  if (cfg.qa) {
    lines.push('- ' + cfg.qa.summary);
    (cfg.qa.errors || []).forEach(e => lines.push('  - ERROR: ' + e));
    (cfg.qa.warnings || []).forEach(w => lines.push('  - warning: ' + w));
  } else lines.push('- (validator not run)');
  lines.push('');

  lines.push('## Human review gates');
  lines.push('- Editorial prose complete: ' + tick(cfg.humanProseComplete));
  lines.push('- EEAT/Helpful Content resolved: (editor confirms)');
  lines.push('- Compliance sign-off: ' + tick(cfg.complianceSignedOff));
  lines.push('- QA owner sign-off: ' + tick(cfg.qaSignedOff));
  lines.push('');

  // Launch blockers
  const blockers = [];
  if (cfg.qa && !cfg.qa.pass) blockers.push('Automated QA has errors (see above).');
  if (!cfg.humanProseComplete) blockers.push('Editorial prose TODO slots not filled.');
  if (!cfg.complianceSignedOff) blockers.push('Compliance has not signed off (mandatory).');
  if (!cfg.qaSignedOff) blockers.push('QA owner has not signed off.');
  if (!cfg.phoneInstalled) blockers.push('Approved phone number not installed (still ' + PHONE_PLACEHOLDER + ').');
  if (!cfg.licensedImages) blockers.push('Licensed WebP images not yet added.');

  lines.push('## Launch blockers');
  if (blockers.length) blockers.forEach(b => lines.push('- [ ] ' + b));
  else lines.push('- None. Page is clear for the final publish decision.');
  lines.push('');

  lines.push('## Remaining tasks');
  if (blockers.length) lines.push('Resolve each launch blocker above, then route to the publisher for the final go/hold decision (Playbook Stage 11).');
  else lines.push('Route to publisher for final go decision.');

  return lines.join('\n');
}

module.exports = { generateReport };
