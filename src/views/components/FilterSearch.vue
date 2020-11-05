<template>
  <van-search
    :maxlength="20"
    placeholder="请输入搜索关键词"
    v-model="innerValue"
    shape="round">
  </van-search>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Search } from 'vant'

@Component({
  components: {
    [Search.name]: Search
  }
})
export default class FilterSearch extends Vue {
  @Prop()
  value!: string

  private innerValue: string = this.value

  @Watch('innerValue')
  onInnerValue (val: string) {
    this.$emit('input', val)
  }
}
</script>

<style lang="less">
</style>
