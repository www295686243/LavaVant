<template>
  <PageContainer class="view-user-hr-job-form">
    <FormRender
      :Service="HrJobService"
      :form="form"
      :onLoad="handleLoad"
      :onSubmitAfter="handleSubmitAfter"
      submitBtn="发布">
      <FormInput v-model="form.title" :field="formFields.title" />
      <FormInput v-model="form.company_name" :field="formFields.company_name" />
      <FormSalary
        :isNegotiable.sync="form.is_negotiate"
        :min-value.sync="form.monthly_salary_min"
        :max-value.sync="form.monthly_salary_max"
        :field="formFields.rangeSalary" />
      <FormCheckboxGroup
        type="label-string"
        :text.sync="form.treatment_input"
        v-model="form.treatment"
        :field="formFields.treatment" />
      <FormStepper v-model="form.recruiter_number" :field="formFields.recruiter_number" />
      <FormTextarea v-model="form.description" :field="formFields.description" :rows="7" />
      <FormSelect v-model="form.education" :field="formFields.education" />
      <FormSelect v-model="form.seniority" :field="formFields.seniority" />
      <FormArea v-model="form.city" :field="formFields.city" />
      <FormInput v-model="form.address" :field="formFields.address" />
      <FormDateTime v-model="form.end_time" :field="formFields.end_time" :min-date="minDate" />
      <FormInput v-model="form.contacts" :field="formFields.contacts" />
      <FormInput v-model="form.phone" :field="formFields.phone" />
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'
import RouterService from '@/service/RouterService'
import HrJobService from '@/service/Info/HrJobService'
import cache from '@/plugins/cache'
import UserEnterpriseService from '@/service/User/UserEnterpriseService'

@Component
export default class UserHrJobForm extends Vue {
  private HrJobService = HrJobService
  private isCreate = !RouterService.query('id')
  private minDate = new Date()
  private timer = 0
  private form = {
    id: RouterService.query('id'),
    title: '',
    company_name: UserEnterpriseService.info.company,
    monthly_salary_min: '',
    monthly_salary_max: '',
    is_negotiate: 0,
    recruiter_number: 1,
    education: '',
    seniority: '',
    city: UserEnterpriseService.info.city,
    address: UserEnterpriseService.info.address,
    end_time: '',
    contacts: UserEnterpriseService.info.name,
    phone: UserEnterpriseService.info.phone,
    treatment: '',
    treatment_input: '',
    description: ''
  } as {
    [key: string]: any;
  }

  private formFields = ValidateService.genRules({
    title: {
      prop: 'title',
      label: '职位名称',
      rules: [ValidateService.required, ValidateService.max(42)]
    },
    company_name: {
      prop: 'company_name',
      label: '企业名称',
      rules: [ValidateService.required, ValidateService.max(60)]
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
      rules: [ValidateService.required, ValidateService.minNum(1)]
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

  private handleLoad () {
    return Promise.resolve()
      .then(() => {
        if (!this.isCreate) {
          return HrJobService.authShow()
            .then((res) => {
              Object.keys(this.form).forEach((key) => {
                this.form[key] = res.data[key] || this.form[key]
              })
            })
        } else {
          Object.assign(this.form, cache.hr.get('job-create'))
          // 设置个定时器，每秒进行临时存储输入的数据
          this.setTimer()
        }
      })
  }

  private handleSubmitAfter () {
    return Promise.resolve()
      .then(() => {
        RouterService.replace('/user/hr/job/' + (this.form.id ? 'update-success' : 'create-success'))
      })
  }

  private setTimer () {
    this.timer = setInterval(() => {
      cache.hr.set('job-create', this.form)
    }, 1000)
  }

  private clearTimer () {
    clearInterval(this.timer)
    cache.hr.remove('job-create')
  }

  beforeDestroy () {
    clearInterval(this.timer)
  }

  created () {
    this.minDate.setDate(this.minDate.getDate() + 3)
  }
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
