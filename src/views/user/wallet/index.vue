<template>
  <PageContainer class="view-user-wallet" :onLoad="handleLoad">
    <div class="amount-container">
      <div class="totoal-amount">
        <p class="title">总金额(元) <van-loading size="18px" v-if="is_loading" /></p>
        <h1>{{money}}</h1>
      </div>
      <div class="add-total-amount">
        <p class="title">累计收益(元)</p>
        <h5>{{total_earning}}</h5>
      </div>
    </div>
    <van-cell-group class="business-entra">
      <van-cell
        title="账单"
        icon="balance-list-o"
        to="/user/bill"
        is-link>
      </van-cell>
      <van-cell
        title="提现"
        icon="cash-back-record"
        to="/user/cash"
        is-link>
      </van-cell>
    </van-cell-group>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserService from '@/service/UserService'
import { Loading } from 'vant'

@Component({
  name: 'UserWallet',
  components: {
    [Loading.name]: Loading
  }
})
export default class UserWallet extends Vue {
  private money = 0
  private total_earning = 0
  private is_loading = false

  private handleLoad () {
    this.is_loading = true
    return UserService.getWallet()
      .then((res) => {
        this.money = res.data.money
        this.total_earning = res.data.total_earning
        this.is_loading = false
      })
  }
}
</script>

<style lang="less">
.view-user-wallet {
  .amount-container {
    text-align: center;
    padding: 32px 0;
    .totoal-amount {
      .title {
        font-size: 12px;
        color: #999;
        position: relative;
        display: inline-block;
        .van-loading {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(120%, -45%);
        }
      }
      h1 {
        font-size: 24px;
        color: #f40;
      }
    }
    .add-total-amount {
      margin-top: 24px;
      .title {
        font-size: 12px;
        color: #999;
      }
      h5 {
        margin-top: 4px;
        font-size: 12px;
      }
    }
  }
  .business-entra {
    .van-icon-balance-list-o {
      color: #DAA520
    }
    .van-icon-cash-back-record {
      color: #1989fa;
    }
  }
}
</style>
