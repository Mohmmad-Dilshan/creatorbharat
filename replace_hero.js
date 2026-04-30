const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

const newSection = fs.readFileSync('d:/creatorbharat-1/new_hero.jsx', 'utf8');

const startStr = `<section style={{background:'#000',minHeight:mob?'auto':'100vh'`;
const startIdx = code.indexOf(startStr);
if (startIdx === -1) {
  console.log("Not found start");
  process.exit(1);
}
let endIdx = code.indexOf('</section>', startIdx);
if (endIdx === -1) {
  console.log("Not found end");
  process.exit(1);
}
endIdx += '</section>'.length;

code = code.substring(0, startIdx) + newSection + code.substring(endIdx);
fs.writeFileSync(file, code);
console.log('Replaced successfully');
