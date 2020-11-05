<template>
  <div class="Disclaimer">
    <p>声明：原草互助求职招聘版块是一个互助功能，由客服回访确认在招才审核推送，方便师傅求职，具体薪资待遇、工作内容等需与对方沟通确认签合同，平台不承担后续的纠纷责任！</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Disclaimer extends Vue {
}
</script>

<style lang="less">
.Disclaimer {
  color: @gray-6;
  margin-top: @padding-sm;
  p {
    font-size: @font-size-sm;
  }
}
</style>
