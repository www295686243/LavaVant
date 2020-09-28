<template>
  <FormRender :Service="UserPersonalService" :onSubmitAfter="handleSubmitAfter" :form="form" submitBtn="下一步">
    <FormInput v-model="form.name" :field="formFields.name" />
    <FormInput v-model="form.phone" :field="formFields.phone" />
    <FormInput v-model="form.company" :field="formFields.company" />
    <FormClassify v-model="form.industry" :field="formFields.industry" />
    <FormInput v-model="form.position" :field="formFields.position" />
    <FormSelect v-model="form.position_attr" :field="formFields.position_attr" />
    <FormSelect v-model="form.seniority" :field="formFields.seniority" />
    <FormArea v-model="form.city" :field="formFields.city" />
    <FormInput v-model="form.address" :field="formFields.address" />
    <FormInput v-model="form.email" :field="formFields.email" />
    <FormTextarea v-model="form.intro" :field="formFields.intro" />
  </FormRender>
</template>

<script lang="ts">
import ValidateService from '@/service/ValidateService'
import { Component, Vue } from 'vue-property-decorator'
import UserPersonalService from '@/service/User/UserPersonalService'
import UserService from '@/service/UserService'
import RouterService from '@/service/RouterService'

@Component
export default class UserPersonalBase extends Vue {
  private UserPersonalService = UserPersonalService
  private form = {
    id: 1,
    name: '',
    phone: UserPersonalService.info.phone || UserService.info.phone,
    id_card: '',
    seniority: '',
    intro: '',
    company: '',
    industry: [],
    position: '',
    position_attr: '',
    city: '',
    address: '',
    email: ''
  }

  private formFields = ValidateService.genRules({
    name: {
      prop: 'name',
      label: '姓名',
      rules: [ValidateService.fullname, ValidateService.max(20)]
    },
    phone: {
      prop: 'phone',
      label: '联系电话',
      rules: [ValidateService.phone]
    },
    company: {
      prop: 'company',
      label: '公司名',
      rules: [ValidateService.max(60)]
    },
    industry: {
      prop: 'industry',
      label: '行业'
    },
    position: {
      prop: 'position',
      label: '职位',
      rules: [ValidateService.max(30)]
    },
    position_attr: {
      prop: 'position_attr',
      label: '职位属性'
    },
    seniority: {
      prop: 'seniority',
      label: '工作年限'
    },
    city: {
      prop: 'city',
      label: '所在城市'
    },
    address: {
      prop: 'address',
      label: ' ',
      placeholder: '请输入街道地址',
      rules: [ValidateService.max(60)]
    },
    email: {
      prop: 'email',
      label: '邮箱',
      rules: [ValidateService.email]
    },
    intro: {
      prop: 'intro',
      label: '简介',
      rules: [ValidateService.max(255)],
      placeholder: '介绍擅长的产品、技术、加工方式，以及做人，对人态度，广交朋友，多做生意，财源滚滚！'
    }
  })

  private handleSubmitAfter () {
    return Promise.resolve()
      .then(() => {
        RouterService.push('/user/personal/detail')
      })
  }
}
</script>
