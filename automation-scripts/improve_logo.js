const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

const newLogoCode = `
function Logo({sm,light,onClick}){
  const sz=sm?34:44;
  return <div onClick={onClick} className="logo-container" style={{display:'flex',alignItems:'center',gap:sm?10:14,cursor:onClick?'pointer':'default',userSelect:'none',position:'relative'}}>
    <div style={{position:'relative',width:sz,height:sz,display:'flex',alignItems:'center',justifyContent:'center'}}>
      {/* Premium Circular Flag Icon */}
      <div style={{position:'absolute',inset:0,borderRadius:'50%',background:'conic-gradient(#FF9431, #FFFFFF, #128807, #FF9431)',padding:2,animation:'spin 4s linear infinite',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
        <div style={{width:'100%',height:'100%',background:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>
           <span style={{fontSize:sm?14:18,fontWeight:900,color:'#111',fontFamily:"'Inter',sans-serif",letterSpacing:'-1px'}}>CB</span>
        </div>
      </div>
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
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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
console.log('Logo and Logo Name improved with premium animation and styling.');
