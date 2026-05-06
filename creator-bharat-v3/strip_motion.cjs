const fs = require('fs');
const path = require('path');

const dir = 'd:/creatorbharat-1/creator-bharat-v3/src/components/home';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'CreatorMap.jsx');

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let orig = content;

  // Replace <motion.tag with <tag
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  // Replace </motion.tag> with </tag>
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');
  
  // Remove framer-motion props
  content = content.replace(/\s+initial=\{\{[^}]+\}\}/g, '');
  content = content.replace(/\s+whileInView=\{\{[^}]+\}\}/g, '');
  content = content.replace(/\s+viewport=\{\{[^}]+\}\}/g, '');
  content = content.replace(/\s+transition=\{\{[^}]+\}\}/g, '');

  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', f);
  }
});
