<template>
  <PageContainer class="view-hr-job-show" :onLoad="handleLoad">
    <van-sticky>
      <FollowAd :model="model"></FollowAd>
    </van-sticky>
    <div class="container main">
      <div class="base-info-container">
        <div class="title-container">
          <h2>{{info.title}}</h2>
          <ShareGuide size="mini" icon="share-o" plain></ShareGuide>
        </div>
        <div class="position">
          <span class="light">{{info.salary}}</span> / {{HrJobService.getOptionsLabel('seniority', info.seniority)}} / {{HrJobService.getOptionsLabel('education', info.education)}} / {{info.recruiter_number}}人
        </div>
        <div class="position tags">职位诱惑：{{info.treatment}}</div>
        <van-icon class-prefix="zz-icon" name="yijiejue" v-if="info.status === HrJobService.getStatusValue(2, '已解决')" />
        <van-icon class-prefix="zz-icon" name="yixiajia" v-else-if="info.status === HrJobService.getStatusValue(3, '已下架')" />
        <van-icon class-prefix="zz-icon" name="yidaoqi" v-else-if="info.status === HrJobService.getStatusValue(4, '已到期')" />
      </div>
      <div class="enterprise-container">
        <h3 class="title">企业信息</h3>
        <h4 v-if="info.company_name">{{info.company_name}}</h4>
        <h5>地址：{{info.cityFullName}}</h5>
      </div>
      <div class="job-info-container">
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
      <div class="contacts-container" v-if="info.is_pay">
        <h3 class="title">联系方式</h3>
        <h5><span class="text-color-label">联系人：</span><span class="text-color-value">{{ info.contacts | empty }}</span></h5>
        <h4><span class="text-color-label">联系电话：</span><a :href="'tel:' + info.phone" class="text-color-click">{{ info.phone | empty }}</a></h4>
      </div>
      <div class="action-container">
        <template v-if="info.status === HrJobService.getStatusValue(1, '已发布')">
          <PopupInfoComplaint :Service="HrJobService" v-if="info.is_pay"></PopupInfoComplaint>
          <template v-else>
            <PopupInfoDelivery
              v-if="!isSelfPublish"
              send_info_type="hrResume"
              :receive_info_type="model"
              :receive_info_id="info.id" />
            <PopupQueryContacts :Service="HrJobService" v-if="!isSelfPublish" @pay="handlePaySuccess" />
          </template>
        </template>
        <ButtonSubmit
          v-if="isSelfPublish"
          icon="manager-o"
          plain
          size="small"
          round
          :onClick="() => RouterService.push('/user/hr/job')">
          进入职位管理
        </ButtonSubmit>
      </div>
      <Disclaimer></Disclaimer>
    </div>
    <div class="container recommend-container">
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
import { Sticky } from 'vant'
import FollowAd from '@/views/components/FollowAd.vue'
import UserService from '@/service/User/UserService'
import PopupInfoComplaint from '@/views/components/Popup/PopupInfoComplaint.vue'

@Component({
  components: {
    PopupQueryContacts,
    PopupInfoDelivery,
    ListData,
    Disclaimer,
    ShareGuide,
    [Sticky.name]: Sticky,
    FollowAd,
    PopupInfoComplaint
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
    cityFullName: '',
    is_pay: false
  }

  private recommendList = []
  private HrJobService = HrJobService
  private model = 'hrJob'
  private isSelfPublish = false
  private RouterService = RouterService

  private handleLoad () {
    return HrJobService.show()
      .then((res) => {
        Object.assign(this.info, res.data)
        this.info.salary = this.info.is_negotiate ? '面议' : (this.info.monthly_salary_min && this.info.monthly_salary_max ? this.info.monthly_salary_min : this.info.monthly_salary_min + '~' + this.info.monthly_salary_max)
        if (this.info.treatment_input) {
          this.info.treatment = this.info.treatment ? `${this.info.treatment},${this.info.treatment_input}` : this.info.treatment_input
        }
        this.info.cityFullName = getCityName(this.info.city, '') + (this.info.address || '')
        this.isSelfPublish = UserService.info.id === this.info.user_id
        // 信息统计
        InfoViewService.store(getModel(this.model).model)
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
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    margin-bottom: @padding-base;
  }
  .base-info-container {
    position: relative;
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
    .position {
      margin-top: @padding-xs;
      font-size: @font-size-md;
      color: @gray-7;
      &.tags {
        color: @gray-6;
      }
    }
    .light {
      color: @orange-dark;
    }
    .zz-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 70px;
      color: @orange;
    }
  }

  .enterprise-container {
    margin-top: @padding-lg;
    line-height: 1.7;
    h4 {
      color: @gray-7;
    }
    h5 {
      color: @gray-6;
    }
  }

  .job-info-container {
    margin-top: @padding-lg;
    line-height: 1.7;
    .views-container {
      color: @gray-7;
    }
    .icon-views {
      vertical-align: -2px;
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
  }

  .action-container {
    margin-top: @padding-lg;
    display: flex;
    align-items: center;
  }

  .contacts-container {
    margin-top: @padding-lg;
    line-height: 1.7;
  }

  .recommend-container {
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
}
</style>
