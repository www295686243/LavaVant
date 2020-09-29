<template>
  <PageContainer class="view-user-cash">
    <FormRender :Service="UserCashService" :form="form" submitBtn="申请提现" :label-width="1">
      <div class="cash-input">
        <FormInput v-model="form.amount" :field="formFields.amount" />
      </div>
    </FormRender>
    <van-cell-group class="business-entra">
      <van-cell
        title="提现记录"
        icon="cash-back-record"
        to="/user/cash-log"
        is-link>
      </van-cell>
    </van-cell-group>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'
import UserCashService from '@/service/User/UserCashService'

@Component({
  name: 'UserCash'
})
export default class UserCash extends Vue {
  private form = {
    amount: ''
  }

  private UserCashService = UserCashService

  private formFields = ValidateService.genRules({
    amount: {
      prop: 'amount',
      label: ' ',
      placeholder: '请输入提现金额',
      rules: [ValidateService.required, ValidateService.money]
    }
  })
}
</script>

<style lang="less">
.view-user-cash {
  .cash-input {
    padding: 60px 20px 0;
  }
  .cash-btn {
    padding: 0 20px;
  }
  .business-entra {
    margin-top: 20px;
    .van-icon-cash-back-record {
      color: #1989fa;
    }
  }
}
</style>
