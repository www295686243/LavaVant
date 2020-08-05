<template>
  <van-checkbox
    v-model="innerValue"
    :checked-color="checkedColor"
    shape="square"
    v-bind="$attrs">
    <slot></slot>
  </van-checkbox>
</template>

<script lang="ts">
import FormMixins from '../FormMixins'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { Checkbox } from 'vant'

@Component({
  inheritAttrs: false,
  components: {
    [Checkbox.name]: Checkbox
  }
})
export default class FormBaseCheckbox extends Mixins(FormMixins) {
  @Prop({ default: '#1989fa' })
  checkedColor!: string

  @Watch('innerValue')
  onInnerValue (val: boolean) {
    if (typeof this.value === 'boolean') {
      this.$emit('input', val)
    } else {
      this.$emit('input', val ? 1 : 0)
    }
  }

  @Watch('value')
  onValue (val: number|boolean) {
    this.init(val)
  }

  init (value: number|boolean) {
    if (typeof value === 'boolean') {
      this.innerValue = value
    } else {
      this.innerValue = value > 0
    }
  }

  created () {
    this.init(this.value)
  }
}
</script>
