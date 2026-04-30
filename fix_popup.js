const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Update DemoModal
const newDemoModal = `
// DEMO CREATOR PORTFOLIO MODAL
function DemoModal() {
  const { dsp } = useApp();
  const onClose = () => dsp({t:'UI', v:{demoModal: false}});

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'auto';
  }, []);

  return (
    <div style={{position:'fixed',inset:0,zIndex:999999,background:'rgba(0,0,0,0.85)',backdropFilter:'blur(20px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      {/* Close button outside */}
      <button onClick={onClose} style={{position:'absolute',top:20,right:30,background:'rgba(255,255,255,0.1)',border:'none',color:'#fff',width:48,height:48,borderRadius:'50%',fontSize:24,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000000,transition:'all 0.2s'}} onMouseEnter={e=>e.target.style.background='rgba(255,255,255,0.2)'} onMouseLeave={e=>e.target.style.background='rgba(255,255,255,0.1)'}>×</button>
      
      <div style={{display:'flex',gap:40,alignItems:'center',maxWidth:1000,width:'100%'}}>
        
        {/* Left Side: Explanation for User */}
        <div style={{flex:1,color:'#fff',display:window.innerWidth>800?'block':'none'}}>
           <div style={{background:'rgba(16,185,129,0.1)',color:'#10B981',padding:'8px 16px',borderRadius:100,display:'inline-block',fontWeight:800,marginBottom:24,border:'1px solid rgba(16,185,129,0.2)'}}>
             What You Get
           </div>
           <h2 style={{fontSize:48,fontWeight:900,lineHeight:1.1,marginBottom:24,fontFamily:"'Inter',sans-serif"}}>Your Ultimate <br/>Link-in-Bio & Media Kit.</h2>
           <p style={{fontSize:18,color:'rgba(255,255,255,0.6)',lineHeight:1.6,marginBottom:32,fontFamily:"'Inter',sans-serif"}}>
             CreatorBharat gives you a premium, verified portfolio to showcase your stats, services, and past work. Share this single link with brands to get booked instantly via our secure Escrow system.
           </p>
           <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:16}}>
             {[
               '✓ Auto-updated Instagram & YouTube stats',
               '✓ List your pricing and collab packages',
               '✓ Receive payments safely via Escrow',
               '✓ Stand out to top Tier-1 brands'
             ].map((text, i) => (
               <li key={i} style={{fontSize:16,fontWeight:600,display:'flex',alignItems:'center',gap:12}}>
                 <span style={{color:'#10B981',fontSize:20}}>•</span> {text}
               </li>
             ))}
           </ul>
        </div>

        {/* Mobile Frame Container */}
        <div style={{width:'100%',maxWidth:400,height:'90vh',maxHeight:840,background:'#fff',borderRadius:40,border:'8px solid #111',boxShadow:'0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.2)',position:'relative',display:'flex',flexDirection:'column',overflow:'hidden',animation:'fadeUp 0.3s ease-out',flexShrink:0,margin:'0 auto'}}>
          
          {/* Fake Notch */}
          <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:120,height:28,background:'#111',borderBottomLeftRadius:16,borderBottomRightRadius:16,zIndex:10}}/>

          {/* Scrollable Inside */}
          <div style={{flex:1,overflowY:'auto',background:'#F9FAFB',paddingBottom:120}} className="no-scrollbar">
            {/* Live Link Banner */}
            <div style={{background:'#f3f4f6',padding:'12px 20px',textAlign:'center',fontSize:11,color:'#666',fontWeight:700,borderBottom:'1px solid #e5e7eb'}}>
               creatorbharat.in/rahulsharma
            </div>

            {/* Cover */}
            <div style={{height:160,background:'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80) center/cover'}}/>
            
            {/* Avatar & Verification */}
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:-50,position:'relative',zIndex:2}}>
               <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" style={{width:100,height:100,borderRadius:'50%',border:'4px solid #fff',boxShadow:'0 10px 20px rgba(0,0,0,0.1)',objectFit:'cover'}} alt="Rahul"/>
               <div style={{marginTop:-12,background:'#fff',color:'#10B981',fontSize:11,fontWeight:800,padding:'4px 12px',borderRadius:20,border:'1px solid rgba(16,185,129,0.2)',display:'flex',alignItems:'center',gap:4,boxShadow:'0 4px 10px rgba(16,185,129,0.15)'}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#10B981"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Verified Profile
               </div>
            </div>

            <div style={{padding:'20px 24px',textAlign:'center'}}>
              <h2 style={{fontSize:24,fontWeight:900,color:'#111',fontFamily:"'Inter',sans-serif",marginBottom:4}}>Rahul Sharma</h2>
              <p style={{fontSize:14,color:'rgba(0,0,0,0.5)',fontFamily:"'Inter',sans-serif",marginBottom:16,fontWeight:600}}>📍 Jaipur • Travel & Culture</p>
              
              {/* Social Links Row */}
              <div style={{display:'flex',justifyContent:'center',gap:12,marginBottom:24}}>
                 <div style={{width:44,height:44,borderRadius:'50%',background:'#fff',boxShadow:'0 4px 12px rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>📸</div>
                 <div style={{width:44,height:44,borderRadius:'50%',background:'#fff',boxShadow:'0 4px 12px rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>🎥</div>
                 <div style={{width:44,height:44,borderRadius:'50%',background:'#fff',boxShadow:'0 4px 12px rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>🐦</div>
              </div>

              {/* Stats */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:24}}>
                 <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.05)',borderRadius:16,padding:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.02)'}}>
                    <div style={{fontSize:22,fontWeight:900,color:'#111',fontFamily:"'Inter',sans-serif"}}>248K</div>
                    <div style={{fontSize:11,fontWeight:700,color:'rgba(0,0,0,0.4)',textTransform:'uppercase',letterSpacing:'0.5px',marginTop:4}}>Followers</div>
                 </div>
                 <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.05)',borderRadius:16,padding:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.02)'}}>
                    <div style={{fontSize:22,fontWeight:900,color:'#FF9431',fontFamily:"'Inter',sans-serif"}}>6.8%</div>
                    <div style={{fontSize:11,fontWeight:700,color:'rgba(0,0,0,0.4)',textTransform:'uppercase',letterSpacing:'0.5px',marginTop:4}}>Avg. Eng.</div>
                 </div>
              </div>
              
              {/* Bio */}
              <p style={{fontSize:14,color:'#4B5563',lineHeight:1.6,marginBottom:32,textAlign:'left'}}>
                Hi! I explore the unseen beauty of Rajasthan and share it with my amazing community. Let's create something awesome together! 🏜️
              </p>

              {/* Links / Services */}
              <h3 style={{fontSize:15,fontWeight:800,textAlign:'left',marginBottom:16,color:'#111',textTransform:'uppercase',letterSpacing:'1px'}}>Book Me For</h3>
              <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:32}}>
                 <div style={{background:'#fff',padding:'16px',borderRadius:16,border:'1px solid rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 4px 12px rgba(0,0,0,0.02)'}}>
                   <span style={{fontWeight:700,fontSize:14,color:'#111'}}>📸 Insta Reel Collab</span>
                   <span style={{fontWeight:800,fontSize:14,color:'#10B981'}}>₹15k</span>
                 </div>
                 <div style={{background:'#fff',padding:'16px',borderRadius:16,border:'1px solid rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 4px 12px rgba(0,0,0,0.02)'}}>
                   <span style={{fontWeight:700,fontSize:14,color:'#111'}}>🎥 YouTube Integration</span>
                   <span style={{fontWeight:800,fontSize:14,color:'#10B981'}}>₹25k</span>
                 </div>
              </div>

              {/* Past Campaigns */}
              <h3 style={{fontSize:15,fontWeight:800,textAlign:'left',marginBottom:16,color:'#111',textTransform:'uppercase',letterSpacing:'1px'}}>Trusted By</h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:32}}>
                 {['MakeMyTrip','Zomato','Oyo','Royal Enfield'].map(b=><div key={b} style={{background:'#fff',padding:'12px',borderRadius:12,border:'1px solid rgba(0,0,0,0.05)',fontWeight:800,fontSize:13,color:'#6B7280',textAlign:'center'}}>{b}</div>)}
              </div>
              
            </div>
          </div>

          {/* Sticky Action Footer inside Mobile */}
          <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'24px 20px',background:'linear-gradient(to top, #fff 70%, rgba(255,255,255,0))',display:'flex',flexDirection:'column',gap:12}}>
             <button onClick={()=>alert('Demo: Request sent via Escrow')} style={{background:'linear-gradient(90deg, #FF9431, #DC2626)',color:'#fff',border:'none',padding:'18px',borderRadius:100,fontSize:16,fontWeight:800,cursor:'pointer',boxShadow:'0 10px 24px rgba(255,148,49,0.3)',fontFamily:"'Inter',sans-serif",width:'100%'}}>🤝 Send Collab Request</button>
          </div>

        </div>

      </div>
    </div>
  );
}
`;

