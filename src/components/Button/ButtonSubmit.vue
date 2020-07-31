<template>
  <van-button
    native-type="button"
    :type="type"
    :icon="icon"
    :size="size"
    :block="block"
    :disabled="disabled"
    :plain="plain"
    :round="round"
    :hairline="hairline"
    @click="handleSubmit"
    class="ButtonSubmit"
    :loading="loading">
    <slot></slot>
  </van-button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VantService from '@/service/VantService'
import { IResult } from '@/plugins/axios'

@Component
export default class ButtonSubmit extends Vue {
  @Prop({ default: () => () => Promise.resolve() })
  onClick!: Function

  @Prop({ default: 'primary' })
  readonly type!: string

  @Prop()
  icon!: string

  @Prop()
  size!: string

  @Prop()
  block!: boolean

  @Prop()
  disabled!: boolean

  @Prop({ default: false })
  plain!: boolean

  @Prop({ default: false })
  round!: boolean

  @Prop({ default: false })
  hairline!: boolean

  private loading = false

  private handleSubmit () {
    if (this.loading) return
    this.loading = true
    const result = this.onClick()
    if (result && typeof result.then === 'function') {
      result
        .then((res: IResult) => {
          this.loading = false
          if (res && res.message) {
            VantService.toast.success(res.message)
          }
        })
        .catch((res: IResult) => {
          this.loading = false
          if (res.status === 'error') {
            let message = res.message
            if (res.code === 422) {
              if (Array.isArray(res.data) && res.data.length > 0) {
                message = res.data.map((res: any) => res.text).join('\n')
              }
            }
            VantService.toast.fail(message)
          }
        })
    } else {
      this.loading = false
    }
  }
}
</script>
