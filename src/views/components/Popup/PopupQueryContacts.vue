<template>
  <div class="PopupQueryContacts">
    <ButtonSubmit
      :onClick="handleShowPopup"
      icon="phone"
      size="small"
      plain
      round>
      查看
    </ButtonSubmit>
    <van-popup
      class="PopupQueryContacts-popup"
      v-model="isShowPopup"
      closeable
      round
      close-on-popstate
      position="bottom">
      <div class="container">
        <h2>打赏支付</h2>
        <p class="amount">3<small> 元</small></p>
        <div class="flex van-hairline--top">
          <h5 class="coupon">互助券</h5>
          <h5 class="none">暂无可用的互助券</h5>
        </div>
        <div class="flex van-hairline--top">
          <h6>完成互助任务，获得互助券</h6>
          <h6>进入互助券市场</h6>
        </div>
        <div class="btn">
          <ButtonSubmit block round :onClick="handleSubmit">确认支付</ButtonSubmit>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import UserService from '@/service/User/UserService'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PopupQueryContacts extends Vue {
  private isShowPopup = false

  private handleShowPopup () {
    this.isShowPopup = true
  }

  private handleSubmit () {
    return UserService
  }
}
</script>

<style lang="less">
.PopupQueryContacts-popup {
  .container {
    h2 {
      text-align: center;
      font-size: @font-size-md;
      padding: @padding-md 0;
    }
    .amount {
      padding: 0 0 @padding-lg;
      text-align: center;
      font-size: 28px;
      color: @orange-dark;
      small {
        font-size: @font-size-md;
        color: @gray-7;
      }
    }
    .flex {
      display: flex;
      justify-content: space-between;
      padding: @padding-md;
      h5 {
        font-size: @font-size-md;
      }
      .coupon {
        color: @text-link-color;
      }
      .none {
        color: @gray-6;
      }
      h6 {
        font-size: @font-size-sm;
        color: @blue;
      }
    }
    .btn {
      padding: @padding-md;
    }
  }
}
</style>
