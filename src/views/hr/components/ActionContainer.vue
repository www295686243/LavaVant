<template>
  <div class="ActionContainer">
    <template v-if="info.status === Service.getStatusValue(1, '已发布')">
      <PopupInfoComplaint :Service="Service" v-if="info.is_pay"></PopupInfoComplaint>
      <template v-else>
        <PopupInfoDelivery
          v-if="!isSelfPublish && deliveryService"
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
      进入{{Service.displayName}}管理
    </ButtonSubmit>
  </div>
</template>

<script lang="ts">
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'
import UserService from '@/service/User/UserService'
import PopupInfoComplaint from '@/views/components/Popup/PopupInfoComplaint.vue'
import PopupQueryContacts from '@/views/components/Popup/PopupQueryContacts.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import PopupInfoDelivery from './PopupInfoDelivery.vue'

@Component({
  components: {
    PopupInfoComplaint,
    PopupInfoDelivery,
    PopupQueryContacts
  }
})
export default class ActionContainer extends Vue {
  @Prop()
  Service!: BaseModelService

  @Prop()
  deliveryService!: BaseModelService

  @Prop()
  info!: { status: number; id: string; is_pay: boolean; user_id: string }

  private RouterService = RouterService

  get isSelfPublish () {
    return this.info.user_id === UserService.info.id
  }

  private handlePaySuccess (params: { is_pay: boolean; contacts: string; phone: string }) {
    Object.assign(this.info, params)
  }
}
</script>

<style lang="less">
.ActionContainer {
  margin-top: @padding-lg;
  display: flex;
  align-items: center;
  .PopupInfoDelivery + .PopupQueryContacts {
    margin-left: @padding-sm;
  }
}
</style>
