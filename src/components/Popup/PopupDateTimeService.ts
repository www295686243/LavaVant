import Vue from 'vue'
import PopupDateTime from './PopupDateTime.vue'

interface Params {
  minDate?: Date;
}

export default class PopupDateTimeService {
  instance!: any

  open (defaultValue: string, params?: Params) {
    if (!this.instance) {
      const el = document.body.appendChild(document.createElement('div'))
      const Constructor = Vue.extend(PopupDateTime)
      this.instance = new Constructor({
        propsData: {
          ...params,
          defaultValue
        }
      }).$mount(el)
    }
    return this.instance.open()
  }
}
