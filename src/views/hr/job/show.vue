<template>
  <PageContainer class="view-hr-job-show" :onLoad="handleLoad" ref="pageElement">
    <van-sticky>
      <FollowAd :Service="HrJobService"></FollowAd>
    </van-sticky>
    <div class="container main">
      <BaseInfoContainer :info="info" :Service="HrJobService"></BaseInfoContainer>
      <DescriptionContainer :info="info" :Service="HrJobService"></DescriptionContainer>
      <div class="enterprise-container">
        <h3 class="title">企业信息</h3>
        <h4 v-if="info.company_name">{{info.company_name}}</h4>
        <h4>地址：{{info.cityFullName}}</h4>
        <ContactsContainer v-if="info.is_pay" :info="info" :Service="HrJobService"></ContactsContainer>
        <PopupInfoComplaint :Service="HrJobService" v-if="info.is_pay"></PopupInfoComplaint>
      </div>
      <ActionContainer :Service="HrJobService" :deliveryService="HrResumeService" :info="info"></ActionContainer>
    </div>
    <RecommendContainer class="container" :Service="HrJobService"></RecommendContainer>
    <FixedHelp></FixedHelp>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Ref, Watch } from 'vue-property-decorator'
import HrJobService from '@/service/Info/HrJobService'
import { getCityName } from '@/plugins/tools'
import RouterService from '@/service/RouterService'
import { Sticky } from 'vant'
import FollowAd from '@/views/components/FollowAd.vue'
import ActionContainer from '../components/ActionContainer.vue'
import HrResumeService from '@/service/Info/HrResumeService'
import ContactsContainer from '../components/ContactsContainer.vue'
import DescriptionContainer from '../components/DescriptionContainer.vue'
import BaseInfoContainer from '../components/BaseInfoContainer.vue'
import RecommendContainer from '../components/RecommendContainer.vue'
import FixedHelp from '@/views/components/FixedHelp.vue'
import WXService from '@/service/WXService'
import UserService from '@/service/User/UserService'
import PopupInfoComplaint from '@/views/components/Popup/PopupInfoComplaint.vue'

@Component({
  name: 'HrJobShow',
  components: {
    [Sticky.name]: Sticky,
    FollowAd,
    ActionContainer,
    ContactsContainer,
    DescriptionContainer,
    BaseInfoContainer,
    RecommendContainer,
    FixedHelp,
    PopupInfoComplaint
  }
})
export default class ViewHrJobShow extends Vue {
  @Ref()
  pageElement!: any

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

  @Watch('$route')
  onRoute () {
    this.info.id = RouterService.query('id')
    this.pageElement.reload()
  }

  private handleLoad () {
    return HrJobService.show()
      .then((res) => {
        Object.assign(this.info, res.data)
        this.info.salary = this.info.is_negotiate ? '面议' : (this.info.monthly_salary_min === this.info.monthly_salary_max ? this.info.monthly_salary_min : this.info.monthly_salary_min + '~' + this.info.monthly_salary_max)
        if (this.info.treatment_input) {
          this.info.treatment = this.info.treatment ? `${this.info.treatment},${this.info.treatment_input}` : this.info.treatment_input
        }
        this.info.cityFullName = getCityName(this.info.city, '') + (this.info.address || '')
        // 信息统计
        HrJobService.view({ id: this.info.id, su: RouterService.query('su') })
        // 分享设置
        WXService.updateShareData({
          title: this.info.title,
          desc: this.info.description,
          link: `/hr/job/show?id=${this.info.id}&su=${UserService.info.id}`,
          imgUrl: '/images/share-job.png'
        })
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
    position: relative;
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
    .PopupInfoComplaint {
      position: absolute;
      right: 0;
      top: -2px;
    }
  }
}
</style>
