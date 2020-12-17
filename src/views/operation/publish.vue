<template>
  <PageContainer class="view-publish">
    <div class="view-row">
      <van-row>
        <van-col span="12" @click="RouterService.push('/user/resume/create')">
          <div class="view-col-box van-hairline--surround">
            <ImageContainer src="/images/share-resume.png" width="40" height="40"></ImageContainer>
            <p>发布简历</p>
          </div>
        </van-col>
        <van-col span="12" @click="RouterService.push('/user/job/create')">
          <div class="view-col-box van-hairline--surround">
            <ImageContainer src="/images/share-job.png" width="40" height="40"></ImageContainer>
            <p>发布职位</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="view-steps">
      <van-steps
        :active="3"
        inactive-icon="arrow"
        active-icon="success">
        <van-step>发布</van-step>
        <van-step>回访</van-step>
        <van-step>审核</van-step>
        <van-step>显示及推广</van-step>
      </van-steps>
    </div>
    <h6 class="view-tips">
      发布后，可在【<span class="z-color-click" @click="RouterService.push('/user')">个人中心</span>—><span class="z-color-click" @click="RouterService.push('/user/resume')">我的简历</span>/<span class="z-color-click" @click="RouterService.push('/user/job')">我的职位</span>】查看管理
    </h6>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Grid, GridItem, Step, Steps } from 'vant'
import RouterService from '@/service/RouterService'

@Component({
  name: 'OperationPublish',
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Step.name]: Step,
    [Steps.name]: Steps
  }
})
export default class Publish extends Vue {
  private RouterService = RouterService
}
</script>

<style lang="less">
.view-publish {
  .view-steps {
    padding: 20px 40px;
    .van-steps__items {
      padding-right: 50px;
    }
    .van-step--horizontal:last-child .van-step__circle-container {
      right: 18px;
    }
    .van-step__title {
      margin-left: 8px;
    }
    .van-step--horizontal:first-child .van-step__title {
      margin-left: -4px;
    }
    .van-step__icon {
      font-size: 14px;
    }
  }
  .view-tips {
    padding: 0px 30px;
  }
  .view-row {
    padding: 30px 20px;
    text-align: center;
    .view-col-box {
      display: inline-block;
      padding: 16px;
      &:active {
        background: #f4f4f4;
      }
    }
  }
}
</style>
