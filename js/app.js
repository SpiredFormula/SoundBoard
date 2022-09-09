const { app, BrowserWindow, globalShortcut, ipcRenderer, ipcMain } = require("electron");
const path = require("path");
const fs = require('fs');
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 840,
    height: 640,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    },
  });
  function KeyBinds (event, key) {
    console.log(key)
    key = key.split(",")
    sound = key[1]
    key = key[0]
    //globalShortcut.unregister(`${key}`)
    globalShortcut.register(`${key}`, () => {
      mainWindow.webContents.send("PlaySound",`./Sounds/${sound}`)
    });
    
  }
  let clearKeyBinds = (event, input) => {
    globalShortcut.unregisterAll()
  }
  ipcMain.on('Key', KeyBinds)
  ipcMain.on("clear", clearKeyBinds)
  //mainWindow.setMenu(null)
  mainWindow.loadFile('index.html')
};
let GetFiles = () =>{
  fs.readdir("./Sounds", function(err, files) {
    fs.writeFile('./json/Sounds.json', ``, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    fs.appendFile('./json/Sounds.json', `{"Sounds":"${files}"}`, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  })
}
app.whenReady().then(() => {
  GetFiles()
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  globalShortcut.unregisterAll();
});
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});




