<template>
  <PageContainer class="view-user-my-sell-coupon">
    <CouponList :onLoad="handleLoad" :onSubmit="handleSubmit" ref="couponListElement" select="multiple" buttonText="撤回" :mySell="true"></CouponList>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import CouponList from '@/views/components/CouponList.vue'
import UserCouponService from '@/service/User/UserCouponService'
import VantService from '@/service/VantService'
import CouponMarketService from '@/service/Coupon/CouponMarketService'
import UserService from '@/service/User/UserService'

@Component({
  name: 'UserMySellCoupon',
  components: {
    CouponList
  }
})
export default class UserMySellCoupon extends Vue {
  @Ref()
  couponListElement!: any

  private handleLoad (page: number) {
    return CouponMarketService.index({ page, sell_user_id: UserService.info.id })
      .then((res) => {
        if (res && res.data && res.data.data) {
          res.data.data = res.data.data.map((item: any) => {
            return {
              ...item,
              display_name: item.user_coupon.display_name,
              sell_amount: item.amount,
              amount: item.user_coupon.amount,
              desc: item.user_coupon.desc,
              active: false
            }
          })
        }
        return res
      })
  }

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        const couponIds = this.couponListElement.getSelectedIds()
        if (couponIds.length === 0) {
          return Promise.reject(new Error('请至少选择一张通用券'))
        }
        return VantService.confirm('您真的要撤回吗？')
          .then(() => UserCouponService.recall(couponIds))
          .then((res) => {
            this.couponListElement.reload()
            return res
          })
      })
  }
}
</script>

<style lang="less">
.view-user-my-sell-coupon {
}
</style>
