<template>
  <div class="PageContainer">
    <van-notice-bar
      v-if="NotifyService.unreadCount > 0 && NotifyService.isClose === false"
      left-icon="volume-o"
      @close="handleNotifyClose"
      mode="closeable">
      <span @click="handleNotifyClick">您有{{NotifyService.unreadCount}}条未读消息，点击前往查看</span>
    </van-notice-bar>
    <DataRender :onLoad="handleLoad">
      <slot></slot>
    </DataRender>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import NotifyService from '@/service/NotifyService'
import { NoticeBar } from 'vant'
import RouterService from '@/service/RouterService'

@Component({
  components: {
    [NoticeBar.name]: NoticeBar
  }
})
export default class PageContainer extends Vue {
  @Prop({ default: () => () => Promise.resolve() })
  readonly onLoad!: Function

  private NotifyService = NotifyService

  private handleLoad () {
    return NotifyService.checkQueryNotify()
      .then(() => NotifyService.getUnreadCount())
      .then(() => this.onLoad())
  }

  private handleNotifyClick () {
    NotifyService.setClose()
    RouterService.push('/user/notify')
  }

  private handleNotifyClose () {
    NotifyService.setClose()
  }
}
</script>

<style lang="less">
.PageContainer {
}
</style>
