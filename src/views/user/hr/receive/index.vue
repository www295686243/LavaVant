<template>
  <PageContainer class="view-user-hr-receive">
    <ListContainer :onLoad="handleLoad">
      <template v-slot="{ v }">
        <van-cell class="box" clickable @click="handleGotoInfo(v)">
          <h5 class="van-multi-ellipsis--l2">{{v.send_info.title}}</h5>
          <div class="info">
            <p>联系人：{{v.send_info.contacts}}</p>
          </div>
          <div class="info">
            <p :class="['info_status_color' + v.send_info.status]">状态：{{HrResumeService.getStatusLabel(v.send_info.status)}}</p>
            <p>截止日期：{{v.send_info.end_time}}</p>
          </div>
        </van-cell>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import InfoDeliveryService from '@/service/Info/InfoDeliveryService'
import RouterService from '@/service/RouterService'
import HrResumeService from '@/service/User/Info/HrResumeService'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ViewUserHrReceive'
})
export default class ViewUserHrReceive extends Vue {
  private HrResumeService = HrResumeService

  private handleLoad (page: number) {
    return InfoDeliveryService.index({
      page,
      type: 'receive',
      send_info_type: HrResumeService.name
    })
  }

  private handleGotoInfo (v: { send_info: { id: string } }) {
    RouterService.push('/hr/resume/show', { id: v.send_info.id, source: 'delivery' })
  }
}
</script>

<style lang="less">
.view-user-hr-receive {
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
