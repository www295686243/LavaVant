<template>
  <PageContainer class="view-operation-invite" :onLoad="handleLoad">
    <div class="text-container">
      <h3><strong>{{nickname}}邀请您加入原草互助，工业人的求职招聘互助公众号</strong></h3>
    </div>
    <p class="tips-text">*请输入你的手机号，登录或注册原草互助</p>
    <BusinessSmsCaptcha typeName="invite-user" @success="handleSuccess"></BusinessSmsCaptcha>
    <div class="or-action">
      <p>获得最新招聘精准推送，点击扫码关注公众号！</p>
      <div class="btn">
        <ButtonSubmit size="small" type="warning" :onClick="() => isShowQrcode = true">关注公众号</ButtonSubmit>
        <span>或</span>
        <ButtonSubmit size="small" type="warning" :onClick="() => RouterService.push('/hr/job')">查看招聘列表</ButtonSubmit>
      </div>
    </div>
    <div class="text-container">
      <h4>原草互助的优势：</h4>
      <p class="tips">1、职位都是回访沟通过，在招才发布，避免浪费时间，已招到可反馈下架！</p>
      <p class="tips">2、注册后，关注公众号，求职招聘信息会根据地区，第一时间推送到个人微信，避免错过！</p>
      <p class="tips">3、互帮互助，帮助他人求职招聘，免费查看招聘联系电话！</p>
      <p class="tips">4、求职、招聘信息随时自行下架，禁止查看！解决招到人还不断来电的苦恼！</p>
      <p>目前2万多人制造业用户，3000多个招聘，期待你的加入，一起互助招工、找工作!</p>
    </div>
    <FollowOfficialAccount v-model="isShowQrcode"></FollowOfficialAccount>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RouterService from '@/service/RouterService'
import VantService from '@/service/VantService'
import FollowOfficialAccount from '@/views/components/FollowOfficialAccount.vue'
import UserService from '@/service/User/UserService'
import BusinessSmsCaptcha from '@/components/Business/BusinessSmsCaptcha.vue'

@Component({
  components: {
    BusinessSmsCaptcha,
    FollowOfficialAccount
  }
})
export default class ViewOperationInvite extends Vue {
  private UserService = UserService
  private RouterService = RouterService
  private nickname = ''
  private isShowQrcode = false

  private handleLoad () {
    return UserService.getInviteUser()
      .then((res) => {
        this.nickname = res.data.nickname
      })
  }

  private handleSubmit () {
    const loading = VantService.toast.loading('加入中...')
    UserService.setInviteUser()
      .then(() => {
        loading.clear()
        RouterService.push('/user/register')
      })
      .catch(() => {
        loading.clear()
      })
  }
}
</script>

<style lang="less">
.view-operation-invite {
  .text-container {
    padding: 16px 16px;
    h3 {
      font-size: 16px;
    }
    h4 {
      font-size: 16px;
      padding: 0 0 8px;
    }
    p {
      color: #666;
    }
    p.tips {
      color: #333;
      padding: 8px 0;
    }
  }
  .or-action {
    padding: 0 16px;
    .btn {
      margin-top: 12px;
      font-size: 12px;
      span {
        padding: 0 16px;
      }
    }
  }
  .UserVerifyPhone {
    .z-padding-6 {
      padding: 16px;
    }
  }
  .tips-text {
    padding: 24px 16px 8px;
    color: #ff976a;
  }
}
</style>
