import Vue from 'vue'
import chokidar from 'chokidar'
// import Manifest from './Manifest'
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
    this.watch(apps.archives)
    this.callback = () => ({})
  }

  onApplication (callback) {
    this.callback = callback
    this.callback()
  }

  getExistingApplications (path) {
    let ignore = ['.DS_Store', '__MACOSX']
    fs.readdirSync(path).forEach(file => {
      if (ignore.indexOf(file) === -1) {
        this.register(file)
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

  onApplicationFound (path) {
    let isNew = true

    if (path.split('/')[path.split('/').length - 1].toLowerCase().endsWith('.zip')) {
      let zipName = path.split('/')[path.split('/').length - 1].split('.zip')[0]
      if (this.applications.length) {
        this.applications.forEach(name => {
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
              fs.createReadStream(path).pipe(unzip.Extract({ path: apps.apps }))
              // WatcherService.deleteFolderRecursive(apps.apps + '/__MACOSX')
              fs.unlinkSync(path)
              this.register(zipName)
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
    chokidar.watch(path, {ignored: /(^|[/\\])\../}).on('all', (event, appPath) => {
      switch (event) {
        case 'add' :
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
    WatcherService.deleteFolderRecursive(`${apps.apps}/${app.name}.${app.version}/${app.name}.${app.version}.vue`)
    this.applications.splice(idx, 1)
  }

  register (application) {
    let name = application.split('.')[0]
    let version = application.split('.')[1]

    if (name === 'shop') {
      require('../../applications/apps/shop.v0-1/dist/store.umd.min')
      require('../../applications/apps/shop.v0-1/dist/store.css')
      Vue.component(name, window['store'])
    } else if (name === 'clockdate') {
      require('../../applications/apps/clockdate.v0-1/dist/Clockdate.umd')
      require('../../applications/apps/clockdate.v0-1/dist/Clockdate.css')
      Vue.component(name, window['Clockdate'])
    } else {
      Vue.component(name, (resolve) => require([`../../${apps.apps}/${application}/${application}.vue`], resolve))
    }
    this.applications.push({ name, version })
    try {
      this.callback()
    } catch (ignore) {}
  }

  static asyncLoad (componentName, options) {
    return Vue.component(componentName, (resolve, reject) => {
      if (options.templateUrl) {
        fs.readFile(p.join(apps.apps, options.templateUrl), 'utf8', (error, html) => {
          if (error) {
            reject(error)
          } else {
            delete options.templateUrl
            options.template = html
            resolve(options)
          }
        })
      } else {
        resolve(options)
      }
    })
  }
}

export default {
  install (Vue) {
    const watcher = new WatcherService()
    Vue.prototype.$watcher = watcher
    Vue.watcher = watcher
  }
}
