<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    get-container="body">
    <van-datetime-picker
      title="请选择"
      v-model="dateValue"
      type="date"
      :min-date="minDate"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DatetimePicker } from 'vant'
import { formatDate } from '@/plugins/tools'

@Component({
  components: {
    [DatetimePicker.name]: DatetimePicker
  }
})
export default class PopupPicker extends Vue {
  @Prop()
  defaultValue!: string

  @Prop({ default: () => new Date('1920/01/01') })
  minDate!: Date

  private isShow = false
  private dateValue = this.defaultValue ? new Date(this.defaultValue) : new Date()
  private resolve!: Function
  private reject!: Function

  public open () {
    this.isShow = true
    return new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  public close () {
    this.isShow = false
  }

  private handleCancel () {
    this.close()
  }

  private handleConfirm (value: Date) {
    this.resolve(formatDate(value))
    this.close()
  }
}
</script>
