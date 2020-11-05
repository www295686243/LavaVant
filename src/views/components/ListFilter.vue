<template>
  <div class="ListFilter">
    <van-popup
      v-model="innerValue"
      position="right"
      get-container="body"
      class="ListFilter-popup"
      :style="{ height: '100%', width: '80%' }">
      <FormRender :form="form" submitBtn="搜索" :onSubmit="handleSubmit">
        <FilterSearch v-model="form.keyword"></FilterSearch>
        <FormClassify v-model="form.industry" :field="formFields.industry" />
        <FormArea v-model="form.city" :field="formFields.city" />
        <FormDateTime v-model="form.end_time" :field="formFields.end_time" />
      </FormRender>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import FilterSearch from './FilterSearch.vue'
import ValidateService from '@/service/ValidateService'

@Component({
  components: {
    FilterSearch
  }
})
export default class ListFilter extends Vue {
  @Prop({ default: false })
  value!: boolean

  private innerValue: boolean = this.value

  @Watch('innerValue')
  onInnerValue (val: boolean) {
    this.$emit('input', val)
  }

  @Watch('value')
  onIsShow (val: boolean) {
    this.innerValue = val
  }

  private form = {
    industry: [],
    city: 0,
    end_time: '',
    keyword: ''
  }

  private formFields = ValidateService.genRules({
    industry: {
      prop: 'industry',
      label: '行业'
    },
    city: {
      prop: 'city',
      label: '所在城市'
    },
    end_time: {
      prop: 'end_time',
      label: '截止日期'
    }
  })

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        this.$emit('submit', {
          ...this.form,
          search_type: 'filter'
        })
        this.innerValue = false
      })
  }
}
</script>

<style lang="less">
.ListFilter-popup {
  .submit-button {
    padding: 20px;
  }
}
</style>
