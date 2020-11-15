<template>
  <PageContainer class="view-user-setup">
    <van-cell-group>
      <van-cell
        @click="handlePopupPhone"
        :title="UserService.info.phone ? '修改手机号' : '绑定手机号'"
        :value="UserService.info.phone || '未绑定'"
        icon="phone-o"
        is-link />
      <van-cell
        @click="handleRegister"
        title="设置地区与行业"
        icon="apps-o"
        is-link />
      <van-cell center title="订阅职位信息" icon="star-o">
        <SwitchBox
          slot="right-icon"
          v-model="UserControlService.info.is_open_resume_push"
          :onSubmit="(val) => UpdateUserSetup('is_open_resume_push', val)"
          size="20">
        </SwitchBox>
      </van-cell>
      <van-cell center title="订阅简历信息" icon="star-o">
        <SwitchBox
          slot="right-icon"
          v-model="UserControlService.info.is_open_job_push"
          :onSubmit="(val) => UpdateUserSetup('is_open_job_push', val)"
          size="20">
        </SwitchBox>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="other">
      <van-cell title="清空缓存" icon="delete" is-link @click="handleClearCache"/>
    </van-cell-group>
  </PageContainer>
</template>

<script lang="ts">
import UserService from '@/service/User/UserService'
import { Component, Vue } from 'vue-property-decorator'
import SwitchBox from '@/components/Form/Base/SwitchBox.vue'
import UserControlService from '@/service/User/UserControlService'
import PopupRegisterService from '@/components/Popup/PopupRegister/PopupRegisterService'
import VantService from '@/service/VantService'

@Component({
  components: {
    SwitchBox
  }
})
export default class ViewUserSetup extends Vue {
  private UserService = UserService
  private UserControlService = UserControlService

  private UpdateUserSetup (key: string, val: number) {
    return UserControlService.update({
      [key]: val
    })
  }

  private handlePopupPhone () {
    PopupRegisterService.phone()
  }

  private handleRegister () {
    PopupRegisterService.open()
  }

  private handleClearCache () {
    const loading = VantService.toast.loading('清空中...')
    return UserService.getUserInfo()
      .then(() => {
        loading.clear()
        VantService.toast.success('清空成功！')
      })
  }
}
</script>

<style lang="less">
.view-user-setup {
  .other {
    margin-top: @padding-md;
  }
}
</style>
