<template>
  <FormInput
    class="FormCheckbox"
    v-model="innerValue"
    :field="field">
    <template #input>
      <Checkbox v-model="innerValue" :checked-color="checkedColor"><slot></slot></Checkbox>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import Checkbox from './Base/Checkbox.vue'
import FormMixins from './FormMixins'

@Component({
  components: {
    Checkbox
  }
})
export default class FormCheckbox extends Mixins(FormMixins) {
  @Prop({ default: '#1989fa' })
  checkedColor!: string
}
</script>
