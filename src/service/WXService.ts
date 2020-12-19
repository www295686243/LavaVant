import wx from 'wx-jssdk-ts'
import axios from '@/plugins/axios'
import { isWX, isIOS, isAndroid, isPCWX, toLowerLine } from '@/plugins/tools'
import RouterService from './RouterService'
import UserService from './User/UserService'
import PopupSelectCouponService from '@/components/Popup/PopupSelectCouponService'
import PopupRegisterService from '@/components/Popup/PopupRegister/PopupRegisterService'
import EventService from './EventService'

interface ShareParams {
  title: string;
  desc: string;
  link: string;
  imgUrl?: string;
}

interface IchooseWXPay {
  timestamp: number; // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
  nonceStr: string; // 支付签名随机串，不长于 32 位
  package: string; // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
  signType: string; // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
  paySign: string; // 支付签名
  // 支付成功后的回调函数
  success(res: any): void;
}

class WXService {
  isInitConfig = false

  init () {
    return this.config()
  }

  config () {
    return new Promise<void>((resolve) => {
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
    PopupSelectCouponService.destroy()
    PopupRegisterService.destroy()
    EventService.emit('view-destroy')
    return axios.post('wechat/login', { code: RouterService.get('code'), state: RouterService.get('state') })
      .then((res) => {
        UserService.updateData(res.data)
      })
      .then(() => UserService.getUserInfo())
      .then(() => {
        location.replace(RouterService.query('redirect_url'))
      })
  }

  pay (params: { id: string; _model: string; user_coupon_id: string }) {
    return axios.post(`${toLowerLine(params._model)}/pay`, params)
      .then((res) => {
        if (!res.data.pay_status) {
          return this.chooseWXPay(res.data)
            .then(() => {
              return { message: '支付成功' }
            })
        } else {
          return res
        }
      })
  }

  chooseWXPay (params: IchooseWXPay) {
    return new Promise<void>((resolve, reject) => {
      if (isWX) {
        wx.chooseWXPay({
          ...params,
          success: (res) => {
            resolve(res)
          },
          fail: (res) => {
            reject(res)
          },
          cancel: () => {
            const err = { status: 'cancel-pay', message: '取消支付' }
            reject(err)
          }
        })
      } else {
        resolve()
      }
    })
  }

  updateShareData (params: ShareParams) {
    params.imgUrl = params.imgUrl || '/images/logo.png'
    params.imgUrl = process.env.VUE_APP_BASEURL + params.imgUrl
    params.link = process.env.VUE_APP_BASEURL + '/#' + params.link
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
              window.console.error(err)
            })
        }
      })
  }

  private updateTimelineShareData (params: ShareParams) {
    return new Promise<void|string>((resolve, reject) => {
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
    return new Promise<void|string>((resolve, reject) => {
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
    return new Promise<void|string>((resolve, reject) => {
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
