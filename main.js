const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  // Create a new BrowserWindow
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // Load your HTML file
  mainWindow.loadFile('index.html');

  // Open DevTools (optional)
  // mainWindow.webContents.openDevTools();

  // Listen for the window being closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Create the main window when the app is ready
app.whenReady().then(createWindow);

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Create a new window when the app is activated (on macOS)
app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
