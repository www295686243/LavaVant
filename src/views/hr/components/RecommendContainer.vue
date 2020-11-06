<template>
  <div class="RecommendContainer">
    <h3 class="recommend-title">推荐{{Service.displayName}}</h3>
    <DataRender :onLoad="handleLoad">
      <ListData :v="v" v-for="v in list" :key="v.id" class="van-hairline--bottom" @click="handleClick(v.id)"></ListData>
    </DataRender>
  </div>
</template>

<script lang="ts">
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'
import { Component, Prop, Vue } from 'vue-property-decorator'
import ListData from './ListData.vue'

interface IfService extends BaseModelService {
  index: Function;
}

@Component({
  components: {
    ListData
  }
})
export default class RecommendContainer extends Vue {
  @Prop()
  Service!: IfService

  private list = []

  private handleLoad () {
    return this.Service.index({ page: 1 })
      .then((res: any) => {
        this.list = res.data.data
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
}
</style>
