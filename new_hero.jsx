    <section style={{background:'#000',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:mob?120:160,paddingBottom:mob?80:120,position:'relative',overflow:'hidden',textAlign:'center'}}>
      
      {/* Sleek Modern Glow & Grid */}
      <div style={{position:'absolute',top:'-20%',left:'50%',transform:'translateX(-50%)',width:'80vw',height:'50vh',background:'radial-gradient(ellipse at top, rgba(255,153,51,0.15) 0%, transparent 70%)',filter:'blur(60px)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',backgroundSize:'32px 32px',pointerEvents:'none',maskImage:'linear-gradient(to bottom, black 40%, transparent 100%)',WebkitMaskImage:'linear-gradient(to bottom, black 40%, transparent 100%)'}}/>
      
      <div style={{...W(),position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
        
        {/* Pill */}
        <div className="au" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 16px',borderRadius:100,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',marginBottom:32}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'#10B981',boxShadow:'0 0 10px #10B981'}}/>
          <span style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.8)',fontFamily:"'Inter',sans-serif",letterSpacing:'0.5px'}}>CreatorBharat 2.0 is Live</span>
        </div>
        
        {/* Huge Modern Headline */}
        <h1 className="au d1" style={{fontFamily:"'Inter',sans-serif",fontSize:mob?'clamp(48px,12vw,64px)':'clamp(72px,8vw,96px)',fontWeight:800,color:'#fff',lineHeight:1.1,marginBottom:24,letterSpacing:'-0.04em',maxWidth:1000}}>
          The ultimate platform for <br/>
          <span style={{background:'linear-gradient(180deg, #FFF 0%, #FF9933 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Indian Creators.</span>
        </h1>
        
        {/* Sleek Subtitle */}
        <p className="au d2" style={{fontSize:mob?16:20,color:'rgba(255,255,255,0.5)',lineHeight:1.6,marginBottom:48,fontWeight:400,maxWidth:640,fontFamily:"'Inter',sans-serif"}}>
          Build a world-class portfolio in minutes, showcase your true local influence, and let top brands bring deals directly to you. No middlemen.
        </p>
        
        {/* Minimal Buttons */}
        <div className="au d3" style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:mob?64:100,justifyContent:'center',width:'100%'}}>
          <Btn lg onClick={()=>go('apply')} style={{padding:'18px 36px',fontSize:16,background:'#fff',color:'#000',borderRadius:100,fontWeight:700,border:'none',boxShadow:'0 0 20px rgba(255,255,255,0.2)',flex:mob?1:'none',justifyContent:'center'}}>Claim Your Identity</Btn>
          <Btn lg variant="ghost" style={{padding:'18px 36px',fontSize:16,background:'transparent',color:'#fff',borderRadius:100,fontWeight:600,border:'1px solid rgba(255,255,255,0.2)',flex:mob?1:'none',justifyContent:'center'}} onClick={()=>go('campaigns')}>Explore Brands</Btn>
        </div>
        
        {/* Modern UI Mockup Presentation */}
        <div className="au d4" style={{width:'100%',maxWidth:1100,position:'relative',display:'flex',justifyContent:'center',perspective:2000}}>
          
          {/* Subtle glow behind UI */}
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'80%',height:'60%',background:'linear-gradient(135deg, rgba(255,153,51,0.15), rgba(16,185,129,0.15))',filter:'blur(100px)',zIndex:-1}}/>

          <div style={{position:'relative',width:'100%',height:mob?500:600,display:'flex',justifyContent:'center'}}>
            
            {/* The Dashboard App Window (Background) */}
            {!mob && <div style={{position:'absolute',top:40,width:'85%',height:500,background:'#050505',border:'1px solid rgba(255,255,255,0.08)',borderRadius:24,boxShadow:'0 40px 100px rgba(0,0,0,1)',overflow:'hidden',display:'flex',flexDirection:'column'}}>
               {/* Mac style header */}
               <div style={{height:48,borderBottom:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',padding:'0 20px',gap:8,background:'rgba(255,255,255,0.02)'}}>
                 <div style={{width:12,height:12,borderRadius:'50%',background:'#333'}}/>
                 <div style={{width:12,height:12,borderRadius:'50%',background:'#333'}}/>
                 <div style={{width:12,height:12,borderRadius:'50%',background:'#333'}}/>
                 <div style={{marginLeft:'auto',background:'rgba(255,255,255,0.05)',padding:'4px 12px',borderRadius:6,fontSize:12,color:'rgba(255,255,255,0.4)',fontFamily:'monospace'}}>creatorbharat.in/dashboard</div>
               </div>
               <div style={{display:'flex',flex:1}}>
                 {/* Sidebar */}
                 <div style={{width:200,borderRight:'1px solid rgba(255,255,255,0.05)',padding:20,display:'flex',flexDirection:'column',gap:16}}>
                   <div style={{height:24,background:'rgba(255,255,255,0.05)',borderRadius:6,width:'60%'}}/>
                   <div style={{height:24,background:'rgba(255,153,51,0.1)',borderRadius:6,width:'80%',border:'1px solid rgba(255,153,51,0.2)'}}/>
                   <div style={{height:24,background:'rgba(255,255,255,0.05)',borderRadius:6,width:'70%'}}/>
                   <div style={{height:24,background:'rgba(255,255,255,0.05)',borderRadius:6,width:'50%'}}/>
                 </div>
                 {/* Main Content */}
                 <div style={{flex:1,padding:32,display:'flex',flexDirection:'column',gap:24}}>
                   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                     <div style={{height:32,width:200,background:'rgba(255,255,255,0.1)',borderRadius:8}}/>
                     <div style={{height:32,width:100,background:'rgba(16,185,129,0.15)',borderRadius:8,border:'1px solid rgba(16,185,129,0.3)'}}/>
                   </div>
                   {/* Table mockup */}
                   <div style={{flex:1,background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:16,padding:20,display:'flex',flexDirection:'column',gap:16}}>
                     {[1,2,3,4].map(i=><div key={i} style={{height:48,background:'rgba(255,255,255,0.03)',borderRadius:8,display:'flex',alignItems:'center',padding:'0 16px',gap:16}}>
                       <div style={{width:32,height:32,borderRadius:'50%',background:'rgba(255,255,255,0.1)'}}/>
                       <div style={{height:12,width:'20%',background:'rgba(255,255,255,0.1)',borderRadius:4}}/>
                       <div style={{height:12,width:'40%',background:'rgba(255,255,255,0.05)',borderRadius:4,marginLeft:'auto'}}/>
                     </div>)}
                   </div>
                 </div>
               </div>
            </div>}

            {/* The Mobile Profile Frame (Foreground) */}
            <div style={{position:'absolute',top:0,left:mob?'50%':'25%',transform:mob?'translateX(-50%)':'none',width:280,height:580,background:'#050505',border:'8px solid #1A1A1E',borderRadius:40,boxShadow:'0 40px 80px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.1)',display:'flex',flexDirection:'column',overflow:'hidden',zIndex:10}}>
               {/* Mobile Notch */}
               <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:100,height:24,background:'#1A1A1E',borderBottomLeftRadius:16,borderBottomRightRadius:16,zIndex:10}}/>
               
               {/* Cover */}
               <div style={{height:120,background:'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80) center/cover'}}/>
               
               {/* DP */}
               <div style={{width:80,height:80,borderRadius:'50%',background:'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80) center/cover',border:'4px solid #050505',margin:'-40px auto 12px',position:'relative',zIndex:2}}/>
               
               <div style={{textAlign:'center',padding:'0 20px',flex:1,display:'flex',flexDirection:'column'}}>
                 <h3 style={{color:'#fff',fontSize:20,fontWeight:800,marginBottom:4,fontFamily:"'Inter',sans-serif"}}>Rahul Sharma</h3>
                 <p style={{color:'rgba(255,255,255,0.5)',fontSize:12,marginBottom:20,fontFamily:"'Inter',sans-serif"}}>Travel & Lifestyle • Jaipur</p>
                 
                 {/* Clean Stats */}
                 <div style={{display:'flex',gap:8,marginBottom:24}}>
                   <div style={{flex:1,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:12,padding:'10px'}}>
                     <div style={{color:'#fff',fontWeight:800,fontSize:16}}>248K</div>
                     <div style={{color:'rgba(255,255,255,0.4)',fontSize:9,textTransform:'uppercase',letterSpacing:'0.5px',marginTop:2}}>Followers</div>
                   </div>
                   <div style={{flex:1,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:12,padding:'10px'}}>
                     <div style={{color:'#FF9933',fontWeight:800,fontSize:16}}>6.8%</div>
                     <div style={{color:'rgba(255,255,255,0.4)',fontSize:9,textTransform:'uppercase',letterSpacing:'0.5px',marginTop:2}}>Eng Rate</div>
                   </div>
                 </div>

                 {/* Minimal Links */}
                 <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:'auto',marginBottom:20}}>
                   <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',padding:'12px',borderRadius:12,color:'#fff',fontSize:13,fontWeight:600}}>📸 Instagram</div>
                   <div style={{background:'#fff',padding:'12px',borderRadius:12,color:'#000',fontSize:14,fontWeight:800}}>🤝 Book Me (₹15k)</div>
                 </div>
               </div>
            </div>

            {/* Floating Flat Card (MakeMyTrip Request) */}
            {!mob && <div style={{position:'absolute',bottom:80,right:'15%',background:'rgba(15,15,15,0.85)',border:'1px solid rgba(255,255,255,0.1)',backdropFilter:'blur(20px)',borderRadius:16,padding:'16px',boxShadow:'0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',display:'flex',alignItems:'center',gap:16,zIndex:20,animation:'fadeUp 0.5s ease-out forwards',animationDelay:'0.8s',opacity:0}}>
              <div style={{width:40,height:40,borderRadius:'50%',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>✈️</div>
              <div>
                <p style={{fontSize:14,color:'#fff',fontWeight:700,marginBottom:2,fontFamily:"'Inter',sans-serif"}}>MakeMyTrip</p>
                <p style={{fontSize:12,color:'rgba(255,255,255,0.5)',fontFamily:"'Inter',sans-serif"}}>₹45,000 via Escrow</p>
              </div>
              <div style={{background:'#10B981',color:'#fff',fontSize:12,fontWeight:800,padding:'8px 16px',borderRadius:8,marginLeft:12,boxShadow:'0 4px 12px rgba(16,185,129,0.3)'}}>Accept</div>
            </div>}
          </div>
        </div>

      </div>
    </section>
