<template>
  <PageContainer>
    <FormRender :onSubmit="handleSubmit">
      <FormInput v-model="form.text" :field="formFields.text" />
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'

@Component
export default class DemoForm extends Vue {
  private form = {
    text: ''
  }

  private formFields = {
    text: ValidateService.genRule({
      label: '文本',
      rules: [ValidateService.required, ValidateService.email]
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
