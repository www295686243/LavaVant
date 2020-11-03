<template>
  <PageContainer class="view-user-hr-job-success">
    <div class="status">
      <div class="status-icon"><van-icon name="checked" color="#07c160" size="80px" /></div>
      <p class="status-text">已{{isUpdate > 0 ? '更新' : '发布'}}成功</p>
    </div>
    <div class="tips">
      <p>1、发布成功后，需要审核通过才能在网站显示</p>
      <p>2、发布完成后，可以在“我的-我的发布”进行修改、下架、设定已解决等操作</p>
      <div class="qrcode" v-if="UserService.info.is_follow_official_account === 0">
        <p><img src="@/assets/images/yuancao.jpg" alt="原草网公众号" width="200" height="200"></p>
        <p>检测到您未关注【原草互助】公众号</p>
        <p>请长按二维码识别关注</p>
        <p>才能获得公众号即时求职信息推送、进度推送！</p>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserService from '@/service/User/UserService'
import RouterService from '@/service/RouterService'

@Component
export default class UserHrJobSuccess extends Vue {
  private UserService = UserService

  private isUpdate = RouterService.getPath().includes('update-success')
}
</script>

<style lang="less">
.view-user-hr-job-success {
  p {
    font-size: @font-size-md;
  }
  .status {
    padding-top: 15%;
    text-align: center;
  }
  .status-icon {
    display: flex;
    justify-content: center;
  }
  .status-text {
    margin-top: 10px;
    font-size: 20px;
  }
  .tips {
    margin-top: 30px;
    padding: 0 10%;
    color: #666666;
  }
  .qrcode {
    text-align: center;
    color: #ee0a24;
  }
}
</style>
