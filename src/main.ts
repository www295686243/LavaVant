import './class-component-hooks'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Popup, Loading, Dialog, Row, Col, Icon, Cell, CellGroup } from 'vant'
import 'amfe-flexible'
import './assets/styles/iconfont.less'
import './assets/styles/index.less'

import DataRender from './components/DataRender.vue'
import PageContainer from './components/PageContainer.vue'
import ListContainer from './components/ListContainer.vue'
import ButtonSubmit from './components/Button/ButtonSubmit.vue'
import ButtonStat from './components/Button/ButtonStat.vue'
import FormRender from './components/Form/FormRender.vue'
import FormInput from './components/Form/FormInput.vue'
import FormText from './components/Form/FormText.vue'
import FormTextarea from './components/Form/FormTextarea.vue'
import FormSwitch from './components/Form/FormSwitch.vue'
import FormCheckbox from './components/Form/FormCheckbox.vue'
import FormCheckboxGroup from './components/Form/FormCheckboxGroup.vue'
import FormRadioGroup from './components/Form/FormRadioGroup.vue'
import FormSelect from './components/Form/FormSelect.vue'
import FormDateTime from './components/Form/FormDateTime.vue'
import FormStepper from './components/Form/FormStepper.vue'
import FormRangeDate from './components/Form/FormRangeDate.vue'
import FormSalary from './components/Form/FormSalary.vue'
import FormArea from './components/Form/FormArea.vue'
import FormSms from './components/Form/FormSms.vue'
import FormImage from './components/Form/FormImage.vue'
import FormImages from './components/Form/FormImages.vue'
import FormClassify from './components/Form/FormClassify.vue'
import FormGroupRender from './components/Form/FormGroupRender.vue'
import FormGroupPopup from './components/Form/FormGroupPopup.vue'
import { getCityName } from './plugins/tools'

import RouterService from '@/service/RouterService'
import VersionService from '@/service/VersionService'
import WXService from '@/service/WXService'
import { getOptionsLabel } from './service/ConstService'

Vue.use(Button).use(Popup).use(Loading).use(Dialog).use(Row).use(Col).use(Icon).use(Cell).use(CellGroup)
Vue.component('DataRender', DataRender)
Vue.component('PageContainer', PageContainer)
Vue.component('ListContainer', ListContainer)
Vue.component('ButtonSubmit', ButtonSubmit)
Vue.component('ButtonStat', ButtonStat)
Vue.component('FormRender', FormRender)
Vue.component('FormInput', FormInput)
Vue.component('FormText', FormText)
Vue.component('FormTextarea', FormTextarea)
Vue.component('FormSwitch', FormSwitch)
Vue.component('FormRadioGroup', FormRadioGroup)
Vue.component('FormCheckboxGroup', FormCheckboxGroup)
Vue.component('FormCheckbox', FormCheckbox)
Vue.component('FormSelect', FormSelect)
Vue.component('FormDateTime', FormDateTime)
Vue.component('FormStepper', FormStepper)
Vue.component('FormRangeDate', FormRangeDate)
Vue.component('FormSalary', FormSalary)
Vue.component('FormArea', FormArea)
Vue.component('FormSms', FormSms)
Vue.component('FormImage', FormImage)
Vue.component('FormImages', FormImages)
Vue.component('FormClassify', FormClassify)
Vue.component('FormGroupRender', FormGroupRender)
Vue.component('FormGroupPopup', FormGroupPopup)

Vue.config.productionTip = false

Vue.filter('cityName', (value: string) => {
  return getCityName(value, '')
})

Vue.filter('empty', (value: string) => {
  return value || '--'
})

Vue.filter('getOptionsLabel', (value: number) => {
  return getOptionsLabel(value)
})

RouterService.init(router)
VersionService.init()
WXService.init()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
