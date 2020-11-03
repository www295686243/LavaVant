<template>
  <FormRender :onSubmit="handleSubmit" :submit-btn="typeMode.btn" :form="form" ref="formElement">
    <FormInput v-model="form.phone" :field="formFields.phone" />
    <FormSms :onClick="sendSmsCaptcha" v-model="form.code" :field="formFields.code"/>
  </FormRender>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'
import UserService from '@/service/UserService'
import { FormElement } from '../Form/FormRender.vue'

interface TypeNameItem {
  code: string;
  btn: string;
}

const TYPE_NAME: { [key: string]: TypeNameItem } = {
  'bind-phone': {
    code: 'bind-phone',
    btn: '绑定手机号'
  },
  'update-phone': {
    code: 'update-phone',
    btn: '修改手机号'
  },
  'verify-phone': {
    code: 'verify-phone',
    btn: '验证手机号'
  },
  'invite-user': {
    code: 'bind-phone',
    btn: '立即加入'
  }
}

@Component
export default class BusinessSmsCaptcha extends Vue {
  @Ref()
  formElement!: FormElement

  @Prop()
  typeName!: string

  private form = {
    phone: '',
    code: ''
  }

  private typeMode: TypeNameItem = {
    code: '',
    btn: ''
  }

  private formFields = ValidateService.genRules({
    phone: {
      label: '手机号',
      rules: [ValidateService.required, ValidateService.mobile]
    },
    code: {
      label: '验证码'
    }
  })

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        if (this.typeName === 'bind-phone') {
          return UserService.bindPhone(this.form)
        } else if (this.typeName === 'update-phone') {
          return UserService.updatePhone(this.form)
        } else if (this.typeName === 'verify-phone') {
          return UserService.verifyPhone(this.form)
        } else if (this.typeName === 'invite-user') {
          return UserService.bindPhone(this.form)
            .then(() => UserService.setInviteUser())
        }
      })
  }

  private sendSmsCaptcha () {
    return this.formElement.validate(this.formFields.phone.label)
      .then(() => UserService.sendSmsCaptcha({
        phone: this.form.phone,
        type_name: this.typeMode.code
      }))
  }

  created () {
    this.typeMode = TYPE_NAME[this.typeName]
  }
}
</script>

<style lang="less">
</style>
