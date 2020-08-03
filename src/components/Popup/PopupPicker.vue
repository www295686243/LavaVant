<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    get-container="body">
    <van-picker
      show-toolbar
      title="请选择"
      :default-index="defaultIndex"
      :columns="options"
      value-key="display_name"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Picker } from 'vant'
import { Options } from './PopupPickerService'

@Component({
  components: {
    [Picker.name]: Picker
  }
})
export default class PopupPicker extends Vue {
  @Prop()
  options!: Options[]

  @Prop()
  defaultValue!: number

  private isShow = false
  private defaultIndex = 0
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

  private handleConfirm (item: Options) {
    this.resolve(item)
    this.close()
  }

  created () {
    const item = this.options.find((res) => res.id === this.defaultValue)
    if (item) {
      this.defaultIndex = this.options.indexOf(item)
    }
  }
}
</script>
