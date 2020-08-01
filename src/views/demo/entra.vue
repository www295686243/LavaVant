<template>
  <PageContainer>
    <van-button @click="RouterService.push('/demo/login')">登录</van-button>
    <van-button @click="handleLogout">退出</van-button>
    <van-button @click="RouterService.push('/demo/form')">表单</van-button>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RouterService from '@/service/RouterService'
import UserService from '@/service/UserService'
import VantService from '@/service/VantService'

@Component
export default class DemoEntra extends Vue {
  private RouterService = RouterService

  private handleLogout () {
    UserService.logout()
      .then((msg) => {
        VantService.toast.success(msg)
      })
  }
}
</script>

<style lang="less">
</style>
