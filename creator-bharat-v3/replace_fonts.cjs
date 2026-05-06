const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('d:/creatorbharat-1/creator-bharat-v3/src');
files.push('d:/creatorbharat-1/creator-bharat-v3/index.html');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let newContent = content
    .replace(/Fraunces/g, 'Outfit')
    .replace(/Plus Jakarta Sans/g, 'Inter')
    .replace(/Plus\+Jakarta\+Sans/g, 'Inter')
    .replace(/'Outfit',\s*serif/g, "'Outfit', sans-serif");
  
  if (content !== newContent) {
    fs.writeFileSync(f, newContent, 'utf8');
  }
});
console.log('Done!');
