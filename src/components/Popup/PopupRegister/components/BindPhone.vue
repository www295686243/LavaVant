<template>
  <div class="PopupRegisterBindPhone">
    <BusinessSmsCaptcha typeName="bind-phone" @success="handleSuccess"></BusinessSmsCaptcha>
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
export default class PopupRegisterBindPhone extends Vue {
  private handleSuccess () {
    this.$emit('success')
  }
}
</script>

<style lang="less">
.PopupRegisterBindPhone {
  .ButtonSubmit {
    font-size: @font-size-sm;
  }
  .FormSms {
    padding: 0 0 0 @padding-md;
  }
}
</style>
