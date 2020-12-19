<template>
  <PageContainer class="view-user-bill">
    <ListContainer :onLoad="handleLoad">
      <template v-slot="{ v }">
        <van-cell
          :value-class="v.total_amount > 0 ? 'up' : 'down'"
          :key="v.id"
          :title="v.desc"
          :value="(v.total_amount > 0 ? '+' + v.total_amount : v.total_amount) + '元'"
          :label="v.created_at"/>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import UserService from '@/service/User/UserService'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'UserBill'
})
export default class UserBill extends Vue {
  private handleLoad (page: number) {
    return UserService.getBill(page)
      .then((res) => res.data.data)
  }
}
</script>

<style lang="less">
.view-user-bill {
  .van-cell__title {
    span {
      color: #666;
    }
  }
  .van-cell__value {
    &.up {
      span {
        color: #f40;
        font-weight: bold;
      }
    }
    &.down {
      span {
        color: #333;
        font-weight: bold;
      }
    }
  }
}
</style>
