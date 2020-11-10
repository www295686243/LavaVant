<template>
  <PageContainer class="view-user-hr-resume-index">
    <van-tabs v-model="active">
      <van-tab title="已发布">
        <ListContainer :onLoad="handleLoad">
          <template v-slot="{ v }">
            <ListData :v="v" :Service="HrResumeService"></ListData>
          </template>
        </ListContainer>
      </van-tab>
      <van-tab title="待审核">
        <ListContainer :onLoad="handleLoadCheck" ref="checkListElement">
          <template v-slot="{ v }">
            <CheckListData :v="v" :Service="HrResumeService" @reload="handleReloadCheck"></CheckListData>
          </template>
        </ListContainer>
      </van-tab>
    </van-tabs>
  </PageContainer>
</template>

<script lang="ts">
import HrResumeService from '@/service/User/Info/HrResumeService'
import { Component, Ref, Vue } from 'vue-property-decorator'
import ListData from '../components/ListData.vue'
import CheckListData from '../components/CheckListData.vue'
import { Tab, Tabs } from 'vant'
import InfoCheckService from '@/service/Info/InfoCheckService'

@Component({
  components: {
    ListData,
    CheckListData,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
})
export default class ViewUserHrResumeIndex extends Vue {
  @Ref()
  checkListElement!: any

  private HrResumeService = HrResumeService
  private active = 0

  private handleLoad (page: number) {
    return HrResumeService.index({ page })
  }

  private handleLoadCheck (page: number) {
    return InfoCheckService.index({ page, _model: HrResumeService.name })
  }

  private handleReloadCheck () {
    this.checkListElement.reload()
  }
}
</script>

<style lang="less">
.view-user-hr-resume-index {
  background: #f8f8f8;
}
</style>
