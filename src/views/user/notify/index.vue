<template>
  <PageContainer class="view-user-notify" :onLoad="handleLoad">
    <ListContainer :onLoad="handleListLoad">
      <template v-slot="{ v }">
        <div class="list-item" @click="handleLink(v)">
          <van-cell
            :title="v.title"
            :label="v.content"
            :border="false" />
          <van-cell
            class="keywords"
            :title="v.keyword_names[key] + '：'"
            :value="item"
            v-for="(item, key) in v.keywords"
            :key="key"
            :border="false" />
          <van-cell
            class="remark"
            title="备注："
            :value="v.remark"
            :border="false" />
          <van-cell
            class="link"
            title="查看详情"
            :value="v.created_at"
            is-link
            :border="false" />
        </div>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RouterService from '@/service/RouterService'
import NotifyService from '@/service/NotifyService'

interface ListItem {
  url: string;
  url_params: { [key: string]: string };
}

@Component
export default class UserNotify extends Vue {
  private handleLoad () {
    return Promise.resolve()
      .then(() => {
        NotifyService.checkMarkHaveRead()
      })
  }

  private handleListLoad (page: number) {
    return NotifyService.index(page)
  }

  private handleLink (v: ListItem) {
    RouterService.push(v.url, v.url_params || {})
  }
}
</script>

<style lang="less">
.view-user-notify {
  .list-item {
    background: @white;
    border: 1px solid @border-color;
    border-radius: 4px;
    margin: 8px 16px;
    .van-cell {
      padding: 8px 12px;
      background-color: transparent;
    }
    .keywords,
    .remark {
      padding: 0 12px;
      font-size: @font-size-sm;
      margin-top: 4px;
      .van-cell__title {
        width: 70px;
        flex: 0 0 auto;
        line-height: 1.5;
      }
      .van-cell__value {
        line-height: 1.5;
        text-align: left;
      }
    }
    .remark {
      .van-cell__value {
        color: #1775CC;
        white-space: pre-line;
      }
    }
    .link {
      margin-top: 8px;
      border-top: 1px solid @border-color;
      padding: 4px 6px 4px 12px;
    }
  }
  .time {
    margin-top: 4px;
  }
  .query {
    margin-top: 4px;
    color: @gray-7;
  }
}
</style>
