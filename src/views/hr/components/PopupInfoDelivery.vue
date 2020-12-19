<template>
  <div class="PopupInfoDelivery">
    <ButtonSubmit
      type="warning"
      :onClick="handleShowPopup"
      icon="todo-list"
      size="small"
      plain
      round>
      投递{{sendService.displayName}}
    </ButtonSubmit>
    <van-popup
      class="PopupInfoDelivery-popup"
      v-model="isShowPopup"
      closeable
      round
      close-on-popstate
      position="bottom">
      <DataRender class="delivery-container" :onLoad="handleLoad">
        <div class="delivery-info" v-if="deliveryInfo.id">
          <p>您已投递{{sendService.displayName}}。</p>
          <div class="title">{{deliveryInfo.title}}</div>
        </div>
        <template v-else>
          <van-cell-group :title="'我的' + sendService.displayName">
            <van-cell :title="v.title" :label="sendService.getStatusLabel(v.status)" v-for="v in list" :key="v.id" @click="handleSelect(v)">
              <template v-if="v.active">
                <template slot="right-icon" >
                  <van-icon name="passed" class="text-color-success right-icon" size="20" v-if="v.selected"/>
                  <van-icon name="circle" class="text-color-disable right-icon" size="20" v-else />
                </template>
              </template>
              <van-button size="mini" type="primary" @click="gotoForm(v)" v-else>编辑</van-button>
            </van-cell>
          </van-cell-group>
          <div class="btn-container" v-if="list.length > 0">
            <ButtonSubmit :onClick="handleSubmit" block>投递{{sendService.displayName}}</ButtonSubmit>
          </div>
          <div class="empty-container" v-if="list.length === 0">
            <ButtonSubmit icon="add-o" :onClick="() => gotoForm()">新增{{sendService.displayName}}</ButtonSubmit>
          </div>
        </template>
      </DataRender>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import InfoDeliveryService from '@/service/Info/InfoDeliveryService'
import { getStatusLabel } from '@/service/ConstService'
import RouterService from '@/service/RouterService'
import VantService from '@/service/VantService'
import HrAbstract from '@/abstract/HrAbstract'

interface ListItem {
  id: string;
  title: string;
  status: number;
  selected: boolean;
  active: boolean;
}

@Component
export default class PopupInfoDelivery extends Vue {
  @Prop()
  receiveService!: HrAbstract

  @Prop()
  sendService!: HrAbstract

  private getStatusLabel = getStatusLabel
  private isShowPopup = false
  private list: ListItem[] = []
  private deliveryInfo = {
    id: '',
    title: ''
  }

  private handleShowPopup () {
    this.isShowPopup = true
  }

  private handleLoad () {
    return this.checkIsDelivery()
      .then(() => this.getList())
  }

  private checkIsDelivery () {
    return InfoDeliveryService.show({
      send_info_type: this.sendService.name,
      receive_info_type: this.receiveService.name,
      receive_info_id: RouterService.query('id')
    })
      .then((res) => {
        if (res.data) {
          Object.assign(this.deliveryInfo, res.data.send_info)
        }
      })
  }

  private getList () {
    return InfoDeliveryService.getInfoList(this.sendService.name)
      .then((res) => {
        const datas = res.data.data || []
        this.list = datas.map((item: any) => {
          item.selected = false
          item.active = item.status === this.sendService.getStatusValue(1, '已发布')
          return item
        })
      })
  }

  private handleSelect (v: ListItem) {
    this.list.forEach((res) => {
      if (res.id === v.id) {
        res.selected = true
      } else {
        res.selected = false
      }
    })
  }

  private gotoForm (v: any = {}) {
    RouterService.push('/user/' + this.sendService.path + '/form', { id: v.id })
  }

  private handleSubmit () {
    const item = this.list.find((res) => res.selected) as ListItem
    return Promise.resolve()
      .then(() => {
        if (!item) {
          const obj = { message: '请选择一份' + this.sendService.displayName, status: 'error' }
          return Promise.reject(obj)
        }
        return InfoDeliveryService.store({
          send_info_type: this.sendService.name,
          send_info_id: item.id,
          receive_info_type: this.receiveService.name,
          receive_info_id: RouterService.query('id')
        })
      })
      .then((res) => {
        VantService.toast.success(res.message)
        this.isShowPopup = false
        Object.assign(this.deliveryInfo, {
          id: item.id,
          title: item.title
        })
      })
  }
}
</script>

<style lang="less">
.PopupInfoDelivery {
  & > .ButtonSubmit {
    display: block;
  }
}
.PopupInfoDelivery-popup {
  .DataRender .render-loading {
    padding-bottom: 20%;
  }
  .delivery-container {
    .right-icon {
      margin-left: @padding-xs;
      display: flex;
      align-items: center;
    }
  }
  .btn-container {
    padding: @padding-md;
  }
  .delivery-info {
    padding: 40px;
    .title {
      margin-top: 8px;
      background: #f8f8f8;
      padding: 8px;
      font-size: 14px;
    }
  }
  .empty-container {
    padding: @padding-lg;
    text-align: center;
  }
}
</style>
