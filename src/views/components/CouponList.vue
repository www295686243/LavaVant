<template>
  <div class="CouponList">
    <ListContainer :onLoad="onLoad" ref="listElement" emptyText="暂无任何互助券">
      <template v-slot="{ v }">
        <div class="coupon-item" @click="handleClick(v)">
          <div class="item-left">
            <div v-if="market || mySell">
              <h2>{{v.sell_amount}}</h2>
              <h3>售价</h3>
            </div>
            <div v-else>
              <h2>{{v.amount}}</h2>
              <h3>{{v.display_name}}</h3>
            </div>
          </div>
          <div class="item-right">
            <p class="title" v-if="market || mySell">{{v.amount}}元{{v.display_name}}</p>
            <p class="desc">说明：{{v.desc}}</p>
            <p class="time">截止日期：{{v.end_at}}</p>
            <p class="sell van-ellipsis" v-if="market">出售人：{{v.sell_user.nickname}}</p>
          </div>
          <div class="item-action" v-if="select">
            <van-icon name="checked" v-if="v.active" />
            <van-icon name="circle" v-else />
          </div>
          <span class="tag" :class="{ bind: v.is_trade === 0 }" v-if="!select">{{v.is_trade > 0 ? '可交易' : '绑定'}}</span>
        </div>
      </template>
    </ListContainer>
    <van-submit-bar
      :price="totalAmount"
      :button-text="buttonText"
      @submit="handleSubmit"
      class="footer-action van-hairline--top"
      :loading="submitLoading"
      v-if="select">
      <slot name="tip" slot="tip"></slot>
      <Checkbox v-model="isAllChecked" checkedColor="#ee0a24" v-if="select === 'multiple'">全选</Checkbox>
      <span v-else></span>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { SubmitBar } from 'vant'
import Checkbox from '@/components/Form/Base/Checkbox.vue'
import { PromiseResult } from '@/plugins/axios'
import VantService from '@/service/VantService'

@Component({
  components: {
    [SubmitBar.name]: SubmitBar,
    Checkbox
  }
})
export default class ViewCouponList extends Vue {
  @Ref()
  listElement!: any

  @Prop({ default: () => () => Promise.resolve() })
  onLoad!: Function

  @Prop({ default: () => () => Promise.resolve() })
  onSubmit!: Function

  // single/multiple
  @Prop()
  select!: string

  @Prop({ default: false })
  market!: boolean

  @Prop({ default: false })
  mySell!: boolean

  @Prop({ default: '提交' })
  buttonText!: string

  @Watch('isAllChecked')
  onIsAllChecked (val: boolean) {
    this.listElement.toggleSelectAll(val)
    this.computeTotalAmount()
  }

  private isAllChecked = false
  private totalAmount = this.market ? 0 : null
  private submitLoading = false

  private handleClick (v: { active: boolean }) {
    if (this.select === 'single') {
      this.listElement.singleToggle(v)
    } else if (this.select === 'multiple') {
      this.listElement.toggle(v)
    }
    this.computeTotalAmount()
  }

  private handleSubmit () {
    this.submitLoading = true
    return this.onSubmit()
      .then((res: PromiseResult) => {
        if (res && res.message) {
          VantService.toast.success(res.message)
        }
        this.submitLoading = false
      })
      .catch((res: PromiseResult) => {
        if (res && res.message) {
          VantService.toast.fail(res.message)
        }
        this.submitLoading = false
      })
  }

  private computeTotalAmount () {
    if (this.market) {
      const totalAmount = this.getSelectedItem()
        .reduce((acc: number, res: any) => {
          acc += res.sell_amount
          return acc
        }, 0)
      this.totalAmount = totalAmount * 100
    }
  }

  private getSelectedIds () {
    return this.listElement.getSelectedIds()
  }

  private getSelectedItem () {
    return this.listElement.getSelectedItem()
  }

  private reload () {
    this.isAllChecked = false
    this.totalAmount = this.market ? 0 : null
    return this.listElement.reload()
  }
}
</script>

<style lang="less">
.CouponList {
  padding: @padding-md;
  .coupon-item {
    background: @white;
    display: flex;
    position: relative;
    box-shadow: @coupon-box-shadow;
    margin-bottom: @padding-md;
    border-radius: 8px;
    .item-left {
      flex: 0 0 auto;
      text-align: center;
      padding: @padding-md @padding-sm @padding-md @padding-base * 5;
      border-right: 1px dashed @border-color;
      display: flex;
      align-items: center;
      h2 {
        font-size: 24px;
        color: @red;
      }
      h3 {
        font-size: @font-size-md;
      }
    }
    .item-right {
      flex: 1 1 0;
      padding: @padding-md @padding-md @padding-md @padding-sm;
      min-width: 0;
      .title {
        color: @text-color;
        font-size: @font-size-md;
      }
      .desc {
        margin-top: @padding-base;
        color: @gray-7;
        font-size: @font-size-sm;
      }
      .time {
        margin-top: @padding-base;
        color: @gray-7;
        font-size: @font-size-sm;
      }
      .sell {
        margin-top: @padding-base;
        color: @gray-8;
        font-size: @font-size-sm;
      }
    }
    .item-action {
      flex: 0 0 auto;
      padding: @padding-md @padding-base * 5 @padding-md 0;
      font-size: 20px;
      display: flex;
      align-items: center;
      .van-icon-circle {
        color: @gray-5;
      }
      .van-icon-checked {
        color: @red;
      }
    }
    .tag {
      position: absolute;
      right: @padding-base;
      bottom: @padding-base;
      font-size: @font-size-sm;
      color: @orange-dark;
      &.bind {
        color: @gray-6;
      }
    }
    &:before,
    &:after {
      content: ' ';
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      background: #f8f8f8;
    }
    &:before {
      left: -12px;
      box-shadow: inset -1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    }
    &:after {
      right: -12px;
      box-shadow: inset 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    }
  }
  .footer-action {
    .van-submit-bar__bar {
      justify-content: space-between;
    }
  }
}
</style>
