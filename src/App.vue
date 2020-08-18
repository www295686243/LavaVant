<template>
  <div id="app">
    <keep-alive :include="RouterService.keepAlives">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EventService from '@/service/EventService'
import RouterService from '@/service/RouterService'

@Component
export default class App extends Vue {
  private RouterService = RouterService

  created () {
    EventService.on('view-destroy', () => {
      RouterService.keepAlives = []
    })
  }
}
</script>

<style lang="less">
body {
  background: @gray-1;
}
</style>
