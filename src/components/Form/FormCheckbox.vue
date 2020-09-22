<template>
  <FormInput
    class="FormCheckbox"
    :field="field">
    <template #input>
      <div>
        <div>
          <van-checkbox-group v-model="innerValue" direction="horizontal">
            <Checkbox :name="v.id" v-for="v in field.options" :key="v.id">{{v.display_name}}</Checkbox>
          </van-checkbox-group>
        </div>
        <div class="import" v-if="isDisableImport === false">
          <FormInput v-model="innerText" colon :field="fields.import" :label-width="40" :style="{ width: '150px' }"></FormInput>
        </div>
      </div>
    </template>
  </FormInput>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { CheckboxGroup } from 'vant'
import Checkbox from './Base/Checkbox.vue'
import ValidateService from '@/service/ValidateService'

@Component({
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    Checkbox
  }
})
export default class FormCheckbox extends Mixins(FormMixins) {
  @Prop({ default: false })
  isDisableImport!: boolean

  @Prop()
  text!: string

  @Watch('text')
  onText (val: string) {
    this.innerText = val
  }

  @Watch('innerText')
  onInnerText (val: string) {
    this.$emit('update:text', val)
  }

  private innerText = this.text || ''
  private fields = {
    import: ValidateService.genRule({
      label: '其它',
      rules: [ValidateService.max(6)]
    })
  }
}
</script>

<style lang="less">
.FormCheckbox {
  padding: 2px 16px 10px;
  & > .van-cell__title {
    padding-top: 5px;
  }
  .van-checkbox {
    margin-top: 8px;
  }
  .import {
    .FormInput {
      padding: 10px 0;
      .van-field__label {
        text-align: left;
        margin-right: 0;
        padding-right: 0;
      }
      .van-field__value {
        border-bottom: 1px solid @gray-3;
      }
    }
  }
}
</style>
