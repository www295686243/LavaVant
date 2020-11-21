<template>
  <div class="ViewCityFilter" @click="handleClick">
    <span :class="{ active: !!text, down: isShow }">地区{{text}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PopupAreaService from '@/components/Popup/PopupAreaService'

@Component
export default class ViewCityFilter extends Vue {
  @Prop()
  value!: number

  private Service = new PopupAreaService()
  private innerValue = this.value
  private text = ''
  private isShow = false
  private handleClick () {
    this.isShow = true
    this.Service.open(this.innerValue)
      .then((code: number) => {
        this.isShow = false
        if (this.innerValue !== code) {
          this.innerValue = code
          this.$emit('input', this.innerValue)
          this.changeText()
          this.$nextTick(() => {
            this.$emit('change')
          })
        }
      })
      .catch(() => {
        this.isShow = false
      })
  }

  private changeText () {
    this.text = this.innerValue ? ' +1' : ''
  }

  created () {
    this.changeText()
  }
}
</script>

<style lang="less">
.ViewCityFilter {
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
