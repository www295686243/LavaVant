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
        <div class="user-edit" @click="gotoUserInfo">
          <p>修改</p>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Image, Grid, GridItem } from 'vant'
import UserService from '@/service/User/UserService'
import UserEnterpriseService from '@/service/User/UserEnterpriseService'

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

  private gotoUserInfo () {
    //
  }
}
</script>
