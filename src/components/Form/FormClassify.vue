<template>
  <FormInput
    class="FormClassify"
    :field="field">
    <template #input>
      <van-checkbox-group v-model="innerValue"></van-checkbox-group>
      <FormInput
        class="FormClassify-input"
        v-model="innerName"
        :field="{ label: '' }"
        :placeholder="'请选择' + field.label"
        clear-trigger="always"
        is-link
        @click="handleOpenSelect"
        @clear="handleClear"
        disabled />
    </template>
  </FormInput>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins } from 'vue-property-decorator'
import PopupClassifyService, { Options } from '@/components/Popup/PopupClassifyService'
import { CheckboxGroup } from 'vant'

@Component({
  components: {
    [CheckboxGroup.name]: CheckboxGroup
  }
})
export default class FormClassify extends Mixins(FormMixins) {
  private PopupClassify = new PopupClassifyService()
  private innerName = ''

  private handleOpenSelect () {
    this.PopupClassify.open(this.field.options as any[], this.innerValue)
      .then((res: Options[]) => {
        this.innerValue = res
        this.initName()
      })
  }

  private initName () {
    this.innerName = this.innerValue.length > 0 ? `已选择${this.innerValue.length}个行业` : ''
  }

  private handleClear () {
    this.innerValue = []
  }

  created () {
    this.initName()
  }

  beforeDestroy () {
    this.PopupClassify.destroy()
  }
}
</script>

<style lang="less">
.FormClassify {
  .van-field__label {
    color: @gray-7;
  }
  .van-field__control:disabled {
    color: @gray-8;
  }
  .FormClassify-input {
    padding: 0;
  }
}
</style>
