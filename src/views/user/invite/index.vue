<template>
  <PageContainer class="view-user-invite-list">
    <ListContainer :onLoad="handleLoad">
      <template v-slot="{ v }">
        <van-cell :title="v.nickname" :class="{ register: !!v.register_at }" :value="v.register_at ? '已注册' : '未注册'" :label="'邀请时间：' + v.created_at" />
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import UserService from '@/service/User/UserService'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UserInvite extends Vue {
  private handleLoad (page: number) {
    return UserService.getInviteList(page)
  }
}
</script>

<style lang="less">
.view-user-invite-list {
  .van-cell__value {
    flex: 0 0 auto;
  }
  .register {
    .van-cell__value {
      color: @orange;
    }
  }
}
</style>
