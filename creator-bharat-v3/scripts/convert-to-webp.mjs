/**
 * 🖼️ CreatorBharat — WebP Image Converter
 * Converts all PNG/JPG files in public/ to WebP format.
 * Run: node scripts/convert-to-webp.mjs
 * 
 * After running, update image references in JSX files:
 *   .png → .webp  and  .jpg → .webp
 */

import { execSync } from 'child_process';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

// Images to SKIP (favicons, PWA icons — need to stay as PNG)
const SKIP = new Set([
  'favicon-16x16.png',
  'favicon-32x32.png', 
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
]);

// Duplicate files to DELETE (same content, different names)
const DUPLICATES_TO_REMOVE = [
  'cb_showcase_v10.png',  // same size as v11
  'cb_showcase_v12.png',  // same size as cb_saas_collage
  'creatorbharat_premium_showcase_3d.png', // duplicate
  'creatorbharat_product_mockup.png',      // duplicate
];

const files = readdirSync(PUBLIC_DIR);
const images = files.filter(f => {
  const ext = extname(f).toLowerCase();
  return (ext === '.png' || ext === '.jpg' || ext === '.jpeg') && !SKIP.has(f);
});

console.log(`\n🖼️  Found ${images.length} images to convert to WebP\n`);

let totalSaved = 0;
let converted = 0;
let errors = 0;

for (const file of images) {
  const inputPath = join(PUBLIC_DIR, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const outputPath = join(PUBLIC_DIR, outputName);
  
  // Skip if WebP already exists
  if (existsSync(outputPath)) {
    console.log(`  ⏭️  ${outputName} already exists — skipping`);
    continue;
  }

  try {
    const beforeSize = statSync(inputPath).size;
    
    // Use sharp-cli via npx
    execSync(`npx sharp-cli --input "${inputPath}" --output "${outputPath}" --format webp --quality 82`, {
      stdio: 'pipe',
      cwd: join(__dirname, '..'),
    });

    if (existsSync(outputPath)) {
      const afterSize = statSync(outputPath).size;
      const saved = beforeSize - afterSize;
      const percent = Math.round((saved / beforeSize) * 100);
      totalSaved += saved;
      converted++;
      console.log(`  ✅ ${file.padEnd(45)} ${(beforeSize/1024).toFixed(0).padStart(5)}KB → ${(afterSize/1024).toFixed(0).padStart(5)}KB  (-${percent}%)`);
    } else {
      console.log(`  ⚠️  ${file} — output not created`);
      errors++;
    }
  } catch (err) {
    console.error(`  ❌ ${file} — ${err.message.split('\n')[0]}`);
    errors++;
  }
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✅ Converted: ${converted}/${images.length} images`);
console.log(`💾 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
if (errors > 0) console.log(`❌ Errors: ${errors}`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

console.log(`\n📝 NEXT STEP: Update image references in JSX files`);
console.log(`   Run this in creator-bharat-v3/src/ to find all .png/.jpg references:`);
console.log(`   grep -r "\\.png\\|\\.jpg" src/ --include="*.jsx" -l\n`);
