import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'
import cache from '@/plugins/cache'

class UserControlService extends BaseAbstract {
  name = 'UserControl'
  info = {
    is_disable_all_push: 0,
    is_open_resume_push: 0,
    is_open_job_push: 0
  } as {
    [key: string]: any;
  }

  constructor () {
    super()
    Object.assign(this.info, cache.user_control.getAll())
  }

  show () {
    return axios.get('user_control/show')
      .then((res) => {
        this.updateData(res.data)
        return res
      })
  }

  update (form: any) {
    return axios.put('user_control/update', form)
      .then((res) => {
        this.updateData(form)
        return res
      })
  }

  updateData (params: any) {
    cache.user_control.setAll(params)
    Object.assign(this.info, params)
  }
}

export default new UserControlService()
