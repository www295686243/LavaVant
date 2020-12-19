import BaseAbstract from '@/abstract/BaseAbstract'
import PopupRegisterService from '@/components/Popup/PopupRegister/PopupRegisterService'
import axios from '@/plugins/axios'
import cache from '@/plugins/cache'
import RouterService from '../RouterService'
import UserService from './UserService'

class UserEnterpriseService extends BaseAbstract {
  name = 'UserEnterprise'
  info = {
    avatar: '',
    company: '',
    business_license: '',
    city: 0,
    address: '',
    intro: '',
    industry_attr: 0,
    tags: '',
    company_images: [],
    company_scale: '',
    name: '',
    id_card: '',
    position: '',
    phone: '',
    email: '',
    industry: []
  }

  constructor () {
    super()
    Object.assign(this.info, cache.user_enterprise.getAll())
  }

  show () {
    return axios.get('user_enterprise/show')
      .then((res) => {
        alert(JSON.stringify(res.data))
        this.updateData(res.data)
        return res
      })
  }

  update (form: { city: number }) {
    return axios.put('user_enterprise/update', form)
      .then((res) => {
        this.updateData(form)
        UserService.updateData({ city: form.city })
        return res
      })
  }

  updateData (params: any) {
    cache.user_enterprise.setAll(params)
    Object.assign(this.info, params)
  }

  checkInfo () {
    return Promise.resolve()
      .then(() => {
        if (!(this.info.company && this.info.intro && this.info.company_scale)) {
          RouterService.push('/user/enterprise/base')
          return Promise.reject(new Error('请先完善企业资料'))
        }
      })
  }

  checkBaseInfo () {
    return Promise.resolve()
      .then(() => {
        if (!(this.info.company && this.info.industry_attr && this.info.city && this.info.industry.length > 0)) {
          return PopupRegisterService.open('Enterprise Member')
        }
      })
  }
}

export default new UserEnterpriseService()
