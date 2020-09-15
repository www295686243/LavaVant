import axios from 'axios'
import cache from './cache'
import router from '@/router'
import VersionService, { Version } from '@/service/VersionService'
import StatService from '@/service/StatService'
import UserService from '@/service/UserService'
import { getEnv } from './tools'

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

const onceUrls = ['app/getAppConfig', 'api_log', 'user/todayFirstLogin']

function notLogin () {
  return UserService.logout()
    .then(() => {
      router.push({ path: '/login' })
    })
}

// 获取应用配置
function checkVersion (data: UrlParams, res: PromiseResult) {
  return Promise.resolve()
    .then(() => {
      if (!onceUrls.includes(data.url)) {
        return VersionService.checkAllVersion(res.version)
      }
    })
}

// 提交埋点
function checkStat (data: UrlParams) {
  return Promise.resolve()
    .then(() => {
      if (!onceUrls.includes(data.url) && UserService.isLogin()) {
        return StatService.queueSubmit()
      }
    })
}

// 首次登录记录
function checkTodayFirstLogin (data: UrlParams) {
  return Promise.resolve()
    .then(() => {
      if (!onceUrls.includes(data.url) && UserService.isLogin()) {
        return UserService.todayFirstLogin()
      }
    })
}

function ajax (data: any): Promise<PromiseResult> {
  axios.defaults.baseURL = process.env.VUE_APP_APIURL + '/api'
  if (UserService.isLogin()) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + cache.user.get('api_token')
  }

  if (data.data) {
    data.data._env = getEnv()
  }

  return new Promise((resolve, reject) => {
    axios(data)
      .then(res => res.data)
      .then(res => {
        if (res.status === 'success') {
          res.data = res.data || {}
          // 如果本地有token但是失效了，然后直接走login接口，这个时候login方法还没有结束，token还没有更新，会直接走下面的check方法
          // 如果接口返回有api_token这个属性则一律更新token，这个需要观察下
          if (res.data && res.data.api_token) {
            cache.user.set('api_token', res.data.api_token)
          }
          checkStat(data)
          return checkVersion(data, res)
            .then(() => checkTodayFirstLogin(data))
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
  post (url: string, data?: object) {
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
  },
  upload (url: string, data: object) {
    return ajax({
      url,
      method: 'post',
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
