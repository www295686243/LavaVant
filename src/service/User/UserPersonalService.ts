import axios from '@/plugins/axios'
import cache from '@/plugins/cache'
import BaseModelService from '../BaseModelService'
import UserService from './UserService'

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
    position_attr: '',
    city: '',
    address: '',
    email: '',
    phone: '',
    tags: '',
    education_experience: [],
    work_experience: [],
    honorary_certificate: [],
    industry: []
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

  update (form: { city: number }) {
    return axios.put('user_personal/update', form)
      .then((res) => {
        this.updateData(form)
        UserService.updateData({ city: form.city })
        return res
      })
  }

  check (form: object) {
    return axios.post('user_personal/check', form)
  }

  updateData (params: any) {
    cache.user_personal.setAll(params)
    Object.assign(this.info, params)
  }
}

export default new UserPersonalService()
