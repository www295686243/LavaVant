import axios from '@/plugins/axios'
import cache from '@/plugins/cache'
import BaseModelService from '../BaseModelService'
import RouterService from '../RouterService'
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
    position_attr: 0,
    city: 0,
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

  checkInfo () {
    return Promise.resolve()
      .then(() => {
        if (
          !(
            this.info.tags &&
            (this.info.education_experience && this.info.education_experience.length > 0) &&
            (this.info.work_experience && this.info.work_experience.length > 0)
          )
        ) {
          RouterService.push('/user/personal/base')
          return Promise.reject(new Error('请先完善个人资料'))
        }
      })
  }
}

export default new UserPersonalService()
