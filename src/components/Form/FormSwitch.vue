<template>
  <van-field
    class="FormSwitch"
    :label="field.label">
    <template #input>
      <SwitchBox v-model="innerValue"></SwitchBox>
    </template>
  </van-field>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins } from 'vue-property-decorator'
import { Field } from 'vant'
import SwitchBox from './Base/SwitchBox.vue'

@Component({
  components: {
    [Field.name]: Field,
    SwitchBox
  }
})
export default class FormSwitch extends Mixins(FormMixins) {
}
</script>
