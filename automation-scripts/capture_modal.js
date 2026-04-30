const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Click the View Demo button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const demoBtn = btns.find(b => b.textContent.includes('View Demo'));
    if (demoBtn) demoBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000)); // wait for animation
  
  // Scroll down inside the modal
  await page.evaluate(() => {
    const scrollableDivs = Array.from(document.querySelectorAll('div')).filter(el => {
      const style = window.getComputedStyle(el);
      return style.overflowY === 'auto' && el.innerHTML.includes('Rahul Sharma');
    });
    if (scrollableDivs.length > 0) {
      scrollableDivs[0].scrollTop = 400; // scroll down
    }
  });
  await new Promise(r => setTimeout(r, 500)); // wait for scroll

  await page.screenshot({ path: 'd:/creatorbharat-1/full_demo_modal.png' });
  console.log('Screenshot saved to d:/creatorbharat-1/full_demo_modal.png');

  await browser.close();
})();
