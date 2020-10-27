<template>
  <PageContainer class="view-user-my-coupon">
    <SwiperTabMenu v-model="coupon_template_id" :data="couponList"></SwiperTabMenu>
    <CouponList :onLoad="handleLoad" ref="couponListElement"></CouponList>
    <div class="fixed-sell-entra">
      <van-button plain type="info" @click="RouterService.push('/user/coupon/sell-coupon')"><van-icon name="after-sale" />出售</van-button>
    </div>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from 'vue-property-decorator'
import SwiperTabMenu from '@/views/components/SwiperTabMenu.vue'
import CouponList from '@/views/components/CouponList.vue'
import cache from '@/plugins/cache'
import UserCouponService from '@/service/User/UserCouponService'
import RouterService from '@/service/RouterService'

@Component({
  name: 'UserMyCoupon',
  components: {
    SwiperTabMenu,
    CouponList
  }
})
export default class UserMyCoupon extends Vue {
  @Ref()
  couponListElement!: any

  private RouterService = RouterService
  private couponList = cache.config.get('coupon_template')
  private coupon_template_id = ''

  @Watch('coupon_template_id')
  onReload () {
    this.couponListElement.reload()
  }

  private handleLoad (page: number) {
    return UserCouponService.index({ page, coupon_template_id: this.coupon_template_id })
  }
}
</script>

<style lang="less">
.view-user-my-coupon {
  .CouponList {
    padding-top: 60px;
  }
  .fixed-sell-entra {
    position: fixed;
    right: 0;
    bottom: 30%;
    .van-button {
      width: 30px;
      height: auto;
      line-height: 1.4;
      padding: 5px 0 5px 2px;
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }
}
</style>
