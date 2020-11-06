<template>
  <div class="FollowAd van-hairline--bottom" v-show="UserService.isShowFollowAd">
    <van-cell
    :clickable="true"
    :border="false"
    @click="handleShowQrcode"
    :title="'您未关注【原草互助】公众号，不能获得最新' + Service.displayName + '精准推送！点击扫码关注！'">
      <img src="@/assets/images/yuancao.jpg" width="50" height="50" alt="公众号二维码" slot="icon">
    </van-cell>
    <van-icon name="close" class="close" @click="handleChange" v-if="isDisableCloseBtn === false" />
    <FollowOfficialAccount v-model="isShowQrcode"></FollowOfficialAccount>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import FollowOfficialAccount from '@/views/components/FollowOfficialAccount.vue'
import UserService from '@/service/User/UserService'
import BaseModelService from '@/service/BaseModelService'

@Component({
  components: {
    FollowOfficialAccount
  }
})
export default class FollowAd extends Vue {
  @Prop({ default: false })
  isDisableCloseBtn!: boolean

  @Prop()
  Service!: BaseModelService

  private UserService = UserService
  private isShowQrcode = false

  private handleChange () {
    UserService.isShowFollowAd = !UserService.isShowFollowAd
  }

  private handleShowQrcode () {
    this.isShowQrcode = true
  }
}
</script>

<style lang="less">
.FollowAd {
  position: relative;
  .van-cell__title {
    padding-left: 10px;
    padding-right: 10px;
    color: @text-link-color;
    line-height: 1.5;
    padding-top: 5px;
  }
  .close {
    position: absolute;
    right: 5px;
    top: 5px;
    color: #999;
  }
}
</style>
