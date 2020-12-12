<template>
  <van-cell :border="false" class="User-CheckListData">
    <h4 class="van-multi-ellipsis--l2">{{v.info_title}}</h4>
    <div class="info">
      <p>状态：<span>{{InfoCheckService.getStatusLabel(v.status)}}</span></p>
      <p>发布：<span>{{v.created_at}}</span></p>
    </div>
    <div class="info" v-if="v.status === InfoCheckService.getStatusValue(3, '已拒绝')">
      <p class="refuse">原因：<span>{{v.refuse_reason}}</span></p>
    </div>
    <div class="btns">
      <ButtonSubmit
        v-if="v.status === InfoCheckService.getStatusValue(3, '已拒绝')"
        :onClick="() => RouterService.push('/user/' + Service.path + '/form', { id: v.id, _check: 1 })"
        class="xiugai"
        icon="records"
        size="mini"
        plain>
        修改
      </ButtonSubmit>
      <ButtonSubmit
        :onClick="() => handleDelete(v.id)"
        class="xiajia"
        icon="exchange"
        size="mini"
        plain>
        删除
      </ButtonSubmit>
    </div>
  </van-cell>
</template>

<script lang="ts">
import HrAbstract from '@/abstract/HrAbstract'
import InfoCheckService from '@/service/Info/InfoCheckService'
import RouterService from '@/service/RouterService'
import VantService from '@/service/VantService'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CheckListData extends Vue {
  @Prop()
  v!: any

  @Prop()
  Service!: HrAbstract

  private RouterService = RouterService
  private InfoCheckService = InfoCheckService

  private handleDelete (id: string) {
    return VantService.confirm('您真的要删除吗?')
      .then(() => InfoCheckService.destroy(id))
      .then((res) => {
        this.$emit('reload')
        return res
      })
  }
}
</script>

<style lang="less">
.User-CheckListData {
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
    .refuse {
      color: @orange;
    }
  }
  .btns {
    text-align: right;
    margin-top: @padding-sm;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .ButtonSubmit {
      margin-left: @padding-md;
      display: block;
    }
    .xiugai {
      color: @orange;
      border-color: @orange;
    }
    .xiajia {
      color: @gray-6;
      border-color: @gray-6;
    }
  }
}
</style>
