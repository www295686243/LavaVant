<template>
  <FormRender class="PopupRegisterBaseInfo" :form="form" :onSubmit="handleSubmit">
    <FormSelect v-model="form.role" :field="formFields.role" />
    <FormInput v-model="form.company" :field="formFields.company" key="company" v-if="form.role === 'Enterprise Member'"></FormInput>
    <FormInput v-model="form.name" :field="formFields.name" key="name" v-else></FormInput>
    <FormClassify v-model="form.industry" :field="formFields.industry" />
    <FormSelect v-model="form.industry_attr" :field="formFields.industry_attr" key="industry_attr" v-if="form.role === 'Enterprise Member'" />
    <FormSelect v-model="form.position_attr" :field="formFields.position_attr" key="position_attr" v-else />
    <FormArea v-model="form.city" :field="formFields.city" />
  </FormRender>
</template>

<script lang="ts">
import UserEnterpriseService from '@/service/User/UserEnterpriseService'
import UserPersonalService from '@/service/User/UserPersonalService'
import UserService from '@/service/User/UserService'
import ValidateService from '@/service/ValidateService'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PopupRegisterBaseInfo extends Vue {
  @Prop()
  role!: string

  private form = {
    role: this.role || 'Personal Member',
    company: '',
    name: '',
    industry: [] as number[],
    position_attr: 0,
    industry_attr: 0,
    city: 0
  }

  private formFields = ValidateService.genRules({
    role: {
      prop: 'role',
      label: '用户类型',
      options: [
        { display_name: '个人', value: 'Personal Member' },
        { display_name: '企业', value: 'Enterprise Member' }
      ],
      rules: [ValidateService.required({ trigger: 'onChange' })],
      disabled: !!this.role
    },
    company: {
      prop: 'company',
      label: '公司名',
      rules: [ValidateService.required, ValidateService.max(60)]
    },
    name: {
      prop: 'name',
      label: '姓名',
      rules: [ValidateService.required, ValidateService.max(20)]
    },
    industry: {
      prop: 'industry',
      label: '行业',
      rules: [ValidateService.required]
    },
    industry_attr: {
      prop: 'industry_attr',
      label: '行业属性',
      options: UserEnterpriseService.getOptions('industry_attr'),
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    position_attr: {
      prop: 'position_attr',
      label: '职位属性',
      options: UserPersonalService.getOptions('position_attr'),
      rules: [ValidateService.required({ trigger: 'onChange' })]
    },
    city: {
      prop: 'city',
      label: '所在城市',
      rules: [ValidateService.required]
    }
  })

  private handleSubmit () {
    return UserService.baseInfoUpdate(this.form)
      .then((res) => {
        this.$emit('success')
        return res
      })
  }
}
</script>
