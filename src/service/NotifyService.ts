import RouterService from './RouterService'
import axios from '@/plugins/axios'
import UserService from './UserService'

class NotifyService {
  private isGetUnread = false
  public isClose = false
  public unreadCount = 0

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
            })
        }
      })
  }

  checkMarkHaveRead () {
    return Promise.resolve()
      .then(() => {
        if (this.unreadCount > 0) {
          return axios.get('notify/markHaveRead')
            .then(() => {
              this.unreadCount = 0
            })
        }
      })
  }

  setClose () {
    this.isClose = true
  }
}

export default new NotifyService()
