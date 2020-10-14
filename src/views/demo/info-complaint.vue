<template>
  <PageContainer>
    <PopupInfoComplaint :_model="_model"></PopupInfoComplaint>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PopupInfoComplaint from '@/views/components/Popup/PopupInfoComplaint.vue'

@Component({
  components: {
    PopupInfoComplaint
  }
})
export default class DemoInfoComplaint extends Vue {
  private _model = ''

  created () {
    this._model = 'hrJob'
  }
}
</script>

<style lang="less">
</style>
