// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

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
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const { Telegraf } = require("telegraf");

const YOUR_TOKEN = "5603880218:AAGRMoQel50e2KxXV6r_cSrfeYuBMejNe38";
const bot = new Telegraf(YOUR_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));

bot.on("sticker", (ctx) => ctx.reply("🐶"));

// bot.on("message", async (ctx) => {
//   const message = ctx.update.message.text;
//   if (message.match(/hello/)) {
//     ctx.reply("Xin chào");
//   } else {
//     ctx.reply("Hong hiểu...");
//   }
// });

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

bot.command('oldschool', (ctx) => ctx.reply('Hello'));


bot.launch();