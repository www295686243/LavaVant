<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    @close="handleClose"
    get-container="body">
    <van-area
      :area-list="areaList"
      cancel-button-text="清空"
      v-model="innerValue"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Area } from 'vant'
import areaList from '@/assets/json/area'

@Component({
  components: {
    [Area.name]: Area
  }
})
export default class PopupArea extends Vue {
  @Prop()
  defaultValue!: number

  private areaList = areaList
  private isShow = false
  private innerValue = this.defaultValue ? this.defaultValue.toString() : ''
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

  public destroy () {
    this.$destroy()
  }

  private handleCancel () {
    this.close()
    this.resolve(0)
  }

  private handleClose () {
    this.close()
    this.reject()
  }

  private handleConfirm (res: { code: number }[]) {
    this.resolve(Number(res[res.length - 1].code))
    this.close()
  }
}
</script>
