import HrAbstract from '@/abstract/HrAbstract'
import axios from '@/plugins/axios'
import RouterService from '@/service/RouterService'
import WXService from '@/service/WXService'

class HrResumeService extends HrAbstract {
  name = 'Info/Hr/HrResume'
  displayName = '简历'
  path = 'hr/resume'

  index (params: { page: number }) {
    return axios.get('hr_resume', params)
  }

  show () {
    return axios.get(`hr_resume/${RouterService.query('id')}`)
  }

  pay (params: { user_coupon_id: string }) {
    return axios.post('hr_resume/pay', { ...params, id: RouterService.query('id'), _model: this.name })
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
    return axios.get('hr_resume/getContacts', { id: RouterService.query('id'), _model: this.name })
  }

  view (params: { id: string; su: string }) {
    return axios.get('hr_resume/view', params)
  }

  complaint (params: { complaint_type: string; complaint_content: string }) {
    return axios.post('hr_resume/complaint', { ...params, id: RouterService.query('id') })
  }

  isComplaint () {
    return axios.get('hr_resume/isComplaint', { id: RouterService.query('id') })
  }
}

export default new HrResumeService()
