<template>
  <div>
    <div class="header-container">
      <div class="user-base-container">
        <div class="user-avatar">
          <van-image
            round
            width="50"
            height="50"
            fit="cover"
            :src="UserEnterpriseService.info.avatar"
          />
        </div>
        <div class="user-base-info">
          <h4>{{ UserEnterpriseService.info.company || UserService.info.nickname }}</h4>
          <p class="display-name">企业用户</p>
        </div>
        <div class="user-edit">
          <p @click="RouterService.push('/user/enterprise/base')">修改</p>
          <van-icon name="arrow" class="arrow" />
        </div>
      </div>
      <div class="amount-container">
        <van-grid :border="false" :column-num="3" :clickable="true">
          <van-grid-item icon="gold-coin" to="/user/wallet" text="我的钱包" />
          <van-grid-item icon="youhuiquan" icon-prefix="zz-icon" to="/user/coupon/my-coupon" text="互助券" />
          <van-grid-item icon="vip-card" to="/user/enterprise-auth" text="认证" />
        </van-grid>
      </div>
    </div>
    <van-cell-group class="hr-container">
      <van-cell title="我的职位" to="/user/hr/job" icon-prefix="zz-icon" icon="zhaopin" is-link />
    </van-cell-group>
    <van-cell-group class="user-entra">
      <van-cell title="联系记录" to="/user/order" icon-prefix="zz-icon" icon="lianxi" is-link />
      <van-cell title="我的分享" to="/user/share" icon-prefix="zz-icon" icon="fenxiang" is-link />
      <van-cell title="任务大厅" to="/task-hall" icon-prefix="zz-icon" icon="renwu" is-link />
      <van-cell title="邀请" to="/user/invite" icon-prefix="zz-icon" icon="yaoqing" is-link />
    </van-cell-group>
    <van-cell-group class="user-other">
      <van-cell title="使用帮助" to="/other/help" icon-prefix="zz-icon" icon="bangzhu" is-link />
      <van-cell title="设置" to="/user/setup" icon-prefix="zz-icon" icon="shezhi" is-link />
    </van-cell-group>
    <van-cell-group class="user-switch">
      <van-cell title="切换至个人" @click="handleSwitchPersonal" icon-prefix="zz-icon" icon="qiehuan" is-link />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Image, Grid, GridItem } from 'vant'
import UserService from '@/service/User/UserService'
import UserEnterpriseService from '@/service/User/UserEnterpriseService'
import RouterService from '@/service/RouterService'
import PopupRegisterService from '@/components/Popup/PopupRegister/PopupRegisterService'
import UserPersonalService from '@/service/User/UserPersonalService'
import VantService from '@/service/VantService'

@Component({
  components: {
    [Image.name]: Image,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  }
})
export default class ViewUserEnterpriseIndex extends Vue {
  private UserEnterpriseService = UserEnterpriseService
  private UserService = UserService
  private RouterService = RouterService

  private handleSwitchPersonal () {
    return Promise.resolve()
      .then(() => {
        if (!UserPersonalService.info.name) {
          return PopupRegisterService.open('Personal Member')
        } else {
          const loading = VantService.toast.loading('切换中...')
          return UserService.switchRole('Personal Member')
            .then(() => {
              loading.clear()
            })
        }
      })
  }
}
</script>
