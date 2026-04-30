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
  
  // Check if Modal is open
  const modalText = await page.evaluate(() => {
    return document.body.innerText.includes('Your Ultimate');
  });

  console.log('Modal opened successfully:', modalText);

  await page.screenshot({ path: 'd:/creatorbharat-1/test_demo_modal_works.png' });

  await browser.close();
})();
