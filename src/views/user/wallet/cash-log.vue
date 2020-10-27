<template>
  <PageContainer class="view-user-cash-log">
    <ListContainer :onLoad="handleLoad">
      <template v-slot="{ v }">
        <div class="list-item van-hairline--bottom">
          <p class="amount">提现金额：<span>{{v.amount}}</span>元</p>
          <p class="status">状态：<span>{{UserCashService.getStatusLabel(v.status)}}</span></p>
          <p>申请日期：{{v.created_at}}</p>
          <van-button @click="handleRecall(v)" class="button" size="small" type="warning" plain v-if="v.status === applyStatus">撤回</van-button>
        </div>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VantService from '@/service/VantService'
import UserCashService from '@/service/User/UserCashService'

@Component({
  name: 'UserCashLog'
})
export default class UserCashLog extends Vue {
  private UserCashService = UserCashService
  private applyStatus = UserCashService.getStatusValue(1, '申请中')

  private handleLoad (page: number) {
    return UserCashService.index(page)
      .then((res) => res.data.data)
  }

  private handleRecall (v: { id: string; status: number }) {
    return VantService.confirm('您真的要撤回吗？')
      .then(() => UserCashService.update(v))
      .then((res) => {
        VantService.toast.success(res.message)
        v.status = UserCashService.getStatusValue(4, '已撤回')
      })
  }
}
</script>

<style lang="less">
.view-user-cash-log {
  .van-cell__value {
    span {
      color: #f40;
    }
  }
  .list-item {
    padding: 8px 16px;
    color: #666;
    position: relative;
    background: @white;
    p {
      line-height: 2;
      font-size: 12px;
      margin: 0;
    }
    .amount {
      span {
        color: #f40;
        font-size: 18px;
      }
    }
    .status {
      span {
        color: #333;
      }
    }
    .button {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
