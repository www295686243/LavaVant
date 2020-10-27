<template>
  <div class="SwiperTabMenu van-hairline--bottom">
    <div class="container">
      <div class="menu">
        <van-tabs @change="handleTabChange" :swipe-threshold="2">
          <van-tab v-for="v in data" :title="v[innerProps.label]" :key="v[innerProps.value]" :name="v[innerProps.value]" :disabled="disabled"></van-tab>
        </van-tabs>
      </div>
      <div class="filter" v-if="filters && filters.length > 0">
        <van-dropdown-menu active-color="#ee0a24">
          <van-dropdown-item v-model="innerFilterValue" @change="handleReload" :options="filters" />
        </van-dropdown-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { DropdownMenu, DropdownItem, Tab, Tabs } from 'vant'

@Component({
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
})
export default class SwiperTabMenu extends Vue {
  @Prop()
  data!: any[]

  @Prop()
  value!: string

  @Prop()
  filters!: any[]

  @Prop()
  props!: { value: string; label: string }

  @Prop({ default: false })
  disabled!: boolean

  @Watch('value')
  onValue (val: string) {
    this.innerValue = val
  }

  @Watch('innerValue')
  onInnerValue (val: string) {
    this.$emit('input', val)
  }

  private innerValue: string = this.value
  private innerFilterValue!: string | number
  private innerProps = {
    value: 'id',
    label: 'display_name'
  }

  private handleReload () {
    this.$emit('reload', {
      value: this.innerValue,
      filterValue: this.innerFilterValue
    })
  }

  private handleTabChange (id: string) {
    this.innerValue = id
  }

  private created () {
    Object.assign(this.innerProps, this.props)
    if (this.data.length > 0) {
      this.innerValue = this.data[0][this.innerProps.value]
    }
  }
}
</script>

<style lang="less">
.SwiperTabMenu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  .container {
    display: flex;
    .menu {
      flex: 1 1 0;
    }
    .filter {
      flex: 0 0 auto;
    }
  }
  .van-dropdown-menu__bar {
    padding: 0 12px 0 4px;
    height: 43px;
  }
}
</style>
