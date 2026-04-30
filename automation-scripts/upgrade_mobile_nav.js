const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

const oldMobileMenuStart = code.indexOf('{mob&&st.ui.mobileMenu&&<div className="ai"');
if(oldMobileMenuStart === -1) {
  console.log("Could not find old mobile menu.");
  process.exit(1);
}

// Find the end of the mobile menu logic
// It ends right before {st.ui.notifPanel&&<NotifPanel/>}
const oldMobileMenuEnd = code.indexOf('{st.ui.notifPanel&&<NotifPanel/>}', oldMobileMenuStart);

const newMobileMenuCode = `
    {mob&&st.ui.mobileMenu&&<div className="ai" style={{position:'fixed',inset:0,zIndex:999999,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(10px)'}} onClick={()=>dsp({t:'UI',v:{mobileMenu:false}})}>
      <div className="sr" onClick={e=>e.stopPropagation()} style={{position:'absolute',top:16,right:16,bottom:16,width:'85%',maxWidth:360,background:'#fff',borderRadius:32,boxShadow:'0 30px 60px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)',padding:'32px 24px',display:'flex',flexDirection:'column',overflowY:'auto',animation:'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'}}>
        
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:40}}>
          <Logo onClick={()=>go('home')} />
          <button onClick={()=>dsp({t:'UI',v:{mobileMenu:false}})} style={{width:44,height:44,borderRadius:100,background:'#F3F4F6',border:'1px solid rgba(0,0,0,0.05)',fontSize:20,display:'flex',alignItems:'center',justifyContent:'center',color:'#111',cursor:'pointer',transition:'background 0.2s'}}>✕</button>
        </div>

        {st.user && <div style={{display:'flex',alignItems:'center',gap:14,padding:'16px',background:'#F9FAFB',borderRadius:20,marginBottom:32,border:'1px solid rgba(0,0,0,0.05)'}}>
          <img src={(st.creatorProfile?.photo||st.creatorProfile?.avatarUrl)||(\`https://ui-avatars.com/api/?name=\${encodeURIComponent(st.user.name||'U')}&background=FF9431&color=fff\`)} style={{width:52,height:52,borderRadius:'50%',objectFit:'cover',border:'2px solid #fff',boxShadow:'0 4px 10px rgba(0,0,0,0.05)'}} alt=""/>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:'#111',fontFamily:"'Inter',sans-serif"}}>{st.user.name||st.user.companyName}</div>
            <div style={{fontSize:13,fontWeight:600,color:'rgba(0,0,0,0.5)',fontFamily:"'Inter',sans-serif"}}>{st.role === 'creator' ? 'Creator Account' : 'Brand Account'}</div>
          </div>
        </div>}

        <div style={{display:'flex',flexDirection:'column',gap:8,flex:1}}>
          {links.map(([p,l])=><button key={p} onClick={()=>{go(p);dsp({t:'UI',v:{mobileMenu:false}})}} style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',padding:'16px 20px',background:st.page===p?'#F9FAFB':'transparent',border:st.page===p?'1px solid rgba(0,0,0,0.05)':'1px solid transparent',textAlign:'left',fontSize:18,color:st.page===p?'#111':'rgba(0,0,0,0.6)',cursor:'pointer',fontFamily:"'Inter',sans-serif",fontWeight:st.page===p?800:600,borderRadius:20,transition:'all 0.2s'}}>
            {l}
            {st.page===p && <div style={{width:8,height:8,borderRadius:'50%',background:'linear-gradient(135deg, #FF9431, #DC2626)'}}/>}
          </button>)}
          
          {st.user && <div style={{height:1,background:'rgba(0,0,0,0.05)',margin:'16px 0'}}/>}

          {st.user && [
            isCreator&&['Dashboard','dashboard'],
            isCreator&&['Applications','applications'],
            isBrand&&['Brand Dashboard','brand-dashboard'],
            isBrand&&['Post Campaign','campaign-builder'],
            ['Settings','settings'],
            ['Saved Items','saved']
          ].filter(Boolean).map(([l,p])=><button key={p} onClick={()=>{go(p);dsp({t:'UI',v:{mobileMenu:false}})}} style={{display:'block',width:'100%',padding:'14px 20px',background:st.page===p?'#F9FAFB':'transparent',border:'none',textAlign:'left',fontSize:16,color:st.page===p?'#111':'rgba(0,0,0,0.7)',cursor:'pointer',fontFamily:"'Inter',sans-serif",fontWeight:st.page===p?800:600,borderRadius:16}}>{l}</button>)}
        </div>

        <div style={{marginTop:40,display:'flex',flexDirection:'column',gap:12}}>
          {!st.user?<><Btn full lg onClick={()=>{dsp({t:'UI',v:{authModal:true,authTab:'login',mobileMenu:false}})}} style={{background:'#111',color:'#fff',padding:'20px',borderRadius:20,fontSize:16,fontFamily:"'Inter',sans-serif",boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>Sign In</Btn><Btn full lg variant="outline" onClick={()=>{go('apply');dsp({t:'UI',v:{mobileMenu:false}})}} style={{borderColor:'rgba(0,0,0,0.1)',color:'#111',background:'#fff',padding:'20px',borderRadius:20,fontSize:16,fontFamily:"'Inter',sans-serif",boxShadow:'0 4px 10px rgba(0,0,0,0.02)'}}>Create Free Portfolio</Btn></>:(<button onClick={()=>{dsp({t:'LOGOUT'});dsp({t:'UI',v:{mobileMenu:false}})}} style={{display:'block',width:'100%',padding:'18px',background:'rgba(239,68,68,0.08)',border:'none',textAlign:'center',fontSize:16,color:'#EF4444',cursor:'pointer',fontFamily:"'Inter',sans-serif",fontWeight:800,borderRadius:20}}>Logout Account</button>)}
        </div>
      </div>
    </div>
    `;

code = code.substring(0, oldMobileMenuStart) + newMobileMenuCode + code.substring(oldMobileMenuEnd);

// Add keyframes if not present
if (!code.includes('@keyframes slideInRight')) {
  code = code.replace('<style>{`', '<style>{`\n      @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }\n');
}

fs.writeFileSync(file, code);
console.log('Mobile menu upgraded to Pro iOS Floating Sheet style.');
