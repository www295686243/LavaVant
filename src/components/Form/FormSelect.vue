<template>
  <FormInput
    class="FormSelect"
    v-model="innerName"
    :field="field"
    :placeholder="'请选择' + this.field.label"
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
import { Component, Mixins, Inject } from 'vue-property-decorator'
import PopupPickerService, { Options } from '@/components/Popup/PopupPickerService'
import { getGlobalOptions, getOptions } from '@/service/ConstService'
import { Service } from './FormRender.vue'

@Component
export default class FormSelect extends Mixins(FormMixins) {
  @Inject('formService')
  formService!: Service

  private PopupPicker = new PopupPickerService()
  private innerName = ''
  private props = {
    value: 'id',
    label: 'display_name'
  }

  private options: Options[] = []

  private handleOpenSelect () {
    if (this.field.disabled) return
    this.PopupPicker.open(this.options as any[], this.innerValue)
      .then((res: Options) => {
        this.innerValue = res.id
        this.initName()
      })
  }

  private initName () {
    const item = (this.options || []).find((res) => res.id === this.innerValue)
    if (item) {
      this.innerName = item.display_name || ''
    }
  }

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
    this.initName()
  }

  beforeDestroy () {
    this.PopupPicker.destroy()
  }
}
</script>

<style lang="less">
.FormSelect {
  .placeholder {
    color: @gray-6;
  }
  &.van-field--disabled .field {
    color: @gray-5;
  }
}
</style>
