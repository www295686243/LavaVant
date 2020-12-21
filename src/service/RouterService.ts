import VueRouter from 'vue-router'
import StatService from './StatService'
import UserService from './User/UserService'
import WXService from './WXService'

class RouterSerivce {
  router!: VueRouter
  keepAlives: string[] = []

  init (router: VueRouter) {
    this.router = router
    router.beforeEach((to, from, next) => {
      // 缓存组件
      if (to.meta.keepAlive) {
        const names = to.matched.map((item: any) => {
          return item.components.default.options.name
        }) as string[]
        this.keepAlives = Array.from(new Set(this.keepAlives.concat(names)))
      }
      // 设置title
      if (process.env.VUE_APP_ENV === 'dev') {
        document.title = 'demo'
      } else {
        document.title = to.meta.title || process.env.VUE_APP_NAME
      }
      // 页面访问埋点
      StatService.viewPush(to)
      // 开发环境直接跳过
      if (process.env.VUE_APP_ENV === 'dev') {
        next()
        return
      }
      if (to.meta.isDisableAuth) {
        next()
      } else {
        if (!UserService.isLogin()) {
          WXService.auth()
        } else {
          next()
        }
      }
    })
  }

  push (path: string, query?: any) {
    if (path.substr(0, 1) !== '/') {
      path = this.getPath() + '/' + path
    }
    this.router.push({
      path,
      query
    })
  }

  replace (path: string, query?: any) {
    if (path.substr(0, 1) !== '/') {
      path = this.getPath() + '/' + path
    }
    this.router.replace({
      path,
      query
    })
  }

  href (path: string, query?: any) {
    if (query) {
      const urlParams = Object.keys(query).map((key) => {
        return `${key}=${query[key]}`
      }).join('&')
      path = path + '?' + urlParams
    }
    location.href = path
  }

  go (step = -1) {
    this.router.go(step)
  }

  query (name: string) {
    const param = this.router.app.$route.query[name]
    return param as string || ''
  }

  getPath () {
    return this.getPathInfo().path
  }

  getPathInfo () {
    return this.router.app.$route
  }

  get (key: string) {
    const urlStr = location.search.replace('?', '')
    const params = urlStr.split('&').find((str) => str.includes(key + '='))
    return params ? params.replace(key + '=', '') : ''
  }

  getMetaQuery (name: string) {
    const meta = this.getPathInfo().meta
    return meta ? meta[name] : null
  }
}

export default new RouterSerivce()
