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
          <van-grid-item icon="vip-card" @click="handleGotoAuth" text="认证" />
        </van-grid>
      </div>
    </div>
    <van-cell-group class="hr-container">
      <van-cell title="我的职位" to="/user/hr/job" icon-prefix="zz-icon" icon="zhaopin" is-link />
      <van-cell title="接收简历" to="/user/hr/receive" icon-prefix="zz-icon" icon="toudi" is-link />
    </van-cell-group>
    <van-cell-group class="user-entra">
      <van-cell title="联系记录" to="/user/order" icon-prefix="zz-icon" icon="lianxi" is-link />
      <van-cell title="任务大厅" to="/task-hall" icon-prefix="zz-icon" icon="renwu" is-link />
    </van-cell-group>
    <van-cell-group class="user-other">
      <van-cell class="notify" title="消息通知" to="/user/notify" icon="comment-circle" is-link>
        <van-badge :content="NotifyService.unreadCount" max="99" v-if="NotifyService.unreadCount > 0" />
      </van-cell>
      <van-cell title="使用帮助" to="/user/help" icon-prefix="zz-icon" icon="bangzhu" is-link />
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
import UserPersonalService from '@/service/User/UserPersonalService'
import VantService from '@/service/VantService'
import NotifyService from '@/service/NotifyService'

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
  private NotifyService = NotifyService

  private handleSwitchPersonal () {
    return UserPersonalService.checkBaseInfo()
      .then(() => {
        const loading = VantService.toast.loading('切换中...')
        return UserService.switchRole('Personal Member')
          .then(() => {
            loading.clear()
          })
      })
  }

  private handleGotoAuth () {
    UserEnterpriseService.checkBaseInfo()
      .then(() => {
        RouterService.push('/user/enterprise-auth')
      })
  }
}
</script>
