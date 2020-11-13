import store from 'store2'

const prefix = process.env.VUE_APP_BASEURL + '/'

/**
 * 调用方式参考store2插件(例如:)config.get('menuEnum')
 * config: {menuEnum}
 */
export default {
  user: store.namespace(prefix + 'user'),
  user_personal: store.namespace(prefix + 'user_personal'),
  user_enterprise: store.namespace(prefix + 'user_enterprise'),
  user_control: store.namespace(prefix + 'user_control'),
  config: store.namespace(prefix + 'config'),
  version: store.namespace(prefix + 'version'),
  stat: store.namespace(prefix + 'stat'),
  hr: store.namespace(prefix + 'hr'),
  other: store.namespace(prefix + 'other'),
  clearAll () {
    store.clearAll()
  }
}
