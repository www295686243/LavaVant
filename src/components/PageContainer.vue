<template>
  <div class="PageContainer">
    <DataRender :onLoad="onLoad">
      <slot></slot>
    </DataRender>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PageContainer extends Vue {
  @Prop({ default: () => () => Promise.resolve() })
  readonly onLoad!: Function
}
</script>

<style lang="less">
.PageContainer {
}
</style>
