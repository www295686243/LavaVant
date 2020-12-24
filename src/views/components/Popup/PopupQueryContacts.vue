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
        <van-tabs v-model="payActive">
          <van-tab title="互助查看">
            <div class="amount-container">
              <div class="free" v-if="UserCouponService.usableCouponInfo.id">免费查看</div>
              <div class="none" v-else>
                <h3>暂无可用互助券</h3>
                <p>您可以：<span class="text-color-click" @click="RouterService.push('/task-hall')">做任务</span>或前往<span class="text-color-click" @click="RouterService.push('/coupon-market')">互助券市场</span></p>
              </div>
            </div>
            <van-cell
              @click="handleGotoCoupon"
              class="coupon-container"
              :class="{ none: !UserCouponService.usableCouponInfo.id }"
              title="使用互助券"
              :value="UserCouponService.usableCouponInfo.display_name"
              is-link />
            <div class="flex text-color-click">
              <h6 @click="RouterService.push('/task-hall')">完成互助任务，获得互助券</h6>
              <h6 @click="RouterService.push('/coupon-market')">进入互助券市场</h6>
            </div>
          </van-tab>
          <van-tab title="打赏支付" v-if="!UserCouponService.usableCouponInfo.id">
            <div class="amount-container">
              <span class="amount">{{amount}}<small> 元</small><span class="original-amount">{{originalAmount}}元</span></span>
            </div>
          </van-tab>
        </van-tabs>
        <div class="statement" v-if="Service.name === 'HrJob'">声明：招聘信息经客服回访确认在招才推送，具体薪资待遇、工作等需双方确认签订合同，平台不承担责任！</div>
        <div class="btn">
          <ButtonSubmit block round :onClick="handleSubmit">确认支付</ButtonSubmit>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="isShowOfficialAccounts"
      get-container="body"
      closeable
      close-on-popstate
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
      close-on-popstate
      @closed="handleClosed"
      position="bottom">
      <div class="QueryContact-contacts">
        <h2>联系电话</h2>
        <div>
          <van-button icon="phone-o" :url="'tel:' + phone">{{phone}}</van-button>
          <p>(点击可拨号)</p>
          <p class="statement">提示：联系后，如已招到，是中介，电话有误等问题，请及时投诉，客服核实后退卷或退款！</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import RouterService from '@/service/RouterService'
import UserCouponService from '@/service/User/UserCouponService'
import UserService from '@/service/User/UserService'
import { Component, Vue, Prop } from 'vue-property-decorator'
import PopupSelectCouponService from '@/components/Popup/PopupSelectCouponService'
import HrAbstract from '@/abstract/HrAbstract'
import { Tab, Tabs } from 'vant'
import cache from '@/plugins/cache'

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
})
export default class PopupQueryContacts extends Vue {
  @Prop()
  Service!: HrAbstract

  private isShowPopup = false
  private isShowOfficialAccounts= false
  private UserCouponService = UserCouponService
  private originalAmount = this.Service.getValue('original_amount')
  private amount = this.Service.getValue('amount')
  private isShowContacts = false
  private phone = ''
  private RouterService = RouterService
  private payActive = cache.other.get('payActive', 0)

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
        if (this.amount > 0) {
          return this.Service.getFirstUsableCoupon()
            .then(() => {
              if (UserCouponService.usableCouponInfo.id) {
                this.payActive = 0
              }
            })
        }
      })
      .then(() => {
        this.isShowPopup = true
      })
  }

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        if (this.payActive === 0 && !UserCouponService.usableCouponInfo.id) {
          return Promise.reject(new Error('暂无可用优惠券'))
        } else {
          return this.Service.pay({ user_coupon_id: UserCouponService.usableCouponInfo.id })
            .then((res: any) => {
              this.$emit('pay', res.data)
              this.phone = res.data.phone
              this.isShowPopup = false
              this.isShowContacts = true
              cache.other.set('payActive', this.payActive)
              PopupSelectCouponService.destroy()
            })
        }
      })
  }

  private handleClosed () {
    this.$emit('pay', { is_pay: true })
  }

  private handleGotoCoupon () {
    if (this.amount > 0) {
      PopupSelectCouponService.open(this.Service)
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
  & > .ButtonSubmit {
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
      padding: @padding-lg 0 @padding-lg;
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
      .none {
        p {
          color: @gray-7;
          margin-top: @padding-xs;
        }
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
      }
    }
    .statement {
      padding: 0 @padding-md;
      font-size: @font-size-xs;
      color: @gray-6;
    }
    .btn {
      padding: @padding-md;
    }
    .van-tabs__nav {
      padding: 0 60px 15px;
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
  .statement {
    padding: @padding-lg @padding-md 0;
  }
}
</style>
