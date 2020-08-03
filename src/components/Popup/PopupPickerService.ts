import Vue from 'vue'
import PopupPicker from './PopupPicker.vue'

export interface Options {
  id: number;
  display_name: string;
}

export default class PopupPickerService {
  instance!: any

  open (options: Options[], defaultValue: number) {
    if (!this.instance) {
      const el = document.body.appendChild(document.createElement('div'))
      const Constructor = Vue.extend(PopupPicker)
      this.instance = new Constructor({
        propsData: {
          options,
          defaultValue
        }
      }).$mount(el)
    }
    return this.instance.open()
  }
}
