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
    <van-button @click="RouterService.push('/user/wallet')">我的钱包</van-button>
    <van-button @click="RouterService.push('/demo/info-complaint')">信息投诉</van-button>
    <van-button @click="RouterService.push('/demo/info-delivery')">信息投递</van-button>
    <van-button @click="RouterService.push('/hr/resume/show')">简历详情</van-button>
    <van-button @click="RouterService.push('/user/coupon/my-coupon')">优惠券列表</van-button>
    <van-button @click="RouterService.push('/user/coupon/sell-coupon')">出售优惠券</van-button>
    <van-button @click="RouterService.push('/user/coupon/my-sell-coupon')">在售优惠券</van-button>
    <van-button @click="RouterService.push('/coupon-market')">优惠券市场</van-button>
    <van-button @click="RouterService.push('/demo/list', { type: 'job' })">招聘列表</van-button>
    <van-button @click="RouterService.push('/hr/resume')">简历列表</van-button>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RouterService from '@/service/RouterService'
import UserService from '@/service/User/UserService'
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
