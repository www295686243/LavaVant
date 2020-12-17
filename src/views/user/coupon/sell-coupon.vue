<template>
  <PageContainer class="view-user-sell-coupon">
    <CouponList
      :onLoad="handleLoad"
      :onSubmit="handleSubmit"
      select="multiple"
      ref="couponListElement"
      buttonText="出售">
      <p slot="tip" class="tip"><span @click="RouterService.push('/user/coupon/my-sell-coupon')">我的在售列表</span></p>
    </CouponList>
    <van-popup
      getContainer="body"
      v-model="isShowImportAmount"
      round
      closeable
      close-on-popstate
      :close-on-click-overlay="false"
      class="dialog-user-coupon-import-amount">
      <h2>挂售单价</h2>
      <p class="message">(出售成功后，平台收取10%服务费)</p>
      <FormRender :form="form" :onSubmit="handleFormSubmit" ref="formElement" :labelWidth="44">
        <FormInput v-model="form.amount" :field="formFields.amount"></FormInput>
      </FormRender>
    </van-popup>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import CouponList from '@/views/components/CouponList.vue'
import UserCouponService from '@/service/User/UserCouponService'
import CouponMarketService from '@/service/Coupon/CouponMarketService'
import ValidateService from '@/service/ValidateService'
import RouterService from '@/service/RouterService'

@Component({
  components: {
    CouponList
  }
})
export default class UserSellCoupon extends Vue {
  @Ref()
  couponListElement!: any

  @Ref()
  formElement!: any

  private RouterService = RouterService
  private isShowImportAmount = false
  private form = {
    amount: '' as number | string
  }

  private formFields = ValidateService.genRules({
    amount: {
      prop: 'amount',
      label: '售价',
      rules: [ValidateService.required, ValidateService.money, ValidateService.minNum(0.5)]
    }
  })

  private handleLoad (page: number) {
    return UserCouponService.index({
      page,
      is_trade: 1
    })
  }

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        const couponItems = this.couponListElement.getSelectedItem()
        if (couponItems.length === 0) {
          return Promise.reject(new Error('请至少选择一张通用券'))
        }
        this.isShowImportAmount = true
      })
  }

  private handleFormSubmit () {
    const couponItems = this.couponListElement.getSelectedItem()
    const couponIds = couponItems.map((res: { id: string }) => res.id)
    return Promise.resolve()
      .then(() => {
        const isExcess = couponItems.some((res: { amount: number }) => this.form.amount > res.amount)
        if (isExcess) {
          return Promise.reject(new Error('出售的定价不能超过票面价格'))
        }
      })
      .then(() => CouponMarketService.store({
        coupon_ids: couponIds,
        amount: this.form.amount as string
      }))
      .then((res) => {
        this.isShowImportAmount = false
        this.couponListElement.reload()
        return res
      })
  }
}
</script>

<style lang="less">
.view-user-sell-coupon {
  .CouponList {
    .tip {
      text-align: right;
      color: @blue;
    }
  }
}
</style>
