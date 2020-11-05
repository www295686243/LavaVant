import Vue from 'vue'
import PopupPicker from './PopupPicker.vue'

export interface Options {
  value: number;
  display_name: string;
  [key: string]: any;
}

export default class PopupPickerService {
  instance!: any

  open (options: Options[], defaultValue: number, valueKey = 'display_name') {
    if (!this.instance) {
      const el = document.body.appendChild(document.createElement('div'))
      const Constructor = Vue.extend(PopupPicker)
      this.instance = new Constructor({
        propsData: {
          options,
          defaultValue,
          valueKey
        }
      }).$mount(el)
    }
    return this.instance.open()
  }

  destroy () {
    this.instance && this.instance.destroy()
  }
}
