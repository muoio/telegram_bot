// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const { resolve } = require('path');
const path = require('path')
const puppeteer = require('puppeteer');

let browser, Authorizations;
var page1;
var page2;
let pages;

async function init(){
  browser = await puppeteer.launch({ headless: false,defaultViewport: null });
  await browser.newPage();
  pages = await browser.pages();
  page1 = pages[0];
  page2 = pages[1];
  await page2.goto("https://fwt.fialda.com/dashboard", { waitUntil: 'networkidle0'});
}
// async function login(){
//   await page1.goto('https://fwt.fialda.com/dashboard?action=login' ,{ waitUntil: 'networkidle0' });
//   return new Promise(resolve =>{
//     let login_process = setInterval(async () => {
//       let cookies = await page1.cookies('https://fwt.fialda.com');
//       for(let cookie of cookies)
//         if(cookie.name == 'Abp.LongAuthToken')
//           if (cookie.value.length > 0){
//             // cookies = get_nessecery_cookies(cookies);
//             // save_new_user(cookie.value, cookies);
//             Authorizations = cookie.value;
//             clearInterval(login_process);
//             //browser.close();
//             console.log("LOGGINED");
//             resolve(true);
//             return true;
//           }
//     },5000);
//   })
// }


// async function phaisinh(ma_ps){
//   return await page2.evaluate(async (ma_ps)=>{
//     alert(ma_ps);
//   }) 
// }


async function phaisinh(){
    let all_ps =  await pages[1].evaluate(async ()=>{
      let raw = "[{\"symbol\":\"VN30F2212\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}},{\"symbol\":\"VN30F2301\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}},{\"symbol\":\"VN30F2303\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}},{\"symbol\":\"VN30F2306\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}}]";
      let requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        body: raw,
        redirect: 'follow'
      };

      let res = await fetch("https://fwtapi4.fialda.com/api/services/app/Common/GetDerInfos", requestOptions);
      let res_text = await res.text();
      let res_json = await JSON.parse(res_text);
      res_json = res_json.result;
      console.log('res_json',res_json);
      return res_json;
    });
    let response_tele = '';
    let index = 0;
    for(let symbol in all_ps){
      if(++index > 2) break;
      let data_append = ["","Hiện tại:\t\t","Cao/Thấp:\t\t","Khối lượng:\t\t","Giá trị:\t\t"];
      let current_info = all_ps[symbol];
      //console.log('current_info',current_info);
      let currentPrice = parseFloat(current_info.PriceInfo.currentPrice).toFixed(2);
      let priceChange = parseFloat(current_info.PriceInfo.priceChange).toFixed(2);
      let priceChangePercent = parseFloat(current_info.PriceInfo.priceChangePercent*100).toFixed(1);
      let highPrice = parseFloat(current_info.PriceInfo.highPrice).toFixed(2);
      let lowPrice = parseFloat(current_info.PriceInfo.lowPrice).toFixed(2);
      let totalDealVol = parseInt(current_info.PriceInfo.totalDealVol);
      let totalDealValue = current_info.PriceInfo.totalDealValue;
      console.log(totalDealValue.toString().length)
      totalDealValue = totalDealValue.toString().length > 11 ? parseFloat(totalDealValue/1e12).toFixed(2) + ' nghìn tỷ' : parseFloat(totalDealValue/1e9).toFixed(2) + ' tỷ';
      
      data_append[0] += symbol;
      data_append[1] += currentPrice+" | "+priceChange+"/"+priceChangePercent;
      data_append[2] += highPrice + " | "+lowPrice;
      data_append[3] += totalDealVol;
      data_append[4] += totalDealValue;

      console.log('data_append: ',data_append);

      response_tele += data_append.join('\n') + '\n\n';
    }

    console.log(response_tele);
    return response_tele;
}

async function phaisinh_nuocngoai(){

}


async function get_info_cophieu(ma_cp){
  await page1.goto('https://fwt.fialda.com/co-phieu/'+ma_cp+'/kythuat' ,{ waitUntil: 'networkidle0' });
  //await page1.waitForSelector('.kythuat-giaodich');  
  return await page1.evaluate(async () => {
    function table_to_text(tb){
      let res = ''
      let title_tb = tb.querySelector('ul').textContent;
      res += title_tb+'\n';
      let tb_body = tb.querySelector('tbody');
      console.log('tbody')
      for(let row of tb_body.children){
        let row_key = row.children[0].textContent;
        let row_value = row.children[1].textContent;
        res += row_key +': '+ row_value+'\n';
      }
      return res;
    }
    let res = '';
    try{
      let infos = document.querySelector(".kythuat-giaodich .row").children;
      for(let i=0;i<3;++i)
        res += table_to_text(infos[i]) +'\n';
      console.log(res);
    }catch{ }
    return res;
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
  //await login();
  //await phaisinh();
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

// bot.command('command', async (ctx) => {
//   return await ctx.reply('this is text', Markup
//     .keyboard([
//       ['button 1', 'button 2'], // Row1 with 2 buttons
//       ['button 3', 'button 4'], // Row2 with 2 buttons
//       ['button 5', 'button 6', 'button 7'] // Row3 with 3 buttons
//     ])
//     .oneTime()
//     .resize()
//   )
// })

bot.command('cp', async (ctx) => {
  let texts = ctx.message.text.split(' ');
  if(texts.length>1){
    let res = await get_info_cophieu(texts[1]);
    if (res.length) ctx.reply("Cổ phiếu "+texts[1].toUpperCase()+'\n'+res)
    else ctx.reply("Mã "+texts[1]+" không tồn tại");
  }
});

bot.command('ps', async (ctx) =>{
    let res = await phaisinh();
    ctx.reply(res);
});


bot.launch();