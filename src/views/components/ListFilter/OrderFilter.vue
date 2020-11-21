<template>
  <div class="ViewOrderFilter">
    <van-dropdown-menu :class="{ active: innerValue > 0 }">
      <van-dropdown-item v-model="innerValue" :options="options" />
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { DropdownMenu, DropdownItem } from 'vant'

@Component({
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  }
})
export default class ViewOrderFilter extends Vue {
  @Prop()
  value!: number

  @Watch('value')
  onValue (val: number) {
    this.innerValue = val
  }

  @Watch('innerValue')
  onInnerValue (val: number) {
    this.$emit('input', val)
    this.$nextTick(() => {
      this.$emit('change')
    })
  }

  private innerValue = this.value
  private options = [
    { text: '推荐排序', value: 0 },
    { text: '截止排序', value: 1 }
  ]
}
</script>

<style lang="less">
.ViewOrderFilter {
  .van-dropdown-menu__bar {
    box-shadow: initial;
    height: initial;
  }
  .van-dropdown-menu__title {
    font-size: @font-size-sm;
    line-height: inherit;
  }
  .active {
    .van-dropdown-menu__title {
      color: @red;
    }
  }
}
</style>
