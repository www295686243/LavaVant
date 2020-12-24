<template>
  <div class="ContactsContainer" :class="{ space: Service.name === 'HrResume' }">
    <h3 class="title" v-if="Service.name === 'HrResume'">联系方式</h3>
    <h4><span class="text-color-label">联系人：</span><span class="text-color-value">{{ info.contacts | empty }}</span></h4>
    <h4>
      <span class="text-color-label">联系电话：</span>
      <big><a :href="'tel:' + info.phone" class="text-color-click">{{ info.phone | empty }}<small>(点击拨号)</small></a></big>
    </h4>
    <PopupInfoComplaint :Service="Service" v-if="info.is_pay && Service.name === 'HrResume'"></PopupInfoComplaint>
  </div>
</template>

<script lang="ts">
import HrAbstract from '@/abstract/HrAbstract'
import { Component, Prop, Vue } from 'vue-property-decorator'
import PopupInfoComplaint from '@/views/components/Popup/PopupInfoComplaint.vue'

@Component({
  components: {
    PopupInfoComplaint
  }
})
export default class ContactsContainer extends Vue {
  @Prop()
  info!: { contacts: string; phone: string }

  @Prop()
  Service!: HrAbstract
}
</script>

<style lang="less">
.ContactsContainer {
  line-height: 1.7;
  position: relative;
  &.space {
    margin-top: @padding-lg;
  }
  .title {
    margin-bottom: @padding-base;
  }
  .PopupInfoComplaint {
    position: absolute;
    right: 0;
    top: -2px;
  }
}
</style>
