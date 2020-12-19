import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'
import WXService from '../WXService'

class CouponOrderService extends BaseAbstract {
  name = 'CouponOrder'
  store (params: { ids: string[] }) {
    return axios.post('coupon_order', params)
      .then((res) => WXService.chooseWXPay(res.data))
      .then(() => this.checkPayOrder(() => this.checkIsPaySuccess()))
      .then(() => {
        return { message: '支付成功' }
      })
  }

  checkUnpaidOrder () {
    return axios.get('coupon_order/checkUnpaidOrder')
  }

  checkIsPaySuccess () {
    return axios.get('coupon_order/checkUnpaidOrder')
      .then((res) => {
        if (res.data && !res.data.id) {
          return Promise.resolve()
        } else {
          return Promise.reject(new Error('验证失败'))
        }
      })
  }

  continueUnpaidOrder () {
    return axios.post('coupon_order/continueUnpaidOrder')
      .then((res) => WXService.chooseWXPay(res.data))
      .then(() => {
        return { message: '支付成功' }
      })
  }

  cancelUnpaidOrder () {
    return axios.post('coupon_order/cancelUnpaidOrder')
  }
}

export default new CouponOrderService()
