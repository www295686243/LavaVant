<template>
  <div class="ActionContainer">
    <template v-if="info.status === Service.getStatusValue(1, '已发布')">
      <PopupInfoComplaint :Service="Service" v-if="info.is_pay"></PopupInfoComplaint>
      <template v-else>
        <PopupInfoDelivery
          v-if="!isSelfPublish"
          :send-service="deliveryService"
          :receive-service="Service" />
        <PopupQueryContacts :Service="Service" v-if="!isSelfPublish" @pay="handlePaySuccess" />
      </template>
    </template>
    <ButtonSubmit
      v-if="isSelfPublish"
      icon="manager-o"
      plain
      size="small"
      round
      :onClick="() => RouterService.push('/user/' + Service.path)">
      进入职位管理
    </ButtonSubmit>
  </div>
</template>

<script lang="ts">
import BaseModelService from '@/service/BaseModelService'
import UserService from '@/service/User/UserService'
import PopupInfoComplaint from '@/views/components/Popup/PopupInfoComplaint.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import PopupInfoDelivery from './PopupInfoDelivery.vue'

@Component({
  components: {
    PopupInfoComplaint,
    PopupInfoDelivery
  }
})
export default class ActionContainer extends Vue {
  @Prop()
  Service!: BaseModelService

  @Prop()
  deliveryService!: BaseModelService

  @Prop()
  info!: { status: number; id: string; is_pay: boolean; user_id: string }

  get isSelfPublish () {
    return this.info.user_id === UserService.info.id
  }
}
</script>

<style lang="less">
.ActionContainer {
  margin-top: @padding-lg;
  display: flex;
  align-items: center;
}
</style>
