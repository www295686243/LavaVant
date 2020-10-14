<template>
  <div class="InfoDelivery">
    <ButtonSubmit
      type="warning"
      :onClick="handleShowPopup"
      icon="service"
      size="small"
      plain
      round>
      投递{{sendModel.text}}
    </ButtonSubmit>
    <van-popup
      class="InfoDelivery-popup"
      v-model="isShowPopup"
      closeable
      round
      close-on-popstate
      position="bottom">
      <DataRender class="delivery-container" :onLoad="handleLoad">
        <div class="delivery-info" v-if="deliveryInfo.id">
          <p>您已投递{{sendModel.text}}。</p>
          <div class="title">{{deliveryInfo.title}}</div>
        </div>
        <template v-else>
          <van-cell-group :title="'我的' + sendModel.text">
            <van-cell :title="v.title" :label="v.status | getOptionsLabel" v-for="v in list" :key="v.id" @click="handleSelect(v)">
              <template v-if="v.active">
                <template slot="right-icon" >
                  <van-icon name="passed" class="text-color-success right-icon" size="20" v-if="v.selected"/>
                  <van-icon name="circle" class="text-color-disable right-icon" size="20" v-else />
                </template>
              </template>
              <van-button size="mini" type="primary" @click="gotoForm(v)" v-else>编辑</van-button>
            </van-cell>
          </van-cell-group>
          <div class="btn-container">
            <ButtonSubmit :onClick="handleSubmit" block>投递{{sendModel.text}}</ButtonSubmit>
          </div>
          <div class="empty-container" v-if="list.length === 0">
            <ButtonSubmit icon="add-o" :onClick="() => gotoForm()">新增{{sendModel.text}}</ButtonSubmit>
          </div>
        </template>
      </DataRender>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import InfoDeliveryService from '@/service/Info/InfoDeliveryService'
import { getOptionsValue2, getModel } from '@/service/ConstService'
import RouterService from '@/service/RouterService'
import VantService from '@/service/VantService'

interface ListItem {
  id: string;
  title: string;
  status: number;
  selected: boolean;
  active: boolean;
}

@Component
export default class InfoDelivery extends Vue {
  @Prop()
  send_info_type!: string

  @Prop()
  send_info_id!: string

  @Prop()
  receive_info_type!: string

  @Prop()
  receive_info_id!: string

  private isShowPopup = false
  private list: ListItem[] = []
  private deliveryInfo = {
    id: '',
    title: ''
  }

  private sendModel = {
    text: '',
    path: '',
    model: ''
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
      send_info_type: this.sendModel.model,
      send_info_id: this.send_info_id,
      receive_info_type: getModel(this.receive_info_type).model,
      receive_info_id: this.receive_info_id
    })
      .then((res) => {
        if (res.data) {
          Object.assign(this.deliveryInfo, res.data.send_info)
        }
      })
  }

  private getList () {
    return InfoDeliveryService.getInfoList(this.sendModel.model)
      .then((res) => {
        const datas = res.data.data || []
        this.list = datas.map((item: any) => {
          item.selected = false
          item.active = item.status === getOptionsValue2(this.sendModel.model + ':status', '已发布')
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
    RouterService.push('/user/' + this.sendModel.path + '/form', { id: v.id })
  }

  private handleSubmit () {
    const item = this.list.find((res) => res.selected) as ListItem
    return Promise.resolve()
      .then(() => {
        if (!item) {
          const obj = { message: '请选择一份' + this.sendModel.text, status: 'error' }
          return Promise.reject(obj)
        }
        return InfoDeliveryService.store({
          send_info_type: this.sendModel.model,
          send_info_id: this.send_info_id,
          receive_info_type: getModel(this.receive_info_type).model,
          receive_info_id: this.receive_info_id
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

  created () {
    Object.assign(this.sendModel, getModel(this.send_info_type))
  }
}
</script>

<style lang="less">
.InfoDelivery-popup {
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
}
</style>
