<template>
  <PageContainer class="view-user-hr-job-form">
    <FormRender
      :Service="HrResumeService"
      :form="form"
      :onSubmitAfter="handleSubmitAfter"
      submitBtn="发布">
      <FormInput v-model="form.title" :field="formFields.title" />
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
      <FormTextarea v-model="form.description" :field="formFields.description" :rows="5" />
      <FormSelect v-model="form.education" :field="formFields.education" />
      <FormSelect v-model="form.seniority" :field="formFields.seniority" />
      <FormArea v-model="form.city" :field="formFields.city" />
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
import HrResumeService from '@/service/Info/HrResumeService'
import cache from '@/plugins/cache'

@Component
export default class UserHrJobForm extends Vue {
  private HrResumeService = HrResumeService
  private isCreate = !RouterService.query('id')
  private minDate = new Date()
  private timer = 0
  private form = {
    id: RouterService.query('id'),
    title: '',
    monthly_salary_min: '',
    monthly_salary_max: '',
    is_negotiate: 0,
    treatment: '',
    treatment_input: '',
    education: '',
    seniority: '',
    city: 0,
    end_time: '',
    contacts: '',
    phone: '',
    description: ''
  } as {
    [key: string]: any;
  }

  private formFields = ValidateService.genRules({
    title: {
      prop: 'title',
      label: '简历标题',
      rules: [ValidateService.required, ValidateService.max(42)]
    },
    rangeSalary: {
      prop: 'rangeSalary',
      label: '薪资范围',
      rules: [ValidateService.required]
    },
    treatment: {
      prop: 'treatment',
      label: '要求待遇',
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    description: {
      prop: 'description',
      label: '自我介绍',
      placeholder: '自我介绍，描述求职的岗位，擅长做什么设备，做过什么工艺、产品、参与过什么项目，有多少年的工作经验等，给招聘企业提供匹配参考（不低于50字）',
      rules: [ValidateService.required, ValidateService.max(2000)]
    },
    education: {
      prop: 'education',
      label: '学历',
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    seniority: {
      prop: 'seniority',
      label: '工作年限',
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    city: {
      prop: 'city',
      label: '期望城市',
      rules: [ValidateService.required({ trigger: 'onChange' })]
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
      rules: [ValidateService.required, ValidateService.mobile]
    }
  })

  private handleLoad () {
    return HrResumeService.authShow()
      .then((res) => {
        Object.keys(this.form).forEach((key) => {
          this.form[key] = res.data[key] || this.form[key]
        })
        if (this.isCreate) {
          Object.assign(this.form, cache.hr.get('resume-create'))
          // 设置个定时器，每秒进行临时存储输入的数据
          this.setTimer()
        }
      })
  }

  private handleSubmitAfter () {
    return Promise.resolve()
      .then(() => {
        RouterService.replace('/user/hr/resume/' + (this.form.id ? 'update-success' : 'create-success'))
      })
  }

  private setTimer () {
    this.timer = setInterval(() => {
      cache.hr.set('resume-create', this.form)
    }, 1000)
  }

  private clearTimer () {
    clearInterval(this.timer)
    cache.hr.remove('resume-create')
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
