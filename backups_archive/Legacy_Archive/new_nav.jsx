// NAVBAR
function Navbar(){
  const{st,dsp}=useApp();const{mob}=useVP();
  const[scroll,setScroll]=useState(false);
  useEffect(()=>{const h=()=>setScroll(window.scrollY>20);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h)},[]);
  const go=(p)=>{dsp({t:'GO',p});scrollToTop();dsp({t:'UI',v:{mobileMenu:false,notifPanel:false}})};
  const unread=st.notifications.filter(n=>!n.read).length;
  const isCreator=st.role==='creator',isBrand=st.role==='brand';
  const links=isCreator?[['dashboard','Dashboard'],['monetize','Monetize 💰'],['campaigns','Campaigns'],['leaderboard','Leaderboard'],['blog','Blog']]:isBrand?[['creators','Find Creators'],['campaigns','Campaigns'],['brand-dashboard','Dashboard'],['blog','Blog']]:[['creators','Creators'],['campaigns','Campaigns'],['monetize','Monetize 💰'],['pricing','Pricing'],['about','About']];

  // For the landing page, we use a totally 2027 dark pro theme.
  const isHome = st.page === 'home';
  const navBg = isHome ? (scroll ? 'rgba(10,10,12,0.7)' : 'rgba(10,10,12,0.2)') : (scroll ? 'rgba(255,255,255,0.85)' : '#fff');
  const navText = isHome ? '#fff' : T.t1;
  const navTextDim = isHome ? 'rgba(255,255,255,0.6)' : T.t2;
  const navBorder = isHome ? 'rgba(255,255,255,0.08)' : T.bd;
  const logoLight = isHome;

  return <>
    <div style={{position:'fixed',top:0,left:0,right:0,zIndex:5000,padding:mob?'12px 16px':(scroll?'16px 40px':'24px 40px'),transition:'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'}}>
      <nav style={{maxWidth:1200,margin:'0 auto',background:navBg,backdropFilter:'blur(40px)',WebkitBackdropFilter:'blur(40px)',border:`1px solid ${navBorder}`,borderRadius:mob?20:100,padding:mob?'0 16px':'0 24px',height:mob?60:72,display:'flex',alignItems:'center',gap:24,boxShadow:scroll?'0 20px 40px -10px rgba(0,0,0,0.3)':'0 10px 30px -10px rgba(0,0,0,0.1)',transition:'all 0.4s ease'}}>

        <Logo onClick={()=>go('home')} sm={mob} light={logoLight} />
        
        {!mob&&<div style={{display:'flex',alignItems:'center',gap:4,flex:1,marginLeft:40}}>
          {links.map(([p,l])=><button key={p} onClick={()=>go(p)} style={{padding:'8px 16px',background:st.page===p?(isHome?'rgba(255,255,255,0.1)':'rgba(255,148,49,0.08)'):'transparent',border:'none',color:st.page===p?(isHome?'#fff':T.gd):navTextDim,fontWeight:st.page===p?700:500,fontSize:14,cursor:'pointer',borderRadius:100,fontFamily:"'Inter',sans-serif",transition:'all .2s',letterSpacing:'0.2px'}} onMouseEnter={e=>e.target.style.color=isHome?'#fff':T.gd} onMouseLeave={e=>e.target.style.color=st.page===p?(isHome?'#fff':T.gd):navTextDim}>{l}</button>)}
        </div>}
        
        <div style={{display:'flex',alignItems:'center',gap:16,marginLeft:'auto'}}>
          {st.compared.length>0&&!mob&&<Btn sm variant="outline" onClick={()=>go('compare')} style={{borderColor:navBorder,color:navText}}>Compare ({st.compared.length})</Btn>}
          {st.user?<>
            <button onClick={()=>dsp({t:'UI',v:{notifPanel:!st.ui.notifPanel,mobileMenu:false}})} style={{position:'relative',background:isHome?'rgba(255,255,255,0.05)':T.bg2,border:`1px solid ${navBorder}`,cursor:'pointer',width:40,height:40,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={navText} strokeWidth="2.2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
              {unread>0&&<span style={{position:'absolute',top:-2,right:-2,minWidth:18,height:18,padding:'0 4px',background:'#EF4444',borderRadius:10,fontSize:10,fontWeight:900,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',border:`2px solid ${isHome?'#111':'#fff'}`}}>{unread>9?'9+':unread}</span>}
            </button>
            {!mob&&<div style={{position:'relative'}}>
              <button onClick={()=>dsp({t:'UI',v:{mobileMenu:!st.ui.mobileMenu,notifPanel:false}})} style={{display:'flex',alignItems:'center',gap:10,background:isHome?'rgba(255,255,255,0.05)':T.bg2,border:`1px solid ${navBorder}`,borderRadius:100,padding:'4px 16px 4px 4px',cursor:'pointer',fontFamily:"'Inter',sans-serif",transition:'all .2s'}}>
                <img src={(st.creatorProfile?.photo||st.creatorProfile?.avatarUrl)||`https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name||'U')}&background=FF9431&color=fff`} style={{width:32,height:32,borderRadius:'50%',objectFit:'cover',border:`1px solid ${navBorder}`}} alt=""/>
                <span style={{fontSize:14,fontWeight:700,color:navText,maxWidth:100,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{st.user.name||st.user.companyName}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke={navTextDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {st.ui.mobileMenu&&<div className="si" style={{position:'absolute',right:0,top:'calc(100% + 16px)',background:'#fff',border:`1px solid ${T.bd}`,borderRadius:24,minWidth:240,boxShadow:T.sh4,zIndex:100,overflow:'hidden',padding:10}}>
                {[isCreator&&['Dashboard','dashboard'],isCreator&&['Applications','applications'],isBrand&&['Brand Dashboard','brand-dashboard'],isBrand&&['Post Campaign','campaign-builder'],['Settings','settings'],['Saved Items','saved']].filter(Boolean).map(([l,p])=><button key={p} onClick={()=>{go(p);dsp({t:'UI',v:{mobileMenu:false}})}} style={{display:'block',width:'100%',padding:'14px 18px',background:st.page===p?T.ga:'none',border:'none',textAlign:'left',fontSize:14,color:st.page===p?T.gd:T.t1,cursor:'pointer',fontFamily:"'Inter',sans-serif",borderRadius:12,fontWeight:st.page===p?800:600,marginBottom:4}}>{l}</button>)}
                <div style={{height:1,background:T.bd,margin:'10px 0'}}/>
                <button onClick={()=>{dsp({t:'LOGOUT'});dsp({t:'UI',v:{mobileMenu:false}})}} style={{display:'block',width:'100%',padding:'14px 18px',background:'none',border:'none',textAlign:'left',fontSize:14,color:T.gd,cursor:'pointer',fontFamily:"'Inter',sans-serif",fontWeight:800,borderRadius:12}}>Logout</button>
              </div>}
            </div>}
          </>:<>
            {!mob&&<button onClick={()=>dsp({t:'UI',v:{authModal:true,authTab:'login'}})} style={{background:'transparent',border:'none',color:navText,fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:"'Inter',sans-serif",padding:'8px 16px'}}>Login</button>}
            {!mob&&<Btn lg onClick={()=>{go('apply')}} style={{fontWeight:800,borderRadius:100,padding:'10px 24px',fontSize:14,background:isHome?'#fff':'#111',color:isHome?'#000':'#fff',border:'none',boxShadow:isHome?'0 4px 14px rgba(255,255,255,0.2)':'none'}}>Join Now</Btn>}
          </>}
          {mob&&<button onClick={()=>dsp({t:'UI',v:{mobileMenu:!st.ui.mobileMenu}})} style={{background:isHome?'rgba(255,255,255,0.1)':T.bg2,border:`1px solid ${navBorder}`,cursor:'pointer',width:40,height:40,borderRadius:'50%',display:'flex',flexDirection:'column',gap:4,alignItems:'center',justifyContent:'center'}}>{[0,1,2].map(i=><span key={i} style={{display:'block',width:18,height:2,background:navText,borderRadius:1}}/>)}</button>}
        </div>
      </nav>
    </div>
    {mob&&st.ui.mobileMenu&&<div className="ai" style={{position:'fixed',inset:0,zIndex:4999,background:'rgba(0,0,0,.8)',backdropFilter:'blur(20px)'}} onClick={()=>dsp({t:'UI',v:{mobileMenu:false}})}><div className="sr" onClick={e=>e.stopPropagation()} style={{position:'absolute',top:0,right:0,bottom:0,width:'85%',maxWidth:320,background:'#111',borderLeft:'1px solid rgba(255,255,255,0.1)',boxShadow:'-20px 0 40px rgba(0,0,0,0.5)',padding:'32px 24px',display:'flex',flexDirection:'column',gap:16,overflowY:'auto'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><Logo light onClick={()=>go('home')}/><button onClick={()=>dsp({t:'UI',v:{mobileMenu:false}})} style={{width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,0.1)',border:'none',fontSize:24,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>×</button></div>{links.map(([p,l])=><button key={p} onClick={()=>{go(p);dsp({t:'UI',v:{mobileMenu:false}})}} style={{display:'block',width:'100%',padding:'14px 18px',background:st.page===p?'rgba(255,255,255,0.1)':'transparent',border:'none',textAlign:'left',fontSize:16,color:st.page===p?'#fff':'rgba(255,255,255,0.6)',cursor:'pointer',fontFamily:"'Inter',sans-serif",fontWeight:st.page===p?800:500,borderRadius:14}}>{l}</button>)}<div style={{height:1,background:'rgba(255,255,255,0.1)',margin:'8px 0'}}/>{!st.user?<><Btn full lg onClick={()=>{dsp({t:'UI',v:{authModal:true,authTab:'login',mobileMenu:false}})}} style={{background:'#fff',color:'#000'}}>Sign In</Btn><Btn full lg variant="outline" onClick={()=>{go('apply');dsp({t:'UI',v:{mobileMenu:false}})}} style={{borderColor:'rgba(255,255,255,0.2)',color:'#fff'}}>Get Listed Free</Btn></>:(<>{[isCreator&&['Dashboard','dashboard'],isCreator&&['Applications','applications'],isBrand&&['Brand Dashboard','brand-dashboard'],isBrand&&['Post Campaign','campaign-builder'],['Settings','settings'],['Saved Items','saved']].filter(Boolean).map(([l,p])=><button key={p} onClick={()=>{go(p);dsp({t:'UI',v:{mobileMenu:false}})}} style={{display:'block',width:'100%',padding:'14px 18px',background:st.page===p?'rgba(255,255,255,0.1)':'transparent',border:'none',textAlign:'left',fontSize:16,color:st.page===p?'#fff':'rgba(255,255,255,0.6)',cursor:'pointer',fontFamily:"'Inter',sans-serif",fontWeight:st.page===p?800:500,borderRadius:14}}>{l}</button>)}<button onClick={()=>{dsp({t:'LOGOUT'});dsp({t:'UI',v:{mobileMenu:false}})}} style={{display:'block',width:'100%',padding:'14px 18px',background:'none',border:'none',textAlign:'left',fontSize:16,color:'#EF4444',cursor:'pointer',fontFamily:"'Inter',sans-serif",fontWeight:800,borderRadius:14}}>Logout</button></>)}</div></div>}
    {st.ui.notifPanel&&<NotifPanel/>}
  </>;
}
