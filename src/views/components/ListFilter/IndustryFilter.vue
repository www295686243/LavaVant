<template>
  <div class="ViewIndustryFilter" @click="handleClick">
    <span :class="{ active: !!text, down: isShow }">行业{{text}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PopupClassifyService from '@/components/Popup/PopupClassifyService'
import cache from '@/plugins/cache'

@Component
export default class ViewIndustryFilter extends Vue {
  @Prop()
  value!: number[]

  private Service = new PopupClassifyService()
  private text = ''
  private isShow = false
  private innerValue = this.value
  private handleClick () {
    this.isShow = true
    this.Service.open(cache.config.get('industry') as any[], this.innerValue)
      .then((res: number[]) => {
        this.innerValue = res
        this.$emit('input', this.innerValue)
        this.changeText()
        this.isShow = false
        this.$nextTick(() => {
          this.$emit('change')
        })
      })
      .catch(() => {
        this.isShow = false
      })
  }

  private changeText () {
    this.text = this.innerValue.length ? ` +${this.innerValue.length}` : ''
  }

  created () {
    this.changeText()
  }
}
</script>

<style lang="less">
.ViewIndustryFilter {
  & > span {
    position: relative;
    padding: 0 @padding-xs;
    &:after {
      content: ' ';
      position: absolute;
      top: 50%;
      right: -@padding-base;
      margin-top: -5px;
      border: 3px solid;
      border-color: transparent transparent #dcdee0 #dcdee0;
      transform: rotate(-45deg);
      opacity: .8;
    }
    &.down {
      &:after {
        color: @red;
        margin-top: -2px;
        transform: rotate(135deg);
        border-color: transparent transparent currentColor currentColor;
      }
    }
  }
  .active {
    color: @red;
  }
}
</style>
