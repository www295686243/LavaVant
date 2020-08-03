<template>
  <van-field
    type="textarea"
    class="FormTextarea"
    v-model="innerValue"
    :label="field.label"
    :name="field.label"
    :placeholder="'请输入' + field.label"
    :rules="field.rules"
    :maxlength="maxlength"
    :required="required"
    show-word-limit
    :rows="rows"
    clearable
    v-bind="$attrs" />
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
export default class FormTextarea extends Mixins(FormMixins) {
  @Prop({ default: 3 })
  rows!: number

  private maxlength = null
  private required = false

  private genMaxLength () {
    const rule = (this.field.rules || []).find((res) => res.max || res.len)
    if (rule) {
      this.maxlength = rule.max || rule.len
    }
  }

  private genRequired () {
    this.required = (this.field.rules || []).some((res) => res.required)
  }

  created () {
    this.genMaxLength()
    this.genRequired()
  }
}
</script>

<style lang="less">
.FormTextarea {
  &.van-field--error {
    .van-field__control {
      color: @gray-8;
    }
    .van-field__control::placeholder {
      color: @gray-5;
    }
  }
}
</style>
