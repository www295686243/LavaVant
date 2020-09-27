import cache from '@/plugins/cache'
import axios from '@/plugins/axios'
import { ConfigItem, OptionItem } from './ConstService'

export interface Version {
  app: number;
  [key: string]: number;
}

interface Res {
  data: {
    options?: ConfigItem[];
    industry?: any[];
    [key: string]: any;
  };
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
      .then((res: Res) => {
        if (Array.isArray(res.data) && res.data.length === 0) {
          res.data = {
            [guard_name]: []
          }
        }
        Object.keys(res.data).forEach((key: string) => {
          cache.config.set(key, res.data[key])
        })
        if (res.data.options) {
          this.setOptionList(res.data.options)
        }
      })
  }

  clearAll () {
    Object.keys(this.version).forEach((key) => {
      this.version[key as keyof Version] = 0
    })
  }

  private setOptionList (data: ConfigItem[]) {
    const options_list: OptionItem[] = cache.config.get('options_list') || []
    Object.values(data)
      .reduce((acc, res) => acc.concat(res.options), [] as OptionItem[])
      .forEach((res) => {
        const item = options_list.find((row) => row.id === res.id)
        if (item) {
          Object.assign(item, res)
        } else {
          options_list.push(res)
        }
      })
    cache.config.set('options_list', options_list)
  }
}

export default new VersionService()
