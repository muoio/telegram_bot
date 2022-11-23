// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const { resolve } = require('path');
const path = require('path')
const puppeteer = require('puppeteer');

let browser, page, Authorizations;

async function init(){
  browser = await puppeteer.launch({ headless: false,defaultViewport: null });
  page = await browser.newPage();
}
async function login(){
  await page.goto('https://fwt.fialda.com/phaisinh/VN30F1M/tong-quan' ,{ waitUntil: 'networkidle0' });
  return new Promise(resolve =>{
    let login_process = setInterval(async () => {
      let cookies = await page.cookies('https://fwt.fialda.com');
      for(let cookie of cookies)
        if(cookie.name == 'Abp.LongAuthToken')
          if (cookie.value.length > 0){
            // cookies = get_nessecery_cookies(cookies);
            // save_new_user(cookie.value, cookies);
            Authorizations = cookie.value;
            clearInterval(login_process);
            //browser.close();
            console.log("LOGGINED")
            resolve(true);
            return true;
          }
    },5000);
  })
}

async function phaisinh(){
  console.log("PHAISINH")
  return await page.evaluate(async () => {
    let raw = "[{\"symbol\":\"VN30F2212\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}},{\"symbol\":\"VN30F2301\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}},{\"symbol\":\"VN30F2303\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}},{\"symbol\":\"VN30F2306\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}}]";
    let requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json;charset=UTF-8"},
      body: raw,
      redirect: 'follow'
    };
    return fetch("https://fwtapi4.fialda.com/api/services/app/Common/GetDerInfos", requestOptions)
      .then(response => response.text())
      .then(text => JSON.parse(text))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  });
}

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  await init();
  await login();
  await phaisinh();

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})





const { Telegraf } = require("telegraf");

const YOUR_TOKEN = "5603880218:AAGRMoQel50e2KxXV6r_cSrfeYuBMejNe38";
const bot = new Telegraf(YOUR_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));

bot.on("sticker", (ctx) => ctx.reply("🐶"));

bot.command('command', async (ctx) => {
  return await ctx.reply('this is text', Markup
    .keyboard([
      ['button 1', 'button 2'], // Row1 with 2 buttons
      ['button 3', 'button 4'], // Row2 with 2 buttons
      ['button 5', 'button 6', 'button 7'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
  )
})

bot.command('ps', (ctx) => {
  console.log(ctx.message.text);
  ctx.reply('Hello') 
});


bot.launch();