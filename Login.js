const puppeteer = require('puppeteer');
const fs = require('fs').promises;
var args = process.argv
const chromeOptions = {
  executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  headless:false, 
  slowMo:10,
  defaultViewport: null
};
'use strict';

const puppeteer = require('puppeteer');

const led  = async() => {
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'], userDataDir: './user-data-dir'});
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height:1000 });
    await page.goto('https://www.instagram.com/p/CGazHvCjEpN/?igshid=1pmecylulfgd6');
    await page.waitForSelector('button[class="sqdOP  L3NKy   y3zKF     "]', {visible:true})
    await page.click('button[class="sqdOP  L3NKy   y3zKF     "]')
    await page.waitForSelector('input[type="text"]')
    await page.type('input[type="text"]', 'all3s_st1rbt', {delay:100})
  //  await page.type(String.fromCharCode(13));
    await page.waitForSelector('input[type="password"]')
    await page.type('input[type="password"]', '140876camj', {delay:100})
    await page.keyboard.press('Enter');
    await page.waitForSelector('button[class="sqdOP  L3NKy   y3zKF     "]', {visible:true})
    await page.click('button[class="sqdOP  L3NKy   y3zKF     "]')
    var a = 0
    while (a<9) {
      await page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea')
      await page.type('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea',' EU QUERO ', {delay:500})
      await page.keyboard.press('Enter');
      a++
    }
    await browser.close();
   
    
   


    const articles = await page.evaluate(() => {
      let titleLinks = document.querySelectorAll('h3.knswli-title > a');
      titleLinks = [...titleLinks];
      let articles = titleLinks.map(link => ({
        title: link.getAttribute('title'),
        url: link.getAttribute('href')
      }));
      return articles;
    });

    module.exports = articles;
  } catch (err) {
    console.error(err.message);
    await browser.close();
   
  } finally {
    await browser.close();
  }
};
setTimeout(() => {
  led();
}, 60000);
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