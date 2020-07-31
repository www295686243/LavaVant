// import { Component, Vue } from 'vue-property-decorator'

// @Component
// export default class EventService extends Vue {
//   public on (name: string, callback: Function) {
//     this.$on(name, callback)
//   }

//   public emit (name: string, ...args: any[]) {
//     this.$emit(name, ...args)
//   }

//   public once (name: string, callback: Function) {
//     this.$once(name, callback)
//   }

//   public off (name: string) {
//     this.$off(name)
//   }
// }

import Vue from 'vue'

export default new Vue({
  methods: {
    on (name: string, callback: Function) {
      this.$on(name, callback)
    },
    emit (name: string, ...args: any[]) {
      this.$emit(name, ...args)
    },
    off (name: string) {
      this.$off(name)
    }
  }
})
