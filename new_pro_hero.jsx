    <section style={{background:'#000',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:mob?140:180,paddingBottom:mob?80:120,position:'relative',overflow:'hidden',textAlign:'center'}}>
      
      {/* 2027 Advanced Ambient Background */}
      {/* Spinning glow base */}
      <div style={{position:'absolute',top:'-10%',left:'50%',transform:'translateX(-50%)',width:'100vw',height:'60vh',background:'radial-gradient(ellipse at top, rgba(255, 148, 49, 0.15), transparent 70%)',filter:'blur(80px)',pointerEvents:'none',zIndex:0}}/>
      <div style={{position:'absolute',top:'20%',left:'30%',width:'40vw',height:'40vw',background:'radial-gradient(circle, rgba(16, 185, 129, 0.08), transparent 60%)',filter:'blur(100px)',pointerEvents:'none',zIndex:0,animation:'float 10s ease-in-out infinite alternate'}}/>
      <div style={{position:'absolute',top:'10%',right:'20%',width:'30vw',height:'30vw',background:'radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent 60%)',filter:'blur(100px)',pointerEvents:'none',zIndex:0,animation:'float 12s ease-in-out infinite alternate-reverse'}}/>
      
      {/* Perspective Grid Line Floor */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:'50vh',background:'linear-gradient(to top, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)',backgroundSize:'40px 40px',transform:'perspective(500px) rotateX(60deg)',transformOrigin:'bottom',maskImage:'linear-gradient(to top, black 0%, transparent 100%)',WebkitMaskImage:'linear-gradient(to top, black 0%, transparent 100%)',pointerEvents:'none',zIndex:1}}/>
      
      <div style={{...W(),position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
        
        {/* Futuristic Pill */}
        <div className="au" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'6px 16px 6px 8px',borderRadius:100,background:'linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',border:'1px solid rgba(255,255,255,0.1)',marginBottom:40,backdropFilter:'blur(10px)',boxShadow:'0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'}}>
          <div style={{background:'linear-gradient(90deg, #FF9431, #F59E0B)',padding:'2px 8px',borderRadius:100,fontSize:11,fontWeight:900,color:'#000',letterSpacing:'0.5px'}}>NEW</div>
          <span style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.8)',fontFamily:"'Inter',sans-serif",letterSpacing:'0.5px',paddingRight:8}}>The OS for Indian Creators</span>
        </div>
        
        {/* Massive Pro Headline */}
        <h1 className="au d1" style={{fontFamily:"'Inter',sans-serif",fontSize:mob?'clamp(48px,13vw,64px)':'clamp(72px,9vw,110px)',fontWeight:900,color:'#fff',lineHeight:1.05,marginBottom:24,letterSpacing:'-0.05em',maxWidth:1100,position:'relative'}}>
          Monetize your <br/>
          <span style={{background:'linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.4) 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>influence instantly.</span>
        </h1>
        
        {/* Refined Subtitle */}
        <p className="au d2" style={{fontSize:mob?16:22,color:'rgba(255,255,255,0.5)',lineHeight:1.6,marginBottom:48,fontWeight:400,maxWidth:700,fontFamily:"'Inter',sans-serif"}}>
          Connect with top brands, manage inbound deals via escrow, and scale your creator business. A complete ecosystem built exclusively for the Indian market.
        </p>
        
        {/* Premium CTA Buttons */}
        <div className="au d3" style={{display:'flex',gap:20,flexWrap:'wrap',marginBottom:mob?80:120,justifyContent:'center',width:'100%',position:'relative'}}>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:200,height:60,background:'#FF9431',filter:'blur(40px)',opacity:0.4,zIndex:-1}}/>
          <Btn lg onClick={()=>go('apply')} style={{padding:'20px 40px',fontSize:16,background:'#fff',color:'#000',borderRadius:100,fontWeight:800,border:'none',boxShadow:'0 0 0 1px rgba(255,255,255,0.2), 0 8px 30px rgba(255,255,255,0.15)',flex:mob?1:'none',justifyContent:'center',fontFamily:"'Inter',sans-serif"}}>Start Free Trial</Btn>
          <Btn lg variant="ghost" style={{padding:'20px 40px',fontSize:16,background:'rgba(255,255,255,0.03)',backdropFilter:'blur(10px)',color:'#fff',borderRadius:100,fontWeight:600,border:'1px solid rgba(255,255,255,0.1)',flex:mob?1:'none',justifyContent:'center',fontFamily:"'Inter',sans-serif"}} onClick={()=>go('campaigns')}>Explore Platform</Btn>
        </div>
        
        {/* 2027 Pro Bento Grid UI Representation */}
        <div className="au d4" style={{width:'100%',maxWidth:1200,position:'relative',display:'flex',justifyContent:'center',minHeight:mob?500:600}}>
          
          {/* Central Beam */}
          <div style={{position:'absolute',top:0,bottom:0,left:'50%',width:1,background:'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)',transform:'translateX(-50%)',zIndex:0}}/>

          {/* Main App Dashboard Mockup */}
          <div style={{width:'100%',maxWidth:900,height:mob?400:540,background:'rgba(10,10,12,0.8)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:24,boxShadow:'0 30px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)',backdropFilter:'blur(40px)',position:'relative',zIndex:2,display:'flex',flexDirection:'column',overflow:'hidden',transform:mob?'none':'translateY(-20px)'}}>
            
            {/* Fake Mac Toolbar */}
            <div style={{height:48,borderBottom:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',padding:'0 20px',gap:8,background:'rgba(255,255,255,0.02)'}}>
              <div style={{width:12,height:12,borderRadius:'50%',background:'rgba(255,255,255,0.1)'}}/>
              <div style={{width:12,height:12,borderRadius:'50%',background:'rgba(255,255,255,0.1)'}}/>
              <div style={{width:12,height:12,borderRadius:'50%',background:'rgba(255,255,255,0.1)'}}/>
              <div style={{margin:'0 auto',display:'flex',gap:8}}>
                 <div style={{width:200,height:24,background:'rgba(255,255,255,0.05)',borderRadius:6,border:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'rgba(255,255,255,0.3)',fontFamily:'monospace'}}>creatorbharat.in/dashboard</div>
              </div>
            </div>

            {/* Dashboard Inner Grid */}
            <div style={{display:'flex',flex:1,padding:24,gap:24}}>
              {/* Sidebar */}
              {!mob && <div style={{width:200,display:'flex',flexDirection:'column',gap:12}}>
                 <div style={{display:'flex',alignItems:'center',gap:12,padding:'8px 12px',background:'rgba(255,255,255,0.05)',borderRadius:12,border:'1px solid rgba(255,255,255,0.05)'}}>
                   <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg, #FF9431, #DC2626)'}}/>
                   <div>
                     <div style={{height:8,width:80,background:'rgba(255,255,255,0.8)',borderRadius:4,marginBottom:4}}/>
                     <div style={{height:6,width:50,background:'rgba(255,255,255,0.3)',borderRadius:3}}/>
                   </div>
                 </div>
                 <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:8}}>
                   {[1,2,3,4,5].map(i=><div key={i} style={{height:32,background:i===1?'rgba(255,255,255,0.08)':'transparent',borderRadius:8,display:'flex',alignItems:'center',padding:'0 12px',gap:12}}>
                     <div style={{width:16,height:16,borderRadius:4,background:i===1?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.2)'}}/>
                     <div style={{height:8,width:i===2?90:60,background:i===1?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.2)',borderRadius:4}}/>
                   </div>)}
                 </div>
              </div>}

              {/* Main Area Bento */}
              <div style={{flex:1,display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gridTemplateRows:'auto 1fr',gap:16}}>
                 {/* Top Stats */}
                 {[1,2,3].map(i=><div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:16,padding:20,display:'flex',flexDirection:'column',position:'relative',overflow:'hidden'}}>
                   <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:i===1?'linear-gradient(90deg, transparent, #10B981, transparent)':'none'}}/>
                   <div style={{height:10,width:80,background:'rgba(255,255,255,0.3)',borderRadius:4,marginBottom:16}}/>
                   <div style={{fontSize:28,fontWeight:800,color:'#fff',fontFamily:"'Inter',sans-serif",marginBottom:8}}>{i===1?'₹1.2M':i===2?'248K':'8.4%'}</div>
                   <div style={{height:6,width:40,background:'rgba(16,185,129,0.5)',borderRadius:3}}/>
                 </div>)}
                 {/* Big Graph */}
                 <div style={{gridColumn:'1 / -1',background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:16,padding:24,display:'flex',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}>
                      <div style={{height:12,width:120,background:'rgba(255,255,255,0.4)',borderRadius:4}}/>
                      <div style={{height:24,width:80,background:'rgba(255,255,255,0.1)',borderRadius:12}}/>
                    </div>
                    <div style={{flex:1,display:'flex',alignItems:'flex-end',gap:12,paddingBottom:16,borderBottom:'1px dashed rgba(255,255,255,0.1)'}}>
                       {[40,70,45,90,60,100,80].map((h,i)=><div key={i} style={{flex:1,height:`${h}%`,background:i===5?'linear-gradient(to top, #FF9431, #F59E0B)':'rgba(255,255,255,0.1)',borderRadius:'6px 6px 0 0',position:'relative'}}>
                         {i===5&&<div style={{position:'absolute',top:-24,left:'50%',transform:'translateX(-50%)',background:'#fff',color:'#000',fontSize:10,fontWeight:800,padding:'4px 8px',borderRadius:6}}>+42%</div>}
                       </div>)}
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Floating Pro Elements (Overlapping) */}
          {!mob && <>
            {/* Escrow Notification Card */}
            <div className="au d5" style={{position:'absolute',top:'45%',right:'2%',background:'rgba(20,20,22,0.85)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'16px 20px',boxShadow:'0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',backdropFilter:'blur(30px)',display:'flex',alignItems:'center',gap:16,zIndex:10,animation:'float 5s ease-in-out infinite'}}>
               <div style={{width:48,height:48,borderRadius:'50%',background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,boxShadow:'0 0 20px rgba(16,185,129,0.2)'}}>💸</div>
               <div>
                 <div style={{color:'rgba(255,255,255,0.5)',fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif",marginBottom:4,textTransform:'uppercase',letterSpacing:'0.5px'}}>Escrow Released</div>
                 <div style={{color:'#fff',fontSize:18,fontWeight:800,fontFamily:"'Inter',sans-serif"}}>₹ 45,000.00</div>
               </div>
            </div>

            {/* Campaign Invite Card */}
            <div className="au d5" style={{position:'absolute',bottom:'10%',left:'5%',background:'rgba(20,20,22,0.85)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'16px',boxShadow:'0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',backdropFilter:'blur(30px)',display:'flex',flexDirection:'column',gap:12,zIndex:10,animation:'float 6s ease-in-out infinite 1s'}}>
               <div style={{display:'flex',alignItems:'center',gap:12}}>
                 <div style={{width:32,height:32,borderRadius:8,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>✈️</div>
                 <div style={{color:'#fff',fontSize:14,fontWeight:700,fontFamily:"'Inter',sans-serif"}}>MakeMyTrip</div>
               </div>
               <div style={{fontSize:12,color:'rgba(255,255,255,0.6)',fontFamily:"'Inter',sans-serif",lineHeight:1.4,maxWidth:180}}>
                 "We'd love to collaborate on the upcoming Diwali campaign..."
               </div>
               <div style={{display:'flex',gap:8}}>
                 <div style={{background:'#fff',color:'#000',fontSize:11,fontWeight:800,padding:'6px 12px',borderRadius:6}}>Accept</div>
                 <div style={{background:'rgba(255,255,255,0.1)',color:'#fff',fontSize:11,fontWeight:600,padding:'6px 12px',borderRadius:6}}>Decline</div>
               </div>
            </div>
          </>}

        </div>

      </div>
    </section>
