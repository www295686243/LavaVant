<template>
  <div class="FixedHelp" v-if="ConstService.isDisableFixedHelp === false">
    <van-button plain type="info" @click="RouterService.push('/other/help')"><van-icon name="service" />帮助</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RouterService from '@/service/RouterService'
import ConstService from '@/service/ConstService'

@Component
export default class FixedHelp extends Vue {
  private RouterService = RouterService
  private ConstService = ConstService
}
</script>

<style lang="less">
.FixedHelp {
  position: fixed;
  right: 0;
  bottom: 30%;
  .van-button {
    width: 30px;
    height: auto;
    line-height: 1.4;
    padding: 5px 0 5px 2px;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
}
</style>
