import cache from '@/plugins/cache'
import axios from '@/plugins/axios'
import VersionService from './VersionService'

interface LoginParams {
  username: string;
  password: string;
}

interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  phone: string;
}

class UserService {
  info: UserInfo = {
    id: 0,
    nickname: '',
    username: '',
    phone: ''
  }

  init () {
    Object.assign(this.info, cache.user.getAll())
  }

  login (params: LoginParams) {
    return axios.post('user/login', params)
      .then((res) => {
        cache.user.setAll(res.data)
        this.updateData(res.data)
      })
      .then(() => this.getUserInfo())
  }

  logout () {
    return Promise.resolve()
      .then(() => {
        cache.clearAll()
        VersionService.clearAll()
        return '注销成功'
      })
  }

  update () {
    return this.getUserInfo()
  }

  private updateData (params: UserInfo) {
    Object.assign(this.info, params)
  }

  private getUserInfo () {
    return axios.get('user/getUserInfo')
      .then((res) => {
        cache.user.setAll(res.data.user)
        this.updateData(res.data.user)
        cache.user.set('roles', res.data.roles || [])
        cache.user.set('permissions', res.data.permissions || [])
      })
  }

  hasPermission (name: string) {
    const permissions: string[] = cache.user.get('permissions') || []
    return permissions.includes(name)
  }
}

export default new UserService()
