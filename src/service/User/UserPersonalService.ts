import axios from '@/plugins/axios'
import cache from '@/plugins/cache'
import BaseModelService from '../BaseModelService'
import RouterService from '../RouterService'

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
        cache.user_personal.setAll(res.data)
        this.updateData(res.data)
        return res
      })
  }

  update (form: object) {
    return axios.put('user_personal/update', form)
      .then((res) => this.show().then(() => res))
      .then((res) => {
        const path = RouterService.query('source')
        if (path === '/user/hr/resume/form') {
          RouterService.replace('/user/hr/resume/success')
        } else {
          return res
        }
      })
  }

  updateData (params: any) {
    Object.assign(this.info, params)
  }
}

export default new UserPersonalService()
