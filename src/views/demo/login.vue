<template>
  <PageContainer>
    <FormRender :onSubmit="handleSubmit" submit-btn="登录">
      <FormInput v-model="form.username" :field="formFields.username" />
      <FormInput v-model="form.password" :field="formFields.password" />
    </FormRender>
    <ButtonStat :onClick="handleStat">按钮埋点</ButtonStat>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserService from '@/service/UserService'

@Component
export default class DemoForm extends Vue {
  private form = {
    username: '',
    password: ''
  }

  private formFields = {
    username: {
      label: '用户名'
    },
    password: {
      label: '密码'
    }
  }

  private handleSubmit () {
    return UserService.login(this.form)
  }

  private handleStat () {
    return Promise.resolve({
      message: '好的结果'
    })
  }
}
</script>

<style lang="less">
</style>
