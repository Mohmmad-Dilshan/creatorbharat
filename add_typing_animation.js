const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

const typeWriterCode = `
function Typewriter({words, interval=2000}){
  const [idx, setIdx] = React.useState(0);
  const [sub, setSub] = React.useState('');
  const [del, setDel] = React.useState(false);
  
  React.useEffect(() => {
    const word = words[idx % words.length];
    const speed = del ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if(!del && sub === word) {
        setTimeout(() => setDel(true), interval);
      } else if(del && sub === '') {
        setDel(false);
        setIdx(i => i + 1);
      } else {
        setSub(del ? word.substring(0, sub.length - 1) : word.substring(0, sub.length + 1));
      }
    }, speed);
    
    return () => clearTimeout(timeout);
  }, [sub, del, idx, words, interval]);

  return <span style={{position:'relative',display:'inline-block'}}>
    <span style={{position:'relative',zIndex:2,background:'linear-gradient(90deg, #FF9431, #DC2626)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{sub}</span>
    <span style={{width:2,height:'80%',background:'#FF9431',position:'absolute',right:-4,top:'10%',animation:'blink 0.8s infinite'}}/>
    <svg style={{position:'absolute',bottom:-10,left:0,width:'100%',height:16,zIndex:1}} viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 15 Q 50 0 100 15" fill="none" stroke="rgba(255,148,49,0.3)" strokeWidth="6" strokeLinecap="round"/></svg>
  </span>;
}
`;

// Add blink animation to style
if (!code.includes('@keyframes blink')) {
  code = code.replace('<style>{`', '<style>{`\\n      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }\\n');
}

// Inject Typewriter component before HomePage
const homePageStart = code.indexOf('function HomePage');
code = code.substring(0, homePageStart) + typeWriterCode + '\n\n' + code.substring(homePageStart);

// Update Hero Headline
const oldHeadline = `Your Digital <span style={{position:'relative',display:'inline-block'}}>
            <span style={{position:'relative',zIndex:2,background:'linear-gradient(90deg, #FF9431, #DC2626)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Identity</span>
            <svg style={{position:'absolute',bottom:-10,left:0,width:'100%',height:16,zIndex:1}} viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 15 Q 50 0 100 15" fill="none" stroke="rgba(255,148,49,0.3)" strokeWidth="6" strokeLinecap="round"/></svg>
          </span> <br/>
          Built in Minutes.`;

const newHeadline = `Your Digital <Typewriter words={['Identity', 'Portfolio', 'Brand', 'Growth']} /> <br/>
          Built in Minutes.`;

code = code.replace(oldHeadline, newHeadline);

fs.writeFileSync(file, code);
console.log('Typing animation added to hero headline.');
