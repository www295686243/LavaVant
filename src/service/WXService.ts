import wx from 'wx-jssdk-ts'
import axios from '@/plugins/axios'
import { isWX, isIOS, isAndroid, isPCWX } from '@/plugins/tools'
import RouterService from './RouterService'
import cache from '@/plugins/cache'
import UserService from './UserService'

class WXService {
  init () {
    return new Promise((resolve) => {
      if (isWX && process.env.VUE_APP_ENV !== 'dev') {
        return axios.get('wechat/getConfig', {
          url: location.href
        })
          .then((res) => {
            wx.ready(() => {
              resolve()
            })
            wx.config(res.data)
          })
      } else {
        resolve()
      }
    })
  }

  auth () {
    return axios.post('wechat/auth', { redirect_url: location.href })
      .then((res) => {
        location.href = res.data.url
      })
  }

  login () {
    return axios.post('wechat/login', { code: RouterService.get('code'), state: RouterService.get('state') })
      .then((res) => {
        cache.user.setAll(res.data)
        UserService.updateData(res.data)
        location.replace(RouterService.query('redirect_url'))
      })
  }
}

export default new WXService()
