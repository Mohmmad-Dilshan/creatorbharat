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
    
    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:sm?22:28,fontWeight:900,color:light?'#fff':'#111',letterSpacing:'-0.04em',display:'flex',alignItems:'center'}}>
      <span className="logo-text-sweep">Creator</span>
      <span style={{
        background: 'linear-gradient(90deg, #FF9431, #DC2626)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginLeft: 2
      }}>Bharat</span>
    </span>

    <style>{\`
      .logo-text-sweep {
        position: relative;
        background: linear-gradient(90deg, #111, #111, #666, #111, #111);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 3s linear infinite;
      }
      @keyframes shine {
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
console.log('Logo updated with Indian Flag icon instead of CB text.');
