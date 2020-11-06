<template>
  <div class="BaseInfoContainer">
    <div class="title-container">
      <h2>{{info.title}}</h2>
      <ShareGuide size="mini" icon="share-o" plain></ShareGuide>
    </div>
    <div class="position">
      <span class="light">{{info.salary}}</span> / {{Service.getOptionsLabel('seniority', info.seniority)}} / {{Service.getOptionsLabel('education', info.education)}}<span v-if="info.recruiter_number"> / {{info.recruiter_number}}人</span>
    </div>
    <div class="position tags">{{Service.displayName === '简历' ? '期望福利' : '职位诱惑'}}：{{info.treatment}}</div>
    <van-icon class-prefix="zz-icon" name="yijiejue" v-if="info.status === Service.getStatusValue(2, '已解决')" />
    <van-icon class-prefix="zz-icon" name="yixiajia" v-else-if="info.status === Service.getStatusValue(3, '已下架')" />
    <van-icon class-prefix="zz-icon" name="yidaoqi" v-else-if="info.status === Service.getStatusValue(4, '已到期')" />
  </div>
</template>

<script lang="ts">
import BaseModelService from '@/service/BaseModelService'
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
  Service!: BaseModelService
}
</script>

<style lang="less">
.BaseInfoContainer {
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
</style>
