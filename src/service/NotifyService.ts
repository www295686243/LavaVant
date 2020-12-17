import RouterService from './RouterService'
import axios from '@/plugins/axios'
import UserService from './User/UserService'

class NotifyService {
  private isGetUnread = false
  public isShow = false
  public unreadCount = 0
  private ignoreRouteList = ['/user/notify', '/user']

  index (page: number) {
    return axios.get('notify', { page })
  }

  checkQueryNotify () {
    return Promise.resolve()
      .then(() => {
        const notify_id = RouterService.query('notify_id')
        if (notify_id) {
          return axios.get(`notify/${notify_id}`)
        }
      })
  }

  getUnreadCount () {
    return Promise.resolve()
      .then(() => {
        if (this.isGetUnread === false && UserService.isLogin()) {
          return axios.get('notify/getUnreadCount')
            .then((res) => {
              this.unreadCount = res.data.count
              this.isGetUnread = true
              if (!this.ignoreRouteList.includes(RouterService.getPath()) && this.unreadCount > 0) {
                this.isShow = true
              }
            })
        }
      })
  }

  reloadUnreadCount () {
    return Promise.resolve()
      .then(() => {
        if (this.isGetUnread === true && UserService.isLogin()) {
          return axios.get('notify/getUnreadCount')
            .then((res) => {
              this.unreadCount = res.data.count
            })
        }
      })
  }

  checkMarkHaveRead () {
    return axios.get('notify/markHaveRead')
      .then(() => {
        this.unreadCount = 0
      })
  }

  setClose () {
    this.isShow = false
  }
}

export default new NotifyService()
