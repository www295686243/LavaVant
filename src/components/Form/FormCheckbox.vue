<template>
  <van-field
    class="FormCheckbox"
    :label="field.label">
    <template #input>
      <van-checkbox-group v-model="innerValue" direction="horizontal">
        <Checkbox :name="v.id" v-for="v in field.options" :key="v.id">{{v.display_name}}</Checkbox>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins } from 'vue-property-decorator'
import { Field, CheckboxGroup } from 'vant'
import Checkbox from './Base/Checkbox.vue'

@Component({
  components: {
    [Field.name]: Field,
    [CheckboxGroup.name]: CheckboxGroup,
    Checkbox
  }
})
export default class FormCheckbox extends Mixins(FormMixins) {
}
</script>
