<template>
  <PageContainer class="view-user-select-coupon">
    <CouponList ref="couponListElement" :onLoad="handleLoad" :onSubmit="handleSubmit" select="single" buttonText="确定"></CouponList>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import CouponList from '@/views/components/CouponList.vue'
import UserCouponService from '@/service/User/UserCouponService'
import RouterService from '@/service/RouterService'
import EventService from '@/service/EventService'

@Component({
  name: 'UserSelectCoupon',
  components: {
    CouponList
  }
})
export default class UserSelectCoupon extends Vue {
  @Ref()
  couponListElement!: any

  private handleLoad (page: number) {
    return UserCouponService.getUsableCoupon({ page, _model: RouterService.query('_model') })
  }

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        const coupons = this.couponListElement.getSelectedItem()
        if (coupons.length === 0) {
          return Promise.reject(new Error('请至少选择一张互助券'))
        }
        EventService.emit('QueryContact-use-coupon', coupons[0])
        RouterService.go(-1)
      })
  }
}
</script>

<style lang="less">
.view-user-select-coupon {
}
</style>
