import Vue from 'vue'
import PopupRegister from './PopupRegister.vue'
import PopupPhone from './PopupPhone.vue'

class PopupRegisterService {
  instance!: any

  open (role?: string) {
    const el = document.body.appendChild(document.createElement('div'))
    const Constructor = Vue.extend(PopupRegister)
    this.instance = new Constructor({
      propsData: {
        role
      }
    }).$mount(el)
    return this.instance.open()
  }

  phone () {
    const el = document.body.appendChild(document.createElement('div'))
    const Constructor = Vue.extend(PopupPhone)
    this.instance = new Constructor().$mount(el)
    return this.instance.open()
  }

  destroy () {
    if (this.instance) {
      this.instance.destroy()
      this.instance = null
    }
  }
}

export default new PopupRegisterService()
