<template>
  <PageContainer class="view-task-hall">
    <van-cell v-for="v in list" :key="v.id">
      <h4>{{v.title}}</h4>
    </van-cell>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FollowOfficialAccount from '@/views/components/FollowOfficialAccount.vue'
import UserService from '@/service/User/UserService'
import cache from '@/plugins/cache'

@Component({
  name: 'TaskHall',
  components: {
    FollowOfficialAccount
  }
})
export default class TaskHall extends Vue {
  private list = cache.config.get('task') || []
  private isShowQrcode = false
  private isShowFollowTask = UserService.info.is_follow_official_account === 0
}
</script>

<style lang="less">
.view-task-hall {
  .tips {
    padding: @padding-xs @padding-md;
    font-size: @font-size-sm;
    color: @gray-6;
  }
}
</style>
