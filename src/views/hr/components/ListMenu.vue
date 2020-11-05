<template>
  <div class="ListMenu">
    <div class="filter-menu van-hairline--bottom">
      <p
        v-for="(v, index) in filterMenus"
        :key="index"
        @click="handleSwitchFilterMenu(v)"
        :class="{'filter-menu-active': v.active}">
        {{v.name}}
      </p>
    </div>
    <ListFilter v-model="isShowFilter" @submit="handleFilterSubmit"></ListFilter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ListFilter from '@/views/components/ListFilter.vue'

@Component({
  components: {
    ListFilter
  }
})
export default class ListMenu extends Vue {
  private isShowFilter = false
  private filterMenus = {
    recommend: { name: '推荐', active: true },
    filter: { name: '筛选', active: false }
  }

  private handleSwitchFilterMenu (v: { name: string; active: boolean }) {
    if (v.name === '推荐' && v.active === false) {
      this.$emit('reload', { search_type: 'recommend' })
      this.filterMenus.filter.active = false
      v.active = true
    } else if (v.name === '筛选') {
      this.isShowFilter = true
    }
  }

  private handleFilterSubmit (params: any) {
    this.$emit('reload', params)
    this.filterMenus.recommend.active = false
    this.filterMenus.filter.active = true
  }
}
</script>

<style lang="less">
.ListMenu {
  height: 44px;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 10;
  .filter-menu {
    display: flex;
    background: @white;
    p {
      flex: 1 1 0;
      line-height: 44px;
      text-align: center;
      &:active {
        background: @background-color-light;
      }
    }
    .filter-menu-active {
      color: @orange-dark;
    }
  }
}
.ListFilter-popup {
  .submit-button {
    padding: 20px;
  }
}
</style>
