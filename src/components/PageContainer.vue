<template>
  <div class="PageContainer" @click="handleTouchEnd">
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
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import eruda from 'eruda'

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
  private clickCount = 0
  private lastClickTime = 0
  private interval = 200 // 连续点击间隔
  private triggerCount = 8 // 触发debug点击次数

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

  private handleTouchEnd () {
    const current = new Date().getTime()

    if (this.lastClickTime === 0 || (current - this.lastClickTime < this.interval)) {
      this._countUp(current)
    } else {
      this._reset(1)
    }

    if (this.clickCount === this.triggerCount) {
      eruda.init()
    }
  }

  private _countUp (current: number) {
    this.clickCount++
    this.lastClickTime = current
  }

  private _reset (count = 0) {
    this.clickCount = count
    this.lastClickTime = 0
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
