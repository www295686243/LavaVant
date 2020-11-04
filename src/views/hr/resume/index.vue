<template>
  <PageContainer class="view-hr-resume-index">
    <ListContainer :onLoad="onLoad">
      <template v-slot="{ v }">
        <ListData :v="v"></ListData>
      </template>
    </ListContainer>
  </PageContainer>
</template>

<script lang="ts">
import HrResumeService from '@/service/Info/Hr/HrResumeService'
import { Component, Vue } from 'vue-property-decorator'
import ListData from '../components/ListData.vue'

@Component({
  components: {
    ListData
  }
})
export default class ViewHrResumeIndex extends Vue {
  private onLoad (page: number) {
    return HrResumeService.index({ page })
  }
}
</script>

<style lang="less">
</style>
