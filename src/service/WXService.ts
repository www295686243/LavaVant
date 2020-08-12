import wx from 'wx-jssdk-ts'
import axios from '@/plugins/axios'
import { isWX, isIOS, isAndroid, isPCWX } from '@/plugins/tools'

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
    return Promise.resolve()
      .then(() => {
        if (isWX) {
          return axios.post('wechat/auth', { redirect_url: location.href })
            .then((res) => {
              location.href = res.data.url
            })
        }
      })
  }
}

export default new WXService()
