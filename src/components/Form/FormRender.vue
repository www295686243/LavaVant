<template>
  <DataRender :onLoad="handleLoad" class="FormRender">
    <van-form ref="formElement" :label-width="66" label-align="right">
      <slot></slot>
      <div class="FormRender-btn">
        <ButtonSubmit :onClick="handleSubmit" block round :disabled="disableSubmit">{{submitBtn}}</ButtonSubmit>
      </div>
    </van-form>
  </DataRender>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop, Provide } from 'vue-property-decorator'
import { Form } from 'vant'
import { PromiseResult } from '@/plugins/axios'

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

  @Prop()
  onLoad!: Function

  @Prop()
  form!: { [key: string]: any }

  @Prop({ default: '提 交' })
  submitBtn!: string

  @Prop({ default: false })
  disableSubmit!: boolean

  @Provide()
  FormRenderElement = () => {
    return this.$refs.formElement
  }

  private handleSubmit () {
    return this.validate()
      .then(() => this.onSubmit())
      .catch((err: { name: string; message: string }[]) => {
        if (Array.isArray(err) && err.length > 0) {
          this.formElement.scrollToField(err[0].name)
        }
        throw err
      })
  }

  private handleLoad () {
    return Promise.resolve()
      .then(() => {
        if (this.onLoad) {
          return this.onLoad()
            .then((res: PromiseResult) => {
              Object.keys(this.form).forEach((key) => {
                this.form[key] = res.data[key] || this.form[key]
              })
            })
        }
      })
  }

  public validate (name?: string) {
    return this.formElement.validate(name)
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
