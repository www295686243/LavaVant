import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { FormField } from '@/service/ValidateService'

@Component
export default class FormMixins extends Vue {
  @Prop()
  field!: FormField

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
