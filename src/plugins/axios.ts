import axios from 'axios'
import cache from './cache'
import router from '@/router'

export interface IResult {
  message: string,
  data: any,
  code?: number,
  status?: string
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common.Accept = 'application/json'

function notLogin () {
  cache.user.clearAll()
  router.push({ path: '/login' })
}

function ajax (data: any): Promise<IResult> {
  axios.defaults.baseURL = ''
  if (cache.user.get('api_token')) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + cache.user.get('api_token')
  }

  return new Promise((resolve, reject) => {
    axios(data)
      .then(res => res.data)
      .then(res => {
        if (res.status === 'success') {
          resolve(res)
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
