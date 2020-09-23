<template>
  <PageContainer class="view-user-hr-job-form">
    <FormRender :Service="HrJobService" :form="form" :submitBtn="submitBtnText">
      <FormInput v-model="form.title" :field="formFields.title" />
      <FormCheckbox v-model="form.is_other_user" :field="formFields.is_other_user">
        帮人发布的<span class="tips">(选中后不显示注册企业信息)</span>
      </FormCheckbox>
      <FormInput v-model="form.company_name" :field="formFields.company_name" />
      <FormSalary
        :isNegotiable.sync="form.is_negotiate"
        :min-value.sync="form.monthly_pay_min"
        :max-value.sync="form.monthly_pay_max"
        :field="formFields.rangeSalary" />
      <FormCheckboxGroup
        type="label-string"
        :text.sync="form.treatment_input"
        v-model="form.treatment"
        :field="formFields.treatment" />
      <FormStepper v-model="form.recruiter_number" :field="formFields.recruiter_number" />
      <FormTextarea v-model="form.description" :field="formFields.description" />
      <FormSelect v-model="form.education" :field="formFields.education" />
      <FormSelect v-model="form.seniority" :field="formFields.seniority" />
      <FormArea v-model="form.city" :field="formFields.city" />
      <FormInput v-model="form.address" :field="formFields.address" />
      <FormDateTime v-model="form.end_time" :field="formFields.end_time" :min-date="new Date()" />
      <FormInput v-model="form.contacts" :field="formFields.contacts" />
      <FormInput v-model="form.phone" :field="formFields.phone" />
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'
import RouterService from '@/service/RouterService'
import HrJobService from '@/service/User/Info/HrJobService'

@Component
export default class UserHrJobForm extends Vue {
  @Watch('form.is_other_user')
  onIsOtherUser (val: number) {
    if (val > 0) {
      this.submitBtnText = '立即发布'
    } else {
      this.submitBtnText = '发布并完善企业资料'
    }
  }

  private HrJobService = HrJobService
  private form = {
    id: RouterService.query('id'),
    title: '',
    is_other_user: 1,
    company_name: '',
    monthly_pay_min: '',
    monthly_pay_max: '',
    is_negotiate: 0,
    recruiter_number: 1,
    education: '',
    seniority: '',
    city: '',
    address: '',
    end_time: '',
    contacts: '',
    phone: '',
    treatment: '',
    treatment_input: '',
    description: ''
  }

  private submitBtnText = '发布并完善企业资料'

  private formFields = ValidateService.genRules({
    title: {
      prop: 'title',
      label: '招聘标题',
      rules: [ValidateService.required, ValidateService.max(42)],
      placeholder: '请输入招聘岗位名称'
    },
    is_other_user: {
      prop: 'is_other_user',
      label: ''
    },
    company_name: {
      prop: 'company_name',
      label: '企业名称',
      rules: [ValidateService.max(60)]
    },
    rangeSalary: {
      prop: 'rangeSalary',
      label: '薪资范围',
      rules: [ValidateService.required]
    },
    treatment: {
      prop: 'treatment',
      label: '待遇情况',
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    recruiter_number: {
      prop: 'recruiter_number',
      label: '招聘人数',
      rules: [ValidateService.minNum(1)]
    },
    description: {
      prop: 'description',
      label: '岗位描述',
      placeholder: '岗位要求、技能、工作经验描述，以及公司生产的产品和要求',
      rules: [ValidateService.required, ValidateService.max(2000)]
    },
    education: {
      prop: 'education',
      label: '学历要求',
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    seniority: {
      prop: 'seniority',
      label: '工作年限',
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    city: {
      prop: 'city',
      label: '工作城市',
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    address: {
      prop: 'address',
      label: ' ',
      placeholder: '请输入街道地址',
      rules: [ValidateService.max(60)]
    },
    end_time: {
      prop: 'end_time',
      label: '截止日期',
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    contacts: {
      prop: 'contacts',
      label: '联系人',
      rules: [ValidateService.required, ValidateService.fullname, ValidateService.max(20)]
    },
    phone: {
      prop: 'phone',
      label: '联系电话',
      placeholder: '请输入移动或固定电话',
      rules: [ValidateService.required, ValidateService.phone]
    }
  })
}
</script>

<style lang="less">
.view-user-hr-job-form {
  .tips {
    color: @gray-7;
  }
  .FormCheckbox {
    font-size: 12px;
    line-height: 1;
  }
}
</style>
