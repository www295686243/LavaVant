<template>
  <PageContainer class="view-user-index">
    <component :is="roleComponent"></component>
    <van-cell-group class="user-entra">
      <van-cell title="联系记录" to="/user/order" icon-prefix="zz-icon" icon="lianxi" is-link />
      <van-cell title="我的分享" to="/user/share" icon-prefix="zz-icon" icon="fenxiang" is-link />
      <van-cell title="任务大厅" to="/task-hall" icon-prefix="zz-icon" icon="renwu" is-link />
      <van-cell title="邀请" to="/user/invite" icon-prefix="zz-icon" icon="yaoqing" is-link />
    </van-cell-group>
    <van-cell-group class="user-other">
      <van-cell title="使用帮助" to="/other/help" icon-prefix="zz-icon" icon="bangzhu" is-link />
      <van-cell title="设置" to="/user/setup" icon-prefix="zz-icon" icon="shezhi" is-link />
    </van-cell-group>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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
  private UserService = UserService
  private roleComponent = ''

  created () {
    this.roleComponent = UserService.hasRole('Enterprise Member') ? 'Enterprise' : 'Personal'
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
  .user-entra {
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
}
</style>
