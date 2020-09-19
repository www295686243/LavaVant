<template>
  <PageContainer>
    <FormRender :form="form" :onLoad="handleLoad" :onSubmit="handleSubmit" :submitBtn="submitBtn" :disableSubmit="disableSubmit">
      <FormInput v-model="form.name" :field="formFields.name" />
      <FormInput v-model="form.company" :field="formFields.company" />
      <FormInput v-model="form.position" :field="formFields.position" />
      <FormArea v-model="form.city" :field="formFields.city"/>
      <FormInput v-model="form.address" :field="formFields.address" />
      <FormTextarea v-model="form.intro" :field="formFields.intro" />
      <FormImages v-model="form.certificates" :field="formFields.certificates" :uploadParmas="{ _type: 'User/UserPersonalAuth', info_id: form.user_id }" />
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService, { FormFields } from '@/service/ValidateService'
import RouterService from '@/service/RouterService'
import UserService from '@/service/UserService'
import UserPersonalAuth from '@/service/User/UserPersonalAuth'
import { getOptionsValue } from '@/service/ConstService'

@Component
export default class ViewUserPersonalAuth extends Vue {
  private form = {
    name: '',
    company: '',
    position: '',
    city: '',
    address: '',
    intro: '',
    certificates: [],
    auth_status: 0,
    user_id: UserService.info.id
  }

  private submitBtn = '提 交'
  private isSubmitted = false
  private disableSubmit = false

  private formFields: FormFields = ValidateService.genRules({
    name: {
      label: '姓名',
      rules: [ValidateService.required, ValidateService.fullname],
      disabled: false
    },
    company: {
      label: '公司名',
      rules: [ValidateService.required, ValidateService.max(60)],
      disabled: false
    },
    position: {
      label: '职位',
      rules: [ValidateService.required, ValidateService.max(60)],
      disabled: false
    },
    city: {
      label: '城市',
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
      placeholder: '介绍擅长的产品、技术、加工方式，以及做人，对人态度，广交朋友，多做生意，财源滚滚！',
      disabled: false
    },
    certificates: {
      label: '证件图片',
      rules: [ValidateService.uploadRequired, ValidateService.max(3)],
      placeholder: '请上传名片或工牌',
      disabled: false
    }
  })

  private handleLoad () {
    return UserPersonalAuth.show()
      .then((res) => {
        this.isSubmitted = !!(res.data && res.data.id)
        this.handleToggleFormDisabled(this.isSubmitted)
        if (this.isSubmitted) {
          if (res.data.auth_status !== getOptionsValue(41, '审核中')) {
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
        if (this.isSubmitted && this.form.auth_status !== getOptionsValue(41, '审核中')) {
          this.init()
        } else {
          return UserPersonalAuth.store(this.form)
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
