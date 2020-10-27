<template>
  <PageContainer>
    <CouponList :onLoad="handleLoad" :onSubmit="handleSubmit" :select="true" ref="couponListElement"></CouponList>
    <van-popup
      getContainer="body"
      v-model="isShowImportAmount"
      round
      closeable
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
import VantService from '@/service/VantService'

@Component({
  components: {
    CouponList
  }
})
export default class DemoCouponList extends Vue {
  @Ref()
  couponListElement!: any

  @Ref()
  formElement!: any

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
        if (couponItems.length > 0) {
          this.isShowImportAmount = true
        } else {
          VantService.toast.fail('请至少选择一张通用券')
        }
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
.dialog-user-coupon-import-amount {
  width: 70%;
  padding: @padding-md;
  h2 {
    text-align: center;
    font-size: @font-size-lg;
  }
  .message {
    text-align: center;
    font-size: @font-size-sm;
    padding: @padding-xs 0 @padding-md;
    color: @gray-7;
  }
  .FormRender {
    padding: 0 @padding-lg;
  }
  .FormInput {
    border: 1px solid @border-color;
    &:after {
      border-bottom: 0;
    }
  }
}
</style>
