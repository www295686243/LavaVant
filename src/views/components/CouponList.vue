<template>
  <div class="CouponList">
    <ListContainer :onLoad="onLoad" ref="listElement">
      <template v-slot="{ v }">
        <div class="coupon-item" @click="handleClick(v)">
          <div class="item-left">
            <div>
              <h2>{{v.amount}}</h2>
              <h3>{{v.display_name}}</h3>
            </div>
          </div>
          <div class="item-right">
            <!-- <p class="title">{{v.amount}}元{{v.display_name}}</p> -->
            <p class="desc">说明：{{v.desc}}</p>
            <p class="time">截止日期：{{v.end_at}}</p>
            <!-- <p class="sell van-ellipsis">出售人：文身断发逻辑梳理副驾驶的副驾驶的副驾驶的</p> -->
          </div>
          <div class="item-action" v-if="select">
            <van-icon name="checked" v-if="v.active" />
            <van-icon name="circle" v-else />
          </div>
          <span class="tag" :class="{ bind: v.is_trade === 0 }" v-if="select === false">{{v.is_trade > 0 ? '可交易' : '绑定'}}</span>
        </div>
      </template>
    </ListContainer>
    <van-submit-bar :button-text="buttonText" @submit="handleSubmit" class="footer-action" v-if="select">
      <Checkbox v-model="isAllChecked" checkedColor="#ee0a24">全选</Checkbox>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { SubmitBar } from 'vant'
import Checkbox from '@/components/Form/Base/Checkbox.vue'

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

  @Prop({ default: false })
  select!: boolean

  @Prop({ default: false })
  market!: boolean

  @Prop({ default: '提交' })
  buttonText!: string

  @Watch('isAllChecked')
  onIsAllChecked (val: boolean) {
    this.listElement.toggleSelectAll(val)
  }

  private isAllChecked = false

  private handleSubmit () {
    return this.onSubmit()
  }

  private handleClick (v: { active: boolean }) {
    v.active = !v.active
  }

  private getSelectedIds () {
    return this.listElement.getSelectedIds()
  }

  private getSelectedItem () {
    return this.listElement.getSelectedItem()
  }

  private reload () {
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
