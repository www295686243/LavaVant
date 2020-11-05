<template>
  <FormInput
    class="FormArea"
    :field="field"
    v-model="innerName"
    :clear-trigger="field.disabled ? null : 'always'"
    :is-link="!field.disabled"
    @click="handleOpenSelect">
    <template #input>
      <div class="field" v-if="innerName">{{innerName}}</div>
      <div class="placeholder" v-else>{{'请选择' + field.label}}</div>
    </template>
  </FormInput>
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

  @Watch('value')
  onValue2 () {
    this.init()
  }

  private handleOpenSelect () {
    if (this.field.disabled) return
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
.FormArea {
  .placeholder {
    color: @gray-5;
  }
  &.van-field--disabled .field {
    color: @gray-5;
  }
}
</style>
