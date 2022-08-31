const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    Play: (callback) => ipcRenderer.on('PlaySound', callback),
})

