<template>
  <PageContainer class="view-other-help">
    <HelpText></HelpText>
    <div class="setup-box">
      <van-button type="primary" @click="handleDisable">不再悬浮展示</van-button>
      <p class="tips">您可以从 "<span>我的</span>" -> "<span>使用帮助</span>" 里再次进入</p>
    </div>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelpText from '@/views/components/HelpText.vue'
import VantService from '@/service/VantService'
import ConstService from '@/service/ConstService'

@Component({
  components: {
    HelpText
  }
})
export default class ViewOtherHelp extends Vue {
  private handleDisable () {
    ConstService.disableFixedHelp()
    VantService.toast.success('设置成功')
  }
}
</script>

<style lang="less">
.view-other-help {
  .setup-box {
    padding: @padding-md;
  }
  .tips {
    margin-top: @padding-base;
    font-size: @font-size-md;
    color: @gray-7;
    span {
      color: @gray-8;
    }
  }
  p {
    margin-top: @padding-xs;
  }
}
</style>
