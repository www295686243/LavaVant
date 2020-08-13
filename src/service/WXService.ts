import wx from 'wx-jssdk-ts'
import axios from '@/plugins/axios'
import { isWX, isIOS, isAndroid, isPCWX } from '@/plugins/tools'
import RouterService from './RouterService'
import cache from '@/plugins/cache'
import UserService from './UserService'

interface ShareParams {
  title: string;
  desc: string;
  link: string;
  imgUrl?: string;
}

class WXService {
  isInitConfig = false

  init () {
    return this.config()
  }

  config () {
    return new Promise((resolve) => {
      if (isWX && process.env.VUE_APP_ENV !== 'dev' && (isAndroid || (isIOS && this.isInitConfig === false))) {
        return axios.get('wechat/getConfig', {
          url: location.href
        })
          .then((res) => {
            wx.ready(() => {
              this.isInitConfig = true
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

  updateShareData (params: ShareParams) {
    params.imgUrl = params.imgUrl || '/images/logo.png'
    params.imgUrl = process.env.VUE_APP_BASEURL + params.imgUrl
    params.link = process.env.VUE_APP_BASEURL + params.link
    return Promise.resolve()
      .then(() => {
        if (isWX && process.env.VUE_APP_ENV !== 'dev') {
          return this.config()
            .then(() => {
              if (isPCWX) {
                return this.onMenuShareAppMessage(params)
              } else {
                return this.updateTimelineShareData(params)
                  .then(() => this.updateAppMessageShareData(params))
              }
            })
            .catch((err) => {
              console.error(err)
            })
        }
      })
  }

  private updateTimelineShareData (params: ShareParams) {
    return new Promise((resolve, reject) => {
      wx.updateTimelineShareData({
        title: params.title,
        link: params.link,
        imgUrl: params.imgUrl as string,
        success: () => {
          resolve()
        },
        cancel: () => {
          resolve('朋友圈分享取消')
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  private updateAppMessageShareData (params: ShareParams) {
    return new Promise((resolve, reject) => {
      wx.updateAppMessageShareData({
        title: params.title, // 分享标题
        desc: params.desc, // 分享描述
        link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: params.imgUrl as string, // 分享图标
        success: () => {
          resolve()
        },
        cancel: () => {
          resolve('好友分享取消')
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  private onMenuShareAppMessage (params: ShareParams) {
    return new Promise((resolve, reject) => {
      wx.onMenuShareAppMessage({
        title: params.title,
        desc: params.desc,
        link: params.link,
        imgUrl: params.imgUrl as string,
        success: () => {
          resolve()
        },
        cancel: () => {
          resolve('old好友分享取消')
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}

export default new WXService()
