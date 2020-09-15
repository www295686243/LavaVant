<template>
  <FormInput
    class="FormArea"
    :class="{ enable: isEnable }"
    v-model="innerName"
    :field="field"
    :placeholder="'请选择' + this.field.label"
    :clear-trigger="isEnable ? 'always' : null"
    :is-link="isEnable"
    @click="handleOpenSelect" />
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import PopupAreaService from '@/components/Popup/PopupAreaService'
import { getCityName } from '@/plugins/tools'

@Component
export default class FormArea extends Mixins(FormMixins) {
  private PopupArea = new PopupAreaService()
  private innerName = ''
  private isEnable = true

  @Watch('value')
  onValue2 () {
    this.init()
  }

  private handleOpenSelect () {
    if (this.isEnable === false) return
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

  private init () {
    this.innerValue = this.innerValue ? this.innerValue.toString() : ''
    this.isEnable = true
    if (this.field.disabled) {
      this.isEnable = false
    }
    this.field.disabled = true
    this.initCityName()
  }

  created () {
    this.init()
  }

  beforeDestroy () {
    this.PopupArea.destroy()
  }
}
</script>

<style lang="less">
.FormArea.enable {
  .van-field__label {
    color: @gray-7;
  }
  .van-field__control:disabled {
    color: @gray-8;
  }
}
</style>
