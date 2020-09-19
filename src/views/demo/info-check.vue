<template>
  <PageContainer>
    <FormRender :onSubmit="handleSubmit" :form="form">
      <FormInput v-model="form.contents.title" :field="formFields.title" />
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'
import InfoCheckService from '@/service/Info/InfoCheckService'

@Component
export default class DemoInfoCheck extends Vue {
  private form = {
    id: '',
    _type: 'Info/Hr',
    contents: {
      title: ''
    }
  }

  private formFields = ValidateService.genRules({
    title: {
      label: '标题',
      rules: [ValidateService.required, ValidateService.max(120)]
    }
  })

  private handleSubmit () {
    return InfoCheckService.store(this.form)
  }
}
</script>

<style lang="less">
</style>
