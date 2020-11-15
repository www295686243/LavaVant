<template>
  <PageContainer class="view-hr-job-show" :onLoad="handleLoad">
    <van-sticky>
      <FollowAd :Service="HrJobService"></FollowAd>
    </van-sticky>
    <div class="container main">
      <BaseInfoContainer :info="info" :Service="HrJobService"></BaseInfoContainer>
      <div class="enterprise-container">
        <h3 class="title">企业信息</h3>
        <h4 v-if="info.company_name">{{info.company_name}}</h4>
        <h5>地址：{{info.cityFullName}}</h5>
      </div>
      <DescriptionContainer :info="info" :Service="HrJobService"></DescriptionContainer>
      <ContactsContainer v-if="info.is_pay" :info="info"></ContactsContainer>
      <ActionContainer :Service="HrJobService" :deliveryService="HrResumeService" :info="info"></ActionContainer>
      <Disclaimer></Disclaimer>
    </div>
    <RecommendContainer class="container" :Service="HrJobService"></RecommendContainer>
    <FixedHelp></FixedHelp>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HrJobService from '@/service/Info/Hr/HrJobService'
import { getCityName } from '@/plugins/tools'
import RouterService from '@/service/RouterService'
import Disclaimer from '@/views/hr/components/Disclaimer.vue'
import { Sticky } from 'vant'
import FollowAd from '@/views/components/FollowAd.vue'
import ActionContainer from '../components/ActionContainer.vue'
import HrResumeService from '@/service/Info/Hr/HrResumeService'
import ContactsContainer from '../components/ContactsContainer.vue'
import DescriptionContainer from '../components/DescriptionContainer.vue'
import BaseInfoContainer from '../components/BaseInfoContainer.vue'
import RecommendContainer from '../components/RecommendContainer.vue'
import FixedHelp from '@/views/components/FixedHelp.vue'

@Component({
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
export default class ViewHrJobShow extends Vue {
  private info = {
    id: RouterService.query('id'),
    user_id: '',
    title: '',
    company_name: '',
    monthly_salary_min: '',
    monthly_salary_max: '',
    is_negotiate: 0,
    recruiter_number: 0,
    education: 0,
    seniority: 0,
    treatment: '',
    treatment_input: '',
    city: '',
    address: '',
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

  private HrJobService = HrJobService
  private HrResumeService = HrResumeService

  private handleLoad () {
    return HrJobService.show()
      .then((res) => {
        Object.assign(this.info, res.data)
        this.info.salary = this.info.is_negotiate ? '面议' : (this.info.monthly_salary_min && this.info.monthly_salary_max ? this.info.monthly_salary_min : this.info.monthly_salary_min + '~' + this.info.monthly_salary_max)
        if (this.info.treatment_input) {
          this.info.treatment = this.info.treatment ? `${this.info.treatment},${this.info.treatment_input}` : this.info.treatment_input
        }
        this.info.cityFullName = getCityName(this.info.city, '') + (this.info.address || '')
        // 信息统计
        HrJobService.view({ id: this.info.id, su: RouterService.query('su') })
      })
  }

  private handlePaySuccess (params: { is_pay: boolean; contacts: string; phone: string }) {
    Object.assign(this.info, params)
  }
}
</script>

<style lang="less">
.view-hr-job-show {
  .main {
    padding: @padding-md;
  }
  .container {
    background: @white;
  }
  .container + .container {
    margin-top: @padding-md;
  }

  .enterprise-container {
    margin-top: @padding-lg;
    line-height: 1.7;
    .title {
      margin-bottom: @padding-base;
    }
    h4 {
      color: @gray-7;
    }
    h5 {
      color: @gray-6;
    }
  }
}
</style>
