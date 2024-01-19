const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 862,
    height: 565,
    frame: false,
    transparent: true,
    resizable: false,
    devTools: false,
    icon: path.join(__dirname, 'images/V.svg') // doesn't seem to work
  });

  // Load the HTML file
  mainWindow.loadFile('index.html');

  
  // mainWindow.webContents.openDevTools();

  // Listen for the window being closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Create the main window when the app is ready
app.whenReady().then(createWindow);

// Quit the app when all windows are closed 
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Create a new window when the app is activated (SAFE)
app.on('activate', function () {
  if (mainWindow === null) createWindow();
});


app.on('ready', () => {
  globalShortcut.register('Ctrl+Shift+I', () => {

      return false;
  });
});


