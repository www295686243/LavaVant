<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    close-on-popstate
    round
    :close-on-click-overlay="false"
    get-container="body"
    :style="{ height: '90%' }">
    <div class="ClassifyContainer">
      <van-nav-bar
        right-text="完成"
        @click-right="handleConfirm"
        left-text="关闭"
        @click-left="handleCancel">
        <div slot="title" class="nav-bar-title"><div class="title">行业选择</div><div class="tips">(可多选)</div></div>
      </van-nav-bar>
      <div class="classify-content-container">
        <div class="classify-content-box">
          <van-sidebar v-model="activeKey" @change="handleChangeSidebar" class="sidebar">
            <van-sidebar-item :title="v.display_name" v-for="v in sidebarData" :key="v.id" :badge="v.badge" />
          </van-sidebar>
          <div class="panel-container">
            <van-panel v-for="(v, panelIndex) in panelData" :key="v.id" class="panel-item">
              <template #header>
                <div class="van-cell van-panel__header">
                  <h4>{{v.display_name}}</h4>
                  <Checkbox v-model="v.active" icon-size="14px" @click="handleClickAllSelect(v)">全选</Checkbox>
                </div>
              </template>
              <div class="panel-content">
                <van-row gutter="8">
                  <van-col span="8" v-for="item in v.children" :key="item.id">
                    <van-button
                      plain
                      @click="handleSelect(item.id, panelIndex)"
                      :type="innerValue.includes(item.id) ? 'danger' : 'default'"
                      size="large"
                      class="panel-tag van-ellipsis">
                      {{item.display_name}}
                    </van-button>
                  </van-col>
                </van-row>
              </div>
            </van-panel>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Sidebar, SidebarItem, NavBar, Panel } from 'vant'
import { Options } from './PopupClassifyService'
import Checkbox from '@/components/Form/Base/Checkbox.vue'

@Component({
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [NavBar.name]: NavBar,
    [Panel.name]: Panel,
    Checkbox
  }
})
export default class PopupClassify extends Vue {
  @Prop()
  options!: Options[]

  private isShow = false
  private resolve!: Function
  private reject!: Function
  private activeKey = 0
  private sidebarData = [] as { id: number; display_name: string; badge: number | string }[]
  private panelData: Options[] = []
  private innerValue: number[] = []

  public open (defaultValue?: number[]) {
    this.innerValue = defaultValue || []
    this.sidebarData = this.options.map((res) => {
      return {
        id: res.id,
        display_name: res.display_name,
        badge: this.getSidebarInfo(res.children)
      }
    })
    this.options = this.options.map((res) => {
      res.children = res.children.map((item) => {
        const ids = item.children.map((row) => row.id)
        item.active = ids.every((id) => this.innerValue.includes(id))
        return item
      })
      return res
    })
    this.initPanelData()
    this.isShow = true
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  public close () {
    this.isShow = false
  }

  public destroy () {
    this.$destroy()
  }

  private handleCancel () {
    this.close()
    this.reject()
  }

  private handleConfirm () {
    this.resolve(this.innerValue)
    this.close()
  }

  private handleChangeSidebar () {
    this.initPanelData()
  }

  private handleSelect (id: number, panelIndex: number) {
    if (this.innerValue.includes(id)) {
      this.innerValue.splice(this.innerValue.indexOf(id), 1)
      this.panelData[panelIndex].active = false
      this.resetSidebarDataInfo(-1)
    } else {
      this.innerValue.push(id)
      const ids = this.panelData[panelIndex].children.map((res) => res.id)
      this.panelData[panelIndex].active = ids.every((id) => this.innerValue.includes(id))
      this.resetSidebarDataInfo(1)
    }
  }

  private resetSidebarDataInfo (num: number) {
    this.sidebarData[this.activeKey].badge = Number(this.sidebarData[this.activeKey].badge) + num
    if (this.sidebarData[this.activeKey].badge === 0) {
      this.sidebarData[this.activeKey].badge = ''
    }
  }

  private initPanelData () {
    this.panelData = ((this.options[this.activeKey] && this.options[this.activeKey].children) || []).map((res: Options) => res)
  }

  private getSidebarInfo (children: Options[]) {
    const ids = children
      .reduce((acc, res) => {
        acc = acc.concat(res.children)
        return acc
      }, [] as Options[])
      .map((res) => res.id)
    const intersection = (a: number[], b: number[]) => {
      const s = new Set(b)
      return a.filter(x => s.has(x))
    }
    return intersection(ids, this.innerValue).length || ''
  }

  private handleClickAllSelect (v: Options) {
    const ids = v.children.map((res) => res.id)
    if (v.active) {
      const diffItems = ids.filter((id) => !this.innerValue.includes(id))
      this.innerValue = this.innerValue.concat(diffItems)
      this.resetSidebarDataInfo(diffItems.length)
    } else {
      const InterItems = ids.filter((id) => this.innerValue.includes(id))
      this.innerValue = this.innerValue.filter((id) => !ids.includes(id))
      this.resetSidebarDataInfo(-InterItems.length)
    }
  }
}
</script>

<style lang="less">
.ClassifyContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  .van-nav-bar__title {
    max-width: 70%;
  }
  .nav-bar-title {
    .title {
      font-size: 16px;
      line-height: 1.1;
    }
    .tips {
      margin-top: 4px;
      color: #f60;
      font-size: 12px;
      line-height: 1;
    }
  }
  .classify-header-container {
    flex-shrink: 0;
    flex-grow: 0;
  }
  .classify-content-container {
    height: 0;
    flex-shrink: 1;
    flex-grow: 1;
  }
  .classify-content-box {
    height: 100%;
    display: flex;
  }
  .sidebar {
    flex-shrink: 0;
    flex-grow: 0;
    background: #fafafa;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .panel-container {
    flex-shrink: 1;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    & > .panel-item:after {
      border-top-width: 0;
    }
    .van-panel__header {
      padding: 10px 10px 0;
      justify-content: space-between;
      &:after {
        border-width: 0;
      }
      .van-checkbox__label {
        font-size: @font-size-sm;
        line-height: 1;
      }
    }
  }
  .panel-content {
    padding: 0 8px 16px;
    .panel-tag {
      margin-top: 8px;
      padding: 0 4px;
      line-height: 32px;
      height: 32px;
      font-size: 12px;
    }
    .van-button--default {
      color: #666;
    }
  }
}
</style>
