<template>
  <PageContainer class="view-task-hall" :onLoad="handleLoad" ref="pageElement">
    <van-cell v-for="v in list" :key="v.id" :clickable="!v.is_complete" @click="handleTask(v)">
      <div class="flex">
        <h4>{{v.title}}</h4>
        <h5 class="status" :class="{ finish: v.is_complete }">{{v.is_complete ? '已完成' : '去完成'}}</h5>
      </div>
      <div class="flex desc">
        <h5>{{v.desc}}</h5>
        <h5 v-if="v.id === 1" class="text-color-click" @click.stop="handleShareRecord">分享记录</h5>
        <h5 v-if="v.id === 8" class="text-color-click" @click.stop="handleInviteRecord">邀请记录</h5>
      </div>
    </van-cell>
    <FollowOfficialAccount v-model="isShowQrcode"></FollowOfficialAccount>
    <van-popup
      class="view-task-hall-share-popup"
      v-model="isShowSharePopup"
      round
      get-container="body">
      <van-cell v-for="v in shareTaskList" @click="handleShare(v)" :key="v.id" clickable>
        <div class="flex">
          <h4>{{v.title}}</h4>
          <h5 class="status">去完成</h5>
        </div>
        <h5 class="desc">奖励{{getRewardCoupons(v.rewards)}}</h5>
      </van-cell>
    </van-popup>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import FollowOfficialAccount from '@/views/components/FollowOfficialAccount.vue'
import UserService from '@/service/User/UserService'
import cache from '@/plugins/cache'
import { getOptionsValue, getRewardCoupons } from '@/service/ConstService'
import TaskRecordService from '@/service/Task/TaskRecordService'
import PopupRegisterService from '@/components/Popup/PopupRegister/PopupRegisterService'
import RouterService from '@/service/RouterService'
import UserPersonalService from '@/service/User/UserPersonalService'
import UserEnterpriseService from '@/service/User/UserEnterpriseService'
import VantService from '@/service/VantService'

interface TaskRecord {
  title: string;
  is_complete: number;
}

interface Rewards {
  give_number: number;
  coupon_template_id: number;
}

interface TaskRule {
  id: number;
  title: string;
  rewards: Rewards[];
}

interface Task {
  id: number;
  title: string;
  is_complete: number;
  task_rule: TaskRule[];
}

@Component({
  name: 'TaskHall',
  components: {
    FollowOfficialAccount
  }
})
export default class TaskHall extends Vue {
  @Ref()
  pageElement!: any

  private list = []
  private shareTaskList: TaskRule[] = []
  private isShowQrcode = false
  private isShowSharePopup = false
  private isShowFollowTask = UserService.info.is_follow_official_account === 0
  private getRewardCoupons = getRewardCoupons

  private getList () {
    return (cache.config.get('task') || []).filter((res: { task_type: number }) => {
      if (UserService.info.current_role === 'Enterprise Member') {
        return res.task_type === getOptionsValue('Task/Task', 'task_type', 1, '通用任务') || res.task_type === getOptionsValue('Task/Task', 'task_type', 3, '企业任务')
      } else {
        return res.task_type === getOptionsValue('Task/Task', 'task_type', 1, '通用任务') || res.task_type === getOptionsValue('Task/Task', 'task_type', 2, '个人任务')
      }
    })
  }

  private handleLoad () {
    return TaskRecordService.index()
      .then((res) => {
        const taskRecord = res.data || []
        this.list = this.getList()
          .map((item: Task) => {
            const taskRecordItem: TaskRecord = taskRecord.find((record: TaskRecord) => record.title === item.title)
            item.is_complete = taskRecordItem && taskRecordItem.is_complete ? 1 : 0
            return item
          })
          .sort((item1: Task, item2: Task) => item1.is_complete - item2.is_complete)
      })
  }

  private handleTask (v: Task) {
    if (v.is_complete) return
    if (v.id === 1) { // 分享信息
      this.shareTaskList = v.task_rule
      this.isShowSharePopup = true
    } else if (v.id === 2) { // 关注公众号
      this.isShowQrcode = true
    } else if (v.id === 3) { // 绑定手机号
      PopupRegisterService.open()
        .then(() => {
          this.pageElement.reload()
        })
    } else if (v.id === 4) { // 完善个人资料
      RouterService.push('/user/personal/base')
    } else if (v.id === 5) { // 完善企业资料
      RouterService.push('/user/enterprise/base')
    } else if (v.id === 6) { // 个人每天登录
      UserPersonalService.checkInfo()
        .then(() => {
          RouterService.push('/user/hr/resume/form')
        })
        .catch((err) => {
          VantService.toast.fail(err.message)
        })
    } else if (v.id === 7) { // 企业每天登录
      UserEnterpriseService.checkInfo()
        .then(() => {
          RouterService.push('/user/hr/job/form')
        })
        .catch((err) => {
          VantService.toast.fail(err.message)
        })
    } else if (v.id === 8) { // 邀请加入
      RouterService.push('/user/invite')
    } else if (v.id === 9) { // 提供信息
      RouterService.push('/user/info_provide')
    }
  }

  private handleShare (v: TaskRule) {
    if (v.id === 1) { // 分享简历
      RouterService.push('/hr/resume')
    } else if (v.id === 2) { // 分享职位
      RouterService.push('/hr/job')
    }
  }

  private handleShareRecord () {
    RouterService.push('/user/share')
  }

  private handleInviteRecord () {
    RouterService.push('/user/invite/list')
  }
}
</script>

<style lang="less">
.view-task-hall,
.view-task-hall-share-popup {
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .status {
      color: @orange;
      border: 1px solid @orange;
      border-radius: 20px;
      padding: @padding-base @padding-xs;
      line-height: 1;
      &.finish {
        color: @gray-5;
        border-color: @gray-5;
      }
    }
  }
  .desc {
    margin-top: @padding-xs;
    line-height: 1.4;
    color: @gray-7;
  }
}
.view-task-hall-share-popup {
  width: 70%;
}
</style>
