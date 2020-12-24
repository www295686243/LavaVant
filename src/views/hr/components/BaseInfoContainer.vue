<template>
  <div class="BaseInfoContainer">
    <div class="title-container">
      <h2>{{info.title}}</h2>
    </div>
    <div class="position base-info-container">
      <div class="info">要求：{{Service.getOptionsLabel('seniority', info.seniority)}} / {{Service.getOptionsLabel('education', info.education)}}<span v-if="info.recruiter_number"> / {{info.recruiter_number}}人</span></div>
      <ShareGuide size="small" icon="share-o" plain></ShareGuide>
    </div>
    <div class="position tags">{{Service.displayName === '简历' ? '期望' : '待遇'}}：<span class="light">{{info.salary}}元</span> {{info.treatment}}</div>
    <van-icon class-prefix="zz-icon" name="yijiejue" v-if="info.status === Service.getStatusValue(2, '已解决')" />
    <van-icon class-prefix="zz-icon" name="yixiajia" v-else-if="info.status === Service.getStatusValue(3, '已下架')" />
    <van-icon class-prefix="zz-icon" name="yidaoqi" v-else-if="info.status === Service.getStatusValue(4, '已到期')" />
  </div>
</template>

<script lang="ts">
import HrAbstract from '@/abstract/HrAbstract'
import ShareGuide from '@/views/components/ShareGuide.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ShareGuide
  }
})
export default class BaseInfoContainer extends Vue {
  @Prop()
  info!: { title: string; status: number; salary: string; seniority: number; education: number; recruiter_number?: number }

  @Prop()
  Service!: HrAbstract
}
</script>

<style lang="less">
.BaseInfoContainer {
  position: relative;
  padding-bottom: @padding-lg;
  .base-info-container {
    margin-top: @padding-xs;
    display: flex;
    align-items: center;
    .info {
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
    font-size: @font-size-md;
    color: @gray-7;
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
</style>
