import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'
import WXService from '@/service/WXService'

class HrJobService extends BaseModelService {
  name = 'Info/Hr/HrJob'
  displayName = '职位'
  path = 'hr/job'

  index (params: { page: number }) {
    return axios.get('hr_job', params)
  }

  show () {
    return axios.get(`hr_job/${RouterService.query('id')}`)
  }

  pay (params: { user_coupon_id: string }) {
    return axios.post('hr_job/pay', { ...params, id: RouterService.query('id'), _model: this.name })
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
    return axios.get('hr_job/getContacts', { id: RouterService.query('id'), _model: this.name })
  }
}

export default new HrJobService()
