import cache from '@/plugins/cache'
import axios from '@/plugins/axios'

interface Version {
  app: number;
  [key: string]: number;
}

class VersionService {
  [key: string]: any
  private version: Version = {
    app: 0
  }

  init () {
    Object.assign(this.version, cache.version.getAll() || {})
  }

  checkAllVersion (version: Version) {
    return Promise.resolve()
      .then(() => {
        if (this.version.app !== version.app) {
          return this.getAppConfig()
        } else {
          return Object.keys(version).reduce((acc, key) => {
            return acc.then(() => {
              if (this.version[key as keyof Version] !== version[key as keyof Version]) {
                this.version[key as keyof Version] = version[key as keyof Version]
                return this.getAppConfig(key)
              }
            })
          }, Promise.resolve())
        }
      })
      .then(() => {
        cache.version.setAll(version)
        Object.assign(this.version, version)
      })
  }

  getAppConfig (guard_name = '') {
    return axios.get('app/getAppConfig', { guard_name })
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length === 0) {
          res.data = {
            guard_name: []
          }
        }
        Object.keys(res.data).forEach((key: string) => {
          cache.config.set(key, res.data[key])
        })
      })
  }

  clearAll () {
    Object.keys(this.version).forEach((key) => {
      this.version[key as keyof Version] = 0
    })
  }
}

export default new VersionService()
