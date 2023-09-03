const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    zoomFactor: 1.1,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Carga la aplicación Angular
  const filePath = path.join(__dirname, '../dist/workass/index.html');

  // Carga la aplicación Angular
  win.loadFile(filePath);

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
