const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

const newNav = fs.readFileSync('d:/creatorbharat-1/new_light_nav.jsx', 'utf8');
const newHero = fs.readFileSync('d:/creatorbharat-1/new_light_hero.jsx', 'utf8');

// Replace Nav
const navStart = code.indexOf('function Navbar(){');
const navEnd = code.indexOf('function Footer(){', navStart);
if (navStart !== -1 && navEnd !== -1) {
  code = code.substring(0, navStart) + newNav + '\n\n// FOOTER\n' + code.substring(navEnd);
  console.log('Nav replaced');
} else {
  console.log('Nav not found');
}

// Replace Hero (It might be dark or whatever now)
// We just find the section tag and the end of it
const heroStart = code.indexOf('<section style={{background:\'#000\'') !== -1 
  ? code.indexOf('<section style={{background:\'#000\'')
  : code.indexOf('<section style={{background:\'#050505\'') !== -1 
  ? code.indexOf('<section style={{background:\'#050505\'')
  : code.indexOf('<section '); // fallback

if(heroStart === -1) {
  console.log('Hero start not found');
} else {
  let depth = 0;
  let heroEnd = -1;
  let idx = heroStart;
  while(idx < code.length) {
    if(code.substring(idx, idx+9) === '<section ') {
      depth++;
      idx += 9;
    } else if(code.substring(idx, idx+10) === '</section>') {
      depth--;
      if(depth === 0) {
        heroEnd = idx + 10;
        break;
      }
      idx += 10;
    } else {
      idx++;
    }
  }

  if (heroEnd !== -1) {
    code = code.substring(0, heroStart) + newHero + code.substring(heroEnd);
    console.log('Hero replaced');
  } else {
    console.log('Hero end not found');
  }
}

fs.writeFileSync(file, code);
console.log('Done');
