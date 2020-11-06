<template>
  <div class="view-hr-ListData" @click="handleClick">
    <van-cell :border="false" class="box" clickable>
      <h4 class="van-multi-ellipsis--l2">{{v.title}}</h4>
      <div class="info">
        <h5>
          <span class="label">月薪范围：</span>
          <span class="text">
            {{v.monthly_salary_min && v.monthly_salary_max ? v.monthly_salary_min + '~' + v.monthly_salary_max : ''}}{{v.is_negotiate > 0 ? '(面议)' : ''}}
          </span>
        </h5>
        <h5>
          <span class="label">工龄：</span>
          <span class="text">{{getOptionsLabel('_global', 'seniority', v.seniority)}}</span>
        </h5>
      </div>
      <div class="info">
        <p>上班地点：<span>{{v.city | cityName}}</span></p>
        <p>截止：<span>{{v.end_time}}</span></p>
      </div>
    </van-cell>
  </div>
</template>

<script lang="ts">
import { getOptionsLabel } from '@/service/ConstService'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ListData extends Vue {
  @Prop()
  v!: any

  private getOptionsLabel = getOptionsLabel

  private handleClick () {
    this.$emit('click')
  }
}
</script>

<style lang="less">
.view-hr-ListData {
  background: #f8f8f8;
  .box {
    margin-bottom: 12px;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.09);
    .info {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      p {
        font-size: @font-size-sm;
        color: @gray-7;
        span {
          color: @gray-8;
        }
      }
      .label {
        color: @gray-7;
      }
      .text {
        color: @text-link-color;
      }
    }
    .list-desc {
      margin: 10px 0 15px;
    }
  }
}
</style>
