<template>
  <div class="FormRender">
    <van-form ref="formElement" :label-width="66" label-align="right">
      <slot></slot>
      <div class="FormRender-btn">
        <ButtonSubmit :onClick="handleSubmit" block round>{{submitBtn}}</ButtonSubmit>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop, Provide } from 'vue-property-decorator'
import { Form } from 'vant'

export interface FormElement {
  submit: Function;
  validate: Function;
  resetValidation: Function;
  scrollToField: Function;
}

@Component({
  components: {
    [Form.name]: Form
  }
})
export default class FormRender extends Vue {
  @Ref()
  formElement!: FormElement

  @Prop({ default: () => () => Promise.resolve() })
  onSubmit!: Function

  @Prop({ default: '提交' })
  submitBtn!: string

  @Provide()
  FormRenderElement = () => {
    return this.$refs.formElement
  }

  private handleSubmit () {
    return this.formElement.validate()
      .then(() => this.onSubmit())
      .catch((err: { name: string; message: string }[]) => {
        if (Array.isArray(err) && err.length > 0) {
          this.formElement.scrollToField(err[0].name)
        }
        throw err
      })
  }
}
</script>

<style lang="less">
.FormRender {
  &-btn {
    padding: @padding-md;
  }
  .van-field__label--right {
    padding-right: 8px;
  }
}
</style>
