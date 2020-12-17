import HrAbstract from '@/abstract/HrAbstract'
import axios from '@/plugins/axios'
import RouterService from '@/service/RouterService'
import WXService from '@/service/WXService'
import UserCouponService from '@/service/User/UserCouponService'

class HrJobService extends HrAbstract {
  name = 'HrJob'
  displayName = '职位'
  path = 'hr/job'

  index (params: { page: number }) {
    return axios.get('hr_job', params)
  }

  show () {
    return axios.get(`hr_job/${RouterService.query('id')}`)
  }

  pay (params: { user_coupon_id: string }) {
    return axios.post('hr_job/pay', { ...params, id: RouterService.query('id') })
      .then((res) => {
        if (res.data.pay_status !== 'success') {
          return WXService.chooseWXPay(res.data)
            .then(() => {
              return { message: '支付成功' }
            })
        } else {
          return res
        }
      })
  }

  getContacts () {
    return axios.get('hr_job/getContacts', { id: RouterService.query('id') })
  }

  view (params: { id: string; su: string }) {
    return axios.get('hr_job/view', params)
  }

  complaint (params: { complaint_type: string; complaint_content: string }) {
    return axios.post('hr_job/complaint', { ...params, id: RouterService.query('id') })
  }

  isComplaint () {
    return axios.get('hr_job/isComplaint', { id: RouterService.query('id') })
  }

  authIndex (params: { page: number }) {
    return axios.get('hr_job/authIndex', params)
  }

  authShow () {
    return axios.get('hr_job/authShow', { id: RouterService.query('id'), _check: RouterService.query('_check') })
  }

  store (form: { id: string }) {
    return axios.post('hr_job', form)
  }

  update (form: any) {
    return axios.put(`hr_job/${RouterService.query('id')}`, {
      _check: RouterService.query('_check'),
      ...form
    })
  }

  destroy (id: string) {
    return axios.delete(`hr_job/${id}`)
  }

  refreshUpdateAt (id: string) {
    return axios.post('hr_job/refreshUpdateAt', { id })
  }

  updateDisable (id: string) {
    return axios.post('hr_job/updateDisable', { id })
  }

  getUsableCoupon (params: { page: number }) {
    return axios.get('hr_job/getUsableCoupon', params)
  }

  getFirstUsableCoupon () {
    return this.getUsableCoupon({ page: 1 })
      .then((res) => {
        const coupon = res.data && res.data.data.length > 0 ? res.data.data[0] : null
        UserCouponService.updateUsableCoupon(coupon)
      })
  }

  checkIndex (params: { page: number }) {
    return axios.get('hr_job/checkIndex', params)
  }

  recommendList (params: { page: number; limit: number }) {
    return axios.get('hr_job/recommendList', {
      ...params,
      id: RouterService.query('id')
    })
  }
}

export default new HrJobService()
