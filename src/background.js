'use strict'

import { app, BrowserWindow, ipcMain, protocol, TouchBar } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'
if (isDevelopment) {
  // Don't load any native (external) modules until the following line is run:
  require('module').globalPaths.push(process.env.NODE_MODULES_PATH)
}

const widevine = require('electron-widevinecdm')
widevine.load(app)

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow
if (isDevelopment) {
  let spinning = false

  const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

  const reel1 = new TouchBarLabel()
  const reel2 = new TouchBarLabel()
  const reel3 = new TouchBarLabel()

  const result = new TouchBarLabel()

  const spin = new TouchBarButton({
    label: '🎰 Spin',
    backgroundColor: '#7851A9',
    click: () => {
      if (spinning) {
        return
      }

      spinning = true
      result.label = ''

      let timeout = 10
      const spinLength = 4 * 1000 // 4 seconds
      const startTime = Date.now()

      const spinReels = () => {
        updateReels()

        if ((Date.now() - startTime) >= spinLength) {
          finishSpin()
        } else {
          timeout *= 1.1
          setTimeout(spinReels, timeout)
        }
      }

      spinReels()
    }
  })

  const getRandomValue = () => {
    const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
    return values[Math.floor(Math.random() * values.length)]
  }

  const updateReels = () => {
    reel1.label = getRandomValue()
    reel2.label = getRandomValue()
    reel3.label = getRandomValue()
  }

  const finishSpin = () => {
    const uniqueValues = new Set([reel1.label, reel2.label, reel3.label]).size
    if (uniqueValues === 1) {
      result.label = '💰 Jackpot!'
      result.textColor = '#FDFF00'
    } else if (uniqueValues === 2) {
      result.label = '😍 Winner!'
      result.textColor = '#FDFF00'
    } else {
      result.label = '🙁 Spin Again'
      result.textColor = null
    }
    spinning = false
  }

  const pinchInBtn = new TouchBarButton({
    label: 'Pinch In',
    backgroundColor: '#42a93e',
    click: () => {
      mainWindow.webContents.send('pinchInTB')
    }
  })

  const pinchOutBtn = new TouchBarButton({
    label: 'Pinch Out',
    backgroundColor: '#42A93E',
    click: () => {
      mainWindow.webContents.send('pinchOutTB')
    }
  })

  var touchBar = new TouchBar([
    pinchInBtn,
    new TouchBarSpacer({ size: 'small' }),
    pinchOutBtn,
    new TouchBarSpacer({ size: 'large' }),
    spin,
    new TouchBarSpacer({ size: 'small' }),
    reel1,
    new TouchBarSpacer({ size: 'small' }),
    reel2,
    new TouchBarSpacer({ size: 'small' }),
    reel3,
    new TouchBarSpacer({ size: 'small' }),
    result
  ])
}

// const { download } = require('electron-dl')
const DownloadManager = require('electron-download-manager')
DownloadManager.register({
  downloadFolder: path.join(__dirname, '../applications/archives')
})

const downloadHandler = () => {
  ipcMain.on('download-module', (event, url) => {
    let uri = decodeURIComponent(url)
    console.log(uri)

    DownloadManager.download({
      url: uri
    }, function (error, info) {
      if (error) {
        console.log(error)
        return
      }
      mainWindow.webContents.send('application-downloaded', info.filePath)
      console.log('DONE: ' + info.filePath)
    })
    // download(BrowserWindow.getFocusedWindow(), uri, { directory: './applications/archives' })
    //   .then(dl => {
    //     console.log(dl.getSavePath())
    //     mainWindow.webContents.send('application-downloaded', dl.getSavePath())
    //   })
    //   .catch(e => {
    //     console.error(e)
    //   })
  })
  ipcMain.on('uninstall-module', (event, id) => {
    mainWindow.webContents.send('application-uninstall', id)
  })
}

// const systemjs = require('systemjs/dist/system-production.js')

function lazyImport () {
  ipcMain.on('lazy-import', (event, path) => {
    // systemjs.import(path).then((data) => {
    //   console.log('[reflectos][lazy load]', path, data)
    // }).catch(e => {
    //   console.error(e)
    // })
  })
}

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['ur'], { secure: true })

function createMainWindow () {
  const window = new BrowserWindow({
    webPreferences: {
      plugins: true
    },
    height: 1080, // 563,
    useContentSize: true,
    frame: true,
    transparent: true,
    fullscreen: false,
    width: 1920 // 1000
  })

  if (isDevelopment) {
    window.setTouchBar(touchBar)
  }

  downloadHandler()
  lazyImport()

  if (isDevelopment) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) window.webContents.openDevTools()
  } else {
    createProtocol('ur')
    //   Load the index.html when not in development
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      })
    )
    // window.webContents.openDevTools()
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  window.openDevTools()

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools()
  }
  mainWindow = createMainWindow()
})

app.commandLine.appendSwitch('disable-pinch')
