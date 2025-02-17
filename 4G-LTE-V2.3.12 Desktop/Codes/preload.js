const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  login: (credentials) => ipcRenderer.send('login', credentials),
  onLoginSuccess: (callback) => ipcRenderer.on('login-success', callback),
  onLoginFailure: (callback) => ipcRenderer.on('login-failure', callback),
});