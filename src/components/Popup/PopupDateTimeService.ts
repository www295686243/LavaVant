import Vue from 'vue'
import PopupDateTime from './PopupDateTime.vue'

interface Params {
  minDate?: Date;
  title?: string;
  type?: string;
  confirmButtonText?: string;
}

export default class PopupDateTimeService {
  open (defaultValue: string, params?: Params) {
    const el = document.body.appendChild(document.createElement('div'))
    const Constructor = Vue.extend(PopupDateTime)
    const instance: any = new Constructor({
      propsData: {
        ...params,
        defaultValue
      }
    }).$mount(el)
    return instance.open()
  }
}
