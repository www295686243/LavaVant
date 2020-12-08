<template>
  <PageContainer class="view-hr-resume-index">
    <ListFilter @change="handleReload" ref="listFilterElement"></ListFilter>
    <ListContainer :onLoad="onLoad" ref="listElement">
      <template v-slot="{ v }">
        <ListData :v="v" @click="handleClick(v.id)"></ListData>
      </template>
    </ListContainer>
    <FixedHelp></FixedHelp>
  </PageContainer>
</template>

<script lang="ts">
import HrResumeService from '@/service/Info/HrResumeService'
import RouterService from '@/service/RouterService'
import { Component, Vue, Ref } from 'vue-property-decorator'
import ListData from '../components/ListData.vue'
import FixedHelp from '@/views/components/FixedHelp.vue'
import ListFilter from '@/views/components/ListFilter/ListFilter.vue'

@Component({
  components: {
    ListData,
    ListFilter,
    FixedHelp
  }
})
export default class ViewHrResumeIndex extends Vue {
  @Ref()
  listElement!: any

  @Ref()
  listFilterElement!: any

  private onLoad (page: number) {
    return HrResumeService.index({ page, ...this.listFilterElement.form })
  }

  private handleReload () {
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
