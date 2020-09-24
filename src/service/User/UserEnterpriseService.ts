import axios from '@/plugins/axios'
import cache from '@/plugins/cache'
import BaseModelService from '../BaseModelService'

class UserEnterpriseService extends BaseModelService {
  name = 'User/UserEnterprise'
  info = {
    avatar: '',
    company: '',
    business_license: '',
    city: '',
    address: '',
    intro: '',
    email: '',
    tags: '',
    company_images: [],
    company_scale: '',
    name: '',
    id_card: '',
    position: '',
    phone: ''
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

  update (form: object) {
    return axios.put('user_enterprise/update', form)
      .then((res) => {
        this.updateData(form)
        return res
      })
  }

  updateData (params: any) {
    cache.user_enterprise.setAll(params)
    Object.assign(this.info, params)
  }
}

export default new UserEnterpriseService()
