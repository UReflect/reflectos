import Vue from 'vue'
import store from '@/store'
import chokidar from 'chokidar'
// import Manifest from './Manifest'
import { ipcRenderer } from 'electron'
import p from 'path'
import * as fs from 'fs'
import unzip from 'unzipper'
window.Vue = Vue

const apps = {
  archives: 'applications/archives',
  apps: 'applications/apps'
}

export class WatcherService {
  constructor () {
    console.debug('[reflectos][Service][Watcher] WatcherService::initialized')
    this.applications = []
    this.getExistingApplications(apps.apps)
    // this.watch(apps.archives)
    this.callback = () => ({})
    ipcRenderer.on('application-downloaded', this.onApplicationFound)
  }

  onApplication (callback) {
    this.callback = callback
    this.callback()
  }

  getExistingApplications (path) {
    let ignore = ['.DS_Store', '__MACOSX']
    fs.readdirSync(path).forEach(file => {
      if (ignore.indexOf(file) === -1) {
        WatcherService.register(file)
      }
    })
  }

  static deleteFolderRecursive (folder) {
    if (fs.existsSync(folder)) {
      fs.readdirSync(folder).forEach((file) => {
        let curPath = p.join(folder, file)
        if (fs.lstatSync(curPath).isDirectory()) {
          WatcherService.deleteFolderRecursive(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(folder)
    }
  }

  onApplicationFound (event, path) {
    let isNew = true

    console.debug('reflectos][Service][Watcher] WatcherService::onApplicationFound', path)

    if (path.split('/')[path.split('/').length - 1].toLowerCase().endsWith('.zip')) {
      let zipName = path.split('/')[path.split('/').length - 1].split('.zip')[0]
      if (store.getters.getApplications.length) {
        store.getters.getApplications.forEach(name => {
          if (name === zipName) {
            isNew = false
          }
        })
      }
      if (isNew) {
        fs.createReadStream(path).pipe(unzip.Parse()).on('entry', entry => {
          if (entry.path.indexOf(zipName) === -1 && entry.path.indexOf('__MACOSX') === -1) {
            try {
              throw new Error(`Unable to unzip ${zipName}. There are more than one folder at the root`)
            } catch (e) {
              console.debug('[reflectos][Service][Watcher] WatcherService::exception', e)
            }
          } else {
            if (entry.path && entry.type && entry.path === zipName + '/manifest.json' && entry.type === 'File') {
              fs.createReadStream(path).pipe(unzip.Extract({ path: apps.apps })).promise().then(() => {
                fs.unlinkSync(path)
                WatcherService.register(zipName)
              }, (e) => {
                console.error('[reflectos][Service][Watcher] WatcherService::exception::unzip', e)
              })
              // WatcherService.deleteFolderRecursive(apps.apps + '/__MACOSX')
            }
          }
        })
        // TODO: Delete __MACOSX folder
        // TODO: Application name (from manifest) on dashboard
        // TODO: Check integrity of the app
      }
    }
  }

  watch (path) {
    chokidar.watch(path, { ignored: /(^|[/\\])\../ }).on('all', (event, appPath) => {
      switch (event) {
        case 'add':
          this.onApplicationFound(appPath)
          break
        default:
          break
      }
    })
  }

  remove (name) {
    let idx = this.applications.findIndex(a => a.name === name)
    let app = this.applications[idx]
    WatcherService.deleteFolderRecursive(`${apps.apps}/${app.name}.${app.version}`)
    this.applications.splice(idx, 1)
  }

  static register (application) {
    const name = application.split('.')[0]

    require(`../../applications/apps/${application}/${name}.umd.min.js`)
    require(`../../applications/apps/${application}/${name}.css`)

    let data = fs.readFileSync(`./applications/apps/${application}/manifest.json`, 'utf8')
    data = JSON.parse(data)

    Vue.component(name, window[name])
    store.commit('addApplication', { name, data })
    // try {
    // this.callback()
    // } catch (ignore) {}
  }
}

export default {
  install (Vue) {
    const watcher = new WatcherService()
    Vue.prototype.$watcher = watcher
    Vue.watcher = watcher
  }
}
