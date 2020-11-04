import axios from '@/plugins/axios'
import cache from '@/plugins/cache'
import BaseModelService from '../BaseModelService'
import UserService from './UserService'

class UserEnterpriseService extends BaseModelService {
  name = 'User/UserEnterprise'
  info = {
    avatar: '',
    company: '',
    business_license: '',
    city: '',
    address: '',
    intro: '',
    industry_attr: '',
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
}

export default new UserEnterpriseService()
