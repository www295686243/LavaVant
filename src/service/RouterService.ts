import VueRouter from 'vue-router'

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
      document.title = to.meta.title || process.env.VUE_APP_NAME
      // 开发环境直接跳过
      if (process.env.VUE_APP_ENV === 'dev') {
        next()
        return
      }
      if (to.meta.isDisableAuth) {
        next()
      } else {
        next()
      }
    })
  }

  push (path: string, query?: any) {
    this.router.push({
      path,
      query
    })
  }

  replace (path: string, query?: any) {
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

  query (name: string): string | number {
    const param = this.router.app.$route.query[name]
    if (name === 'id' || name.includes('_id')) {
      return param ? Number(param) : 0
    } else {
      return param as string || ''
    }
  }
}

export default new RouterSerivce()
