<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    class="PopupSelectCoupon"
    round
    @closed="close"
    close-on-popstate
    :style="{ height: '90%' }"
    closeable
    get-container="body">
    <van-nav-bar title="请选择优惠券" />
    <CouponList ref="couponListElement" :onLoad="handleLoad" :onSubmit="handleSubmit" select="single" buttonText="确定"></CouponList>
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import CouponList from '@/views/components/CouponList.vue'
import HrAbstract from '@/abstract/HrAbstract'
import { NavBar } from 'vant'

@Component({
  components: {
    CouponList,
    [NavBar.name]: NavBar
  }
})
export default class PopupSelectCoupon extends Vue {
  @Ref()
  couponListElement!: any

  @Prop()
  Service!: HrAbstract

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
    this.reject()
  }

  public destroy () {
    this.$destroy()
  }

  private handleLoad (page: number) {
    return this.Service.getUsableCoupon({ page })
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
  overflow-y: initial;
  .van-popup__close-icon--top-right {
    top: 12px;
  }
  .van-nav-bar {
    background: transparent;
  }
  .CouponList {
    padding-top: 0;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .ListContainer .List-finished, .ListContainer .List-empty {
    padding-bottom: 110px;
  }
  .van-list__loading, .van-list__finished-text, .van-list__error-text {
    line-height: 20px;
  }
}
</style>
