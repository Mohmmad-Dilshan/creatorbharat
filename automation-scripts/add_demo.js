const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

const demoModalCode = `
// DEMO CREATOR PORTFOLIO MODAL
function DemoModal({onClose}) {
  return (
    <div style={{position:'fixed',inset:0,zIndex:9999,background:'rgba(0,0,0,0.8)',backdropFilter:'blur(20px)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      {/* Close button outside */}
      <button onClick={onClose} style={{position:'absolute',top:20,right:30,background:'rgba(255,255,255,0.1)',border:'none',color:'#fff',width:48,height:48,borderRadius:'50%',fontSize:24,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',zIndex:10000}}>×</button>
      
      {/* Mobile Frame Container */}
      <div style={{width:'100%',maxWidth:400,height:'90vh',maxHeight:800,background:'#fff',borderRadius:40,border:'8px solid #222',boxShadow:'0 30px 60px rgba(0,0,0,0.5)',position:'relative',display:'flex',flexDirection:'column',overflow:'hidden',animation:'fadeUp 0.3s ease-out'}}>
        
        {/* Fake Notch */}
        <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:120,height:28,background:'#222',borderBottomLeftRadius:16,borderBottomRightRadius:16,zIndex:10}}/>

        {/* Scrollable Inside */}
        <div style={{flex:1,overflowY:'auto',background:'#FAFAFA',paddingBottom:100}}>
          {/* Cover */}
          <div style={{height:180,background:'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80) center/cover'}}/>
          
          {/* Avatar & Verification */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:-60,position:'relative',zIndex:2}}>
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" style={{width:120,height:120,borderRadius:'50%',border:'4px solid #fff',boxShadow:'0 10px 20px rgba(0,0,0,0.1)',objectFit:'cover'}} alt="Rahul"/>
             <div style={{marginTop:-14,background:'#fff',color:'#10B981',fontSize:12,fontWeight:800,padding:'6px 16px',borderRadius:20,border:'1px solid rgba(16,185,129,0.2)',display:'flex',alignItems:'center',gap:4,boxShadow:'0 4px 10px rgba(16,185,129,0.15)'}}>
                ✓ Verified Creator
             </div>
          </div>

          <div style={{padding:'20px',textAlign:'center'}}>
            <h2 style={{fontSize:26,fontWeight:900,color:'#111',fontFamily:"'Inter',sans-serif",marginBottom:4}}>Rahul Sharma</h2>
            <p style={{fontSize:15,color:'rgba(0,0,0,0.6)',fontFamily:"'Inter',sans-serif",marginBottom:24,fontWeight:500}}>📍 Jaipur • Travel & Culture Explorer</p>
            
            {/* Bio */}
            <p style={{fontSize:14,color:'#333',lineHeight:1.6,marginBottom:32,background:'#fff',padding:16,borderRadius:16,border:'1px solid rgba(0,0,0,0.05)',textAlign:'left'}}>
              Hi! I explore the unseen beauty of Rajasthan and share it with my 248K amazing followers. Worked with MakeMyTrip, Zomato, and Royal Enfield. Let's create something awesome!
            </p>

            {/* Stats */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:32}}>
               <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.05)',borderRadius:16,padding:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.02)'}}>
                  <div style={{fontSize:22,fontWeight:900,color:'#111',fontFamily:"'Inter',sans-serif"}}>248K</div>
                  <div style={{fontSize:11,fontWeight:600,color:'rgba(0,0,0,0.5)',textTransform:'uppercase',letterSpacing:'0.5px',marginTop:4}}>Instagram</div>
               </div>
               <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.05)',borderRadius:16,padding:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.02)'}}>
                  <div style={{fontSize:22,fontWeight:900,color:'#FF9431',fontFamily:"'Inter',sans-serif"}}>6.8%</div>
                  <div style={{fontSize:11,fontWeight:600,color:'rgba(0,0,0,0.5)',textTransform:'uppercase',letterSpacing:'0.5px',marginTop:4}}>Avg. Eng.</div>
               </div>
            </div>

            {/* Past Campaigns */}
            <h3 style={{fontSize:18,fontWeight:800,textAlign:'left',marginBottom:16,color:'#111'}}>Past Brand Deals</h3>
            <div style={{display:'flex',gap:12,overflowX:'auto',paddingBottom:10,marginBottom:32}}>
               {['MakeMyTrip','Zomato','Oyo','Royal Enfield'].map(b=><div key={b} style={{background:'#fff',padding:'12px 20px',borderRadius:12,border:'1px solid rgba(0,0,0,0.05)',fontWeight:700,fontSize:14,whiteSpace:'nowrap',color:'#333'}}>{b}</div>)}
            </div>

            {/* Gallery */}
            <h3 style={{fontSize:18,fontWeight:800,textAlign:'left',marginBottom:16,color:'#111'}}>Recent Work</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:40}}>
               <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80" style={{width:'100%',height:140,objectFit:'cover',borderRadius:16}} alt=""/>
               <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&q=80" style={{width:'100%',height:140,objectFit:'cover',borderRadius:16}} alt=""/>
               <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80" style={{width:'100%',height:140,objectFit:'cover',borderRadius:16}} alt=""/>
               <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80" style={{width:'100%',height:140,objectFit:'cover',borderRadius:16}} alt=""/>
            </div>
            
          </div>
        </div>

        {/* Sticky Action Footer inside Mobile */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,padding:20,background:'rgba(255,255,255,0.9)',backdropFilter:'blur(10px)',borderTop:'1px solid rgba(0,0,0,0.05)',display:'flex',flexDirection:'column',gap:12}}>
           <button onClick={()=>alert('Demo: Request sent via Escrow')} style={{background:'linear-gradient(90deg, #FF9431, #DC2626)',color:'#fff',border:'none',padding:'16px',borderRadius:16,fontSize:16,fontWeight:800,cursor:'pointer',boxShadow:'0 8px 20px rgba(255,148,49,0.3)',fontFamily:"'Inter',sans-serif",width:'100%'}}>🤝 Book for ₹15,000</button>
           <button style={{background:'#111',color:'#fff',border:'none',padding:'16px',borderRadius:16,fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:"'Inter',sans-serif",width:'100%'}}>📸 View Instagram</button>
        </div>

      </div>
    </div>
  );
}
`;

if (!code.includes('function DemoModal(')) {
  code = code.replace('function HomePage(){', demoModalCode + '\nfunction HomePage(){');
}

code = code.replace(
  'const[loading,setLoading]=useState(true);',
  'const[loading,setLoading]=useState(true);\n  const[showDemo,setShowDemo]=useState(false);'
);

code = code.replace(
  "onClick={()=>go('campaigns')}>View Demo</Btn>",
  "onClick={()=>setShowDemo(true)}>View Demo</Btn>"
);

code = code.replace(
  'return <PL>',
  'return <PL>{showDemo && <DemoModal onClose={()=>setShowDemo(false)} />}'
);

fs.writeFileSync(file, code);
console.log('Done!');
