import Vue from 'vue'
import PopupRegister from './PopupRegister.vue'

class PopupRegisterService {
  instance!: any

  open () {
    if (!this.instance) {
      const el = document.body.appendChild(document.createElement('div'))
      const Constructor = Vue.extend(PopupRegister)
      this.instance = new Constructor().$mount(el)
    }
    return this.instance.open()
  }

  destroy () {
    this.instance && this.instance.destroy()
  }
}

export default new PopupRegisterService()
