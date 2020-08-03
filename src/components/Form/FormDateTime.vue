<template>
  <FormInput
    class="FormDateTime"
    v-model="innerValue"
    :field="field"
    :placeholder="'请选择' + this.field.label"
    clear-trigger="always"
    is-link
    @click="handleOpenSelect"
    disabled />
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import PopupDateTimeService from '@/components/Popup/PopupDateTimeService'

@Component
export default class FormDateTime extends Mixins(FormMixins) {
  @Prop({ default: () => new Date('1920/01/01') })
  minDate!: Date

  private PopupDateTime = new PopupDateTimeService()

  private handleOpenSelect () {
    this.PopupDateTime.open(this.innerValue, { minDate: this.minDate })
      .then((res: string) => {
        this.innerValue = res
      })
  }
}
</script>

<style lang="less">
.FormDateTime {
  .van-field__label {
    color: @gray-7;
  }
  .van-field__control:disabled {
    color: @gray-8;
  }
}
</style>
