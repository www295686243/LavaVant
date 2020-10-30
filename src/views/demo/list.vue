<template>
  <PageContainer>
    <ListContainer :onLoad="handleLoad">
      <template v-slot="{ v }">
        <p @click="handleClick(v)">{{v.title}}</p>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import HrResumeService from '@/service/Info/Hr/HrResumeService'
import HrJobService from '@/service/Info/Hr/HrJobService'
import { Component, Vue } from 'vue-property-decorator'
import RouterService from '@/service/RouterService'

@Component
export default class DemoList extends Vue {
  private handleLoad (page: number) {
    if (RouterService.query('type') === 'job') {
      return HrJobService.index({ page })
    } else {
      return HrResumeService.index({ page })
    }
  }

  private handleClick (v: { id: string }) {
    RouterService.push('/demo/show', { type: RouterService.query('type'), id: v.id })
  }
}
</script>

<style lang="less">
</style>
