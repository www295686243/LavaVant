import HrAbstract from '@/abstract/HrAbstract'
import axios from '@/plugins/axios'
import RouterService from '@/service/RouterService'
import WXService from '@/service/WXService'
import UserCouponService from '../User/UserCouponService'

class HrResumeService extends HrAbstract {
  name = 'HrResume'
  displayName = '简历'
  path = 'hr/resume'

  index (params: { page: number }) {
    return axios.get('hr_resume', params)
  }

  show () {
    return axios.get(`hr_resume/${RouterService.query('id')}`)
  }

  pay (params: { user_coupon_id: string }) {
    return axios.post('hr_resume/pay', { ...params, id: RouterService.query('id') })
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
    return axios.get('hr_resume/getContacts', { id: RouterService.query('id') })
  }

  view (params: { id: string; su: string }) {
    return axios.get('hr_resume/view', params)
  }

  authIndex (params: { page: number }) {
    return axios.get('hr_resume', params)
  }

  authShow () {
    return axios.get(`hr_resume/${RouterService.query('id')}`, { _check: RouterService.query('_check') })
  }

  store (form: { id: string }) {
    return axios.post('hr_resume', form)
  }

  update (form: any) {
    return axios.put(`hr_resume/${RouterService.query('id')}`, {
      _check: RouterService.query('_check'),
      ...form
    })
  }

  destroy (id: string) {
    return axios.delete(`hr_resume/${id}`)
  }

  refreshUpdateAt (id: string) {
    return axios.post('hr_resume/refreshUpdateAt', { id })
  }

  updateDisable (id: string) {
    return axios.post('hr_resume/updateDisable', { id })
  }

  complaint (params: { complaint_type: string; complaint_content: string }) {
    return axios.post('hr_resume/complaint', { ...params, id: RouterService.query('id') })
  }

  isComplaint () {
    return axios.get('hr_resume/isComplaint', { id: RouterService.query('id') })
  }

  getUsableCoupon (params: { page: number }) {
    return axios.get('hr_resume/getUsableCoupon', params)
  }

  getFirstUsableCoupon () {
    return this.getUsableCoupon({ page: 1 })
      .then((res) => {
        if (res.data && res.data.data.length > 0) {
          UserCouponService.updateUsableCoupon(res.data.data[0])
        }
      })
  }

  checkIndex (params: { page: number }) {
    return axios.get('hr_resume/checkIndex', params)
  }

  recommendList (params: { page: number; limit: number }) {
    return axios.get('hr_resume/recommendList', {
      ...params,
      id: RouterService.query('id')
    })
  }
}

export default new HrResumeService()
