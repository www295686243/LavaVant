import cache from '@/plugins/cache'
import { Route } from 'vue-router'
import { formatDate, getEnv } from '@/plugins/tools'
import RouterService from './RouterService'
import QueryString from 'qs'
import UserService from './User/UserService'

interface StackInput {
  message?: string;
  _env?: any;
}

interface StackItem {
  path: string;
  desc: string;
  method: string;
  time?: string;
  input?: StackInput;
}

class StatService {
  stack: StackItem[] = []
  queue: Promise<any>[] = []
  isQueue = false
  baseUrl = process.env.VUE_APP_APIURL + '/api'
  constructor () {
    this.stack = cache.stat.get('stack') || []
  }

  viewPush (route: Route, input: StackInput = {}) {
    input._env = getEnv()
    this.push({
      path: route.path,
      desc: route.meta.title,
      method: 'View',
      input: input
    })
  }

  clickPush (name: string, input: StackInput = {}) {
    input._env = getEnv()
    this.push({
      path: RouterService.getPath(),
      desc: name,
      method: 'Click',
      input: input
    })
  }

  push (params: StackItem) {
    if (!params.desc) return
    this.stack.push({
      ...params,
      time: formatDate(new Date(), 'Y-m-d H:i:s')
    })
    cache.stat.set('stack', this.stack)
  }

  submit () {
    return Promise.resolve()
      .then(() => {
        const stack = this.stack.slice(0, this.stack.length)
        this.stack = this.stack.slice(stack.length)
        if (stack.length > 0) {
          return this.trackByImg('api_log', { stack })
            .then(() => {
              cache.stat.set('stack', this.stack)
            })
        }
      })
  }

  trackByImg (url: string, params: { stack: StackItem[]; _t?: number; user_id?: string; nickname?: string }) {
    return new Promise<void>((resolve) => {
      params._t = +new Date()
      params.user_id = UserService.info.id
      params.nickname = UserService.info.nickname
      const fullUrl = `${this.baseUrl}/${url}?${QueryString.stringify(params)}`
      const img = document.createElement('img')
      img.src = fullUrl
      img.style.display = 'none'
      img.style.width = '0px'
      img.style.height = '0px'

      document.body.appendChild(img)
      img.onload = () => {
        this.removeImg(img)
        resolve()
      }
      img.onerror = () => {
        this.removeImg(img)
        resolve()
      }
    })
  }

  removeImg (img: HTMLImageElement) {
    document.body.removeChild(img)
  }

  queueSubmit () {
    this.queue.push(this.submit())
    return Promise.resolve()
      .then(() => {
        if (!this.isQueue) {
          this.isQueue = true
          return this.queueExec()
        }
      })
      .then(() => {
        this.isQueue = false
      })
      .catch(() => {
        this.isQueue = false
      })
  }

  queueExec () {
    return this.queue.reduce((acc, res) => acc.then(() => res))
  }
}

export default new StatService()
