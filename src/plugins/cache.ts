import store from 'store2'

const prefix = process.env.VUE_APP_BASEURL + '/'

/**
 * 调用方式参考store2插件(例如:)config.get('menuEnum')
 * config: {menuEnum}
 */
export default {
  user: store.namespace(prefix + 'user'),
  config: store.namespace(prefix + 'config'),
  version: store.namespace(prefix + 'version'),
  stat: store.namespace(prefix + 'stat'),
  clearAll () {
    store.clearAll()
  }
}
