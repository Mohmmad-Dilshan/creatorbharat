const fs = require('node:fs');
const path = require('node:path');

const dir = 'd:/creatorbharat-1/creator-bharat-v3/src/components/home';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'CreatorMap.jsx');

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  const orig = content;

  // Replace <motion.tag with <tag
  content = content.replaceAll(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  // Replace </motion.tag> with </tag>
  content = content.replaceAll(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');
  
  // Remove framer-motion props
  content = content.replaceAll(/\s+initial=\{\{[^}]+\}\}/g, '');
  content = content.replaceAll(/\s+whileInView=\{\{[^}]+\}\}/g, '');
  content = content.replaceAll(/\s+viewport=\{\{[^}]+\}\}/g, '');
  content = content.replaceAll(/\s+transition=\{\{[^}]+\}\}/g, '');

  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', f);
  }
});
