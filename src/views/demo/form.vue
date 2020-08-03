<template>
  <PageContainer>
    <FormRender :onSubmit="handleSubmit">
      <FormInput v-model="form.text" :field="formFields.text" />
      <FormTextarea v-model="form.textarea" :field="formFields.textarea" />
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'

@Component
export default class DemoForm extends Vue {
  private form = {
    text: '',
    textarea: ''
  }

  private formFields = {
    text: ValidateService.genRule({
      label: '输入框',
      rules: [ValidateService.required]
    }),
    textarea: ValidateService.genRule({
      label: '文本框',
      rules: [ValidateService.required, ValidateService.max(200)]
    })
  }

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        console.log(this.form)
      })
  }
}
</script>

<style lang="less">
</style>
