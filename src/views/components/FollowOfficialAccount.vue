<template>
  <van-popup
    class="FollowOfficialAccount"
    v-model="innerValue"
    close-on-popstate
    closeable
    get-container="body">
    <div class="service-img"><img src="@/assets/images/yuancao.jpg" alt="公众号二维码" width="240" height="240"></div>
    <p class="service-text">长按二维码识别关注，进入【个人中心-设置】订阅推送行业和地区</p>
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class FollowOfficialAccount extends Vue {
  @Prop({ default: false })
  value!: boolean

  @Watch('innerValue')
  onInnerValue (val: boolean) {
    this.$emit('input', val)
  }

  @Watch('value')
  onValue (val: boolean) {
    this.innerValue = val
  }

  private innerValue = this.value
}
</script>

<style lang="less">
.FollowOfficialAccount {
  .service-img {
    padding: 10px 10px 0;
  }
  .service-text {
    padding: 0 10px 15px;
    text-align: center;
  }
  .van-popup__close-icon--top-right {
    top: 6px;
    right:6px;
  }
}
</style>
