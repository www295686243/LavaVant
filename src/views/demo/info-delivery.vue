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
import PopupInfoDelivery from '@/views/hr/components/PopupInfoDelivery.vue'

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
    this.send_info_type = 'hrResume'
    this.send_info_id = '49178949229613056'
    this.receive_info_type = 'hrJob'
    this.receive_info_id = '49178949158309888'
  }
}
</script>

<style lang="less">
</style>
