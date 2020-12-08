<template>
  <PageContainer class="view-user-info-provide">
    <p class="title">提供有效{{form._model.includes('HrJob') ? '招聘' : '人才'}}信息，帮助工业人{{form._model.includes('HrJob') ? '招聘' : '求职'}}，获得通用卷奖励！</p>
    <FormRender :form="form" :Service="InfoProvideService">
      <FormTextarea v-model="form.description" :field="formFields.description"></FormTextarea>
      <FormInput v-model="form.contacts" :field="formFields.contacts"></FormInput>
      <FormInput v-model="form.phone" :field="formFields.phone"></FormInput>
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ValidateService, { FormFields } from '@/service/ValidateService'
import InfoProvideService from '@/service/Info/InfoProvideService'
import RouterService from '@/service/RouterService'

@Component
export default class UserInfoProvide extends Vue {
  private InfoProvideService = InfoProvideService
  private form = {
    description: '',
    contacts: '',
    phone: '',
    _model: RouterService.query('_model')
  }

  private formFields: FormFields = ValidateService.genRules({
    description: {
      prop: 'description',
      label: (this.form._model.includes('HrJob') ? '岗位' : '人才') + '描述',
      placeholder: '在此粘贴分享贡献' + (this.form._model.includes('HrJob') ? '招聘' : '人才') + '信息，客服会回访了解确认，帮助他人' + (this.form._model.includes('HrJob') ? '招聘' : '求职'),
      rules: [ValidateService.required, ValidateService.max(255)]
    },
    contacts: {
      prop: 'contacts',
      label: '联系人',
      rules: [ValidateService.required, ValidateService.max(20)]
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
