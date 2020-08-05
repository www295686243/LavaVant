<template>
  <FormInput
    class="FormArea"
    v-model="innerName"
    :field="field"
    :placeholder="'请选择' + this.field.label"
    clear-trigger="always"
    is-link
    @click="handleOpenSelect"
    disabled />
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins } from 'vue-property-decorator'
import PopupAreaService from '@/components/Popup/PopupAreaService'
import { getCityName } from '@/plugins/tools'

@Component
export default class FormArea extends Mixins(FormMixins) {
  private PopupArea = new PopupAreaService()
  private innerName = ''

  private handleOpenSelect () {
    this.PopupArea.open(this.innerValue)
      .then((code: string) => {
        this.innerValue = code
        this.initCityName()
      })
  }

  private initCityName () {
    const cityName = getCityName(this.innerValue)
    this.innerName = cityName === '--' ? '' : cityName
  }

  created () {
    this.initCityName()
  }

  beforeDestroy () {
    this.PopupArea.destroy()
  }
}
</script>

<style lang="less">
.FormArea {
  .van-field__label {
    color: @gray-7;
  }
  .van-field__control:disabled {
    color: @gray-8;
  }
}
</style>
