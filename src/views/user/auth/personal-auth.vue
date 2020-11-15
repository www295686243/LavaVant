<template>
  <PageContainer>
    <FormRender :form="form" :onLoad="handleLoad" :onSubmit="handleSubmit" :submitBtn="submitBtn" :disableSubmit="disableSubmit">
      <FormInput v-model="form.name" :field="formFields.name" />
      <FormInput v-model="form.company" :field="formFields.company" />
      <FormInput v-model="form.position" :field="formFields.position" />
      <FormArea v-model="form.city" :field="formFields.city"/>
      <FormInput v-model="form.address" :field="formFields.address" />
      <FormTextarea v-model="form.intro" :field="formFields.intro" />
      <FormImages v-model="form.certificates" :field="formFields.certificates" :uploadParmas="{ _model: UserPersonalAuthService.name, info_id: form.user_id }" />
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
import UserPersonalAuthService from '@/service/User/UserPersonalAuthService'
import UserPersonalService from '@/service/User/UserPersonalService'

@Component
export default class ViewUserPersonalAuth extends Vue {
  @Watch('UserPersonalService.info.name')
  onChange () {
    this.change()
  }

  private form = {
    name: '',
    company: '',
    position: '',
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
  private UserPersonalService = UserPersonalService
  private UserPersonalAuthService = UserPersonalAuthService

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
    return UserPersonalAuthService.show()
      .then((res) => {
        Object.assign(this.form, res.data)
        this.isSubmitted = !!(res.data && res.data.id)
        this.handleToggleFormDisabled(this.isSubmitted)
        if (this.isSubmitted && res.data.status === UserPersonalAuthService.getStatusValue(1, '审核中')) {
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
        if (this.isSubmitted && this.form.status !== UserPersonalAuthService.getStatusValue(1, '审核中')) {
          this.init()
        } else {
          return UserPersonalAuthService.store(this.form)
        }
      })
  }

  private handleToggleFormDisabled (bool: boolean) {
    Object.keys(this.formFields).forEach((key: string) => {
      this.formFields[key].disabled = bool
    })
  }

  private change () {
    this.form.name = UserPersonalService.info.name || ''
    this.form.company = UserPersonalService.info.company || ''
    this.form.position = UserPersonalService.info.position || ''
    this.form.city = UserPersonalService.info.city || 0
    this.form.address = UserPersonalService.info.address || ''
    this.form.intro = UserPersonalService.info.intro || ''
  }

  created () {
    this.change()
  }
}
</script>

<style lang="less">
</style>
