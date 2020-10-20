<template>
  <PageContainer class="view-hr-resume-show" :onLoad="handleLoad">
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HrResumeService from '@/service/Info/Hr/HrResumeService'
import InfoViewService from '@/service/Info/InfoViewService'
import { getModel } from '@/service/ConstService'

@Component
export default class ViewHrResumeShow extends Vue {
  private handleLoad () {
    return HrResumeService.show()
      .then(() => {
        InfoViewService.store(getModel('hrResume').model)
      })
  }
}
</script>

<style lang="less">
</style>
