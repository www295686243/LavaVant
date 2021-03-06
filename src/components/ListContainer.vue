<template>
  <van-list
    class="ListContainer"
    ref="listElement"
    :finished="isFinished"
    :error.sync="isError"
    error-text="请求失败，点击重新加载"
    @load="handleLoad"
    v-model="isLoading">
    <template v-for="(v, index) in list">
      <div :key="index" class="ListContainer-item"><slot :index="index" :v="v"></slot></div>
    </template>
    <div class="List-empty" v-if="isEmpty">
      <slot name="empty">
        <van-empty image="search" :description="emptyText" />
      </slot>
    </div>
    <div class="List-finished" v-if="isFinished && !isEmpty">
      <slot name="finished">
        <p class="van-list__finished-text">已全部加载完毕</p>
      </slot>
    </div>
  </van-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { List, Empty } from 'vant'

@Component({
  components: {
    [List.name]: List,
    [Empty.name]: Empty
  }
})
export default class ListContainer extends Vue {
  @Prop({ default: () => () => Promise.resolve() })
  onLoad!: Function

  @Prop({ default: '暂无任何信息' })
  emptyText!: string

  private isLoading = false
  private isFinished = false
  private isError = false
  private isEmpty = false
  private page = 1
  private list: any[] = []

  private handleLoad () {
    return this.onLoad(this.page)
      .then((res: any) => {
        let data: any[] = []
        if (res.data && res.data.data) {
          data = res.data.data
        } else if (Array.isArray(res.data)) {
          data = res.data
        } else if (Array.isArray(res)) {
          data = res
        }
        if (!Array.isArray(data)) {
          const err = { message: '返回的对象不是数组' }
          return Promise.reject(err)
        }
        if (data.length === 0 && this.page === 1) {
          this.isEmpty = true
          this.isFinished = true
        } else if (data.length === 0) {
          this.isFinished = true
        } else {
          this.list = this.list.concat(data)
        }
        this.isLoading = false
        this.page++
      })
      .catch((err: { message: string }) => {
        if (err && err.message) {
          window.console.log(err.message)
        }
        this.isLoading = false
        this.isError = true
      })
  }

  private handleCheckLoad () {
    (this.$refs.listElement as HTMLFormElement).check()
  }

  reload () {
    this.page = 1
    this.list = []
    this.isEmpty = false
    this.isError = false
    if (this.isFinished) {
      this.isFinished = false
    } else {
      this.$nextTick(() => {
        this.handleCheckLoad()
      })
    }
  }

  toggleSelectAll (bool: boolean) {
    this.list.forEach((item) => {
      item.active = bool
    })
  }

  singleToggle (v: { id: string; active: boolean }) {
    this.list.forEach((res) => {
      if (res.id === v.id) {
        res.active = true
      } else {
        res.active = false
      }
    })
  }

  toggle (v: { active: boolean }) {
    v.active = !v.active
  }

  getSelectedIds () {
    return this.list.filter((res) => res.active).map((res) => res.id)
  }

  getSelectedItem () {
    return this.list.filter((res) => res.active)
  }

  filter (ids: string[]) {
    this.list = this.list.filter((res) => !ids.includes(res.id))
  }
}
</script>

<style lang="less">
.ListContainer {
  .List-finished,
  .List-empty {
    padding-bottom: 60px;
    .click {
      color: @text-link-color;
    }
  }
  .List-finished {
    p {
      .van-icon {
        vertical-align: -2px;
      }
    }
  }
}
</style>
