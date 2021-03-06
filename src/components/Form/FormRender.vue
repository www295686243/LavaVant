<template>
  <DataRender :onLoad="handleLoad" class="FormRender">
    <van-form ref="formElement" :label-width="labelWidth" label-align="right">
      <slot></slot>
      <div class="FormRender-btn" v-if="disableFooter === false">
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
import RouterService from '@/service/RouterService'

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
  getOptions: Function;
  getOptionsValue: Function;
  getStatusValue: Function;
  getStatusLabel: Function;
  getOptionsItem: Function;
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
  onLoadAfter!: Function

  @Prop()
  form!: { [key: string]: any }

  @Prop({ default: '提 交' })
  submitBtn!: string

  @Prop({ default: false })
  disableSubmit!: boolean

  @Prop()
  Service!: Service

  @Prop({ default: 66 })
  labelWidth!: number

  @Prop({ default: false })
  disableFooter!: boolean

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
          if (this.isInPopup() === false) {
            RouterService.go()
          }
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
      .then(() => {
        if (this.onLoadAfter) {
          return this.onLoadAfter()
        }
      })
  }

  public validate (name?: string) {
    return this.formElement.validate(name)
  }

  private isInPopup () {
    function getParent ($node: Vue): boolean {
      const result = $node ? $node.$el.className.includes('van-popup') : false
      if (result) {
        return result
      } else if ($node.$parent) {
        return getParent($node.$parent)
      } else {
        return false
      }
    }
    return getParent(this.$parent)
  }
}
</script>

<style lang="less">
.FormRender {
  .FormRender-btn {
    padding: @padding-md;
  }
  .van-field__label--right {
    padding-right: 0;
  }
}
</style>
