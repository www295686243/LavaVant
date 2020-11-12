<template>
  <PageContainer class="view-user-info-provide">
    <p class="title">提供分享有效招聘信息，帮助工业人求职，获得互助卷奖励！</p>
    <FormRender :form="form" :Service="InfoProvideService">
      <FormTextarea v-model="form.description" :field="formFields.description"></FormTextarea>
      <FormInput v-model="form.phone" :field="formFields.phone"></FormInput>
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ValidateService, { FormFields } from '@/service/ValidateService'
import InfoProvideService from '@/service/User/Info/InfoProvideService'

@Component
export default class UserInfoProvide extends Vue {
  private InfoProvideService = InfoProvideService
  private form = {
    description: '',
    phone: ''
  }

  private formFields: FormFields = ValidateService.genRules({
    description: {
      prop: 'description',
      label: '岗位描述',
      placeholder: '在此粘贴分享贡献招聘信息，客服会回访了解确认，帮助他人求职招聘（可自动识别手机号）',
      rules: [ValidateService.required, ValidateService.max(255)]
    },
    phone: {
      prop: 'phone',
      label: '联系电话',
      rules: [ValidateService.required, ValidateService.phone]
    }
  })

  @Watch('form.description')
  onDescription (val: string) {
    if (!this.form.phone) {
      const res = val.replace(/\s|-/g, '').match(/1\d{10}/g)
      if (res) {
        this.form.phone = res[0]
      }
    }
  }
}
</script>

<style lang="less">
.view-user-info-provide {
  .title {
    padding: @padding-md @padding-lg;
    background: @white;
    color: @orange;
  }
}
</style>
