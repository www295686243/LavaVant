<template>
  <PageContainer class="view-hr-job-index">
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
import HrJobService from '@/service/Info/Hr/HrJobService'
import RouterService from '@/service/RouterService'
import FixedHelp from '@/views/components/FixedHelp.vue'
import { Component, Vue, Ref } from 'vue-property-decorator'
import ListData from '../components/ListData.vue'
import ListFilter from '@/views/components/ListFilter/ListFilter.vue'

@Component({
  components: {
    ListData,
    FixedHelp,
    ListFilter
  }
})
export default class ViewHrJobIndex extends Vue {
  @Ref()
  listElement!: any

  @Ref()
  listFilterElement!: any

  private onLoad (page: number) {
    return HrJobService.index({ page, ...this.listFilterElement.form })
  }

  private handleReload () {
    this.listElement.reload()
  }

  private handleClick (id: string) {
    RouterService.push('/' + HrJobService.path + '/show', { id })
  }
}
</script>

<style lang="less">
.view-hr-job-index {
  padding-top: 44px;
}
</style>
