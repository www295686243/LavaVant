import HrAbstract from '@/abstract/HrAbstract'
import Vue from 'vue'
import PopupSelectCoupon from './PopupSelectCoupon.vue'

class PopupSelectCouponService {
  instance!: any

  open (Service: HrAbstract) {
    if (!this.instance) {
      const el = document.body.appendChild(document.createElement('div'))
      const Constructor = Vue.extend(PopupSelectCoupon)
      this.instance = new Constructor({
        propsData: {
          Service
        }
      }).$mount(el)
    }
    return this.instance.open()
  }

  destroy () {
    if (this.instance) {
      this.instance.destroy()
      this.instance = null
    }
  }
}

export default new PopupSelectCouponService()
