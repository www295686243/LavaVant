<template>
  <div class="FooterTabBar">
    <van-tabbar class="van-hairline--top" v-model="tabbarActive" active-color="#07c160">
      <van-tabbar-item icon="wap-home-o" :to="UserService.info.current_role === 'Personal Member' ? '/hr/job' : '/hr/resume'">{{UserService.info.current_role === 'Personal Member' ? '职位' : '简历'}}</van-tabbar-item>
      <van-tabbar-item icon="apps-o" @click="handleAction('classify')">分类</van-tabbar-item>
      <van-tabbar-item icon="add" @click="handleAction('publish')">发布</van-tabbar-item>
      <van-tabbar-item icon="service-o" @click="handleAction('customer-service')">客服</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
    <van-popup
      v-model="isShowPublish"
      get-container="body"
      close-on-popstate
      position="bottom"
      round>
      <van-grid clickable :column-num="2" :border="false" icon-size="40px">
        <van-grid-item icon="/images/icon-resume.png" @click="handlePublishResume" text="发布简历" />
        <van-grid-item icon="/images/icon-job.png" @click="handlePublishJob" text="发布职位" />
      </van-grid>
      <button class="van-share-sheet__cancel" @click="isShowPublish = false">取消</button>
    </van-popup>
    <van-popup
      class="FooterTabBar-service"
      v-model="isShowCustomerService"
      close-on-popstate
      closeable
      get-container="body">
      <div class="service-img"><img src="@/assets/images/yuancaokf.jpg" alt="原草网客服" width="240" height="240"></div>
      <p class="service-text">微信客服：yuancaokf</p>
    </van-popup>
    <van-share-sheet
      @select="handleClassifySelect"
      get-container="body"
      :lock-scroll="false"
      v-model="isShowClassify"
      title="分类"
      :options="classifyOptions"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  Grid,
  GridItem,
  Tabbar,
  TabbarItem,
  ShareSheet
} from 'vant'
import RouterService from '@/service/RouterService'
import UserPersonalService from '@/service/User/UserPersonalService'
import UserEnterpriseService from '@/service/User/UserEnterpriseService'
import UserService from '@/service/User/UserService'

@Component({
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [ShareSheet.name]: ShareSheet
  }
})
export default class FooterTabBar extends Vue {
  private isShowPublish = false
  private isShowCustomerService = false
  private isShowClassify = false
  private tabbarActive = 0
  private classifyOptions = [
    {
      name: '职位',
      icon: '/images/icon-job.png'
    },
    {
      name: '简历',
      icon: '/images/icon-resume.png'
    },
    {
      name: '互助券交易',
      icon: '/images/icon-coupon.png'
    },
    {
      name: '互助任务',
      icon: '/images/icon-task-hall.png'
    }
  ]

  private UserService = UserService

  private handleAction (action: string) {
    if (action === 'publish') {
      this.isShowPublish = true
    } else if (action === 'customer-service') {
      this.isShowCustomerService = true
    } else if (action === 'classify') {
      this.isShowClassify = true
    }
  }

  private handleClassifySelect (select: any) {
    if (select.name === '简历') {
      RouterService.push('/hr/resume')
    } else if (select.name === '职位') {
      RouterService.push('/hr/job')
    } else if (select.name === '互助券交易') {
      RouterService.push('/coupon-market')
    } else if (select.name === '互助任务') {
      RouterService.push('/task-hall')
    }
  }

  private handlePublishResume () {
    return UserPersonalService.checkBaseInfo()
      .then(() => {
        RouterService.push('/user/hr/resume/form')
      })
  }

  private handlePublishJob () {
    return UserEnterpriseService.checkBaseInfo()
      .then(() => {
        RouterService.push('/user/hr/job/form')
      })
  }

  created () {
    this.tabbarActive = location.href.includes('/user') ? 4 : 0
  }
}
</script>

<style lang="less">
.FooterTabBar {
  padding-top: 50px;
  .van-icon-add {
    color: #ee0a24;
  }
  .submit-btn {
    height: initial;
    margin: 5px 0;
    width: 140px;
    line-height: initial;
  }
}
.FooterTabBar-service {
  .service-img {
    padding: 10px;
  }
  .service-text {
    text-align: center;
    padding-bottom: 15px;
  }
  .van-popup__close-icon--top-right {
    top: 6px;
    right:6px;
  }
}
</style>
