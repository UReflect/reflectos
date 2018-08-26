export class ManifestException {
  constructor (message) {
    this.message = message
    this.name = 'ManifestException'
  }

  get toString () {
    return `${this.name}: ${this.message}`
  }
}

export class Manifest {
  constructor (file) {
    console.debug('[reflectos][Service][Manifest] Manifest::initialized')
    this.name = 'Manifest'
    this.manifest = {}
    this.mandatoryFields = ['application', 'components', 'index', 'locales', 'manifest_version', 'permissions']
    this.optionalFields = ['commands', 'icon']
    this.file = file
    Manifest.accioManifest(this)
  }

  static accioManifest (manifest) {
    fetch(manifest.file).then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        try {
          throw new ManifestException('Unable to fetch the manifest. Make sure it\'s under the right name in the package root.').toString()
        } catch (e) {
          console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
          return false
        }
      }
    }).then(json => {
      if (json) {
        try {
          JSON.parse(JSON.stringify(json))
        } catch (e) {
          console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
          return false
        }
        manifest.manifest = json

        Manifest.areMendatoryFieldsHere(manifest)
        Manifest.areMendatoryFieldsOK(manifest)
        return true
      } else {
        return false
      }
    })
  }

  isFileAvailable (url) {
    let http = new XMLHttpRequest()
    http.open('HEAD', url, false)
    http.send()
    return http.status === 200
  }

  static checkManifestVersion (manifest) {
    let version = manifest.manifest.manifest_version
    try {
      if (typeof version !== 'string') {
        throw new ManifestException('The manifest_version must be string.').toString()
      }
    } catch (e) {
      console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
      return false
    }
    return true
  }

  static checkIndex (manifest) {
    let index = manifest.manifest.index

    if (!manifest.isFileAvailable(index)) {
      try {
        throw new ManifestException(`Unable to fetch the index: ${index}.`).toString()
      } catch (e) {
        console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
        return false
      }
    }
    return true
  }

  static checkApplication (manifest) {
    let application = manifest.manifest.application
    let mendatory = ['version', 'name', 'author']
    let keys = []

    for (let i in application) {
      keys.push(i)
    }
    for (let field of mendatory) {
      if (keys.indexOf(field) === -1) {
        try {
          throw new ManifestException(`Missing mendatory variable in application: ${field}.`).toString()
        } catch (e) {
          console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
          return false
        }
      }
    }
    for (let key in application) {
      if (typeof application[key] !== 'string') {
        try {
          throw new ManifestException(`The application variables must be strings: ${key}.`).toString()
        } catch (e) {
          console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
          return false
        }
      }
    }
    return true
  }

  static checkPermissions (manifest) {
    let permissions = manifest.manifest.permissions
    let mendatory = ['CAMERA', 'GLOBAL_CACHE', 'MICROPHONE', 'LOCALISATION']
    let keys = []

    for (let i in permissions) {
      keys.push(i)
    }
    for (let field of mendatory) {
      if (keys.indexOf(field) === -1) {
        try {
          throw new ManifestException(`Missing mendatory permission: ${field}.`).toString()
        } catch (e) {
          console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
          return false
        }
      }
    }
    for (let key in permissions) {
      if (typeof permissions[key] !== 'boolean') {
        try {
          throw new ManifestException(`The permissions must be booleans: ${key}.`).toString()
        } catch (e) {
          console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
          return false
        }
      }
    }
    return true
  }

  static checkLocales (manifest) {
    let locales = manifest.manifest.locales

    if (!locales || locales.length === 0) {
      try {
        throw new ManifestException('There is no locale.').toString()
      } catch (e) {
        console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
        return false
      }
    }
    for (let i = 0; i < locales.length; i++) {
      if (typeof locales[i] !== 'string') {
        try {
          throw new ManifestException(`At least one of the locales is not a string: ${locales[i]}.`).toString()
        } catch (e) {
          console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
          return false
        }
      }
    }
    for (let i = 0; i < locales.length; i++) {
      if (!manifest.isFileAvailable(`locales/${locales[i]}`)) {
        fetch(`locales/${locales[i]}`).then(response => {
          if (response.status !== 200) {
            try {
              throw new ManifestException(`Unable to find the folder for the locale: ${locales[i]}.`).toString()
            } catch (e) {
              console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
              return false
            }
          } else {
            return true
          }
        })
      } else {
        return false
      }
    }
    return true
  }

  static checkComponents (manifest) {
    let components = manifest.manifest.components
    let mendatory = ['version', 'name', 'css_dir']
    let cssDirs = []

    if (!components || components.length === 0) {
      try {
        throw new ManifestException('There is no appplication.').toString()
      } catch (e) {
        console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
        return false
      }
    }
    for (let i = 0; i < components.length; i++) {
      let keys = []
      for (let j in components[i]) {
        keys.push(j)
      }
      for (let k = 0; k < mendatory.length; k++) {
        if (keys.indexOf(mendatory[k]) === -1) {
          try {
            throw new ManifestException(`Missing mendatory variable: ${mendatory[k]} in application: ${i}.`).toString()
          } catch (e) {
            console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
            return false
          }
        }
        if (mendatory[k] === 'css_dir') {
          cssDirs.push(components[i].css_dir)
        }
      }
      for (let key in components[i]) {
        if (typeof key !== 'string') {
          try {
            throw new ManifestException(`The application variables must be strings: ${key} in application: ${i}.`).toString()
          } catch (e) {
            console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
            return false
          }
        }
      }
    }
    for (let dir of cssDirs) {
      if (!manifest.isFileAvailable(dir)) {
        try {
          throw new ManifestException(`Unable to find the CSS directory: ${dir}.`).toString()
        } catch (e) {
          console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
          return false
        }
      }
    }
    return true
  }

  static areMendatoryFieldsOK (manifest) {
    let ret = false
    ret = Manifest.checkManifestVersion(manifest)
    ret = Manifest.checkIndex(manifest)
    ret = Manifest.checkApplication(manifest)
    ret = Manifest.checkPermissions(manifest)
    ret = Manifest.checkLocales(manifest)
    ret = Manifest.checkComponents(manifest)

    if (!ret) {
      try {
        throw new ManifestException('The manifest doesn\'t implement the mendatory fields as it should.').toString()
      } catch (e) {
        console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
        return false
      }
    }
    return true
  }

  static areMendatoryFieldsHere (manifest) {
    for (let field of manifest.mendatoryFields) {
      try {
        if (typeof manifest.manifest[field] === 'undefined') {
          throw new ManifestException(`Missing mendatory field. [${field}]: not found.`).toString()
        }
      } catch (e) {
        console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
        return false
      }
    }
    return true
  }

  static checkCommands (manifest) {
    let commands = manifest.manifest.commands

    if (commands.length !== 0) {
      for (let cmd in commands) {
        if (typeof commands[cmd] !== 'string') {
          try {
            throw new ManifestException(`A command must be a string: ${commands[cmd]}.`).toString()
          } catch (e) {
            console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
            return false
          }
        }
      }
    } else {
      try {
        throw new ManifestException('The commands are empty.').toString()
      } catch (e) {
        console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
        return false
      }
    }
    return true
  }

  static checkIcon (manifest) {
    let icon = manifest.manifest.icon

    if (typeof icon !== 'string') {
      try {
        throw new ManifestException('The package must be a string.').toString()
      } catch (e) {
        console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
        return false
      }
    }
    if (icon.indexOf('.png') !== (icon.length - 4)) {
      try {
        throw new ManifestException('The package icon must be a .png file.').toString()
      } catch (e) {
        console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
        return false
      }
    } else {
      if (!manifest.isFileAvailable(icon)) {
        try {
          throw new ManifestException(`Unable to access to: ${icon}.`).toString()
        } catch (e) {
          console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
          return false
        }
      }
    }
    return true
  }

  static areOptionalFieldsOK (manifest) {
    let ret = true

    for (let mKey in manifest.manifest) {
      let index = manifest.optionalFields.indexOf(mKey)
      if (index !== -1) {
        switch (manifest.optionalFields[index]) {
          case manifest.optionalFields[0]: // commands
            ret = Manifest.checkCommands(manifest)
            break
          case manifest.optionalFields[1]: // icon
            ret = Manifest.checkIcon(manifest)
            break
          default:
            console.warn(`${manifest.optionalFields[index]} verification not implemented yet. Assuming it's OK.`)
            return true
        }
      }
    }

    if (!ret) {
      try {
        throw new ManifestException('The manifest doesn\'t implement the optional fields as it should.').toString()
      } catch (e) {
        console.debug('[reflectos][Service][Manifest] Manifest::exception', e)
        return false
      }
    }
    return ret
  }
}

export default {
  Manifest
}
