<template>
  <PageContainer>
    <ButtonSubmit :onClick="handleSubmit">发送通知</ButtonSubmit>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '@/plugins/axios'

@Component
export default class DemoWeChatNotify extends Vue {
  private handleSubmit () {
    return axios.post('wechat/notify')
  }
}
</script>

<style lang="less">
</style>
