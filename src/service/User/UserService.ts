import cache from '@/plugins/cache'
import axios, { PromiseResult } from '@/plugins/axios'
import VersionService from '@/service/VersionService'
import { formatDate } from '@/plugins/tools'
import UserPersonalService from '@/service/User/UserPersonalService'
import UserEnterpriseService from '@/service/User/UserEnterpriseService'
import RouterService from '@/service/RouterService'
import PopupRegisterService from '@/components/Popup/PopupRegister/PopupRegisterService'

interface LoginParams {
  username: string;
  password: string;
}

interface RoleItem {
  name: string;
  display_name: string;
}

interface UserInfo {
  id: string;
  username: string;
  nickname: string;
  phone: string;
  head_url: string;
  city: number;
  roles: RoleItem[];
  permissions: string[];
  is_follow_official_account: number;
}

class UserService {
  info: UserInfo = {
    id: '',
    nickname: '',
    username: '',
    phone: '',
    head_url: '',
    city: 0,
    roles: [],
    permissions: [],
    is_follow_official_account: 0
  }

  // 是否显示关注公众号广告
  isShowFollowAd = true

  constructor () {
    this.updateData(cache.user.getAll())
  }

  isLogin () {
    return !!cache.user.get('api_token')
  }

  login (params: LoginParams) {
    return axios.post('user/login', params)
      .then((res) => {
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
          cache.user.set('_firstLoginDate', today)
          return axios.post('user/todayFirstLogin')
            .then((res) => {
              this.cacheUserInfo(res)
            })
        }
      })
  }

  logout () {
    return Promise.resolve()
      .then(() => {
        cache.clearAll()
        VersionService.clearAll()
        this.info.id = ''
        return '注销成功'
      })
  }

  sendSmsCaptcha (params: { phone: string; type_name: string }) {
    return axios.post('user/sendSmsCaptcha', params)
  }

  bindPhone (params: { phone: string; code: string }) {
    return axios.post('user/bindPhone', params)
      .then((res) => this.getBaseUserInfo().then(() => res))
  }

  updatePhone (params: { phone: string; code: string }) {
    return axios.post('user/updatePhone', params)
      .then((res) => this.getBaseUserInfo().then(() => res))
  }

  verifyPhone (params: { phone: string; code: string }) {
    return axios.post('user/verifyPhone', params)
  }

  updateData (params: UserInfo | any) {
    cache.user.setAll(params)
    Object.assign(this.info, params)
    if (this.info.is_follow_official_account) {
      this.isShowFollowAd = false
    }
  }

  private getBaseUserInfo () {
    return axios.get('user/getBaseUserInfo')
      .then((res) => {
        this.updateData(res.data)
      })
  }

  getUserInfo () {
    return axios.get('user/getUserInfo')
      .then((res) => {
        this.cacheUserInfo(res)
        UserPersonalService.show()
        UserEnterpriseService.show()
      })
  }

  getWallet () {
    return axios.get('user/getWallet')
  }

  getBill (page: number) {
    return axios.get('user/getBill', { page })
  }

  setInviteUser () {
    return axios.post('user/setInviteUser', { iu: RouterService.query('iu') })
  }

  private cacheUserInfo (res: PromiseResult) {
    this.updateData(res.data.user)
    cache.user.set('roles', res.data.roles || [])
    cache.user.set('permissions', res.data.permissions || [])
  }

  hasPermission (name: string) {
    return this.info.permissions.includes(name)
  }

  hasRole (name: string) {
    return this.info.roles.some((res) => res.name === name)
  }

  checkBaseInfo () {
    let attr = ''
    let industry: any[] = []
    if (this.hasRole('Enterprise Member')) {
      attr = UserEnterpriseService.info.industry_attr
      industry = UserEnterpriseService.info.industry
    } else {
      attr = UserPersonalService.info.position_attr
      industry = UserPersonalService.info.industry
    }
    return Promise.resolve()
      .then(() => {
        if (!this.info.phone) {
          return Promise.reject(new Error('请先登录'))
        } else if (!(this.info.city && attr && industry.length > 0)) {
          return Promise.reject(new Error('请先完善基本信息'))
        }
      })
      .catch((err) => {
        PopupRegisterService.open()
        return Promise.reject(err)
      })
  }

  checkOfficialAccounts () {
    return Promise.resolve()
      .then(() => {
        if (!this.info.is_follow_official_account) {
          return axios.get('user/checkOfficialAccounts')
        }
      })
  }

  baseInfoUpdate (params: { role: string; industry: number[]; industry_attr?: number; position_attr?: number; city: number }) {
    return axios.post('user/baseInfoUpdate', params)
      .then((res) => {
        return this.getBaseUserInfo()
          .then(() => {
            if (params.role === 'Personal Member') {
              return UserPersonalService.show()
            } else if (params.role === 'Enterprise Member') {
              return UserEnterpriseService.show()
            }
          })
          .then(() => res)
      })
  }
}

export default new UserService()
