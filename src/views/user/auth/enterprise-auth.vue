<template>
  <PageContainer>
    <FormRender :form="form" :onLoad="handleLoad" :onSubmit="handleSubmit" :submitBtn="submitBtn" :disableSubmit="disableSubmit">
      <FormInput v-model="form.company" :field="formFields.company" />
      <FormInput v-model="form.business_license" :field="formFields.business_license" />
      <FormArea v-model="form.city" :field="formFields.city"/>
      <FormInput v-model="form.address" :field="formFields.address" />
      <FormTextarea v-model="form.intro" :field="formFields.intro" />
      <FormImages v-model="form.certificates" :field="formFields.certificates" :uploadParmas="{ _model: UserEnterpriseAuth.name, info_id: form.user_id }" />
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService, { FormFields } from '@/service/ValidateService'
import RouterService from '@/service/RouterService'
import UserService from '@/service/UserService'
import UserEnterpriseAuth from '@/service/User/UserEnterpriseAuth'
import { getOptionsValue } from '@/service/ConstService'

@Component
export default class ViewUserEnterpriseAuth extends Vue {
  private UserEnterpriseAuth = UserEnterpriseAuth
  private form = {
    company: '',
    business_license: '',
    city: '',
    address: '',
    intro: '',
    certificates: [],
    status: 0,
    user_id: UserService.info.id
  }

  private submitBtn = '提 交'
  private isSubmitted = false
  private disableSubmit = false

  private formFields: FormFields = ValidateService.genRules({
    company: {
      label: '公司名',
      rules: [ValidateService.required, ValidateService.max(60)],
      disabled: false
    },
    business_license: {
      label: '营业执照',
      rules: [ValidateService.required, ValidateService.max(18)],
      disabled: false
    },
    city: {
      label: '所在城市',
      rules: [ValidateService.required],
      disabled: false
    },
    address: {
      label: '详细地址',
      rules: [ValidateService.required, ValidateService.max(60)],
      disabled: false
    },
    intro: {
      label: '简介',
      rules: [ValidateService.required, ValidateService.max(255)],
      placeholder: '介绍公司供应的产品，或者加能力，设备以及其他的环保证件等',
      disabled: false
    },
    certificates: {
      label: '证件图片',
      rules: [ValidateService.uploadRequired, ValidateService.max(3)],
      placeholder: '请上传营业执照等相关证件',
      disabled: false
    }
  })

  private handleLoad () {
    return UserEnterpriseAuth.show()
      .then((res) => {
        this.isSubmitted = !!(res.data && res.data.id)
        this.handleToggleFormDisabled(this.isSubmitted)
        if (this.isSubmitted) {
          if (res.data.status !== getOptionsValue(41, '审核中')) {
            this.submitBtn = '更新认证'
          } else {
            this.submitBtn = '请等待审核'
            this.disableSubmit = true
          }
        }
        return res
      })
  }

  private init () {
    this.submitBtn = '提 交'
    this.isSubmitted = false
    this.handleToggleFormDisabled(false)
  }

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        if (this.isSubmitted && this.form.status !== getOptionsValue(41, '审核中')) {
          this.init()
        } else {
          return UserEnterpriseAuth.store(this.form)
            .then((res) => {
              RouterService.go()
              return res
            })
        }
      })
  }

  private handleToggleFormDisabled (bool: boolean) {
    Object.keys(this.formFields).forEach((key: string) => {
      this.formFields[key].disabled = bool
    })
  }
}
</script>

<style lang="less">
</style>
