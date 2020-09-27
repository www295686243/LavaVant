import Vue from 'vue'
import PopupClassify from './PopupClassify.vue'

export interface Options {
  id: number;
  display_name: string;
  children: Options[];
}

export default class PopupClassifyService {
  instance!: any

  open (options: Options[], defaultValue: number[]) {
    if (!this.instance) {
      const el = document.body.appendChild(document.createElement('div'))
      const Constructor = Vue.extend(PopupClassify)
      this.instance = new Constructor({
        propsData: {
          options
        }
      }).$mount(el)
    }
    return this.instance.open(defaultValue)
  }

  destroy () {
    this.instance && this.instance.destroy()
  }
}
