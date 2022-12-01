// Modules to control application life and create native browser window
const { info } = require('console');
const {app, BrowserWindow} = require('electron');
const { resolve } = require('path');
const path = require('path')
const puppeteer = require('puppeteer');

let browser, Authorizations;
var page1;
var page2;
let pages;

const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];


async function init(){
  browser = await puppeteer.launch({ headless: false,defaultViewport: null});
  // await browser.newPage();
  // await browser.newPage();
  pages = await browser.pages();
  page1 = pages[0];
  //page2 = pages[0];
  await pages[0].goto("https://fwt.fialda.com/dashboard", { waitUntil: 'networkidle0'});
  //await pages[0].goto("https://fwt.fialda.com/dashboard", { waitUntil: 'networkidle0'});
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

let bot_info =  `Vào group để sử dụng bot https://web.telegram.org/z/
  Yen Nguyen - ID E218 - Chung khoan VPS
  ☎ : 0898889979
  📧 : yennlm@vps.com.vn`

function help(){
  let help = '/help 📃 Xem hướng dẫn sử dụng\n'
  help += '/cp mã 🔎 Xem thông tin của mã\n'
  help += '/ps 🔰 Tra cứu phái sinh\n'
  help += '/ps nn 💊 Tra cứu phái sinh nước ngoài\n'
  help += '/tg 🌎 Xem thị trường thế giới\n'
  help += '/hh 🛢️ Xem thị trường hàng hóa\n'
  help += '/crypto 🐬 Xem thị trường Crypto'
  return help;
}

// async function bieudo(ma_cp){
//   await pages[2].goto('https://fwt.fialda.com/co-phieu/'+ma_cp+'/kythuat' ,{ waitUntil: 'networkidle0' });
//   await pages[2].waitForSelector('.TVChartContainer');  
//   await pages[2].evaluate(()=>{
//     let chart = document.querySelector('.TVChartContainer');
//     document.body.innerHTML = chart.innerHTML;
//   });
//   await pages[2].waitForTimeout(1000);
//   //chart = await pages[2].$('.TVChartContainer');
//   await pages[2].screenshot({path:  './chart.png'});
//   return true;
// }


async function get_info_cophieu(ma_cp){
  await page1.goto('https://fwt.fialda.com/co-phieu/'+ma_cp+'/kythuat' ,{ waitUntil: 'networkidle0' });
  //await page1.waitForSelector('.kythuat-giaodich');  
  return await page1.evaluate(async () => {
    try{
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
      let info_cp = document.querySelector('.info-cp .card-title');
      res += info_cp.textContent + ' - ' + info_cp.nextSibling.textContent + '\n';
      try{
        let infos = document.querySelector(".kythuat-giaodich .row").children;
        let emojis = ['📊','⚡️','💰']
        for(let i=0;i<3;++i)
          res += emojis[i]+table_to_text(infos[i]) +'\n';
        console.log(res);
      }catch{ }
      return res;
    }
    catch {return "Tra cứu cổ phiếu bị lỗi"}
  });
}

// async function get_info_cophieu(ma_cp){
//   return await pages[0].evaluate(async (ma_cp)=>{

//     let __CHART_AjaxAntiForgeryForm = document.getElementById('__CHART_AjaxAntiForgeryForm');
//     let key = __CHART_AjaxAntiForgeryForm.firstChild.value;

//     ma_cp = ma_cp.toUpperCase();
//     var urlencoded = new URLSearchParams();
//     urlencoded.append("__RequestVerificationToken", key);
//     urlencoded.append("code", ma_cp);
//     urlencoded.append("s", "0");
//     urlencoded.append("t", "");

//     var requestOptions = {
//       method: 'POST',
//       body: urlencoded,
//       redirect: 'follow'
//     };

//     let infos = await fetch("https://finance.vietstock.vn/company/tradinginfo", requestOptions)
//       .then(response => response.text())
//       .then(text => JSON.parse(text));

//     let ten_cty = await fetch("https://finance.vietstock.vn/vi/cophieu/"+ma_cp, {method:'GET', redirect:'follow'})
//     .then(response => response.text())
//     .then(text =>{
//       let regex_company_san = /filter-branch.*?<b>(?<company>.*?)<.*?<b>(?<san>.*?):/gm;
      
//       let match = regex_company_san.exec(text);
//       console.log(match);
//       return match.groups.company +'('+match.groups.san+':';
//     })
//     console.log(infos);
//     let response_tele = ten_cty + ma_cp+')\n';
//     let giaodich = '📊Giao dịch\n';
//     let change = infos.Change > 0? '+'+infos.Change:infos.Change;
    
//     let PerChange = infos.PerChange > 0 ? '+'+infos.PerChange:infos.PerChange;
//     let TotalVal = infos.TotalVal;
//     TotalVal = TotalVal.toString().length > 9 ? (TotalVal/1e9)+' B' : (TotalVal.toString() > 6 ? (TotalVal/1e6) + ' M':TotalVal);

//     giaodich += 'Hiện tại:\t'+infos.lastPrice+' | '+ change + ' | ' + PerChange+'%\n';
//     giaodich += 'Cao/Thấp:\t' + infos.HighestPrice + ' | '+infos.LowestPrice +'\n';
//     giaodich += 'Khối lượng:\t'+infos.TotalVol  +'\n';
//     giaodich += 'Giá trị:\t'+TotalVal+'\n';
//     giaodich += 'KLTB (10 ngày):\t'+


//     return response_tele;
//   }, ma_cp);
// }

async function phaisinh(){
    let all_ps =  await pages[0].evaluate(async ()=>{
      try{
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
      } catch{ }
    });
    try{
      let response_tele = '';
      let index = 0;
      for(let symbol in all_ps){
        if(++index > 2) break;
        let data_append = ["","Hiện tại:\t\t","Cao/Thấp:\t\t","Khối lượng:\t\t","Giá trị:\t\t"];
        let current_info = all_ps[symbol];
        //console.log('current_info',current_info);
        let currentPrice = parseFloat(current_info.PriceInfo.matchedPrice).toFixed(2);
        let priceChange = parseFloat(current_info.PriceInfo.priceChange).toFixed(2);
        priceChange = priceChange > 0 ? '+'+priceChange.toString():'-'+priceChange.toString();
        let priceChangePercent = parseFloat(current_info.PriceInfo.priceChangePercent*100).toFixed(1);
        priceChangePercent = priceChangePercent>0 ? '+'+priceChangePercent.toString() : priceChangePercent.toString();
        let highPrice = parseFloat(current_info.PriceInfo.highPrice).toFixed(2);
        let lowPrice = parseFloat(current_info.PriceInfo.lowPrice).toFixed(2);
        let totalDealVol = parseInt(current_info.PriceInfo.totalDealVol);
        let totalDealValue = current_info.PriceInfo.totalDealValue;
        console.log(totalDealValue.toString().length)
        totalDealValue = totalDealValue.toString().length > 12 ? parseFloat(totalDealValue/1e12).toFixed(2) + ' nghìn tỷ' : parseFloat(totalDealValue/1e9).toFixed(2) + ' tỷ';
        
        data_append[0] += all_ps[symbol].BasicInfo.derCode;
        data_append[1] += currentPrice+" | "+priceChange+" / "+priceChangePercent+'%';
        data_append[2] += highPrice + " | "+lowPrice;
        data_append[3] += totalDealVol;
        data_append[4] += totalDealValue;

        console.log('data_append: ',data_append);

        response_tele += data_append.join('\n') + '\n\n';
      }

      console.log(response_tele);
      return response_tele;
    }
    catch{ return "Tra cứu phái sinh bị lỗi" }
}




async function ps_nn(){
  return await pages[0].evaluate(async ()=>{
    try{
      function getFormatedDate(t){
        let date = new Date(t);
        let year = date.getFullYear()
        let month = ("0" + (date.getMonth()+1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        let hours = ('0' + date.getHours()).slice(-2);
        let minutes = ('0' + date.getMinutes()).slice(-2);
        let seconds = ('0' + date.getSeconds()).slice(-2);
        let miliseconds = ('00' + date.getMilliseconds()).slice(-3);
        let str = year+'-'+month+'-'+day+'T'+hours+':'+minutes+':'+seconds+'.'+miliseconds;
        return str;
      }

      function insert_at_position(a, b, position){
        return [a.slice(0, position), b, a.slice(position+b.length)].join('');
      }

      let raw = "[{\"symbol\":\"VN30F2212\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}},{\"symbol\":\"VN30F2301\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}},{\"symbol\":\"VN30F2303\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}},{\"symbol\":\"VN30F2306\",\"changeRecords\":{\"BasicInfo\":0,\"BasicPrice\":0,\"Price\":0,\"BidAsk\":0,\"PTInfo\":0,\"ForeignTrade\":0,\"RealtimeStatistic\":0}}]";
      let requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        body: raw,
        redirect: 'follow'
      };

      let res = await fetch("https://fwtapi4.fialda.com/api/services/app/Common/GetDerInfos", requestOptions);
      let res_text = await res.text();
      let all_ps = await JSON.parse(res_text);
      all_ps = all_ps.result;

      let response_tele = '';
      let index = 0;

      for(let symbol in all_ps){
        if(++index > 2) break;
        response_tele += all_ps[symbol].BasicInfo.derCode + '     Mua       Bán      M-B\n'
        let t_now = new Date().getTime();
        let t_prev = t_now - 1000*60*60*24*30;
        let fromDate = getFormatedDate(t_prev);
        let toDate = getFormatedDate(t_now);
        let req_url = 'https://fwtapi4.fialda.com/api/services/app/StockInfo/GetHistoricalData_ForeignerTrading?symbol='+symbol+'&fromDate='+fromDate+'&toDate='+toDate+'&pageNumber=1&pageSize=5'
        //console.log(req_url);
        
        let res = await fetch(req_url);
        res = await res.text();
        let items = JSON.parse(res).result.items;
        console.log(items);



        for (let i=0;i<items.length; ++i){
          console.log('items[i]',items[i]);
          let date = items[i].tradingTime.split('T')[0]
          let foreignBuyVol = items[i].foreignBuyVol.toString();
          let foreignSellVol = items[i].foreignSellVol.toString();
          let diff = (items[i].foreignBuyVol - items[i].foreignSellVol).toString();
          let row = date + '                                 ';
          row =  foreignBuyVol[0] == '-' ? insert_at_position(row, foreignBuyVol, 14):insert_at_position(row, foreignBuyVol, 15);
          row = foreignSellVol[0] == '-' ? insert_at_position(row, foreignSellVol, 24):insert_at_position(row, foreignSellVol, 25);
          row = diff[0] == '-' ? insert_at_position(row, diff, 34):insert_at_position(row, '+'+diff, 35);
          //response_tele += justified_row(date, foreignBuyVol, foreignSellVol, diff, 40) +'\n';
          response_tele += row + '\n';
        }
        response_tele+='\n';
      }
      return response_tele;
    }
    catch{ return "Tra cứu phái sinh nước ngoài bị lỗi"}
  });
}




async function thegioi(){
  return await pages[0].evaluate(async () => {
    try{
      const getFlagEmoji = (countryCode) => countryCode.toUpperCase().replace(/./g,
        char => String.fromCodePoint(127397 + char.charCodeAt())
      );
      function put_at_posittions(arr, arr_pos){
        if (arr_pos.length !== arr.length) return '';
        let res = ' '.repeat(arr[arr.length-1].length + arr_pos[arr_pos.length-1]);
        for (let i=0;i<arr_pos.length;++i){
          res = [res.slice(0, arr_pos[i]), arr[i], res.slice(arr_pos[i])].join('');
        }
        console.log(res)
        res = res.trim();
        return res;
      }


      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      let res = await fetch('https://fwtapi3.fialda.com/api/services/app/Home/GetTopWorldData', requestOptions);
      res = await res.text();
      res = JSON.parse(res);
      console.log(res);
      let worlds = res.result;
      let response_tele = '';
      
      for(let i=0;i<worlds.length;++i){
        let country = getFlagEmoji(worlds[i].country);
        let indexName = worlds[i].indexName.toString();
        let currentIndex = worlds[i].currentIndex.toString();
        let indexChange = worlds[i].indexChange.toString();
        indexChange = indexChange>0 ? '+'+indexChange:indexChange;
        let indexPercentChange = worlds[i].indexPercentChange.toString();
        indexPercentChange = indexPercentChange>0 ? '+'+indexPercentChange:indexPercentChange;
        console.log([indexName, currentIndex, indexChange, indexPercentChange]);
        response_tele += put_at_posittions([country, indexName,currentIndex], [0, 4, 20])+' | ' + indexChange + ' | '+ indexPercentChange+'%\n';
        //response_tele += put_at_posittions([indexName,currentIndex],[0, 17])+'\n'+ put_at_posittions([indexChange, indexPercentChange], [25,35]) +'\n';
      }
      response_tele += "\n";
      return response_tele;
    }
    catch {return "Xem thị trường thế giới bị lỗi" }
  });
}


async function hanghoa(){
  return await pages[0].evaluate(async ()=>{
    try{
      function getFormatedDate(t){
        let date = new Date(t);
        let year = date.getFullYear()
        let month = ("0" + (date.getMonth()+1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        let hours = ('0' + date.getHours()).slice(-2);
        let minutes = ('0' + date.getMinutes()).slice(-2);
        let seconds = ('0' + date.getSeconds()).slice(-2);
        let miliseconds = ('00' + date.getMilliseconds()).slice(-3);
        let str = year+'-'+month+'-'+day+'T'+hours+':'+minutes+':'+seconds+'.'+miliseconds;
        return str;
      }

      function put_at_posittions(arr, arr_pos){
        if (arr_pos.length !== arr.length) return '';
        let res = ' '.repeat(arr[arr.length-1].length + arr_pos[arr_pos.length-1]);
        for (let i=0;i<arr_pos.length;++i){
          res = [res.slice(0, arr_pos[i]), arr[i], res.slice(arr_pos[i])].join('');
        }
        console.log(res)
        res = res.trim();
        return res;
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json;charset=UTF-8");

      let hh_codes = ['68','8830', '8833', '8849'];
      let payload = [];
      for (let code of hh_codes){
        let time_now = new Date().getTime() - parseInt(code)%17;
        let hh_payload = { };
        hh_payload['text'] = code;
        hh_payload['dateTime'] = getFormatedDate(time_now - 1000*60*60*13);
        payload.push(hh_payload);
      }
      console.log(payload);
      var raw = "[{\"text\":\"68\",\"dateTime\":\"2022-11-28T22:51:22.892\"},{\"text\":\"8830\",\"dateTime\":\"2022-11-28T22:51:23.461\"},{\"text\":\"8833\",\"dateTime\":\"2022-11-28T22:51:19.665\"},{\"text\":\"8849\",\"dateTime\":\"2022-11-28T22:51:21.158\"}]";
      let raw1 = JSON.stringify(payload);
      console.log(raw);
      console.log(raw1);
      //let raw = JSON.stringify(payload);
      //raw = raw.replaceAll('\"',"\\\"");
      //let raw = payload;
      console.log('raw',raw);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw1,
        redirect: 'follow'
      };

      let res = await fetch("https://fwtapi3.fialda.com/api/services/app/Common/GetWMarkets", requestOptions)
      res = await res.text();
      res = JSON.parse(res);
      res = res.result;

      let response_tele = ''
      for (let symbol in res){
        let name = res[symbol].name;
        let lastPrice = res[symbol].lastPrice;
        let priceChange = res[symbol].priceChange;
        priceChange = priceChange>0 ? '+'+priceChange:priceChange;
        let priceChangePercent = res[symbol].priceChangePercent;
        priceChangePercent = priceChangePercent>0 ? '+'+priceChangePercent:priceChangePercent;
        response_tele += put_at_posittions([name, lastPrice.toString()],[0,14]) + ' | ' +priceChange.toString() + ' | '+priceChangePercent.toString() +'%\n';
      }
      return response_tele;
    }
    catch{return "Xem thị trường hàng hóa bị lỗi"}
  });
}


async function crypto(){
  return await pages[0].evaluate(async () => {
    try{
      function insert_at_position(a, b, position){
        return [a.slice(0, position), b, a.slice(position+b.length)].join('');
      }
      function justified_row(arr, l){
        let space_length = l
        for (let a of arr)
          space_length -= a.length;
        if (space_length<0) {
          console.log('space_length', space_length);
          return arr.join('\t');
        }
        let spaces = '';
        for (let i=0;i<space_length/arr.length;++i)  spaces += ' ';
        return arr.join(spaces);
      }


      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      let res = await fetch('https://fwtapi3.fialda.com/api/services/app/Home/GetTopWorldData?type=Crypto&numberOfItem=35', requestOptions);
      console.log(res);
      res = await res.text();
      res = JSON.parse(res);
      let worlds = res.result;
      let response_tele = '';
      
      for(let i=0;i<worlds.length;++i){
        let indexName = worlds[i].indexName.toString();
        let currentIndex = worlds[i].currentIndex.toString();
        let indexChange = worlds[i].indexChange.toString();
        indexChange = indexChange>0? '+'+indexChange:indexChange;
        let indexPercentChange = worlds[i].indexPercentChange.toString();
        indexPercentChange = indexPercentChange>0 ? '+'+indexPercentChange : indexPercentChange;

        console.log([indexName, currentIndex, indexChange, indexPercentChange]);
        response_tele += indexName+'\t\t\t'+currentIndex+' | ' + indexChange + ' | '+ indexPercentChange+'%\n';
        //response_tele += put_at_posittions([indexName,currentIndex],[0, 17])+'\n'+ put_at_posittions([indexChange, indexPercentChange], [25,35]) +'\n';
      }
      response_tele += "\n";
      return response_tele;
    }
    catch{ return "Xem thị trường Crypto bị lỗi" }
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
bot.help((ctx) => {
  let res = help();
  ctx.reply(res)
});

bot.command('cp', async (ctx) => {
  let texts = ctx.message.text.split(' ');
  if (ctx.message.chat.type != 'group') {
    ctx.reply(bot_info);
    return;
  }
  if(texts.length>1){
    let res = await get_info_cophieu(texts[1]);
    if (res.length) ctx.reply(res)
    else ctx.reply("Mã "+texts[1]+" không tồn tại");
  }
});

bot.command('bd', async (ctx) =>{
  let texts = ctx.message.text.split(' ');
  if (ctx.message.chat.type != 'group') {
    ctx.reply(bot_info);
    return;
  }
  if(texts.length>1){
    //let bd = await bieudo(texts[1]);
    ctx.replyWithPhoto({url:'https://vip.cophieu68.vn/imagechart/candle/'+texts[1]+'.png'},{ caption: texts[1] + "chart" });
  }
});


bot.command('ps', async (ctx) =>{
  if (ctx.message.chat.type != 'group') {
    ctx.reply(bot_info);
    return;
  }

  let texts = ctx.message.text.split(' ');
  if(texts.length>1){
    if(texts[1] == 'nn'){
      let res = await ps_nn();
      ctx.reply(res);
    }
  }
  else {
    let res = await phaisinh();
    ctx.reply(res);
  }
});

bot.command('tg', async (ctx) =>{
  if (ctx.message.chat.type != 'group') {
    ctx.reply(bot_info);
    return;
  }

  let res = await thegioi();
  ctx.reply(res);
});

bot.command('crypto', async (ctx)=>{
  if (ctx.message.chat.type != 'group') {
    ctx.reply(bot_info);
    return;
  }
  
  let res = await crypto();
  ctx.reply(res);
})


bot.command('hh', async (ctx) =>{
  if (ctx.message.chat.type != 'group') {
    ctx.reply(bot_info);
    return;
  }
  let res = await hanghoa();
  ctx.reply(res);
})

bot.launch();