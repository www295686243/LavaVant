<template>
  <FormInput
    class="FormImage"
    :field="field">
    <template #input>
      <ImagesBox v-model="innerValue" :uploadParmas="uploadParmas" @success="handleUploadSuccess"></ImagesBox>
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
export default class FormImage extends Mixins(FormMixins) {
  @Prop()
  uploadParmas!: { type: string; info_id: string }

  @Inject()
  FormRenderElement!: Function

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
  }
}
</script>
