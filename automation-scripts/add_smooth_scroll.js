const fs = require('fs');
const file = 'd:/creatorbharat-1/creatorbharat-frontend/creatorBharat-v2.jsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add premium scrollbar to style block
const scrollbarStyle = `
      ::-webkit-scrollbar { width: 10px; }
      ::-webkit-scrollbar-track { background: #f8fafc; }
      ::-webkit-scrollbar-thumb { 
        background: linear-gradient(180deg, #FF9431 0%, #DC2626 100%); 
        border-radius: 10px; border: 2px solid #f8fafc; 
      }
      html.lenis { height: auto; }
      .lenis.lenis-smooth { scroll-behavior: auto !important; }
      .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
      .lenis.lenis-stopped { overflow: hidden; }
      .lenis.lenis-scrolling iframe { pointer-events: none; }
`;

if (code.includes('<style>{`')) {
  code = code.replace('<style>{`', '<style>{`' + scrollbarStyle);
}

// 2. Add Lenis to App component's useEffect
const lenisInjection = `
  useEffect(() => {
    // Inject Lenis for 3D smooth scroll
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
    script.onload = () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1.1,
        smoothWheel: true,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      window.lenis = lenis;
    };
    document.head.appendChild(script);
  }, []);
`;

// Find first useEffect in function App()
const appStart = code.indexOf('function App(){');
const firstUseEffect = code.indexOf('useEffect(', appStart);

if (firstUseEffect !== -1) {
  code = code.substring(0, firstUseEffect) + lenisInjection + '\n  ' + code.substring(firstUseEffect);
}

fs.writeFileSync(file, code);
console.log('Premium smooth scroll and custom scrollbar added.');
