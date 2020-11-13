<template>
  <van-field
    class="FormInput"
    v-model="innerValue"
    :label="field.label"
    :name="field.label"
    :placeholder="innerPlaceholder"
    :rules="field.rules || []"
    :maxlength="maxlength"
    :required="required"
    @click="handleClick"
    @clear="handleClear"
    clearable
    :disabled="field.disabled"
    v-bind="$attrs">
    <slot name="input" slot="input"></slot>
  </van-field>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Field } from 'vant'

@Component({
  inheritAttrs: false,
  components: {
    [Field.name]: Field
  }
})
export default class FormInput extends Mixins(FormMixins) {
  @Prop()
  placeholder!: string

  private maxlength = null
  private required = false
  private innerPlaceholder = ''

  private genMaxLength () {
    const rule = (this.field.rules || []).find((res) => res.max || res.len)
    if (rule) {
      this.maxlength = rule.max || rule.len
    }
  }

  private genRequired () {
    this.required = (this.field.rules || []).some((res) => res.required)
  }

  private handleClick () {
    this.$emit('click')
  }

  private handleClear () {
    this.$emit('clear')
  }

  created () {
    if (this.placeholder) {
      this.innerPlaceholder = this.placeholder
    } else if (this.field.placeholder) {
      this.innerPlaceholder = this.field.placeholder
    } else {
      this.innerPlaceholder = '请输入' + this.field.label
    }
    this.genMaxLength()
    this.genRequired()
  }
}
</script>

<style lang="less">
.FormInput {
  &.van-field--error {
    .van-field__control {
      color: @gray-8;
    }
    .van-field__control::placeholder {
      color: @gray-5;
    }
  }
  &.van-field--disabled .van-field__label {
    color: @gray-7;
  }
}
</style>
