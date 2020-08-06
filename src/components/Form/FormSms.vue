<template>
  <van-field
    class="FormSms"
    :placeholder="'请输入短信' + field.label"
    v-model="innerValue"
    :maxlength="6"
    :rules="smsField.code.rules"
    type="digit"
    required
    :name="field.label"
    :label="field.label">
    <ButtonSubmit
      :disabled="isCountDown"
      :onClick="handleSubmit"
      slot="button"
      type="info">
      <template v-if="isCountDown">
        <van-count-down
          ref="countDown"
          :time="sec"
          :auto-start="false"
          format="ss"
          @finish="finished"
        /> s
      </template>
      <template v-else>
        获取验证码
      </template>
    </ButtonSubmit>
  </van-field>
</template>

<script lang="ts">
import FormMixins from './FormMixins'
import { Component, Mixins, Prop, Ref } from 'vue-property-decorator'
import { Field, CountDown } from 'vant'
import ValidateService from '@/service/ValidateService'

interface CountDownElement {
  start: Function;
  reset: Function;
}

@Component({
  components: {
    [Field.name]: Field,
    [CountDown.name]: CountDown
  }
})
export default class FormSms extends Mixins(FormMixins) {
  @Ref()
  countDown!: CountDownElement

  @Prop({ default: () => () => Promise.resolve() })
  readonly onClick!: Function

  private sec = 60 * 1000
  private isCountDown = false
  private smsField = {
    code: ValidateService.genRule({
      label: this.field.label,
      rules: [ValidateService.required, ValidateService.len(6)]
    })
  }

  private handleSubmit () {
    return this.onClick()
      .then(() => {
        this.start()
      })
  }

  private start () {
    this.isCountDown = true
    setTimeout(() => {
      this.countDown.start()
    }, 1000)
  }

  private finished () {
    this.countDown.reset()
    this.isCountDown = false
  }
}
</script>

<style lang="less">
.FormSms {
  padding: 0 16px;
  &:before {
    top: 50%;
    transform: translateY(-60%);
  }
  .van-field__label {
    line-height: 44px;
  }
  .van-count-down {
    display: inline;
    color: @white;
  }
  &.van-field--error {
    .van-field__control {
      color: @gray-8;
    }
    .van-field__control::placeholder {
      color: @gray-5;
    }
  }
}
</style>
