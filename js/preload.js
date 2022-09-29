const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    Play: (callback) => ipcRenderer.on('PlaySound', callback),
    Key: (key) => ipcRenderer.send('Key', key),
    clear: (input) => ipcRenderer.send("clear", input)
})

