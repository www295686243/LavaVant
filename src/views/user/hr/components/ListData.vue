<template>
  <van-cell :border="false" class="User-ListData">
    <h4 class="van-multi-ellipsis--l2">{{v.title}}</h4>
    <div class="info">
      <p>状态：<span>{{Service.getStatusLabel(v.status)}}</span></p>
      <p>截止：<span>{{v.end_time}}</span></p>
    </div>
    <div class="btns">
      <ButtonSubmit :onClick="() => refreshUpdateAt(v.id)" class="shuaxin" icon="replay" size="mini" plain>刷新</ButtonSubmit>
      <ButtonSubmit :onClick="() => RouterService.push('/user/' + Service.path + '/form', { id: v.id })" class="xiugai" icon="records" size="mini" plain>修改</ButtonSubmit>
      <ButtonSubmit :onClick="() => updateDisable(v)" class="xiajia" icon="exchange" size="mini" plain>{{v.status === Service.getStatusValue(1, '已发布') ? '下架' : '上架'}}</ButtonSubmit>
    </div>
  </van-cell>
</template>

<script lang="ts">
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'
import { Component, Vue, Prop } from 'vue-property-decorator'

interface Service extends BaseModelService {
  refreshUpdateAt: Function;
  updateDisable: Function;
}

@Component
export default class ListData extends Vue {
  @Prop()
  v!: any

  @Prop()
  Service!: Service

  private RouterService = RouterService

  private refreshUpdateAt (id: string) {
    return this.Service.refreshUpdateAt(id)
  }

  private updateDisable (v: { id: string; status: number }) {
    return this.Service.updateDisable(v.id)
      .then((res: { data: { status: number } }) => {
        v.status = res.data.status
        return res
      })
  }
}
</script>

<style lang="less">
.User-ListData {
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
