<template>
  <div class="PopupRegisterUpdatePhone">
    <BusinessSmsCaptcha typeName="update-phone" @success="handleSuccess"></BusinessSmsCaptcha>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BusinessSmsCaptcha from '@/components/Business/BusinessSmsCaptcha.vue'

@Component({
  components: {
    BusinessSmsCaptcha
  }
})
export default class PopupRegisterUpdatePhone extends Vue {
  private handleSuccess () {
    this.$emit('success')
  }
}
</script>

<style lang="less">
.PopupRegisterUpdatePhone {
  .ButtonSubmit {
    font-size: @font-size-sm;
  }
  .FormSms {
    padding: 0 0 0 @padding-md;
  }
}
</style>
