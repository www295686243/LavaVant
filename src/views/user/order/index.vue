<template>
  <PageContainer class="view-order-index">
    <ListContainer :onLoad="handleLoad">
      <template v-slot="{ v }">
        <van-cell :border="false" class="User-ListData" @click="handleClick(v)">
          <h4 class="van-multi-ellipsis--l2">{{v.user_orderable.title}}</h4>
          <div class="info">
            <p>状态：<span>{{getStatusLabel(v.user_orderable_type, v.user_orderable.status)}}</span></p>
            <p>购买于：<span>{{v.paid_at}}</span></p>
          </div>
        </van-cell>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserOrderService from '@/service/User/UserOrderService'
import { getStatusLabel } from '@/service/ConstService'
import RouterService from '@/service/RouterService'

@Component
export default class ViewOrderIndex extends Vue {
  private getStatusLabel = getStatusLabel
  private handleLoad (page: number) {
    return UserOrderService.index(page)
  }

  private handleClick (v: { user_orderable_type: string; user_orderable_id: string }) {
    let path = ''
    if (v.user_orderable_type.includes('HrResume')) {
      path = '/hr/resume'
    } else if (v.user_orderable_type.includes('HrJob')) {
      path = '/hr/job'
    }
    RouterService.push(`${path}/show`, { id: v.user_orderable_id })
  }
}
</script>

<style lang="less">
.view-order-index {
  .tips {
    color: @gray-6;
    font-size: @font-size-sm;
    padding: @padding-xs;
  }
}
</style>
