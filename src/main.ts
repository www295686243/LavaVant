import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Popup, Loading, Dialog, Row, Col, Icon } from 'vant'
import 'amfe-flexible'

Vue.use(Button).use(Popup).use(Loading).use(Dialog).use(Row).use(Col).use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
