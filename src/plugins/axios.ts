import axios from 'axios'
import cache from './cache'
import router from '@/router'
import VersionService, { Version } from '@/service/VersionService'
import StatService from '@/service/StatService'
import UserService from '@/service/UserService'

export interface PromiseResult {
  message: string;
  data: any;
  code?: number;
  status?: string;
  version: Version;
}

interface UrlParams {
  url: string;
  method: string;
  params?: object;
  data?: object;
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common.Accept = 'application/json'

function notLogin () {
  return UserService.logout()
    .then(() => {
      router.push({ path: '/login' })
    })
}

function checkVersion (data: UrlParams, res: PromiseResult) {
  return Promise.resolve()
    .then(() => {
      if (data.url !== 'app/getAppConfig') {
        return VersionService.checkAllVersion(res.version)
      }
    })
}

function checkStat (data: UrlParams) {
  return Promise.resolve()
    .then(() => {
      if (data.url !== 'api_log' && data.method !== 'get' && cache.user.get('api_token')) {
        return StatService.submit()
      }
    })
}

function ajax (data: any): Promise<PromiseResult> {
  axios.defaults.baseURL = process.env.VUE_APP_BASEURL
  if (cache.user.get('api_token')) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + cache.user.get('api_token')
  }

  return new Promise((resolve, reject) => {
    axios(data)
      .then(res => res.data)
      .then(res => {
        if (res.status === 'success') {
          return checkVersion(data, res)
            .then(() => checkStat(data))
            .then(() => {
              resolve(res)
            })
        } else {
          if (res.code === 401) {
            notLogin()
          }
          reject(res)
        }
      })
      .catch(res => {
        if (res.response) {
          if (res.response.status === 401) {
            notLogin()
          }
          reject(res.response.data)
        } else {
          reject(new Error('网络错误'))
        }
      })
  })
}

export default {
  get (url: string, data?: object) {
    return ajax({
      url,
      method: 'get',
      params: data
    })
  },
  post (url: string, data: object) {
    return ajax({
      url,
      method: 'post',
      data
    })
  },
  put (url: string, data: object) {
    return ajax({
      url,
      method: 'put',
      data
    })
  },
  delete (url: string, data?: object) {
    return ajax({
      url,
      method: 'delete',
      data
    })
  }
}
