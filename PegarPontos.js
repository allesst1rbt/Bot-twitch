const puppeteer = require('puppeteer');
const fs = require('fs').promises;
var args = process.argv
const chromeOptions = {
  executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  headless:false, 
  slowMo:10,
  defaultViewport: null
};
(async () => {
  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();
  const cookiesString = await fs.readFile('./cookies.json');
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);
  await page.goto('https://www.twitch.tv/'+args[2]);
 while(true){
  let a =  await page.evaluate( () => {
    var result =parseFloat(document.querySelector("span.tw-animated-number:not(.tw-animated-number--monospaced)").innerText)
    return result*1000
  });
  console.log('você tem '+a+' pontos')
  await page.waitFor(1800000)
  await page.waitForSelector('button[class="tw-button tw-button--success tw-interactive"', {visible:true})
  await page.click('button[class="tw-button tw-button--success tw-interactive"')
  console.log('+50 pa conta do pai')
  
  console.log('você tem '+a+' pontos')
}
  await browser.close();
})();