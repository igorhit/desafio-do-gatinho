const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 900,
    minWidth: 360,
    minHeight: 600,
    title: 'Desafio do Gatinho',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Loads the web export from dist/web/
  win.loadFile(path.join(__dirname, '../../dist/web/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
