<template>
  <van-switch
    v-model="innerValue"
    @change="onChange"
    active-color="#07c160"
    :active-value="1"
    :inactive-value="0"
    :loading="isLoading"
    :size="size"
    v-bind="$attrs"/>
</template>

<script lang="ts">
import FormMixins from '../FormMixins'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Switch } from 'vant'
import VantService from '@/service/VantService'
import { PromiseResult } from '@/plugins/axios'

@Component({
  inheritAttrs: false,
  components: {
    [Switch.name]: Switch
  }
})
export default class FormBaseSwitch extends Mixins(FormMixins) {
  @Prop()
  onSubmit!: Function

  @Prop({ default: 24 })
  size!: number

  private isLoading = false
  private originalValue = this.value

  private onChange (val: number) {
    if (this.onSubmit) {
      this.isLoading = true
      this.onSubmit(val)
        .then((res: PromiseResult) => {
          this.isLoading = false
          if (res && res.message) {
            VantService.toast.success(res.message)
          }
        })
        .catch((res: PromiseResult) => {
          this.isLoading = false
          this.innerValue = this.originalValue
          if (res && res.message) {
            VantService.toast.fail(res.message)
          }
        })
    }
  }
}
</script>
