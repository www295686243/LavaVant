<template>
  <PageContainer>
    <FormRender :onSubmit="handleSubmit" :form="form">
      <FormInput v-model="form.title" :field="formFields.title" />
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'
import HrService from '@/service/User/Info/HrService'
import RouterService from '@/service/RouterService'

@Component
export default class UserHrForm extends Vue {
  private form = {
    id: RouterService.query('id'),
    title: ''
  }

  private formFields = ValidateService.genRules({
    title: {
      label: '标题',
      rules: [ValidateService.required, ValidateService.max(120)]
    }
  })

  private handleSubmit () {
    return HrService.store(this.form)
  }
}
</script>

<style lang="less">
</style>
