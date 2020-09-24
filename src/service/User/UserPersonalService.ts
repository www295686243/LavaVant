import axios from '@/plugins/axios'
import cache from '@/plugins/cache'
import BaseModelService from '../BaseModelService'

class UserPersonalService extends BaseModelService {
  name = 'User/UserPersonal'
  info = {
    avatar: '',
    name: '',
    id_card: '',
    seniority: '',
    intro: '',
    company: '',
    position: '',
    city: '',
    address: '',
    email: '',
    phone: '',
    tags: [],
    education_experience: [],
    work_experience: [],
    honorary_certificate: []
  }

  constructor () {
    super()
    Object.assign(this.info, cache.user_personal.getAll())
  }

  show () {
    return axios.get('user_personal/show')
      .then((res) => {
        this.updateData(res.data)
        return res
      })
  }

  update (form: object) {
    return axios.put('user_personal/update', form)
      .then((res) => {
        this.updateData(form)
        return res
      })
  }

  updateData (params: any) {
    cache.user_personal.setAll(params)
    Object.assign(this.info, params)
  }
}

export default new UserPersonalService()
