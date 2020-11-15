<template>
  <PageContainer>
    <FormRender :form="form" :onLoad="handleLoad" :onSubmit="handleSubmit" :submitBtn="submitBtn" :disableSubmit="disableSubmit">
      <FormInput v-model="form.company" :field="formFields.company" />
      <FormInput v-model="form.business_license" :field="formFields.business_license" />
      <FormArea v-model="form.city" :field="formFields.city"/>
      <FormInput v-model="form.address" :field="formFields.address" />
      <FormTextarea v-model="form.intro" :field="formFields.intro" />
      <FormImages v-model="form.certificates" :field="formFields.certificates" :uploadParmas="{ _model: UserEnterpriseAuthService.name, info_id: form.user_id }" />
      <template slot="footer" v-if="isSubmitted === true && disableSubmit === false">
        <ButtonSubmit :onClick="handleSubmit" block round>更新认证</ButtonSubmit>
      </template>
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ValidateService, { FormFields } from '@/service/ValidateService'
import UserService from '@/service/User/UserService'
import UserEnterpriseAuthService from '@/service/User/UserEnterpriseAuthService'
import UserEnterpriseService from '@/service/User/UserEnterpriseService'

@Component
export default class ViewUserEnterpriseAuth extends Vue {
  @Watch('UserEnterpriseService.info.company')
  onChange () {
    this.change()
  }

  private form = {
    company: '',
    business_license: '',
    city: 0,
    address: '',
    intro: '',
    certificates: [],
    status: 0,
    user_id: UserService.info.id
  }

  private submitBtn = '提 交'
  private isSubmitted = false
  private disableSubmit = false
  private UserEnterpriseAuthService = UserEnterpriseAuthService
  private UserEnterpriseService = UserEnterpriseService

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
    return UserEnterpriseAuthService.show()
      .then((res) => {
        Object.assign(this.form, res.data)
        this.isSubmitted = !!(res.data && res.data.id)
        this.handleToggleFormDisabled(this.isSubmitted)
        if (this.isSubmitted && res.data.status === UserEnterpriseAuthService.getStatusValue(1, '审核中')) {
          this.submitBtn = '请等待审核'
          this.disableSubmit = true
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
        if (this.isSubmitted && this.form.status !== UserEnterpriseAuthService.getStatusValue(1, '审核中')) {
          this.init()
        } else {
          return UserEnterpriseAuthService.store(this.form)
        }
      })
  }

  private handleToggleFormDisabled (bool: boolean) {
    Object.keys(this.formFields).forEach((key: string) => {
      this.formFields[key].disabled = bool
    })
  }

  private change () {
    this.form.company = UserEnterpriseService.info.company || ''
    this.form.business_license = UserEnterpriseService.info.business_license || ''
    this.form.city = UserEnterpriseService.info.city || 0
    this.form.address = UserEnterpriseService.info.address || ''
    this.form.intro = UserEnterpriseService.info.intro || ''
  }

  created () {
    this.change()
  }
}
</script>

<style lang="less">
</style>
