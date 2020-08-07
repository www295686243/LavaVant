<template>
  <FormInput
    type="textarea"
    class="FormTextarea"
    v-model="innerValue"
    :field="field"
    show-word-limit
    :rows="rows"
    v-bind="$attrs" />
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop } from 'vue-property-decorator'

@Component({
  inheritAttrs: false
})
export default class FormTextarea extends Mixins(FormMixins) {
  @Prop({ default: 3 })
  rows!: number
}
</script>
