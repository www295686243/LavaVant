import cache from '@/plugins/cache'
import axios, { PromiseResult } from '@/plugins/axios'
import VersionService from './VersionService'
import { formatDate } from '@/plugins/tools'

interface LoginParams {
  username: string;
  password: string;
}

interface RoleItem {
  name: string;
  display_name: string;
}

interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  phone: string;
  roles: RoleItem[];
  permissions: string[];
}

class UserService {
  info: UserInfo = {
    id: 0,
    nickname: '',
    username: '',
    phone: '',
    roles: [],
    permissions: []
  }

  constructor () {
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

  todayFirstLogin () {
    return Promise.resolve()
      .then(() => {
        const today = formatDate()
        const firstLoginDate = cache.user.get('_firstLoginDate')
        if ((!firstLoginDate || today > firstLoginDate) && this.info.id) {
          return axios.post('user/todayFirstLogin', {})
            .then((res) => {
              this.cacheUserInfo(res)
              cache.user.set('_firstLoginDate', today)
            })
        }
      })
  }

  logout () {
    return Promise.resolve()
      .then(() => {
        cache.clearAll()
        VersionService.clearAll()
        this.info.id = 0
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
        this.cacheUserInfo(res)
      })
  }

  private cacheUserInfo (res: PromiseResult) {
    cache.user.setAll(res.data.user)
    this.updateData(res.data.user)
    cache.user.set('roles', res.data.roles || [])
    cache.user.set('permissions', res.data.permissions || [])
  }

  hasPermission (name: string) {
    return this.info.permissions.includes(name)
  }
}

export default new UserService()
