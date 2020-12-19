<template>
  <PageContainer class="view-coupon-market" :onLoad="handlePageLoad">
    <CouponList
      :onLoad="handleLoad"
      :onSubmit="handleSubmit"
      ref="couponListElement"
      buttonText="购买"
      select="multiple"
      :market="true">
      <template slot="tip" v-if="unpaidOrder.quantity > 0">
        您有一笔订单正在支付有效期5分钟，是否继续？&emsp;<span class="click" @click.stop="handleUnpaidConfrim">继续支付</span>
      </template>
    </CouponList>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import CouponList from '@/views/components/CouponList.vue'
import CouponMarketService from '@/service/Coupon/CouponMarketService'
import CouponOrderService from '@/service/Coupon/CouponOrderService'
// import nicknameList from './nickname'
import VantService from '@/service/VantService'

@Component({
  name: 'CouponMarket',
  components: {
    CouponList
  }
})
export default class CouponMarket extends Vue {
  @Ref()
  couponListElement!: any

  private unpaidOrder = {
    quantity: 0,
    total_amount: 0
  }

  private handlePageLoad () {
    return CouponOrderService.checkUnpaidOrder()
      .then((res) => {
        const quantity = (res.data && res.data.quantity) || 0
        const total_amount = (res.data && res.data.total_amount) || 0
        this.unpaidOrder.quantity = quantity
        this.unpaidOrder.total_amount = total_amount
      })
  }

  private handleLoad (page: number) {
    return CouponMarketService.index({ page })
      .then((res) => {
        if (res && res.data && res.data.data) {
          res.data.data = res.data.data.map((item: any) => {
            return {
              ...item,
              display_name: item.user_coupon.display_name,
              sell_amount: item.amount,
              amount: item.user_coupon.amount,
              desc: item.user_coupon.desc,
              active: false,
              sell_user: {
                ...item.sell_user
                // nickname: nicknameList[Number(item.id.slice(-4)) % nicknameList.length]
              }
            }
          })
        }
        return res
      })
  }

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        const ids = this.couponListElement.getSelectedIds()
        if (ids.length === 0) {
          return Promise.reject(new Error('请至少选择一张券'))
        }
        return CouponOrderService.store({ ids })
      })
      .then((res) => {
        this.couponListElement.reload()
        return res
      })
      .catch((err) => {
        if (err) {
          if (err.status === 'cancel-pay') {
            return CouponOrderService.cancelUnpaidOrder()
          } else if (err.message) {
            this.couponListElement.reload()
            VantService.toast.fail(err.message)
          }
        }
      })
  }

  private handleUnpaidConfrim () {
    return VantService.confirm(`通用券：${this.unpaidOrder.quantity}张\n总金额：${this.unpaidOrder.total_amount}元`, {
      confirmButtonText: '继续支付',
      cancelButtonText: '放弃订单',
      title: '您有一笔订单正在支付，是否继续？',
      beforeClose: (action: string, done: Function) => {
        if (action === 'confirm') {
          CouponOrderService.continueUnpaidOrder()
            .then(() => {
              done()
              this.unpaidOrder.quantity = 0
              this.unpaidOrder.total_amount = 0
              VantService.toast.success('支付成功')
            })
            .catch((res) => {
              res.message && VantService.toast.fail(res.message)
              done()
            })
        } else {
          CouponOrderService.cancelUnpaidOrder()
            .then((res) => {
              this.unpaidOrder.quantity = 0
              this.unpaidOrder.total_amount = 0
              VantService.toast.success(res.message)
              this.couponListElement.reload()
              done()
            })
            .catch((res) => {
              res.message && VantService.toast.fail(res.message)
              done()
            })
        }
      }
    })
  }
}
</script>

<style lang="less">
.view-coupon-market {
  .CouponList {
    .tip {
      text-align: right;
      color: @blue;
    }
  }
  .click {
    color: @blue;
  }
}
</style>
