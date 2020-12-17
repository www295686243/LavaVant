<template>
  <div class="ContactsContainer">
    <h3 class="title">联系方式</h3>
    <h4><span class="text-color-label">联系人：</span><span class="text-color-value">{{ info.contacts | empty }}</span></h4>
    <h4>
      <span class="text-color-label">联系电话：</span>
      <big><a :href="'tel:' + info.phone" class="text-color-click">{{ info.phone | empty }}<small>(点击拨号)</small></a></big>
    </h4>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ContactsContainer extends Vue {
  @Prop()
  info!: { contacts: string; phone: string }
}
</script>

<style lang="less">
.ContactsContainer {
  margin-top: @padding-lg;
  line-height: 1.7;
  .title {
    margin-bottom: @padding-base;
  }
}
</style>
