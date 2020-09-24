<template>
  <PageContainer>
    <van-button @click="RouterService.push('/demo/login')">登录</van-button>
    <van-button @click="handleLogout">退出</van-button>
    <van-button @click="RouterService.push('/demo/form')">表单</van-button>
    <van-button @click="RouterService.push('/demo/wechat-share')">分享</van-button>
    <van-button @click="RouterService.push('/demo/wechat-pay')">支付</van-button>
    <van-button @click="RouterService.push('/demo/wechat-notify')">微信通知</van-button>
    <van-button @click="RouterService.push('/user/notify')">通知列表</van-button>
    <van-button @click="RouterService.push('/user/personal-auth')">个人认证</van-button>
    <van-button @click="RouterService.push('/user/enterprise-auth')">企业认证</van-button>
    <van-button @click="RouterService.push('/user/hr/job/form')">发布招聘</van-button>
    <van-button @click="RouterService.push('/user/hr/resume/form')">发布简历</van-button>
    <van-button @click="RouterService.push('/user/personal/base')">个人资料</van-button>
    <van-button @click="RouterService.push('/user/enterprise/base')">企业资料</van-button>
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
