<template>
  <PageContainer class="view-user-personal">
    <div class="step-container">
      <van-steps :active="active">
        <van-step>基本信息</van-step>
        <van-step>个人详情</van-step>
      </van-steps>
    </div>
    <div class="component-container">
      <router-view></router-view>
    </div>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Step, Steps } from 'vant'
import RouterService from '@/service/RouterService'

@Component({
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps
  }
})
export default class UserPersonal extends Vue {
  @Prop()
  data!: object

  private active = this.getActive(RouterService.getPath())

  beforeRouteUpdate (to: any, from: any, next: Function) {
    this.active = this.getActive(to.path)
    next()
  }

  getActive (path: string) {
    return path === '/user/personal/detail' ? 1 : 0
  }
}
</script>

<style lang="less">
.view-user-personal {
  min-height: 100vh;
  .step-container {
    padding: 0 15%;
    background: @white;
    .van-step__title {
      font-size: 14px;
    }
  }
}
</style>
