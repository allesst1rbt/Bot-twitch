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
  await page.goto('https://www.twitch.tv/');
  await page.waitForSelector("div[class='tw-pd-x-05']", {visible:true })
  await page.click("div[class='tw-pd-x-05']")
  await page.waitForSelector('#login-username', {visible:true})
  await page.type('#login-username',args[2],{delay:100})
  await page.waitForSelector('#password-input', {visible:true})
  await page.type('#password-input',args[3],{delay:100})
  await page.keyboard.press('Enter')
  await page.waitFor(180000)
  const cookies = await page.cookies();
  await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
  

  await browser.close();
})();