<template>
  <div class="PopupQueryContacts">
    <ButtonSubmit
      :onClick="handleShowPopup"
      icon="phone-o"
      size="small"
      type="default"
      plain>
      查看联系方式
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
        <div class="amount-container">
          <span class="amount" v-if="totalAmount > 0">{{totalAmount}}<small> 元</small><span class="original-amount">{{originalAmount}}元</span></span>
          <span class="free" v-else>免费查看</span>
        </div>
        <van-cell
          :to="'/user/coupon/select-coupon?model=' + model"
          class="coupon-container"
          :class="{ none: !UserCouponService.usableCouponInfo.id }"
          title="使用互助券"
          :value="UserCouponService.usableCouponInfo.display_name"
          is-link />
        <div class="flex">
          <h6>完成互助任务，获得互助券</h6>
          <h6>进入互助券市场</h6>
        </div>
        <div class="btn">
          <ButtonSubmit block round :onClick="handleSubmit">确认支付</ButtonSubmit>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="isShowOfficialAccounts"
      get-container="body"
      closeable
      position="bottom">
      <div class="QueryContact-official-accounts">
        <span>您未关注【原草互助】公众号，关注后才能查看！</span><br>
        <p>关注后，获得优先特权：获取岗位资讯推送！</p>
        <p>按行业、按地区精准推送，可设定关闭推送！</p>
        <div class="service-img"><img src="@/assets/images/yuancao.jpg" alt="原草网公众号" width="240" height="240"></div>
        <p>长按二维码关注</p>
        <p class="tips">（若已关注，还提示未关注，请取消关注，再关注即可）</p>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { getModel, getValue } from '@/service/ConstService'
import UserCouponService from '@/service/User/UserCouponService'
import UserService from '@/service/User/UserService'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PopupQueryContacts extends Vue {
  @Prop()
  model!: string

  private isShowPopup = false
  private isShowOfficialAccounts= false
  private UserCouponService = UserCouponService
  private totalAmount = 0
  private innerModel = getModel(this.model)
  private originalAmount = getValue(this.innerModel.model + '@' + 'original_amount')
  private amount = getValue(this.innerModel.model + '@' + 'amount')

  private handleShowPopup () {
    return UserService.checkBaseInfo()
      .then(() => {
        return UserService.checkOfficialAccounts()
          .catch((err) => {
            this.isShowOfficialAccounts = true
            return Promise.reject(err)
          })
      })
      .then(() => UserCouponService.getFirstUsableCoupon(this.innerModel.model))
      .then(() => {
        this.totalAmount = this.amount - UserCouponService.usableCouponInfo.amount
        this.totalAmount = this.totalAmount < 0 ? 0 : this.totalAmount
        this.isShowPopup = true
      })
  }

  private handleSubmit () {
    return Promise.resolve()
  }
}
</script>

<style lang="less">
.PopupQueryContacts {
  display: inline-block;
  .ButtonSubmit {
    display: block;
    border: 0;
    color: @text-link-color;
  }
}
.PopupQueryContacts-popup {
  .container {
    h2 {
      text-align: center;
      font-size: @font-size-md;
      padding: @padding-md 0;
    }
    .amount-container {
      padding: 0 0 @padding-lg;
      text-align: center;
      font-size: 28px;
      color: @orange-dark;
      .amount {
        position: relative;
        display: inline-block;
      }
      .free {
        font-size: @font-size-md;
      }
      small {
        font-size: @font-size-md;
        color: @gray-7;
      }
      .original-amount {
        position: absolute;
        right: 0;
        bottom: 4px;
        transform: translateX(120%);
        font-size: @font-size-sm;
        color: @gray-6;
        text-decoration: line-through;
      }
    }
    .coupon-container {
      .van-cell__title {
        color: @text-link-color;
      }
      .van-cell__value {
        color: @orange-dark;
      }
      &.none {
        .van-cell__value {
          color: @gray-6;
        }
      }
    }
    .flex {
      display: flex;
      justify-content: space-between;
      padding: @padding-md;
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
.QueryContact-official-accounts {
  padding: @padding-md;
  font-size: @font-size-md;
  line-height: 1.7;
  span {
    color: #f40;
  }
  p {
    text-align: center;
  }
  .service-img {
    text-align: center;
  }
  .tips {
    font-size: @font-size-sm;
  }
}
</style>
