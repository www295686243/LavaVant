<template>
  <van-popup
    v-model="isShow"
    class="PopupRegister"
    round
    get-container="body">
    <van-steps :active="active">
      <van-step>手机验证</van-step>
      <van-step>完善基础资料</van-step>
    </van-steps>
    <div class="container">
      <component :is="current" @success="handleSuccess"></component>
    </div>
  </van-popup>
</template>

<script lang="ts">
import UserService from '@/service/User/UserService'
import { Component, Vue } from 'vue-property-decorator'
import BaseInfo from './components/BaseInfo.vue'
import BindPhone from './components/BindPhone.vue'
import { Step, Steps } from 'vant'

@Component({
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
    BaseInfo,
    BindPhone
  }
})
export default class PopupRegister extends Vue {
  private active = UserService.info.phone ? 1 : 0
  private current = UserService.info.phone ? 'BaseInfo' : 'BindPhone'
  private resolve!: Function
  private reject!: Function
  private isShow = false

  private open () {
    this.isShow = true
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  public close () {
    this.isShow = false
  }

  private handleSuccess () {
    this.close()
  }
}
</script>

<style lang="less">
.PopupRegister {
  width: 75%;
  padding: @padding-md;
}
</style>
