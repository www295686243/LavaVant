import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'
import WXService from '../WXService'

class CouponOrderService extends BaseModelService {
  name = 'Coupon/CouponOrder'
  store (params: { ids: string[] }) {
    return axios.post('coupon_order', params)
      .then((res) => {
        return WXService.chooseWXPay(res.data)
          .then(() => res)
      })
  }

  checkUnpaidOrder () {
    return axios.get('coupon_order/checkUnpaidOrder')
  }

  continueUnpaidOrder () {
    return axios.post('coupon_order/continueUnpaidOrder')
      .then((res) => {
        return WXService.chooseWXPay(res.data)
          .then(() => res)
      })
  }

  cancelUnpaidOrder () {
    return axios.post('coupon_order/cancelUnpaidOrder')
  }
}

export default new CouponOrderService()
