<template>
  <DataRender :onLoad="handleLoad" class="FormRender">
    <van-form ref="formElement" :label-width="66" label-align="right">
      <slot></slot>
      <div class="FormRender-btn">
        <slot name="footer">
          <ButtonSubmit :onClick="handleSubmit" block round :disabled="disableSubmit">{{submitBtn}}</ButtonSubmit>
        </slot>
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

export interface Service {
  index: Function;
  show: Function;
  store: Function;
  update: Function;
  destroy: Function;
  refresh: Function;
  getPermissionName: Function;
  getModelName: Function;
  getControllerName: Function;
}

@Component({
  components: {
    [Form.name]: Form
  }
})
export default class FormRender extends Vue {
  @Ref()
  formElement!: FormElement

  @Prop()
  onSubmit!: Function

  @Prop()
  onLoad!: Function

  @Prop()
  onSubmitAfter!: Function

  @Prop()
  form!: { [key: string]: any }

  @Prop({ default: '提 交' })
  submitBtn!: string

  @Prop({ default: false })
  disableSubmit!: boolean

  @Prop()
  Service!: Service

  @Provide()
  formService = this.Service

  @Provide()
  FormRenderElement = () => {
    return this.$refs.formElement
  }

  private handleSubmit () {
    return this.validate()
      .then(() => {
        if (this.onSubmit) {
          return this.onSubmit()
        } else if (this.Service) {
          if (this.form.id) {
            return this.Service.update(this.form)
          } else {
            return this.Service.store(this.form)
          }
        }
      })
      .then((res: PromiseResult) => {
        if (this.onSubmitAfter) {
          return this.onSubmitAfter(res)
        } else {
          return res
        }
      })
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
        } else if (this.form.id && this.Service && this.Service.show) {
          return this.Service.show(this.form.id)
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
  .FormRender-btn {
    padding: @padding-md;
  }
  .van-field__label--right {
    padding-right: 8px;
  }
}
</style>