// Replace DemoModal
const dmStart = code.indexOf('// DEMO CREATOR PORTFOLIO MODAL');
const hpStart = code.indexOf('function HomePage(){');
if(dmStart !== -1 && hpStart !== -1) {
  code = code.substring(0, dmStart) + newDemoModal + '\n' + code.substring(hpStart);
}

// 2. Add to PL
const plStart = code.indexOf('function PL({children,noFooter}){');
const plReturn = code.indexOf('return <div style={{minHeight:\'100vh\'', plStart);
if (plStart !== -1 && plReturn !== -1) {
  const plEnd = code.indexOf('</main>', plReturn);
  if (!code.includes('{st.ui.demoModal&&<DemoModal/>}')) {
    code = code.replace(
      '{st.ui.authModal&&<AuthModal/>}\n  </div>;',
      '{st.ui.authModal&&<AuthModal/>}\n    {st.ui.demoModal&&<DemoModal/>}\n  </div>;'
    );
  }
}

// 3. Update HomePage to remove local state and use global state
if (code.includes('const[showDemo,setShowDemo]=useState(false);')) {
  code = code.replace('const[showDemo,setShowDemo]=useState(false);', '');
}
code = code.replace(
  "onClick={()=>setShowDemo(true)}>View Demo</Btn>",
  "onClick={()=>dsp({t:'UI',v:{demoModal:true}})}>View Demo</Btn>"
);
code = code.replace(
  '{showDemo && <DemoModal onClose={()=>setShowDemo(false)} />}',
  ''
);

fs.writeFileSync(file, code);
console.log('Fixed popup stacking and added explanatory text');
