<template>
  <PageContainer>
    <CouponList :onLoad="handleLoad"></CouponList>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CouponList from '@/views/components/CouponList.vue'
import UserCouponService from '@/service/User/UserCouponService'

@Component({
  components: {
    CouponList
  }
})
export default class DemoCouponList extends Vue {
  private handleLoad (page: number) {
    return UserCouponService.index({ page })
  }
}
</script>

<style lang="less">
</style>
