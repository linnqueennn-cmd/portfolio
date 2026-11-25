// Copy only public runtime files. No bundling, transcoding or visual changes.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
if (process.argv.includes('--require-resume') && !fs.existsSync(path.join(root, 'assets/cv-public.pdf'))) {
  throw Error('Add a reviewed assets/cv-public.pdf before publishing; the private assets/cv.pdf must stay local.');
}
const files = [
  'index.html', '.nojekyll',
  'style.css', 'home.css', 'work.css', 'about.css', 'remaining.css', 'typography.css',
  'home.js', 'work.js', 'about.js', 'remaining-content.js', 'remaining.js', 'site.js',
  'crystal.js', 'grid-preview.js',
  'service-collages.js',
  ...['d18d9','48a79','a199c','1c27b','f4b28','35773','c955d','bd3f5',
    '47ff9','51723','fe849','9f964','c0ea7','36c2c','00f34','bd4ed','350b2','bdebd']
    .map(name => `assets/services/${name}.webp`),
  'assets/services/8e6c1.svg',
  'case-study.js', 'case-roma.js', 'case-choreo.js', 'case-dixon.js', 'case-study.css',
  'case-vinyl.js', 'case-vinyl.css',
  ...Array.from({length: 8}, (_, i) => `assets/cases/vinyl/${String(i + 1).padStart(2, '0')}.webp`),
  ...Array.from({length: 14}, (_, i) => `assets/cases/dixon/page-${String(i + 1).padStart(2, '0')}.webp`),
  'case-zen.js', 'case-zen.css',
  ...['cover_before_after.webp', 'source_filters.webp', 'source_appearance.webp',
    'source_summary.webp', 'persona_anna.png', 'auth_login.webp',
    ...Array.from({length: 15}, (_, i) => `before_${String(i + 1).padStart(2, '0')}.webp`),
    ...Array.from({length: 5}, (_, i) => `after_${String(i + 1).padStart(2, '0')}.webp`)
  ].map(name => `assets/cases/zen/${name}`),
  ...['01_cover', '02_before', '03_after', '04_wireframe_a', '04_wireframe_b',
    '05_palette', '06_hero', '07_vacancies', '08_team', '09_final', '11_month',
    '12_year', '13_old_form'].map(name => `assets/cases/roma/${name}.webp`),
  'assets/cases/roma/10_mobile.mp4',
  'assets/cases/roma/10_mobile.jpg',
  ...['brand', 'retail', 'roma', 'vinyl', 'social'].map(name => `assets/${name}.jpg`),
  'assets/about/portrait.png',
  'assets/home/button-glow.svg',
  'assets/home/portrait-6221.json',
  ...Array.from({length: 7}, (_, index) => `assets/home/portrait-6221-${index}.webp`),
  ...['download', 'gem', 'left-shadow', 'right-shadow', 'mobile-download',
    'mobile-left-shadow', 'mobile-menu', 'mobile-right-shadow', 'mobile-status',
    'resume', 'status', 'portrait', 'ubuntu-sans-mono', 'LICENCE',
    'portrait-6221', 'portrait-walk-detail', 'portrait-walk-6207-clean',
    'portrait-walk-6209-soft', 'portrait-walk-6211', 'portrait-walk-6211-transparent',
    'portrait-walk-6215', 'plumbob-reflective', 'plumbob-reflections'].map(name => {
      const extension = name === 'gem' || name === 'portrait' ? 'png'
        : name === 'ubuntu-sans-mono' ? 'ttf' : name === 'LICENCE' ? 'txt'
        : name.startsWith('portrait-') ? 'webm'
        : name === 'plumbob-reflective' ? 'glb' : name === 'plumbob-reflections' ? 'hdr' : 'svg';
      return `assets/home/${name}.${extension}`;
    }),
  ...['roma', 'vinyl', 'zen', 'choreo'].map(name => `assets/work/${name}.gif`),
  'assets/work/left.svg', 'assets/work/right.svg',
  ...['three.module.js', 'three.core.js', 'GLTFLoader.js', 'HDRLoader.js',
    'BufferGeometryUtils.js', 'LICENSE'].map(name => `assets/vendor/three/${name}`)
];

// A separately reviewed public résumé may be added later. Never copy private cv.pdf.
if (fs.existsSync(path.join(root, 'assets/cv-public.pdf'))) files.push('assets/cv-public.pdf');
for (const file of files) {
  let current = root;
  for (const segment of file.split('/')) {
    if (!fs.readdirSync(current).includes(segment)) throw Error(`Missing file or wrong case: ${file}`);
    current = path.join(current, segment);
    if (fs.lstatSync(current).isSymbolicLink()) throw Error(`Symlink not allowed: ${file}`);
  }
  if (fs.statSync(current).size >= 100 * 1024 * 1024) throw Error(`File exceeds GitHub limit: ${file}`);
}
// Validate the destination before cleaning the generated directory.
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw Error('Unsafe output path');
fs.rmSync(output, {recursive: true, force: true});
let total = 0;
for (const file of files) {
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.copyFileSync(path.join(root, file), destination);
  total += fs.statSync(destination).size;
}
if (files.includes('assets/cv-public.pdf')) {
  // Preserve the site's existing download URL without exposing the private file.
  fs.copyFileSync(path.join(output, 'assets/cv-public.pdf'), path.join(output, 'assets/cv.pdf'));
} else {
  console.warn('PUBLIC RESUME MISSING: assets/cv.pdf is private and excluded. Add a reviewed assets/cv-public.pdf to enable public downloads.');
}
console.log(`Prepared ${files.length} files (${(total / 1024 / 1024).toFixed(1)} MiB) in dist/`);
