<template>
  <FormInput
    class="FormRangeDate"
    v-model="innerValue"
    :field="field"
    :clear-trigger="field.disabled ? null : 'always'"
    :is-link="!field.disabled"
    @click="handleOpenSelect">
    <template #input>
      <div class="field" v-if="innerValue">{{innerValue}}</div>
      <div class="placeholder" v-else>开始时间 ~ 结束时间</div>
    </template>
  </FormInput>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import PopupDateTimeService from '@/components/Popup/PopupDateTimeService'

@Component
export default class FormRangeDate extends Mixins(FormMixins) {
  @Prop()
  minValue!: string

  @Prop()
  maxValue!: string

  private PopupStartDate = new PopupDateTimeService()
  private PopupEndDate = new PopupDateTimeService()
  private innerMinValue = this.minValue || ''
  private innerMaxValue = this.maxValue || ''

  @Watch('innerMinValue')
  onInnerMinValue (val: string) {
    this.$emit('update:minValue', val)
  }

  @Watch('innerMaxValue')
  onInnerMaxValue (val: string) {
    this.$emit('update:maxValue', val)
  }

  @Watch('minValue')
  onMinValue (val: string) {
    this.innerMinValue = val
    if (!val) {
      this.innerValue = ''
    }
  }

  @Watch('maxValue')
  onMaxValue (val: string) {
    this.innerMaxValue = val
    if (!val) {
      this.innerValue = ''
    }
  }

  private handleOpenSelect () {
    let innerMinDate = ''
    this.PopupStartDate.open(this.innerMinValue, { minDate: this.field.minDate, title: '请选择开始时间', confirmButtonText: '下一步' })
      .then((minDate: string) => {
        innerMinDate = minDate
        return this.PopupEndDate.open(minDate, { minDate: new Date(minDate), title: '请选择结束时间' })
      })
      .then((maxDate: string) => {
        this.innerValue = innerMinDate + ' ~ ' + maxDate
        this.innerMinValue = innerMinDate
        this.innerMaxValue = maxDate
      })
  }

  created () {
    if (this.minValue && this.maxValue) {
      this.innerValue = this.minValue + ' ~ ' + this.maxValue
    }
  }
}
</script>

<style lang="less">
.FormRangeDate {
  .placeholder {
    color: @gray-5;
  }
  &.van-field--disabled .field {
    color: @gray-5;
  }
}
</style>
