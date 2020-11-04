<template>
  <PageContainer class="view-user-select-coupon">
    <CouponList :onLoad="handleLoad"></CouponList>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CouponList from '@/views/components/CouponList.vue'
import UserCouponService from '@/service/User/UserCouponService'
import RouterService from '@/service/RouterService'
import { getModel } from '@/service/ConstService'

@Component({
  name: 'UserSelectCoupon',
  components: {
    CouponList
  }
})
export default class UserSelectCoupon extends Vue {
  private handleLoad (page: number) {
    return UserCouponService.getUsableCoupon({ page, _model: getModel(RouterService.query('model')).model })
  }
}
</script>

<style lang="less">
.view-user-select-coupon {
}
</style>
