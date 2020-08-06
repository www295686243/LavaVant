<template>
  <van-field
    class="FormImage"
    :label="field.label"
    :name="field.label"
    :required="required"
    :rules="rules">
    <template #input>
      <ImagesBox v-model="innerValue" :uploadParmas="uploadParmas" @success="handleUploadSuccess"></ImagesBox>
    </template>
  </van-field>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop, Inject } from 'vue-property-decorator'
import { Field } from 'vant'
import ImagesBox from './Base/ImagesBox.vue'
import ValidateService from '@/service/ValidateService'

@Component({
  components: {
    [Field.name]: Field,
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

  private rules: any[] = []
  private required = false

  private handleUploadSuccess () {
    this.FormRenderElement().resetValidation(this.field.label)
  }

  private genRequired () {
    this.required = this.rules.some((res) => res.required)
  }

  created () {
    this.rules = ([] as any[]).concat(this.fields.file.rules).concat(this.field.rules || [])
    this.genRequired()
  }
}
</script>
