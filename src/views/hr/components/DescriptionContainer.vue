<template>
  <div class="DescriptionContainer">
    <div class="flex">
      <h3 class="title">{{Service.displayName}}描述</h3>
      <h5 class="views-container"><van-icon name="eye-o" size="14px" class="icon-views" /> {{info.views}}</h5>
    </div>
    <div class="description" v-html="info.description"></div>
    <div class="flex tips-container">
      <p class="tips">打电话请说是在【原草互助】上看到</p>
      <p class="end-time">截止：{{info.end_time}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import BaseModelService from '@/service/BaseModelService'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DescriptionContainer extends Vue {
  @Prop()
  info!: { description: string; end_time: string }

  @Prop()
  Service!: BaseModelService
}
</script>

<style lang="less">
.DescriptionContainer {
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
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    margin-bottom: @padding-base;
  }
}
</style>
