<template>
  <van-popup
    v-model="isShow"
    position="bottom"
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
            <van-panel :title="v.display_name" v-for="v in panelData" :key="v.id" class="panel-item">
              <div class="panel-content">
                <van-row gutter="8">
                  <van-col span="8" v-for="item in v.children" :key="item.id">
                    <van-button
                      plain
                      @click="handleSelect(item.id)"
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

@Component({
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [NavBar.name]: NavBar,
    [Panel.name]: Panel
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

  public open (defaultValue: number[]) {
    this.innerValue = defaultValue
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
  }

  private handleConfirm () {
    this.resolve(this.innerValue)
    this.close()
  }

  private handleChangeSidebar () {
    this.initPanelData()
  }

  private handleSelect (id: number) {
    if (this.innerValue.includes(id)) {
      this.innerValue.splice(this.innerValue.indexOf(id), 1)
      this.resetSidebarDataInfo(-1)
    } else {
      this.innerValue.push(id)
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

  created () {
    this.sidebarData = this.options.map((res) => {
      return {
        id: res.id,
        display_name: res.display_name,
        badge: this.getSidebarInfo(res.children)
      }
    })
    this.initPanelData()
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
      &:after {
        border-width: 0;
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
