<template>
  <FormRender :Service="UserEnterpriseService" :onSubmitAfter="handleSubmitAfter" :form="form" submitBtn="下一步">
    <van-panel title="基本信息">
      <FormInput v-model="form.company" :field="formFields.company" />
      <FormArea v-model="form.city" :field="formFields.city" />
      <FormInput v-model="form.address" :field="formFields.address" />
    </van-panel>
    <van-panel title="运营人信息" class="space">
      <FormInput v-model="form.name" :field="formFields.name" />
      <FormInput v-model="form.id_card" :field="formFields.id_card" />
      <FormInput v-model="form.position" :field="formFields.position" />
      <FormInput v-model="form.phone" :field="formFields.phone" />
      <FormInput v-model="form.email" :field="formFields.email" />
    </van-panel>
  </FormRender>
</template>

<script lang="ts">
import ValidateService from '@/service/ValidateService'
import { Component, Vue } from 'vue-property-decorator'
import UserEnterpriseService from '@/service/User/UserEnterpriseService'
import { Panel } from 'vant'
import RouterService from '@/service/RouterService'

@Component({
  components: {
    [Panel.name]: Panel
  }
})
export default class UserEnterpriseBase extends Vue {
  private UserEnterpriseService = UserEnterpriseService
  private form = {
    id: 1,
    company: '',
    city: '',
    address: '',
    name: '',
    id_card: '',
    position: '',
    phone: '',
    email: ''
  }

  private formFields = ValidateService.genRules({
    company: {
      prop: 'company',
      label: '公司名',
      rules: [ValidateService.max(60)]
    },
    city: {
      prop: 'city',
      label: '所在城市'
    },
    address: {
      prop: 'address',
      label: '街道地址',
      rules: [ValidateService.max(60)]
    },
    name: {
      prop: 'name',
      label: '姓名',
      rules: [ValidateService.fullname]
    },
    id_card: {
      prop: 'id_card',
      label: '身份证',
      rules: [ValidateService.idcard]
    },
    position: {
      prop: 'position',
      label: '职位',
      rules: [ValidateService.max(60)]
    },
    phone: {
      prop: 'phone',
      label: '电话',
      rules: [ValidateService.phone]
    },
    email: {
      prop: 'email',
      label: '邮箱',
      rules: [ValidateService.email]
    }
  })

  private handleSubmitAfter () {
    return Promise.resolve()
      .then(() => {
        RouterService.push('/user/enterprise/detail')
      })
  }
}
</script>

<style lang="less" scoped>
.space {
  margin-top: @padding-md;
}
</style>
