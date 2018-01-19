const electron = require('electron')

const config = require('./src/config')

// Module to control application life.
const app = electron.app
const dialog = electron.dialog
const ipc = electron.ipcMain
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
// 定义 logo 图片
let logo = ''
let willClose = false

function createWindow () {
  // Create the browser window.
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  const windowConfig = {
    width: 750,
    height: 500,
    resizable: false,
    title: 'Esprite',
    icon: logo
  }
  if (config.debug) {
    windowConfig.resizable = true;
  }
  mainWindow = new BrowserWindow(windowConfig)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // Open the DevTools in debug mode
  if (config.debug) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('close', (e) => {
    if (process.platform !== 'win32' && !willClose) {
      app.hide()
      e.preventDefault()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  willClose = true
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }

  app.show()
})

ipc.on('checkForUpdate', (e, status) => {
  let options = {};

  if (status) {
    options = {
      type: 'info',
      title: '检查更新...',
      message: '当前已有新版本，请更新',
      buttons: ['点击下载最新版本', '稍后提醒我']
    }
  } else {
    options = {
      type: 'info',
      title: '检查更新...',
      message: '当前为最新版本',
      buttons: ['确定']
    }
  }

  dialog.showMessageBox(option, (index) => {
    e.sender.send('checkForUpdateReply', index, status)
  })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
