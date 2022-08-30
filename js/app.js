const { app, BrowserWindow, globalShortcut, ipcRenderer } = require("electron");
const path = require("path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 840,
    height: 640,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    },
  });
  mainWindow.setMenu(null)
  const ret = globalShortcut.register("CommandOrControl+1", () => {
    mainWindow.webContents.send('PlaySound', "./Sounds/vine boom.mp3")
  });
  const ret2 = globalShortcut.register("CommandOrControl+2", () => {
    mainWindow.webContents.send('PlaySound', "./Sounds/fart.mp3")
  });
  const ret3 = globalShortcut.register("CommandOrControl+3", () => {
    mainWindow.webContents.send('PlaySound', "./Sounds/AGHHHHHHH.mp3")
  });
  const ret4 = globalShortcut.register("CommandOrControl+4", () => {
    mainWindow.webContents.send('PlaySound', "./Sounds/AMONG US.mp3")
  });
  const ret5 = globalShortcut.register("CommandOrControl+5", () => {
    mainWindow.webContents.send('PlaySound', "./Sounds/BRAIN FART.mp3")
  });
  mainWindow.loadFile('index.html')
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  globalShortcut.unregisterAll();
});
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
