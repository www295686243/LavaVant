<template>
  <van-field
    class="FormSalary"
    :label="field.label"
    :name="field.label">
    <template #input>
      <div class="range-input-container">
        <template v-if="innerIsNegotiable === 0">
          <FormInput v-model.number="innerMinValue" :field="minValueField" class="min-salary" placeholder="最小薪资" type="digit"></FormInput>
          <div class="range-input-line">~</div>
          <FormInput v-model.number="innerMaxValue" :field="maxValueField" class="max-salary" placeholder="最大薪资" type="digit"></FormInput>
        </template>
        <Checkbox v-model="innerIsNegotiable" class="negotiable">面议</Checkbox>
      </div>
    </template>
  </van-field>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { Field } from 'vant'
import Checkbox from './Base/Checkbox.vue'

@Component({
  components: {
    [Field.name]: Field,
    Checkbox
  }
})
export default class FormSalary extends Mixins(FormMixins) {
  @Prop()
  minValue!: string

  @Prop()
  maxValue!: string

  @Prop()
  isNegotiable!: number

  private innerMinValue = this.minValue || ''
  private innerMaxValue = this.maxValue || ''
  private innerIsNegotiable = this.isNegotiable
  private temporaryMinValue = ''
  private temporaryMaxValue = ''

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
  }

  @Watch('maxValue')
  onMaxValue (val: string) {
    this.innerMaxValue = val
  }

  @Watch('innerIsNegotiable')
  onInnerIsNegotiable (val: number) {
    this.$emit('update:isNegotiable', val)
  }

  @Watch('isNegotiable')
  onIsNegotiable (val: number) {
    this.innerIsNegotiable = val
    if (val > 0) {
      this.temporaryMinValue = this.innerMinValue
      this.temporaryMaxValue = this.innerMaxValue
      this.innerMinValue = ''
      this.innerMaxValue = ''
    } else {
      this.innerMinValue = this.temporaryMinValue
      this.innerMaxValue = this.temporaryMaxValue
    }
  }

  private minValueField = {
    label: ''
  }

  private maxValueField = {
    label: ''
  }
}
</script>

<style lang="less">
.FormSalary {
  padding: 9px 16px;
  .range-input-container {
    display: flex;
    align-items: center;
  }
  .min-salary,
  .max-salary {
    display: block;
    padding: 0 8px;
    flex: 1 1 0;
    border: 1px solid @gray-4;
    &::after {
      border: 0;
    }
  }
  .range-input-line {
    padding: 0 8px;
    flex: 0 0 auto;
  }
  .negotiable {
    margin-left: 12px;
    flex: 0 0 auto;
    height: 26px;
    .van-checkbox__label {
      line-height: initial;
    }
  }
}
</style>
