<template>
  <van-button
    native-type="button"
    :type="type"
    @click="handleSubmit"
    class="ButtonSubmit"
    :loading="loading"
    v-bind="$attrs">
    <slot></slot>
  </van-button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VantService from '@/service/VantService'
import { PromiseResult } from '@/plugins/axios'
import StatService from '@/service/StatService'

@Component({
  inheritAttrs: false
})
export default class ButtonSubmit extends Vue {
  @Prop({ default: () => () => Promise.resolve() })
  onClick!: Function

  @Prop({ default: 'primary' })
  type!: string

  private loading = false

  private handleSubmit () {
    if (this.loading) return
    this.loading = true
    const result = this.onClick()
    if (result && typeof result.then === 'function') {
      result
        .then((res: PromiseResult) => {
          this.loading = false
          this.StatClick(res && res.message)
          if (res && res.message) {
            VantService.toast.success(res.message)
          }
        })
        .catch((res: PromiseResult) => {
          this.loading = false
          if (res) {
            let message = res.message
            if (res.status === 'error' && res.code === 422) {
              if (Array.isArray(res.data) && res.data.length > 0) {
                message = res.data.map((res: any) => res.text).join('\n')
              }
            }
            if (message) {
              VantService.toast.fail(message)
            }
            this.StatClick(message)
          } else {
            this.StatClick()
          }
        })
    } else {
      this.loading = false
      this.StatClick()
    }
  }

  private StatClick (message?: string) {
    if (this.$slots.default) {
      StatService.clickPush(this.$slots.default[0].text as string, message ? { message } : undefined)
    }
  }
}
</script>
