import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Popup, Loading, Dialog, Row, Col, Icon } from 'vant'
import 'amfe-flexible'

import DataRender from './components/DataRender.vue'
import PageContainer from './components/PageContainer.vue'
import ButtonSubmit from './components/Button/ButtonSubmit.vue'
import ButtonStat from './components/Button/ButtonStat.vue'
import FormRender from './components/Form/FormRender.vue'
import FormInput from './components/Form/FormInput.vue'
import FormTextarea from './components/Form/FormTextarea.vue'
import FormSwitch from './components/Form/FormSwitch.vue'
import FormCheckbox from './components/Form/FormCheckbox.vue'
import { getCityName } from './plugins/tools'

import RouterService from '@/service/RouterService'
import VersionService from '@/service/VersionService'

Vue.use(Button).use(Popup).use(Loading).use(Dialog).use(Row).use(Col).use(Icon)
Vue.component('DataRender', DataRender)
Vue.component('PageContainer', PageContainer)
Vue.component('ButtonSubmit', ButtonSubmit)
Vue.component('ButtonStat', ButtonStat)
Vue.component('FormRender', FormRender)
Vue.component('FormInput', FormInput)
Vue.component('FormTextarea', FormTextarea)
Vue.component('FormSwitch', FormSwitch)
Vue.component('FormCheckbox', FormCheckbox)

Vue.config.productionTip = false

Vue.filter('cityName', (value: string) => {
  return getCityName(value, '')
})

Vue.filter('empty', (value: string) => {
  return value || '--'
})

RouterService.init(router)
VersionService.init()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
