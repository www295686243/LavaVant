<template>
  <PageContainer>
    <FormRender :onSubmit="handleSubmit">
      <FormInput v-model="form.text" :field="formFields.text" />
      <FormTextarea v-model="form.textarea" :field="formFields.textarea" />
      <FormSwitch v-model="form.switch" :field="formFields.switch" />
      <FormCheckbox v-model="form.checkbox" :field="formFields.checkbox" />
      <FormSelect v-model="form.select" :field="formFields.select" />
      <FormDateTime v-model="form.date" :field="formFields.date" />
      <FormStepper v-model="form.stepper" :field="formFields.stepper" />
      <FormRangeDate
        :min-value.sync="form.minDate"
        :max-value.sync="form.maxDate"
        :field="formFields.rangeDate" />
      <FormSalary
        :isNegotiable.sync="form.negotiable"
        :min-value.sync="form.minSalary"
        :max-value.sync="form.maxSalary"
        :field="formFields.rangeSalary" />
      <FormArea v-model="form.area" :field="formFields.area"/>
      <FormSms v-model="form.code" :field="formFields.code"/>
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'

@Component
export default class DemoForm extends Vue {
  private form = {
    text: '',
    textarea: '',
    switch: 1,
    checkbox: [],
    select: 2,
    date: '',
    stepper: 1,
    minDate: '2018-01-01',
    maxDate: '2019-12-12',
    minSalary: '',
    maxSalary: '',
    negotiable: 0,
    area: '',
    code: ''
  }

  private formFields = {
    text: ValidateService.genRule({
      label: '输入框',
      rules: [ValidateService.required]
    }),
    textarea: ValidateService.genRule({
      label: '文本框',
      rules: [ValidateService.required, ValidateService.max(200)]
    }),
    switch: {
      label: '开关'
    },
    checkbox: {
      label: '复选框',
      options: [
        { id: 1, display_name: '选项1' },
        { id: 2, display_name: '选项2' },
        { id: 3, display_name: '选项3' }
      ]
    },
    select: {
      label: '下拉框',
      options: [
        { id: 1, display_name: '选项1' },
        { id: 2, display_name: '选项2' },
        { id: 3, display_name: '选项3' }
      ]
    },
    date: {
      label: '日期'
    },
    stepper: {
      label: '步进器'
    },
    rangeDate: {
      label: '日期区间'
    },
    rangeSalary: {
      label: '薪资范围'
    },
    area: {
      label: '城市'
    },
    code: {
      label: '验证码'
    }
  }

  private handleSubmit () {
    return Promise.resolve()
      .then(() => {
        console.log(this.form)
      })
  }
}
</script>

<style lang="less">
</style>
