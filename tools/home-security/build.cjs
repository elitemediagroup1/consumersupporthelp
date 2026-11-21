const fs = require('node:fs');
const path = require('node:path');
const { areas, excluded } = require('./coverage.json');

const root = path.resolve(__dirname, '../..');
const folder = path.join(root, 'home-security');
const hub = path.join(root, 'home-security.html');
const sitemap = path.join(root, 'sitemap.xml');
const origin = 'https://consumersupporthelp.com';
const marker = '<!-- Generated from tools/home-security/coverage.json -->';
const url = slug => '/home-security/' + slug + '/';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
function replaceRegion(file, label, content) {
  const source = fs.readFileSync(file, 'utf8');
  const start = '<!-- ' + label + ' -->';
  const end = '<!-- /' + label + ' -->';
  const a = source.indexOf(start);
  const b = source.indexOf(end);
  if (a < 0 || b <= a) throw new Error('Missing ' + label + ' in ' + file);
  fs.writeFileSync(file, source.slice(0, a + start.length) + '\n' + content + '\n' + source.slice(b));
}

const links = areas.map(area => '<a class="pill pill-link" href="' + url(area.slug) + '">' + escape(area.name) + '</a>');
replaceRegion(hub, 'home-security-directory', links.join('\n'));
replaceRegion(hub, 'home-security-exclusions', excluded.join(', ') + '.');
replaceRegion(hub, 'home-security-schema', '<script type="application/ld+json">' + JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Service', name: 'Home Security System Help',
  description: 'Home security planning guidance and homeowner callback options.',
  areaServed: areas.map(area => ({ '@type': 'AdministrativeArea', name: area.name })),
  provider: { '@type': 'Organization', name: 'Consumer Support Help' }
}) + '</script>');

for (const area of areas) {
  const dest = path.join(folder, area.slug, 'index.html');
  // Retain established state hubs with local articles and city navigation.
  if (fs.existsSync(dest) && !fs.readFileSync(dest, 'utf8').includes(marker)) continue;
  const template = fs.readFileSync(path.join(__dirname, 'state.template'), 'utf8');
  const values = {
    marker, name: escape(area.name), topic: escape(area.topic), tip: escape(area.tip),
    canonical: origin + url(area.slug),
    intro: 'Homeowners can request information about monitored alarms, camera installation and current offers. The provider confirms availability for your address.',
    action: '<a class="btn btn-primary" href="/home-security-quote/?state=' + area.code + '">Get my free quote</a><p>After you submit your contact details, the provider may call or text about home security.</p>'
  };
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in values)) throw new Error('Unknown template field: ' + key);
    return values[key];
  }));
}
const quotePage = path.join(root, 'home-security-quote/index.html');
replaceRegion(quotePage, 'home-security-state-options', areas.map(a => '          <option value="' + a.code + '">' + escape(a.name) + '</option>').join('\n'));
const locations = [];
for (const area of areas) {
  const statePath = url(area.slug);
  locations.push(statePath);
  for (const city of fs.readdirSync(path.join(folder, area.slug), { withFileTypes: true })) {
    if (city.isDirectory() && fs.existsSync(path.join(folder, area.slug, city.name, 'index.html'))) {
      locations.push(statePath + city.name + '/');
    }
  }
}
replaceRegion(sitemap, 'home-security-locations', locations.map(p => '  <url><loc>' + origin + p + '</loc></url>').join('\n'));
