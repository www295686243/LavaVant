<template>
  <FormInput
    class="FormStepper"
    :field="field">
    <template #input>
      <van-stepper
        :integer="true"
        :min="min"
        :max="max"
        v-model="innerValue"/>
    </template>
  </FormInput>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins } from 'vue-property-decorator'
import { Stepper } from 'vant'

@Component({
  components: {
    [Stepper.name]: Stepper
  }
})
export default class FormStepper extends Mixins(FormMixins) {
  private min = 1
  private max = 999999999

  private genLen () {
    const ruleMax = (this.field.rules || []).find((res) => res.max)
    if (ruleMax) {
      this.max = ruleMax.max
    }
    const ruleMin = (this.field.rules || []).find((res) => res.min)
    if (ruleMin) {
      this.min = ruleMin.min
    }
  }

  created () {
    this.genLen()
  }
}
</script>
