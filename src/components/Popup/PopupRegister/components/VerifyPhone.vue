<template>
  <div class="PopupRegisterVerifyPhone">
    <BusinessSmsCaptcha typeName="verify-phone" @success="handleSuccess"></BusinessSmsCaptcha>
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
export default class PopupRegisterVerifyPhone extends Vue {
  private handleSuccess () {
    this.$emit('success')
  }
}
</script>

<style lang="less">
.PopupRegisterVerifyPhone {
  .ButtonSubmit {
    font-size: @font-size-sm;
  }
  .FormSms {
    padding: 0 0 0 @padding-md;
  }
}
</style>
