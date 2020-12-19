<template>
  <PageContainer class="view-hr-resume-show" :onLoad="handleLoad">
    <van-sticky>
      <FollowAd :Service="HrResumeService"></FollowAd>
    </van-sticky>
    <div class="container main">
      <BaseInfoContainer :info="info" :Service="HrResumeService"></BaseInfoContainer>
      <DescriptionContainer :info="info" :Service="HrResumeService"></DescriptionContainer>
      <ContactsContainer v-if="info.is_pay" :info="info"></ContactsContainer>
      <ActionContainer :Service="HrResumeService" :info="info"></ActionContainer>
      <Disclaimer></Disclaimer>
    </div>
    <RecommendContainer class="container" :Service="HrResumeService"></RecommendContainer>
    <FixedHelp></FixedHelp>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HrResumeService from '@/service/Info/HrResumeService'
import RouterService from '@/service/RouterService'
import { getCityName } from '@/plugins/tools'
import Disclaimer from '@/views/hr/components/Disclaimer.vue'
import { Sticky } from 'vant'
import FollowAd from '@/views/components/FollowAd.vue'
import ActionContainer from '../components/ActionContainer.vue'
import ContactsContainer from '../components/ContactsContainer.vue'
import DescriptionContainer from '../components/DescriptionContainer.vue'
import BaseInfoContainer from '../components/BaseInfoContainer.vue'
import RecommendContainer from '../components/RecommendContainer.vue'
import FixedHelp from '@/views/components/FixedHelp.vue'
import WXService from '@/service/WXService'
import UserService from '@/service/User/UserService'

@Component({
  name: 'HrResumeShow',
  components: {
    Disclaimer,
    [Sticky.name]: Sticky,
    FollowAd,
    ActionContainer,
    ContactsContainer,
    DescriptionContainer,
    BaseInfoContainer,
    RecommendContainer,
    FixedHelp
  }
})
export default class ViewHrResumeShow extends Vue {
  private info = {
    id: RouterService.query('id'),
    user_id: '',
    title: '',
    monthly_salary_min: '',
    monthly_salary_max: '',
    is_negotiate: 0,
    education: 0,
    seniority: 0,
    treatment: '',
    treatment_input: '',
    city: '',
    end_time: '',
    contacts: '',
    phone: '',
    status: 0,
    views: 0,
    description: '',
    created_at: '',
    salary: '',
    cityFullName: '',
    is_pay: false
  }

  private HrResumeService = HrResumeService

  private handleLoad () {
    return HrResumeService.show()
      .then((res) => {
        Object.assign(this.info, res.data)
        this.info.salary = this.info.is_negotiate ? '面议' : (this.info.monthly_salary_min && this.info.monthly_salary_max ? this.info.monthly_salary_min : this.info.monthly_salary_min + '~' + this.info.monthly_salary_max)
        if (this.info.treatment_input) {
          this.info.treatment = this.info.treatment ? `${this.info.treatment},${this.info.treatment_input}` : this.info.treatment_input
        }
        this.info.cityFullName = getCityName(this.info.city)
        // 信息统计
        HrResumeService.view({ id: this.info.id, su: RouterService.query('su') })
        // 分享设置
        WXService.updateShareData({
          title: this.info.title,
          desc: this.info.description,
          link: `/hr/resume/show?id=${this.info.id}&su=${UserService.info.id}`,
          imgUrl: '/images/share-resume.png'
        })
      })
  }

  private handlePaySuccess (params: { is_pay: boolean; contacts: string; phone: string }) {
    Object.assign(this.info, params)
  }
}
</script>

<style lang="less">
.view-hr-resume-show {
  .main {
    padding: @padding-md;
  }
  .container {
    background: @white;
  }
  .container + .container {
    margin-top: @padding-md;
  }
}
</style>
