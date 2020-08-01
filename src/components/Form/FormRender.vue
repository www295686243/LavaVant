<template>
  <div class="FormRender">
    <van-form ref="formElement">
      <slot></slot>
      <div class="FormRender-btn">
        <ButtonSubmit :onClick="handleSubmit" block round>{{submitBtn}}</ButtonSubmit>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop } from 'vue-property-decorator'
import { Form } from 'vant'

interface FormElement {
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

  private handleSubmit () {
    return this.formElement.validate()
      .then(() => this.onSubmit())
  }
}
</script>

<style lang="less">
.FormRender {
  &-btn {
    padding: @padding-md;
  }
}
</style>
