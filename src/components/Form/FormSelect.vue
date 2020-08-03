<template>
  <FormInput
    class="FormSelect"
    v-model="innerName"
    :field="field"
    :placeholder="'请选择' + this.field.label"
    clear-trigger="always"
    is-link
    @click="handleOpenSelect"
    disabled />
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins } from 'vue-property-decorator'
import PopupPickerService, { Options } from '@/components/Popup/PopupPickerService'

@Component
export default class FormSelect extends Mixins(FormMixins) {
  private PopupPicker = new PopupPickerService()
  private innerName = ''

  private handleOpenSelect () {
    this.PopupPicker.open(this.field.options as any[], this.innerValue)
      .then((res: Options) => {
        this.innerName = res.display_name
        this.$emit('input', res.id)
      })
  }

  created () {
    const item = (this.field.options || []).find((res) => res.id === this.innerValue)
    if (item) {
      this.innerName = item.display_name || ''
    }
  }
}
</script>

<style lang="less">
.FormSelect {
  .van-field__label {
    color: @gray-7;
  }
  .van-field__control:disabled {
    color: @gray-8;
  }
}
</style>
