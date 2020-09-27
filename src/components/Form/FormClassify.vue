<template>
  <FormInput
    class="FormClassify"
    @click="handleOpenSelect"
    :field="field"
    :clear-trigger="field.disabled ? null : 'always'"
    @clear="handleClear"
    v-model="innerName"
    :is-link="!field.disabled">
    <template #input>
      <van-checkbox-group v-model="innerValue"></van-checkbox-group>
      <div class="field" v-if="innerName">{{innerName}}</div>
      <div class="placeholder" v-else>{{'请选择' + field.label}}</div>
    </template>
  </FormInput>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins } from 'vue-property-decorator'
import PopupClassifyService, { Options } from '@/components/Popup/PopupClassifyService'
import { CheckboxGroup } from 'vant'
import cache from '@/plugins/cache'

@Component({
  components: {
    [CheckboxGroup.name]: CheckboxGroup
  }
})
export default class FormClassify extends Mixins(FormMixins) {
  private PopupClassify = new PopupClassifyService()
  private innerName = ''

  private handleOpenSelect () {
    this.PopupClassify.open(cache.config.get('industry') as any[], this.innerValue)
      .then((res: Options[]) => {
        this.innerValue = res
        this.initName()
      })
  }

  private initName () {
    this.innerName = this.innerValue.length > 0 ? `已选择${this.innerValue.length}个行业` : ''
  }

  private handleClear () {
    this.innerName = ''
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
  .placeholder {
    color: @gray-6;
  }
  &.van-field--disabled .field {
    color: @gray-5;
  }
}
</style>
