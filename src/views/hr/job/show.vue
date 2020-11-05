<template>
  <PageContainer class="view-hr-job-show" :onLoad="handleLoad">
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HrJobService from '@/service/Info/Hr/HrJobService'
import InfoViewService from '@/service/Info/InfoViewService'
import { getModel } from '@/service/ConstService'

@Component
export default class ViewHrJobShow extends Vue {
  private handleLoad () {
    return HrJobService.show()
      .then(() => {
        InfoViewService.store(getModel('hrJob').model)
      })
  }
}
</script>

<style lang="less">
</style>
