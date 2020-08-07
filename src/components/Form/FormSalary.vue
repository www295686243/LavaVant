<template>
  <FormInput
    class="FormSalary"
    :field="field">
    <template #input>
      <div class="range-input-container">
        <van-checkbox-group v-model="innerValue"></van-checkbox-group>
        <template v-if="innerIsNegotiable === 0">
          <FormInput v-model.number="innerMinValue" :field="{ label: '' }" class="min-salary" placeholder="最小薪资" type="digit"></FormInput>
          <div class="range-input-line">~</div>
          <FormInput v-model.number="innerMaxValue" :field="{ label: '' }" class="max-salary" placeholder="最大薪资" type="digit"></FormInput>
        </template>
        <Checkbox v-model="innerIsNegotiable" class="negotiable">面议</Checkbox>
      </div>
    </template>
  </FormInput>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop, Watch, Inject } from 'vue-property-decorator'
import Checkbox from './Base/Checkbox.vue'
import { CheckboxGroup } from 'vant'

interface InnerRule {
  required?: boolean;
  validator?: Function;
  message?: string;
}

@Component({
  components: {
    Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  }
})
export default class FormSalary extends Mixins(FormMixins) {
  @Prop()
  minValue!: string

  @Prop()
  maxValue!: string

  @Prop()
  isNegotiable!: number

  @Inject()
  FormRenderElement!: Function

  private innerMinValue = this.minValue || ''
  private innerMaxValue = this.maxValue || ''
  private innerIsNegotiable = this.isNegotiable
  private temporaryMinValue = ''
  private temporaryMaxValue = ''

  private innerRules: InnerRule[] = [{ validator: this.validateSalary, message: `请正确输入${this.field.label}` }]

  @Watch('innerMinValue')
  onInnerMinValue (val: string) {
    this.$emit('update:minValue', val)
    this.FormRenderElement().resetValidation(this.field.label)
  }

  @Watch('innerMaxValue')
  onInnerMaxValue (val: string) {
    this.$emit('update:maxValue', val)
    this.FormRenderElement().resetValidation(this.field.label)
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
    if (val > 0) {
      this.temporaryMinValue = this.innerMinValue
      this.temporaryMaxValue = this.innerMaxValue
      this.innerMinValue = ''
      this.innerMaxValue = ''
    } else {
      this.innerMinValue = this.temporaryMinValue
      this.innerMaxValue = this.temporaryMaxValue
    }
    this.FormRenderElement().resetValidation(this.field.label)
  }

  @Watch('isNegotiable')
  onIsNegotiable (val: number) {
    this.innerIsNegotiable = val
  }

  private validateSalary () {
    if (this.innerMinValue || this.innerMaxValue) {
      if (this.innerMinValue > this.innerMaxValue) {
        return false
      }
    }
    return true
  }

  private validateSalaryRequired () {
    return this.innerIsNegotiable > 0 || !!this.innerMinValue || !!this.innerMaxValue
  }

  created () {
    const isRequired = (this.field.rules || []).find((res) => res.required)
    if (isRequired) {
      this.innerRules = this.innerRules.concat([{ required: true, message: `请输入${this.field.label}` }]).concat([{ validator: this.validateSalaryRequired, message: `请输入${this.field.label}` }])
    }
    this.field.rules = this.innerRules
    this.innerValue = [1]
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
