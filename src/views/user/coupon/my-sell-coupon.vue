<template>
  <PageContainer class="view-user-my-sell-coupon">
    <CouponList :onLoad="handleLoad" :onSubmit="handleSubmit" ref="couponListElement" :select="true" buttonText="撤回"></CouponList>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import CouponList from '@/views/components/CouponList.vue'
import UserCouponService from '@/service/User/UserCouponService'
import VantService from '@/service/VantService'

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
    return UserCouponService.index({ page, coupon_status: UserCouponService.getOptionsValue('coupon_status', 4, '挂售中') })
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
