const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'), // Add a preload script
    },
  });

  // Load the IP address of your Wi-Fi dongle admin panel
  mainWindow.loadURL('http://192.168.100.1');

  // Open the DevTools (optional)
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Example: Handle IPC communication for authentication
ipcMain.on('login', (event, credentials) => {
  const { username, password } = credentials;
  // Perform authentication logic here
  if (username === 'admin' && password === 'password') {
    event.reply('login-success', { message: 'Login successful' });
  } else {
    event.reply('login-failure', { message: 'Invalid credentials' });
  }
});