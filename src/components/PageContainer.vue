<template>
  <div class="PageContainer">
    <van-notice-bar
      v-if="NotifyService.unreadCount > 0 && NotifyService.isShow"
      left-icon="volume-o"
      @close="handleNotifyClose"
      mode="closeable">
      <span @click="handleNotifyClick">您有{{NotifyService.unreadCount}}条未读消息，点击前往查看</span>
    </van-notice-bar>
    <DataRender :onLoad="handleLoad" ref="drElement">
      <slot></slot>
    </DataRender>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import NotifyService from '@/service/NotifyService'
import { NoticeBar } from 'vant'
import RouterService from '@/service/RouterService'

@Component({
  components: {
    [NoticeBar.name]: NoticeBar
  }
})
export default class PageContainer extends Vue {
  @Ref()
  drElement!: any

  @Prop({ default: () => () => Promise.resolve() })
  readonly onLoad!: Function

  private NotifyService = NotifyService

  private handleLoad () {
    return this.onLoad()
      .then(() => {
        NotifyService.checkQueryNotify().then(() => NotifyService.getUnreadCount())
      })
  }

  private handleNotifyClick () {
    NotifyService.setClose()
    RouterService.push('/user/notify')
  }

  private handleNotifyClose () {
    NotifyService.setClose()
  }

  public reload () {
    this.drElement.initLoad()
  }
}
</script>

<style lang="less">
.PageContainer {
  & > .DataRender {
    & > .render-loading {
      padding: 0;
      padding-top: 20%;
    }
  }
}
</style>
