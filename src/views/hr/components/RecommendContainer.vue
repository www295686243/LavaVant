<template>
  <div class="RecommendContainer">
    <h3 class="recommend-title">推荐{{Service.displayName}}</h3>
    <DataRender :onLoad="handleLoad">
      <template v-if="list.length > 0">
        <ListData :v="v" v-for="v in list" :key="v.id" class="van-hairline--bottom" @click="handleClick(v.id)"></ListData>
      </template>
      <p v-else class="recommend-empty">暂无推荐信息</p>
    </DataRender>
  </div>
</template>

<script lang="ts">
import HrAbstract from '@/abstract/HrAbstract'
import RouterService from '@/service/RouterService'
import { Component, Prop, Vue } from 'vue-property-decorator'
import ListData from './ListData.vue'

@Component({
  components: {
    ListData
  }
})
export default class RecommendContainer extends Vue {
  @Prop()
  Service!: HrAbstract

  private list = []

  private handleLoad () {
    return this.Service.recommendList({ page: 1, limit: 5 })
      .then((res: any) => {
        this.list = res.data
      })
  }

  private handleClick (id: string) {
    RouterService.push('/' + this.Service.path + '/show', { id })
  }
}
</script>

<style lang="less">
.RecommendContainer {
  .recommend-title {
    margin-bottom: @padding-md;
    padding: @padding-md @padding-md 0;
  }
  .view-hr-ListData {
    .box {
      box-shadow: initial;
      margin: 0;
    }
  }
  .recommend-empty {
    text-align: center;
    padding-bottom: @padding-lg;
    color: @gray-7;
  }
}
</style>
