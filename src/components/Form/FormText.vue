<template>
  <van-field
    class="FormText"
    :value="value"
    :label="field.label"
    :name="field.label"
    :border="false"
    disabled
    v-bind="$attrs">
  </van-field>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Field } from 'vant'
import { FormFieldItem } from '@/service/ValidateService'

@Component({
  inheritAttrs: false,
  components: {
    [Field.name]: Field
  }
})
export default class FormText extends Vue {
  @Prop()
  value!: string

  @Prop()
  field!: FormFieldItem
}
</script>

<style lang="less">
.FormText {
}
</style>
