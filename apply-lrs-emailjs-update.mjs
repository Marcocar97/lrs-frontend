import fs from 'node:fs';
import path from 'node:path';
const files = ["src/pages/RapidRoof.jsx", "src/pages/FastCoat.jsx", "src/pages/FastCoatTop.jsx"];
const oldKey = "q8SYdWtSShPPbGI8c";
const newKey = "AyES0hKJgziBiuEgG";
const root = process.cwd();
if (!fs.existsSync(path.join(root, 'package.json')) || !fs.existsSync(path.join(root, 'src'))) {
  throw new Error('Run this script from the lrs-frontend project root.');
}
const changes = [];
for (const file of files) {
  const target = path.join(root, file);
  if (!fs.existsSync(target)) {
    if (file.startsWith('guarantee-backup-')) continue;
    throw new Error(`Missing file: ${file}. No changes applied.`);
  }
  const text = fs.readFileSync(target, 'utf8');
  if (!text.includes(oldKey)) {
    if (text.includes(newKey)) continue;
    throw new Error(`Unexpected EmailJS configuration: ${file}. No changes applied.`);
  }
  changes.push({file, target, text});
}
if (changes.length) {
  const backup = path.join(root, 'emailjs-backup-' + new Date().toISOString().replace(/[:.]/g, '-'));
  for (const {file, text} of changes) {
    const dest = path.join(backup, file);
    fs.mkdirSync(path.dirname(dest), {recursive: true});
    fs.writeFileSync(dest, text);
  }
  for (const {file, target, text} of changes) {
    fs.writeFileSync(target, text.split(oldKey).join(newKey));
    console.log('Updated: ' + file);
  }
  console.log('Backup: ' + backup);
} else console.log('Already updated.');
