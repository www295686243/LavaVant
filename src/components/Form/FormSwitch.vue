<template>
  <van-field
    class="FormSwitch"
    :label="field.label">
    <template #input>
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
  </van-field>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Field, Switch } from 'vant'
import VantService from '@/service/VantService'
import { PromiseResult } from '@/plugins/axios'

@Component({
  inheritAttrs: false,
  components: {
    [Field.name]: Field,
    [Switch.name]: Switch
  }
})
export default class FormSwitch extends Mixins(FormMixins) {
  @Prop()
  onSubmit!: Function

  @Prop({ default: 24 })
  size!: number

  private isLoading = false

  private onChange () {
    if (this.onSubmit) {
      this.isLoading = true
      this.onSubmit()
        .then((res: PromiseResult) => {
          this.isLoading = false
          if (res && res.message) {
            VantService.toast.success(res.message)
          }
        })
        .catch((res: PromiseResult) => {
          this.isLoading = false
          if (res && res.message) {
            VantService.toast.fail(res.message)
          }
        })
    }
  }
}
</script>
