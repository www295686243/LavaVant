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
      position="bottom"
      get-container="body">
      <div class="container">
        <h2>打赏支付</h2>
        <div class="amount-container">
          <span class="amount" v-if="totalAmount > 0">{{totalAmount}}<small> 元</small><span class="original-amount">{{originalAmount}}元</span></span>
          <span class="free" v-else>{{freeText}}</span>
        </div>
        <van-cell
          @click="handleGotoCoupon"
          class="coupon-container"
          :class="{ none: !UserCouponService.usableCouponInfo.id }"
          title="使用互助券"
          :value="UserCouponService.usableCouponInfo.display_name"
          is-link />
        <div class="flex">
          <h6>完成互助任务，获得互助券</h6>
          <h6 @click="RouterService.push('/coupon-market')">进入互助券市场</h6>
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
    <van-popup
      v-model="isShowContacts"
      get-container="body"
      closeable
      @closed="handleClosed"
      position="bottom">
      <div class="QueryContact-contacts">
        <h2>联系电话</h2>
        <div>
          <van-button icon="phone-o" :url="'tel:' + phone">{{phone}}</van-button>
          <p>(点击可拨号)</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'
import UserCouponService from '@/service/User/UserCouponService'
import UserService from '@/service/User/UserService'
import { Component, Vue, Prop } from 'vue-property-decorator'
import PopupSelectCouponService from '@/components/Popup/PopupSelectCouponService'

interface Service extends BaseModelService {
  pay: Function;
  getContacts: Function;
}

@Component
export default class PopupQueryContacts extends Vue {
  @Prop()
  Service!: Service

  private isShowPopup = false
  private isShowOfficialAccounts= false
  private UserCouponService = UserCouponService
  private totalAmount = 0
  private originalAmount = this.Service.getValue('original_amount')
  private amount = this.Service.getValue('amount')
  private isShowContacts = false
  private phone = ''
  private freeText = ''
  private RouterService = RouterService

  private handleShowPopup () {
    return UserService.checkBaseInfo()
      .then(() => {
        return UserService.checkOfficialAccounts()
          .catch((err) => {
            this.isShowOfficialAccounts = true
            return Promise.reject(err)
          })
      })
      .then(() => {
        if (this.Service.displayName === '简历' && UserService.hasRole('Enterprise Member')) {
          return UserService.isFreeForLimitedTime(this.Service.name)
            .then(() => {
              this.amount = 0
            })
            .catch(() => Promise.resolve())
        }
      })
      .then(() => {
        if (this.amount > 0) {
          return UserCouponService.getFirstUsableCoupon(this.Service.name)
        }
      })
      .then(() => {
        this.freeText = this.amount === 0 ? '限时免费' : '免费查看'
        this.totalAmount = this.amount - UserCouponService.usableCouponInfo.amount
        this.totalAmount = this.totalAmount < 0 ? 0 : this.totalAmount
        this.isShowPopup = true
      })
  }

  private handleSubmit () {
    return this.Service.pay({ user_coupon_id: UserCouponService.usableCouponInfo.id })
      .then(() => this.Service.getContacts())
      .then((res: any) => {
        this.$emit('pay', res.data)
        this.phone = res.data.phone
        this.isShowPopup = false
        this.isShowContacts = true
        PopupSelectCouponService.destroy()
      })
  }

  private handleClosed () {
    this.$emit('pay', { is_pay: true })
  }

  private handleGotoCoupon () {
    if (this.amount > 0) {
      PopupSelectCouponService.open(this.Service.name)
        .then((res: any) => {
          UserCouponService.updateUsableCoupon(res)
        })
        .catch((err: any) => { console.log(err) })
    }
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
    padding: 0;
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
.QueryContact-contacts {
  padding-bottom: @padding-lg;
  text-align: center;
  h2 {
    font-size: @font-size-md;
    padding: @padding-md 0;
  }
  .van-button {
    font-size: 20px;
    color: @text-link-color;
    border: 0;
  }
  p {
    font-size: @font-size-sm;
    color: @gray-6;
  }
}
</style>
