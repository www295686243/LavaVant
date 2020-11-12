<template>
  <PageContainer class="view-user-index">
    <component :is="roleComponent"></component>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import UserService from '@/service/User/UserService'
import Enterprise from './components/enterprise.vue'
import Personal from './components/personal.vue'

@Component({
  components: {
    Enterprise,
    Personal
  }
})
export default class ViewUserIndex extends Vue {
  @Watch('UserService.info.current_role')
  onCurrentRole (val: string) {
    this.switchRole(val)
  }

  private UserService = UserService
  private roleComponent = ''

  private switchRole (role: string) {
    this.roleComponent = role === 'Enterprise Member' ? 'Enterprise' : 'Personal'
  }

  created () {
    this.switchRole(UserService.info.current_role)
  }
}
</script>

<style lang="less">
.view-user-index {
  .van-grid-item__icon {
    line-height: 1;
  }
  .van-cell__left-icon {
    font-size: 24px;
  }
  .header-container {
    background: @white;
  }
  .user-base-container {
    display: flex;
    padding-bottom: 4px;
    .user-avatar {
      padding: 15px 15px 0;
      flex: 0 0 auto;
    }
    .user-base-info {
      padding: 17px 0 0;
      flex: 1 1 0;
      p {
        color: #666;
      }
      .display-name {
        margin-top: 12px;
      }
    }
    .user-edit {
      padding: 15px 15px 0;
      flex: 0;
      display: flex;
      align-items: center;
      p {
        white-space: nowrap;
        color: @gray-7;
        line-height: 1;
      }
      .arrow {
        font-size: @font-size-lg;
        color: @gray-6;
      }
    }
  }
  .hr-container,
  .user-other,
  .user-entra,
  .user-switch {
    margin-top: @padding-md;
  }
  .van-icon-gold-coin {
    color: #ee0a24;
  }
  .zz-icon-youhuiquan {
    color: #1989fa;
  }
  .van-icon-vip-card {
    color: #ff976a;
  }
  .zz-icon-jianli,
  .zz-icon-zhaopin {
    color: #1989fa;
  }
  .zz-icon-toudi {
    color: #07c160;
  }
  .zz-icon-lianxi {
    color: #ee0a24;
  }
  .zz-icon-renwu {
    color: #FFAC59;
  }
  .zz-icon-fenxiang {
    color: #576b95;
  }
  .zz-icon-yaoqing {
    color: #ed6a0c;
  }
  .zz-icon-bangzhu {
    color: #ff976a;
  }
  .zz-icon-shezhi {
    color: @gray-7;
  }
  .zz-icon-qiehuan {
    color: @gray-6;
  }
}
</style>
