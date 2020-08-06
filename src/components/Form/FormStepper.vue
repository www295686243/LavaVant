<template>
  <van-field
    class="FormStepper"
    :label="field.label"
    :name="field.label">
    <template #input>
      <van-stepper
        :integer="true"
        v-model="innerValue"/>
    </template>
  </van-field>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins } from 'vue-property-decorator'
import { Stepper, Field } from 'vant'

@Component({
  components: {
    [Stepper.name]: Stepper,
    [Field.name]: Field
  }
})
export default class FormStepper extends Mixins(FormMixins) {
}
</script>
