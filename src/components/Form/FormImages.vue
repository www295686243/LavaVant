<template>
  <FormInput
    class="FormImages"
    :field="field">
    <template #input>
      <div>
        <ImagesBox :disabled="field.disabled" v-model="innerValue" :uploadParmas="uploadParmas" :max-count="maxlength" @success="handleUploadSuccess"></ImagesBox>
        <p v-if="field.placeholder" class="tips">{{field.placeholder}}</p>
      </div>
    </template>
  </FormInput>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop, Inject } from 'vue-property-decorator'
import ImagesBox from './Base/ImagesBox.vue'
import ValidateService from '@/service/ValidateService'

@Component({
  components: {
    ImagesBox
  }
})
export default class FormImages extends Mixins(FormMixins) {
  @Prop()
  uploadParmas!: { _type: string; info_id: string }

  @Inject()
  FormRenderElement!: Function

  private maxlength = null

  private genMaxLength () {
    const rule = (this.field.rules || []).find((res) => res.max || res.len)
    if (rule) {
      this.maxlength = rule.max || rule.len
    }
  }

  private fields = {
    file: ValidateService.genRule({
      label: this.field.label,
      rules: [ValidateService.upload]
    })
  }

  private handleUploadSuccess () {
    this.FormRenderElement().resetValidation(this.field.label)
  }

  created () {
    this.field.rules = ([] as any[]).concat(this.fields.file.rules).concat(this.field.rules || [])
    this.genMaxLength()
  }
}
</script>

<style lang="less">
.FormImages {
  .tips {
    margin: 0;
    color: @gray-7;
    font-size: @font-size-sm;
  }
}
</style>
