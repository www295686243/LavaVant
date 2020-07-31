<template>
  <div>
    <div class="demo">试试</div>
    <van-button type="primary">按钮</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Button } from 'vant'

@Component({
  components: {
    [Button.name]: Button
  }
})
export default class SS extends Vue {
  created () {
    console.log(process.env.VUE_APP_ENV)
  }
}
</script>

<style lang="less">
.demo {
  border: 1px solid @button-primary-background-color;
  padding: 10px;
  font-size: 12px;
}
</style>
