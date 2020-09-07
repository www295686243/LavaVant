import cache from '@/plugins/cache'
import axios from '@/plugins/axios'
import { Route } from 'vue-router'
import { formatDate } from '@/plugins/tools'
import RouterService from './RouterService'

interface StackInput {
  message?: string;
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
  constructor () {
    this.stack = cache.stat.get('stack') || []
  }

  viewPush (route: Route) {
    this.push({
      path: route.path,
      desc: route.meta.title,
      method: 'View'
    })
  }

  clickPush (name: string, input?: StackInput) {
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
          return axios.post('api_log', { stack })
            .then(() => {
              cache.stat.set('stack', this.stack)
            })
        }
      })
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
  }

  queueExec () {
    return this.queue.reduce((acc, res) => acc.then(() => res))
  }
}

export default new StatService()
