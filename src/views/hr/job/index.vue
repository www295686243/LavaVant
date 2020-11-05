<template>
  <PageContainer class="view-hr-job-index">
    <ListMenu @reload="handleReload"></ListMenu>
    <ListContainer :onLoad="onLoad" ref="listElement">
      <template v-slot="{ v }">
        <ListData :v="v"></ListData>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import HrJobService from '@/service/Info/Hr/HrJobService'
import { Component, Vue, Ref } from 'vue-property-decorator'
import ListData from '../components/ListData.vue'
import ListMenu from '../components/ListMenu.vue'

@Component({
  components: {
    ListData,
    ListMenu
  }
})
export default class ViewHrJobIndex extends Vue {
  @Ref()
  listElement!: any

  private filterParams = {}

  private onLoad (page: number) {
    return HrJobService.index({ page, ...this.filterParams })
  }

  private handleReload (params: any) {
    this.filterParams = params
    this.listElement.reload()
  }
}
</script>

<style lang="less">
.view-hr-job-index {
  padding-top: 44px;
}
</style>
