<template>
  <PageContainer>
    <FormRender :onSubmit="handleSubmit">
      <FormInput v-model="form.amount" :field="formFields.amount" />
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WXService from '@/service/WXService'
import ValidateService from '@/service/ValidateService'

@Component
export default class DemoWeChatShare extends Vue {
  private form = {
    amount: '0.01'
  }

  private formFields = ValidateService.genRules({
    amount: {
      label: '金额',
      rules: [ValidateService.maxNum(1)]
    }
  })

  private handleSubmit () {
    return WXService.pay(this.form)
  }
}
</script>

<style lang="less">
</style>
