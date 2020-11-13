<template>
  <van-popup
    v-model="isShow"
    class="PopupPhone"
    round
    @closed="handleClose"
    get-container="body">
    <van-steps :active="active" v-if="UserService.info.phone">
      <van-step>验证手机号</van-step>
      <van-step>绑定手机号</van-step>
    </van-steps>
    <div class="container">
      <component :is="current" @success="handleSuccess"></component>
    </div>
  </van-popup>
</template>

<script lang="ts">
import UserService from '@/service/User/UserService'
import { Component, Vue } from 'vue-property-decorator'
import VerifyPhone from './components/VerifyPhone.vue'
import UpdatePhone from './components/UpdatePhone.vue'
import { Step, Steps } from 'vant'

@Component({
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
    VerifyPhone,
    UpdatePhone
  }
})
export default class PopupPhone extends Vue {
  private active = 0
  private current = UserService.info.phone ? 'VerifyPhone' : 'UpdatePhone'
  private resolve!: Function
  private reject!: Function
  private isShow = false
  private UserService = UserService

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

  public destroy () {
    this.$destroy()
  }

  private handleSuccess () {
    if (this.current === 'VerifyPhone') {
      this.current = 'UpdatePhone'
      this.active = 1
    } else {
      this.close()
      this.resolve()
      this.$destroy()
    }
  }

  private handleClose () {
    this.reject()
    this.destroy()
  }
}
</script>

<style lang="less">
.PopupPhone {
  width: 75%;
  padding: @padding-md;
}
</style>
