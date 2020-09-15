<template>
  <PageContainer>
    <FormRender :onSubmit="handleSubmit" :form="form" submit-btn="登录">
      <FormInput v-model="form.username" :field="formFields.username" />
      <FormInput v-model="form.password" :field="formFields.password" />
    </FormRender>
    <BusinessSmsCaptcha typeName="bind-phone"></BusinessSmsCaptcha>
    <ButtonStat :onClick="handleWeChatLogin">微信登陆</ButtonStat>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserService from '@/service/UserService'
import WXService from '@/service/WXService'
import ValidateService from '@/service/ValidateService'
import BusinessSmsCaptcha from '@/components/Business/BusinessSmsCaptcha.vue'

@Component({
  components: {
    BusinessSmsCaptcha
  }
})
export default class DemoForm extends Vue {
  private form = {
    username: '',
    password: ''
  }

  private formFields = ValidateService.genRules({
    username: {
      label: '用户名'
    },
    password: {
      label: '密码'
    }
  })

  private handleSubmit () {
    return UserService.login(this.form)
  }

  private handleWeChatLogin () {
    return WXService.auth()
  }
}
</script>

<style lang="less">
</style>
