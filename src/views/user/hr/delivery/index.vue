<template>
  <PageContainer class="view-user-hr-delivery">
    <ListContainer :onLoad="handleLoad">
      <template v-slot="{ v }">
        <van-cell class="box" clickable @click="handleGotoInfo(v)">
          <h5 class="van-multi-ellipsis--l2">{{v.receive_info.title}}</h5>
          <div class="info">
            <p>公司名称：{{v.receive_info.company_name | empty}}</p>
          </div>
          <div class="info">
            <p :class="['info_status_color' + v.receive_info.status]">状态：{{HrJobService.getStatusLabel(v.receive_info.status)}}</p>
            <p>截止日期：{{v.receive_info.end_time}}</p>
          </div>
        </van-cell>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import InfoDeliveryService from '@/service/Info/InfoDeliveryService'
import RouterService from '@/service/RouterService'
import HrJobService from '@/service/User/Info/HrJobService'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ViewUserHrDelivery'
})
export default class ViewUserHrDelivery extends Vue {
  private HrJobService = HrJobService

  private handleLoad (page: number) {
    return InfoDeliveryService.index({
      page,
      type: 'send',
      receive_info_type: HrJobService.name
    })
  }

  private handleGotoInfo (v: { receive_info: { id: string } }) {
    RouterService.push('/hr/job/show', { id: v.receive_info.id, source: 'delivery' })
  }
}
</script>

<style lang="less">
.view-user-hr-delivery {
  .box {
    h5 {
      padding-bottom: 4px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      color: #666;
      p {
        font-size: 12px;
      }
    }
    .reason {
      color: #1989fa
    }
    .info_status_color0 {
      color: #ff976a;
    }
    .info_status_color1 {
      color: #07c160;
    }
    .info_status_color2 {
      color: #999;
    }
    .info_status_color3 {
      color: #999;
    }
  }
}
</style>
