<template>
  <PageContainer>
    <PopupInfoDelivery
      :send_info_type="send_info_type"
      :send_info_id="send_info_id"
      :receive_info_type="receive_info_type"
      :receive_info_id="receive_info_id">
    </PopupInfoDelivery>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PopupInfoDelivery from '@/views/components/Popup/PopupInfoDelivery.vue'
import { getModel } from '@/service/ConstService'

@Component({
  components: {
    PopupInfoDelivery
  }
})
export default class DemoInfoComplaint extends Vue {
  private send_info_type = ''
  private send_info_id = ''
  private receive_info_type = ''
  private receive_info_id = ''

  created () {
    this.send_info_type = getModel('hrResume')
    this.send_info_id = '48803489131925504'
    this.receive_info_type = getModel('hrJob')
    this.receive_info_id = '48803489064816640'
  }
}
</script>

<style lang="less">
</style>
