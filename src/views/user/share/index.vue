<template>
  <PageContainer class="view-user-share-index">
    <ListContainer :onLoad="handleLoad">
      <template v-slot="{ v }">
        <van-cell>
          <h4 class="van-multi-ellipsis--l2">{{v.task_recordable.title}}</h4>
          <h5 class="info">
            <span>完成数：1</span>
            <span>目标数：1</span>
          </h5>
          <h5 class="rewards">
            奖励：互助券1张
          </h5>
        </van-cell>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import TaskRecordService from '@/service/Task/TaskRecordService'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ViewUserShareIndex extends Vue {
  private handleLoad (page: number) {
    return TaskRecordService.shareIndex(page)
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
}
</style>
