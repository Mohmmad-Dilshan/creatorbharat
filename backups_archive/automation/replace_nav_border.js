const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

const newNav = fs.readFileSync('d:/creatorbharat-1/new_light_nav.jsx', 'utf8');

// Replace Nav
const navStart = code.indexOf('function Navbar(){');
const navEnd = code.indexOf('function Footer(){', navStart);
if (navStart !== -1 && navEnd !== -1) {
  code = code.substring(0, navStart) + newNav + '\n\n// FOOTER\n' + code.substring(navEnd);
  console.log('Nav replaced');
} else {
  console.log('Nav not found');
}

fs.writeFileSync(file, code);
console.log('Done');
