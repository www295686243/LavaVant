<template>
  <PageContainer :onLoad="handleLoad">
    微信分享
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WXService from '@/service/WXService'

@Component
export default class DemoWeChatShare extends Vue {
  private handleLoad () {
    return WXService.updateShareData({
      title: '标题',
      desc: '描述',
      link: `/${location.hash}`,
      imgUrl: '/images/logo.png'
    })
  }
}
</script>

<style lang="less">
</style>
