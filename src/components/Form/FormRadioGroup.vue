<template>
  <FormInput
    class="FormRadioGroup"
    :border="border"
    :field="field">
    <template #input>
      <van-radio-group v-model="innerValue" direction="horizontal" :disabled="field.disabled">
        <van-radio :name="v[props.value]" v-for="v in options" :key="v[props.value]">{{v[props.label]}}</van-radio>
      </van-radio-group>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { Component, Mixins, Inject, Prop } from 'vue-property-decorator'
import { RadioGroup, Radio } from 'vant'
import { Service } from './FormRender.vue'
import { getGlobalOptions, getOptions } from '@/service/ConstService'
import FormMixins from './FormMixins'
import { Options } from '../Popup/PopupPickerService'

@Component({
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  }
})
export default class FormRadioGroup extends Mixins(FormMixins) {
  @Inject('formService')
  formService!: Service

  @Prop()
  border!: boolean

  private props = {
    value: 'id',
    label: 'display_name'
  }

  private options: Options[] = []

  created () {
    Object.assign(this.props, this.field.props)
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
.FormRadioGroup {
  padding: 2px 16px 10px;
  &.van-cell--required::before {
    top: 7px;
  }
  & > .van-cell__title {
    padding-top: 5px;
  }
  .van-radio {
    margin-top: 8px;
  }
}
</style>
