const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 }); // iPhone 12 Pro size

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Click the mobile hamburger menu button
  // The button has a span inside it
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const hamburger = btns.find(b => b.querySelectorAll('span').length === 3);
    if (hamburger) hamburger.click();
  });
  
  await new Promise(r => setTimeout(r, 600)); // wait for slide-in animation

  await page.screenshot({ path: 'd:/creatorbharat-1/pro_mobile_menu.png' });
  console.log('Screenshot saved to d:/creatorbharat-1/pro_mobile_menu.png');

  await browser.close();
})();
