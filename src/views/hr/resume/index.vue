<template>
  <PageContainer class="view-hr-resume-index">
    <ListMenu @reload="handleReload"></ListMenu>
    <ListContainer :onLoad="onLoad" ref="listElement">
      <template v-slot="{ v }">
        <ListData :v="v" @click="handleClick(v.id)"></ListData>
      </template>
    </ListContainer>
    <FixedHelp></FixedHelp>
  </PageContainer>
</template>

<script lang="ts">
import HrResumeService from '@/service/Info/Hr/HrResumeService'
import RouterService from '@/service/RouterService'
import { Component, Vue, Ref } from 'vue-property-decorator'
import ListData from '../components/ListData.vue'
import ListMenu from '../components/ListMenu.vue'
import FixedHelp from '@/views/components/FixedHelp.vue'

@Component({
  components: {
    ListData,
    ListMenu,
    FixedHelp
  }
})
export default class ViewHrResumeIndex extends Vue {
  @Ref()
  listElement!: any

  private filterParams = {}

  private onLoad (page: number) {
    return HrResumeService.index({ page, ...this.filterParams })
  }

  private handleReload (params: any) {
    this.filterParams = params
    this.listElement.reload()
  }

  private handleClick (id: string) {
    RouterService.push('/' + HrResumeService.path + '/show', { id })
  }
}
</script>

<style lang="less">
.view-hr-resume-index {
  padding-top: 44px;
}
</style>
