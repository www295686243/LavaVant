import Vue from 'vue'
import PopupArea from './PopupArea.vue'

export default class PopupAreaService {
  instance!: any

  open (defaultValue: number) {
    if (!this.instance) {
      const el = document.body.appendChild(document.createElement('div'))
      const Constructor = Vue.extend(PopupArea)
      this.instance = new Constructor({
        propsData: {
          defaultValue
        }
      }).$mount(el)
    }
    return this.instance.open()
  }

  destroy () {
    this.instance && this.instance.destroy()
  }
}
