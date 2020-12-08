<template>
  <PageContainer class="view-user-hr-resume-index">
    <van-tabs v-model="active">
      <van-tab title="已发布">
        <ListContainer :onLoad="handleLoad">
          <template v-slot="{ v }">
            <ListData :v="v" :Service="HrResumeService"></ListData>
          </template>
          <template>
            <van-empty slot="empty" description="暂无任何信息">
              <ButtonSubmit round :onClick="() => RouterService.push('/user/hr/resume/form')">发布简历</ButtonSubmit>
            </van-empty>
          </template>
        </ListContainer>
      </van-tab>
      <van-tab title="待审核">
        <ListContainer :onLoad="handleLoadCheck" ref="checkListElement">
          <template v-slot="{ v }">
            <CheckListData :v="v" :Service="HrResumeService" @reload="handleReloadCheck"></CheckListData>
          </template>
          <template>
            <van-empty slot="empty" description="暂无任何信息">
              <ButtonSubmit round :onClick="() => RouterService.push('/user/hr/resume/form')">发布简历</ButtonSubmit>
            </van-empty>
          </template>
        </ListContainer>
      </van-tab>
    </van-tabs>
  </PageContainer>
</template>

<script lang="ts">
import HrResumeService from '@/service/Info/HrResumeService'
import { Component, Ref, Vue } from 'vue-property-decorator'
import ListData from '../components/ListData.vue'
import CheckListData from '../components/CheckListData.vue'
import { Tab, Tabs, Empty } from 'vant'
import InfoCheckService from '@/service/Info/InfoCheckService'
import RouterService from '@/service/RouterService'

@Component({
  components: {
    ListData,
    CheckListData,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Empty.name]: Empty
  }
})
export default class ViewUserHrResumeIndex extends Vue {
  @Ref()
  checkListElement!: any

  private HrResumeService = HrResumeService
  private RouterService = RouterService
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
