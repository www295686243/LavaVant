import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { FormFieldItem } from '@/service/ValidateService'

@Component
export default class FormMixins extends Vue {
  @Prop()
  field!: FormFieldItem

  @Prop()
  value!: any

  public innerValue: any = this.value || ''

  @Watch('value')
  onValue (val: any) {
    this.innerValue = val
  }

  @Watch('innerValue')
  onInnerValue (val: any) {
    this.$emit('input', val)
  }
}
