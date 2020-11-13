<template>
  <PageContainer class="view-user-share-index">
    <ListContainer :onLoad="handleLoad">
      <template v-slot="{ v }">
        <van-cell clickable @click="handleClick(v)">
          <h4 class="van-multi-ellipsis--l2">{{v.task_recordable.title}}</h4>
          <div v-for="item in v.task_rule_record" :key="item.id">
            <h5 class="info">
              <span>完成数：{{item.complete_number}}</span>
              <span>目标数：{{item.target_number}}</span>
            </h5>
            <h5 class="rewards">
              奖励：{{ getRewardCoupons(item.rewards) }}
            </h5>
          </div>
        </van-cell>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import { getRewardCoupons } from '@/service/ConstService'
import RouterService from '@/service/RouterService'
import TaskRecordService from '@/service/Task/TaskRecordService'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ViewUserShareIndex extends Vue {
  private getRewardCoupons = getRewardCoupons

  private handleLoad (page: number) {
    return TaskRecordService.shareIndex(page)
  }

  private handleClick (v: { task_recordable_type: string; task_recordable_id: string }) {
    if (v.task_recordable_type.includes('HrJob')) {
      RouterService.push('/hr/job/show', { id: v.task_recordable_id })
    } else if (v.task_recordable_type.includes('HrResume')) {
      RouterService.push('/hr/resume/show', { id: v.task_recordable_id })
    }
  }
}
</script>

<style lang="less">
.view-user-share-index {
  .info {
    color: @gray-7;
    span:not(:last-child) {
      margin-right: @padding-md;
    }
  }
  .rewards {
    color: @gray-7;
  }
  .van-cell:last-child::after {
    display: initial;
  }
}
</style>
