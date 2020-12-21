<template>
  <PageContainer :onLoad="handleLoad"></PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WXService from '@/service/WXService'

@Component
export default class UserWeChatLogin extends Vue {
  private handleLoad () {
    return WXService.login()
  }
}
</script>

<style lang="less">
</style>
