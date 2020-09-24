<template>
  <FormInput
    class="FormCheckboxGroup"
    :border="border"
    :field="field">
    <template #input>
      <div>
        <div>
          <van-checkbox-group v-model="innerValue" direction="horizontal">
            <Checkbox shape="square" :name="v[props.value]" v-for="v in options" :key="v[props.value]">{{v[props.label]}}</Checkbox>
          </van-checkbox-group>
        </div>
        <div class="import" v-if="text !== undefined">
          <FormInput v-model="innerText" colon :field="fields.import" :label-width="40" :style="{ width: '150px' }"></FormInput>
        </div>
      </div>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Inject } from 'vue-property-decorator'
import { CheckboxGroup } from 'vant'
import Checkbox from './Base/Checkbox.vue'
import ValidateService, { FormFieldItem } from '@/service/ValidateService'
import { Service } from './FormRender.vue'
import { getGlobalOptions, getOptions } from '@/service/ConstService'

@Component({
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    Checkbox
  }
})
export default class FormCheckboxGroup extends Vue {
  @Inject('formService')
  formService!: Service

  @Prop()
  field!: FormFieldItem

  @Prop()
  value!: any

  @Prop()
  text!: string

  @Prop()
  border!: boolean

  // value-array, label-array, value-string, label-string
  @Prop({ default: 'value-array' })
  type!: string

  @Watch('value')
  onValue (val: string | number[] | string[]) {
    this.setInnerValue(val)
  }

  @Watch('innerValue')
  onInnerValue (val: number[] | string[]) {
    this.setValue(val)
  }

  @Watch('text')
  onText (val: string) {
    this.innerText = val
  }

  @Watch('innerText')
  onInnerText (val: string) {
    this.$emit('update:text', val)
  }

  private innerText = this.text || ''
  private options: { id: number; display_name: string }[] = []
  private innerValue: string[] | number[] = []

  private fields = {
    import: ValidateService.genRule({
      prop: 'import',
      label: '其它',
      rules: [ValidateService.max(6)]
    })
  }

  private props = {
    value: 'id',
    label: 'display_name'
  }

  private setInnerValue (value: string | number[] | string[]) {
    if (this.type === 'value-string' || this.type === 'label-string') {
      this.innerValue = (value as string).split(',').filter((res) => res)
    } else {
      this.innerValue = JSON.parse(JSON.stringify(value))
    }
  }

  private setValue (value: string[] | number[]) {
    let innerValue!: string | number[] | string[]
    if (this.type === 'value-string' || this.type === 'label-string') {
      innerValue = value.join()
    } else {
      innerValue = JSON.parse(JSON.stringify(value))
    }
    this.$emit('input', innerValue)
  }

  created () {
    this.setInnerValue(this.value)
    Object.assign(this.props, this.field.props)
    if (this.type === 'label-array' || this.type === 'label-string') {
      Object.assign(this.props, { value: this.props.label, label: this.props.label })
    }
    if (this.field.options) {
      this.options = this.field.options
    } else {
      this.options = getOptions(this.formService.getModelName() + ':' + this.field.prop)
      if (this.options.length === 0) {
        this.options = getGlobalOptions(this.field.prop as string)
      }
    }
  }
}
</script>

<style lang="less">
.FormCheckboxGroup {
  padding: 2px 16px 10px;
  &.van-cell--required::before {
    top: 7px;
  }
  & > .van-cell__title {
    padding-top: 5px;
  }
  .van-checkbox {
    margin-top: 8px;
  }
  .import {
    .FormInput {
      padding: 10px 0;
      .van-field__label {
        text-align: left;
        margin-right: 0;
        padding-right: 0;
      }
      .van-field__value {
        border-bottom: 1px solid @gray-3;
      }
    }
  }
}
</style>
