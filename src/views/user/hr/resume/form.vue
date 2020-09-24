<template>
  <PageContainer class="view-user-hr-job-form">
    <FormRender :Service="HrResumeService" :form="form" :onSubmitAfter="handleSubmitAfter" :submitBtn="submitBtnText">
      <FormInput v-model="form.title" :field="formFields.title" />
      <FormCheckbox v-model="form.is_other_user" :field="formFields.is_other_user">
        帮人发布的<span class="tips">(选中后不显示当前账号的工作经历等认证)</span>
      </FormCheckbox>
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
      <FormTextarea v-model="form.description" :field="formFields.description" />
      <FormSelect v-model="form.education" :field="formFields.education" />
      <FormSelect v-model="form.seniority" :field="formFields.seniority" />
      <FormArea v-model="form.city" :field="formFields.city" />
      <FormDateTime v-model="form.end_time" :field="formFields.end_time" :min-date="minDate" />
      <FormInput v-model="form.contacts" :field="formFields.contacts" />
      <FormInput v-model="form.phone" :field="formFields.phone" />
      <FormCheckbox v-model="form.is_force_show_user_info" :field="formFields.is_force_show_user_info" v-if="form.is_other_user === 0">
        直接公开个人详情(包括工作经历、教育经历)
      </FormCheckbox>
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'
import RouterService from '@/service/RouterService'
import HrResumeService from '@/service/User/Info/HrResumeService'
import UserPersonalService from '@/service/User/UserPersonalService'

@Component
export default class UserHrJobForm extends Vue {
  @Watch('form.is_other_user')
  onIsOtherUser (val: number) {
    if (val > 0) {
      this.submitBtnText = '立即发布'
    } else {
      this.submitBtnText = '发布并完善个人资料'
    }
    this.initDefaultData()
  }

  private HrResumeService = HrResumeService
  private isCreate = !!RouterService.query('id')
  private minDate!: Date
  private form = {
    id: RouterService.query('id'),
    title: '',
    monthly_pay_min: '',
    monthly_pay_max: '',
    is_negotiate: 0,
    treatment: '',
    treatment_input: '',
    education: '',
    seniority: '',
    city: '',
    end_time: '',
    contacts: '',
    phone: '',
    is_force_show_user_info: 0,
    description: '',
    is_other_user: 0
  }

  private submitBtnText = '发布并完善个人资料'

  private formFields = ValidateService.genRules({
    title: {
      prop: 'title',
      label: '求职标题',
      rules: [ValidateService.required, ValidateService.max(42)]
    },
    is_other_user: {
      prop: 'is_other_user',
      label: ''
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
    },
    is_force_show_user_info: {
      prop: 'is_force_show_user_info',
      label: ''
    }
  })

  private initDefaultData () {
    if (this.isCreate && this.form.is_other_user === 0) {
      this.form.city = UserPersonalService.info.city
      this.form.contacts = UserPersonalService.info.name
      this.form.phone = UserPersonalService.info.phone
    } else {
      this.form.city = ''
      this.form.contacts = ''
      this.form.phone = ''
    }
  }

  private handleSubmitAfter () {
    return Promise.resolve()
      .then(() => {
        if (this.form.is_other_user > 0) {
          RouterService.replace('/user/hr/resume/' + (this.form.id ? 'update-success' : 'create-success'))
        } else {
          RouterService.replace('/user/personal/detail', { toPath: '/user/hr/resume/' + (this.form.id ? 'update-success' : 'create-success') })
        }
      })
  }

  created () {
    this.minDate = new Date()
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
