<template>
  <div class="ShareGuide">
    <ButtonSubmit :onClick="handleClick" v-bind="$attrs">{{ buttonText }}</ButtonSubmit>
    <van-popup v-model="isShowPopup">
      <img src="../../assets/images/invite-guide.png" width="100%" v-if="type === 'invite'" />
      <img src="../../assets/images/share-guide.png" width="100%" v-else />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  inheritAttrs: false
})
export default class ShareGuide extends Vue {
  // invite
  @Prop({ default: 'share' })
  type!: string

  @Prop({ default: '分享' })
  buttonText!: string

  private isShowPopup = false

  private handleClick () {
    this.isShowPopup = true
  }
}
</script>

<style lang="less">
.ShareGuide {
  display: inline-block;
  .ButtonSubmit {
    display: block;
  }
  .van-popup {
    top: 0;
    left: 0;
    width: 100%;
    transform: none;
    background: transparent;
  }
}
</style>
