const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    })

    win.loadFile('../index.html');

    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()

    ipcMain.on('quit-app', () => {
        app.quit();
    });
})