// Netlify Build Plugin — fix-mojibake
// Automatically fixes broken UTF-8 
// encoding on every Netlify deploy.
const fs = require('fs');
const path = require('path');

const REPLACEMENTS = [
  [/Ã¢ÂÂ/g, '\u2014'],
  [/Ã¢Â€Â"/g, '\u2014'],
  [/â€"/g, '\u2014'],
  [/Ã‚Â·/g, '\u00b7'],
  [/Â·/g, '\u00b7'],
  [/Ã¢Â†Â'/g, '\u2192'],
  [/â†'/g, '\u2192'],
  [/Ã¢ÂÂœ/g, '\u201c'],
  [/â€œ/g, '\u201c'],
  [/â€/g, '\u201d'],
  [/Ã¢ÂÂ™/g, '\u2019'],
  [/â€™/g, '\u2019'],
  [/âœ…/g, '\u2705'],
  [/Ã‚Â°/g, '\u00b0'],
  [/Ã‚Â®/g, '\u00ae'],
];

const EXTENSIONS = [
  '.html', '.js', '.css', 
  '.json', '.txt', '.xml'
];

const SKIP_DIRS = [
  'node_modules', '.git', '.netlify'
];

function shouldSkip(filePath) {
  return SKIP_DIRS.some(dir => 
    filePath.includes(path.sep + dir)
  );
}

function fixFile(filePath) {
  let content = fs.readFileSync(
    filePath, 'utf8'
  );
  let original = content;
  let fixCount = 0;
  for (const [pattern, replacement] 
    of REPLACEMENTS) {
    const before = content;
    content = content.replace(
      pattern, replacement
    );
    if (content !== before) {
      const matches = before.match(pattern);
      if (matches) fixCount += matches.length;
    }
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return fixCount;
  }
  return 0;
}

function walkDir(dir, fileList = []) {
  if (shouldSkip(dir)) return fileList;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath, fileList);
      } else if (EXTENSIONS.includes(
        path.extname(file).toLowerCase()
      )) {
        fileList.push(filePath);
      }
    }
  } catch (err) {}
  return fileList;
}

module.exports = {
  onPreBuild: async ({ utils }) => {
    console.log(
      'fix-mojibake: Scanning files...'
    );
    const publishDir = process.cwd();
    const files = walkDir(publishDir);
    let totalFiles = 0;
    let totalFixes = 0;
    const fixedFiles = [];
    for (const file of files) {
      try {
        const fixes = fixFile(file);
        if (fixes > 0) {
          totalFiles++;
          totalFixes += fixes;
          fixedFiles.push(
            path.relative(publishDir, file) + 
            ' — ' + fixes + ' fix(es)'
          );
        }
      } catch (err) {
        console.warn(
          'Could not process ' + file + 
          ': ' + err.message
        );
      }
    }
    if (totalFixes > 0) {
      console.log(
        'fix-mojibake: Fixed ' + totalFixes + 
        ' sequences in ' + totalFiles + 
        ' file(s):'
      );
      fixedFiles.forEach(
        f => console.log('  ' + f)
      );
    } else {
      console.log(
        'fix-mojibake: All files clean.'
      );
    }
  }
};
