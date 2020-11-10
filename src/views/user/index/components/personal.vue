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
            :src="UserPersonalService.info.avatar || UserService.info.head_url"
          />
        </div>
        <div class="user-base-info">
          <h4>{{ UserPersonalService.info.name || UserService.info.nickname }}</h4>
          <p class="display-name">个人用户</p>
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
          <van-grid-item icon="vip-card" to="/user/personal-auth" text="认证" />
        </van-grid>
      </div>
    </div>
    <van-cell-group class="hr-container">
      <van-cell title="我的简历" to="/user/hr/resume" icon-prefix="zz-icon" icon="jianli" is-link />
      <van-cell title="我的投递" to="/user/order" icon-prefix="zz-icon" icon="toudi" is-link />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Image, Grid, GridItem } from 'vant'
import UserService from '@/service/User/UserService'
import UserPersonalService from '@/service/User/UserPersonalService'

@Component({
  components: {
    [Image.name]: Image,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  }
})
export default class ViewUserPersonalIndex extends Vue {
  private UserPersonalService = UserPersonalService
  private UserService = UserService

  private gotoUserInfo () {
    //
  }
}
</script>
