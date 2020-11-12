<template>
  <PageContainer class="view-user-invite" :onLoad="handleLoad">
    <div class="entra"><span @click="() => RouterService.push('/user/invite/list')">邀请列表</span></div>
    <div class="box">
      <h3>尊敬的原草互助用户{{UserService.info.nickname}}：</h3>
      <p>您好，感谢使用原草互助，独乐乐不如众乐乐，也邀请您的朋友加入吧。</p>
    </div>
    <div class="btns">
      <ShareGuide type="invite" buttonText="立即邀请" round></ShareGuide>
    </div>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RouterService from '@/service/RouterService'
import ShareGuide from '@/views/components/ShareGuide.vue'
import WXService from '@/service/WXService'
import UserService from '@/service/User/UserService'

@Component({
  name: 'UserInvite',
  components: {
    ShareGuide
  }
})
export default class UserInvite extends Vue {
  private RouterService = RouterService
  private UserService = UserService
  private isShowShareGuide = false

  private handleLoad () {
    WXService.updateShareData({
      title: UserService.info.nickname + '邀请您加入求职招聘互助，共同互助找工作！',
      desc: '原草互助，行业人的互帮互助！',
      link: `/operation/invite?iu=${UserService.info.id}`
    })
  }
}
</script>

<style lang="less">
.view-user-invite {
  .entra {
    text-align: right;
    padding: 0 @padding-md;
    span {
      color: #1989fa;
      font-size: 14px;
    }
  }
  .box {
    padding: 30% 34px 0;
    h3 {
      margin-bottom: @padding-md;
    }
    p {
      margin-bottom: @padding-xs;
      color: @gray-7;
    }
  }
  .btns {
    margin-top: 30px;
    text-align: center;
    .van-button--normal {
      padding: 0 40px;
    }
  }
}
</style>
