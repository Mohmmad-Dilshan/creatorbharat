const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

const newLogoCode = `
function Logo({sm,light,onClick}){
  const sz=sm?34:44;
  return <div onClick={onClick} className="logo-container" style={{display:'flex',alignItems:'center',gap:sm?10:14,cursor:onClick?'pointer':'default',userSelect:'none',position:'relative'}}>
    <div style={{position:'relative',width:sz,height:sz,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',overflow:'hidden',boxShadow:'0 4px 12px rgba(0,0,0,0.1)',border:'1px solid rgba(0,0,0,0.05)'}}>
      {/* Premium Indian Flag Icon */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:'33.33%',background:'#FF9431'}}/>
      <div style={{position:'absolute',top:'33.33%',left:0,right:0,height:'33.34%',background:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center'}}>
        {/* Subtle Ashoka Chakra */}
        <div style={{width:'25%',height:'25%',borderRadius:'50%',border:'1px solid #000080',position:'relative'}}>
          {[...Array(12)].map((_,i)=><div key={i} style={{position:'absolute',top:'50%',left:'50%',width:'100%',height:1,background:'#000080',transform:\`translate(-50%,-50%) rotate(\${i*15}deg)\` }}/>)}
        </div>
      </div>
      <div style={{position:'absolute',top:'66.67%',left:0,right:0,height:'33.33%',background:'#128807'}}/>
    </div>
    
    <span className="logo-text-animated" style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:sm?22:28,fontWeight:900,letterSpacing:'-0.04em',display:'flex',alignItems:'center'}}>
      CreatorBharat
    </span>

    <style>{\`
      .logo-text-animated {
        background: linear-gradient(90deg, #FF9431, #FFFFFF, #128807, #FF9431);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: flagSweep 3s linear infinite;
        /* Shadow for readability on white */
        filter: drop-shadow(0 1px 1px rgba(0,0,0,0.05));
      }
      @keyframes flagSweep {
        to { background-position: 200% center; }
      }
    \`}</style>
  </div>;
}
`;

// Replace Logo
const logoStart = code.indexOf('function Logo');
const logoEnd = code.indexOf('function Divider');

if(logoStart !== -1 && logoEnd !== -1) {
  code = code.substring(0, logoStart) + newLogoCode + '\n' + code.substring(logoEnd);
}

fs.writeFileSync(file, code);
console.log('Logo name updated with animated Indian Flag colors sweep.');
