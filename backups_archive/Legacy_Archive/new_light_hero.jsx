    <section style={{background:'#FAFAFA',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:mob?140:180,paddingBottom:mob?80:120,position:'relative',overflow:'hidden',textAlign:'center'}}>
      
      {/* Light Mode Ambient Background Elements */}
      <div style={{position:'absolute',top:'-20%',left:'50%',transform:'translateX(-50%)',width:'100vw',height:'70vh',background:'radial-gradient(ellipse at top, rgba(255, 148, 49, 0.12), transparent 70%)',filter:'blur(60px)',pointerEvents:'none',zIndex:0}}/>
      <div style={{position:'absolute',top:'20%',left:'20%',width:'40vw',height:'40vw',background:'radial-gradient(circle, rgba(16, 185, 129, 0.08), transparent 60%)',filter:'blur(80px)',pointerEvents:'none',zIndex:0,animation:'float 10s ease-in-out infinite alternate'}}/>
      <div style={{position:'absolute',top:'10%',right:'15%',width:'35vw',height:'35vw',background:'radial-gradient(circle, rgba(59, 130, 246, 0.05), transparent 60%)',filter:'blur(80px)',pointerEvents:'none',zIndex:0,animation:'float 12s ease-in-out infinite alternate-reverse'}}/>
      
      {/* Light Grid Pattern */}
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none',maskImage:'linear-gradient(to bottom, black 40%, transparent 100%)',WebkitMaskImage:'linear-gradient(to bottom, black 40%, transparent 100%)'}}/>
      
      <div style={{...W(),position:'relative',zIndex:2,display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
        
        {/* Verification Pill */}
        <div className="au" style={{display:'inline-flex',alignItems:'center',gap:10,padding:'8px 16px',borderRadius:100,background:'#fff',border:'1px solid rgba(0,0,0,0.08)',marginBottom:32,boxShadow:'0 10px 30px -10px rgba(0,0,0,0.1)'}}>
          <div style={{background:'#10B981',color:'#fff',width:20,height:20,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:900}}>✓</div>
          <span style={{fontSize:14,fontWeight:700,color:'#111',fontFamily:"'Inter',sans-serif"}}>Trusted by 50,000+ Creators</span>
        </div>
        
        {/* Clear Identity Headline */}
        <h1 className="au d1" style={{fontFamily:"'Inter',sans-serif",fontSize:mob?'clamp(44px,12vw,56px)':'clamp(64px,8vw,88px)',fontWeight:900,color:'#111',lineHeight:1.1,marginBottom:24,letterSpacing:'-0.04em',maxWidth:1000}}>
          Your Digital <span style={{position:'relative',display:'inline-block'}}>
            <span style={{position:'relative',zIndex:2,background:'linear-gradient(90deg, #FF9431, #DC2626)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Identity</span>
            <svg style={{position:'absolute',bottom:-10,left:0,width:'100%',height:16,zIndex:1}} viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 15 Q 50 0 100 15" fill="none" stroke="rgba(255,148,49,0.3)" strokeWidth="6" strokeLinecap="round"/></svg>
          </span> <br/>
          Built in Minutes.
        </h1>
        
        {/* Tier 2 / Tier 3 Focused Subtitle */}
        <p className="au d2" style={{fontSize:mob?17:22,color:'rgba(0,0,0,0.6)',lineHeight:1.6,marginBottom:48,fontWeight:500,maxWidth:720,fontFamily:"'Inter',sans-serif"}}>
          Launch your verified creator portfolio, showcase your social reach, and attract top brand deals directly. The all-in-one link for Indian creators.
        </p>
        
        {/* Modern Solid Buttons */}
        <div className="au d3" style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:mob?80:100,justifyContent:'center',width:'100%'}}>
          <Btn lg onClick={()=>go('apply')} style={{padding:'20px 40px',fontSize:17,background:'#111',color:'#fff',borderRadius:100,fontWeight:800,border:'none',boxShadow:'0 10px 30px rgba(0,0,0,0.2)',flex:mob?1:'none',justifyContent:'center',fontFamily:"'Inter',sans-serif"}}>Claim Your Link</Btn>
          <Btn lg variant="ghost" style={{padding:'20px 40px',fontSize:17,background:'#fff',color:'#111',borderRadius:100,fontWeight:700,border:'1px solid rgba(0,0,0,0.1)',boxShadow:'0 4px 14px rgba(0,0,0,0.05)',flex:mob?1:'none',justifyContent:'center',fontFamily:"'Inter',sans-serif"}} onClick={()=>go('campaigns')}>View Demo</Btn>
        </div>
        
        {/* Portfolio Showcase Mockup (White / Bright App style) */}
        <div className="au d4" style={{width:'100%',maxWidth:1000,position:'relative',display:'flex',justifyContent:'center',perspective:1500,minHeight:600}}>
          
          <div style={{position:'relative',transform:'rotateY(-10deg) rotateX(5deg)',transformStyle:'preserve-3d'}}>
             
             {/* Main Phone Frame (White) */}
             <div style={{width:320,height:660,background:'#fff',borderRadius:48,border:'12px solid #F3F4F6',boxShadow:'0 40px 100px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)',position:'relative',display:'flex',flexDirection:'column',overflow:'hidden',zIndex:5,animation:'float 6s ease-in-out infinite'}}>
                
                {/* Notch */}
                <div style={{position:'absolute',top:8,left:'50%',transform:'translateX(-50%)',width:100,height:26,background:'#F3F4F6',borderRadius:20,zIndex:10}}/>

                {/* Portfolio Content Layer */}
                <div style={{flex:1,background:'#FAFAFA',display:'flex',flexDirection:'column',overflow:'hidden',position:'relative'}}>
                   {/* Cover */}
                   <div style={{height:150,background:'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80) center/cover'}}/>
                   
                   {/* Profile Avatar */}
                   <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:-50,position:'relative',zIndex:2}}>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" style={{width:100,height:100,borderRadius:'50%',border:'4px solid #fff',boxShadow:'0 10px 20px rgba(0,0,0,0.1)',objectFit:'cover'}} alt="Creator"/>
                      <div style={{marginTop:-14,background:'#fff',color:'#10B981',fontSize:11,fontWeight:800,padding:'4px 12px',borderRadius:20,border:'1px solid rgba(16,185,129,0.2)',display:'flex',alignItems:'center',gap:4,boxShadow:'0 4px 10px rgba(16,185,129,0.15)'}}>
                         ✓ Verified Creator
                      </div>
                   </div>

                   <div style={{padding:'20px 24px',textAlign:'center',flex:1,display:'flex',flexDirection:'column'}}>
                     <h3 style={{fontSize:24,fontWeight:900,color:'#111',fontFamily:"'Inter',sans-serif",marginBottom:4}}>Rahul Sharma</h3>
                     <p style={{fontSize:14,color:'rgba(0,0,0,0.6)',fontFamily:"'Inter',sans-serif",marginBottom:24,fontWeight:500}}>📍 Jaipur • Travel & Culture</p>
                     
                     {/* Stats Blocks */}
                     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:24}}>
                        <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.05)',borderRadius:16,padding:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.02)'}}>
                           <div style={{fontSize:20,fontWeight:900,color:'#111',fontFamily:"'Inter',sans-serif"}}>248K</div>
                           <div style={{fontSize:11,fontWeight:600,color:'rgba(0,0,0,0.5)',textTransform:'uppercase',letterSpacing:'0.5px',marginTop:4}}>Followers</div>
                        </div>
                        <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.05)',borderRadius:16,padding:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.02)'}}>
                           <div style={{fontSize:20,fontWeight:900,color:'#FF9431',fontFamily:"'Inter',sans-serif"}}>6.8%</div>
                           <div style={{fontSize:11,fontWeight:600,color:'rgba(0,0,0,0.5)',textTransform:'uppercase',letterSpacing:'0.5px',marginTop:4}}>Engagement</div>
                        </div>
                     </div>

                     {/* Clean Modern Buttons */}
                     <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:'auto'}}>
                        <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.08)',padding:'16px',borderRadius:16,fontSize:14,fontWeight:700,color:'#111',boxShadow:'0 4px 12px rgba(0,0,0,0.03)'}}>📸 View Instagram</div>
                        <div style={{background:'linear-gradient(90deg, #FF9431, #DC2626)',padding:'16px',borderRadius:16,fontSize:15,fontWeight:800,color:'#fff',boxShadow:'0 8px 20px rgba(255,148,49,0.3)'}}>🤝 Book for ₹15,000</div>
                     </div>
                   </div>
                </div>
             </div>

             {/* Floating Identity & Growth Elements */}
             {!mob && <>
                {/* Brand Deal Alert */}
                <div className="au d5" style={{position:'absolute',top:120,right:-120,background:'#fff',border:'1px solid rgba(0,0,0,0.05)',borderRadius:20,padding:'16px 20px',boxShadow:'0 20px 40px rgba(0,0,0,0.1)',display:'flex',alignItems:'center',gap:16,zIndex:10,animation:'float 5s ease-in-out infinite 0.5s',transform:'translateZ(80px)'}}>
                  <div style={{width:48,height:48,borderRadius:'50%',background:'#F3F4F6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>✈️</div>
                  <div>
                     <p style={{fontSize:14,fontWeight:800,color:'#111',marginBottom:2,fontFamily:"'Inter',sans-serif"}}>MakeMyTrip</p>
                     <p style={{fontSize:12,fontWeight:500,color:'rgba(0,0,0,0.5)',fontFamily:"'Inter',sans-serif"}}>New campaign request</p>
                  </div>
                </div>

                {/* Identity Tag */}
                <div className="au d5" style={{position:'absolute',bottom:140,left:-100,background:'#fff',border:'1px solid rgba(0,0,0,0.05)',borderRadius:20,padding:'16px 20px',boxShadow:'0 20px 40px rgba(0,0,0,0.1)',display:'flex',alignItems:'center',gap:16,zIndex:10,animation:'float 6s ease-in-out infinite 1s',transform:'translateZ(60px)'}}>
                  <div style={{width:48,height:48,borderRadius:'50%',background:'rgba(16,185,129,0.1)',color:'#10B981',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:900}}>✓</div>
                  <div>
                     <p style={{fontSize:14,fontWeight:800,color:'#111',marginBottom:2,fontFamily:"'Inter',sans-serif"}}>Profile Verified</p>
                     <p style={{fontSize:12,fontWeight:500,color:'rgba(0,0,0,0.5)',fontFamily:"'Inter',sans-serif"}}>creatorbharat.in/rahul</p>
                  </div>
                </div>
             </>}

          </div>

        </div>
      </div>
    </section>
