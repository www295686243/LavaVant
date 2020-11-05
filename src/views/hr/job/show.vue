<template>
  <PageContainer class="view-hr-job-show" :onLoad="handleLoad">
    <div class="container main">
      <div class="title-container">
        <h2>{{info.title}}</h2>
        <ShareGuide size="mini" icon="share-o" plain></ShareGuide>
      </div>
      <div class="position"><span class="light">{{info.salary}}</span> / {{HrJobService.getOptionsLabel('seniority', info.seniority)}} / {{HrJobService.getOptionsLabel('education', info.education)}} / {{info.recruiter_number}}人</div>
      <div class="position tags">职位诱惑：{{info.treatment}}</div>
      <div class="hr-box enterprise">
        <h3 class="title">企业信息</h3>
        <h4 v-if="info.company_name">{{info.company_name}}</h4>
        <h5>地址：{{info.cityFullName}}</h5>
      </div>
      <div class="hr-box">
        <div class="flex">
          <h3 class="title">职位描述</h3>
          <h5 class="views-container"><van-icon name="eye-o" size="14px" class="icon-views" /> {{info.views}}</h5>
        </div>
        <div class="description" v-html="info.description"></div>
        <div class="flex tips-container">
          <p class="tips">打电话请说是在【原草互助】上看到</p>
          <p class="end-time">截止：{{info.end_time}}</p>
        </div>
      </div>
      <div class="hr-box">
        <PopupInfoDelivery send_info_type="hrResume" send_info_id receive_info_type="hrJob" :receive_info_id="info.id"></PopupInfoDelivery>
        <PopupQueryContacts model="hrJob"></PopupQueryContacts>
      </div>
      <Disclaimer></Disclaimer>
    </div>
    <div class="container">
      <h3 class="recommend-title">推荐职位</h3>
      <DataRender :onLoad="getRecommendList">
        <ListData :v="v" v-for="v in recommendList" :key="v.id" class="van-hairline--bottom" @click="handleClick(v.id)"></ListData>
      </DataRender>
    </div>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HrJobService from '@/service/Info/Hr/HrJobService'
import InfoViewService from '@/service/Info/InfoViewService'
import { getModel } from '@/service/ConstService'
import { getCityName } from '@/plugins/tools'
import RouterService from '@/service/RouterService'
import PopupQueryContacts from '@/views/components/Popup/PopupQueryContacts.vue'
import PopupInfoDelivery from '@/views/hr/components/PopupInfoDelivery.vue'
import ListData from '@/views/hr/components/ListData.vue'
import Disclaimer from '@/views/hr/components/Disclaimer.vue'
import ShareGuide from '@/views/components/ShareGuide.vue'

@Component({
  components: {
    PopupQueryContacts,
    PopupInfoDelivery,
    ListData,
    Disclaimer,
    ShareGuide
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
    is_other_user: 0,
    description: '',
    created_at: '',
    salary: '',
    cityFullName: ''
  }

  private recommendList = []
  private HrJobService = HrJobService

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
        InfoViewService.store(getModel('hrJob').model)
      })
  }

  private handleClick (id: string) {
    RouterService.push('/hr/job/show', { id })
  }

  private getRecommendList () {
    return HrJobService.index({ page: 1 })
      .then((res) => {
        this.recommendList = res.data.data
      })
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
    &:not(:first-child) {
      margin-top: @padding-md;
    }
  }
  .title-container {
    display: flex;
    align-items: flex-start;
    h2 {
      flex: 1 1 0;
    }
    .ShareGuide {
      flex: 0 0 auto;
      margin-left: @padding-base;
      .ButtonSubmit {
        border: 0;
      }
    }
  }
  .hr-box {
    margin-top: @padding-lg;
    line-height: 1.7;
    .views-container {
      color: @gray-7;
    }
    .icon-views {
      vertical-align: -2px;
    }
  }
  .enterprise {
    h4 {
      color: @gray-7;
    }
    h5 {
      color: @gray-6;
    }
  }
  .position {
    margin-top: @padding-xs;
    font-size: @font-size-md;
    color: @gray-7;
    &.tags {
      color: @gray-6;
    }
  }
  .description {
    font-size: @font-size-md;
    color: @gray-7;
    line-height: 1.7;
  }
  .tips-container {
    margin-top: @padding-sm;
    p {
      font-size: @font-size-sm;
    }
    .end-time {
      color: @gray-6;
    }
    .tips {
      color: @gray-7;
    }
  }
  .light {
    color: @orange-dark;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    margin-bottom: @padding-base;
  }
  .recommend-title {
    margin-bottom: @padding-md;
    padding: @padding-md @padding-md 0;
  }
  .view-hr-ListData {
    .box {
      box-shadow: initial;
      margin: 0;
    }
  }
}
</style>
