<template>
  <div class="ActionContainer">
    <template v-if="info.status === Service.getStatusValue(1, '已发布')">
      <PopupInfoDelivery
        v-if="!info.is_pay && (isShowInfoDelivery && deliveryService)"
        :send-service="deliveryService"
        :receive-service="Service" />
      <PopupQueryContacts :Service="Service" v-if="!info.is_pay && !isSelfPublish" @pay="handlePaySuccess" />
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
import HrAbstract from '@/abstract/HrAbstract'
import RouterService from '@/service/RouterService'
import UserService from '@/service/User/UserService'
import PopupQueryContacts from '@/views/components/Popup/PopupQueryContacts.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import PopupInfoDelivery from './PopupInfoDelivery.vue'

@Component({
  components: {
    PopupInfoDelivery,
    PopupQueryContacts
  }
})
export default class ActionContainer extends Vue {
  @Prop()
  Service!: HrAbstract

  @Prop()
  deliveryService!: HrAbstract

  @Prop()
  info!: { status: number; id: string; is_pay: boolean; user_id: string }

  private RouterService = RouterService

  get isSelfPublish () {
    return this.info.user_id === UserService.info.id
  }

  get isShowInfoDelivery () {
    if (this.info.user_id === UserService.info.id) {
      return false
    } else if (this.Service.name === 'HrJob' && UserService.info.current_role === 'Enterprise Member') {
      return false
    } else if (this.Service.name === 'HrResume' && UserService.info.current_role === 'Personal Member') {
      return false
    } else {
      return true
    }
  }

  private handlePaySuccess (params: { is_pay: boolean; contacts: string; phone: string }) {
    Object.assign(this.info, params)
  }
}
</script>

<style lang="less">
.ActionContainer {
  margin-top: @padding-md;
  display: flex;
  align-items: center;
  .PopupInfoDelivery + .PopupQueryContacts {
    margin-left: @padding-sm;
  }
}
</style>
