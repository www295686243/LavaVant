<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    class="PopupSelectCoupon"
    round
    @closed="handleClosed"
    :style="{ height: '90%' }"
    get-container="body">
    <CouponList ref="couponListElement" :onLoad="handleLoad" :onSubmit="handleSubmit" select="single" buttonText="确定"></CouponList>
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import CouponList from '@/views/components/CouponList.vue'
import UserCouponService from '@/service/User/UserCouponService'

@Component({
  components: {
    CouponList
  }
})
export default class PopupSelectCoupon extends Vue {
  @Ref()
  couponListElement!: any

  @Prop()
  _model!: string

  private isShow = false
  private resolve!: Function
  private reject!: Function

  public open () {
    this.isShow = true
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  public close () {
    this.isShow = false
  }

  public destroy () {
    this.$destroy()
  }

  private handleLoad (page: number) {
    return UserCouponService.getUsableCoupon({ page, _model: this._model })
  }

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        const coupons = this.couponListElement.getSelectedItem()
        if (coupons.length === 0) {
          return Promise.reject(new Error('请至少选择一张互助券'))
        }
        this.resolve(coupons[0])
        this.close()
      })
  }

  private handleClosed () {
    this.reject()
  }
}
</script>

<style lang="less">
.PopupSelectCoupon {
  background: @background-color;
}
</style>
