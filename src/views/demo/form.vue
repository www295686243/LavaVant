<template>
  <PageContainer>
    <FormRender :onSubmit="handleSubmit" :form="form">
      <FormInput v-model="form.text" :field="formFields.text" />
      <FormTextarea v-model="form.textarea" :field="formFields.textarea" />
      <FormSwitch v-model="form.switch" :field="formFields.switch" />
      <FormCheckbox :text.sync="form.extraText" v-model="form.checkbox" :field="formFields.checkbox" />
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
      <FormImage v-model="form.image" :field="formFields.image" :uploadParmas="{ _model: 'News', info_id: 1 }" />
      <FormImages v-model="form.images" :field="formFields.images" :uploadParmas="{ _model: 'News', info_id: 1 }" />
      <FormClassify v-model="form.classify" :field="formFields.classify"/>
      <FormGroupRender v-model="form.group" :initData="groupForm" title="组合">
        <template v-slot="{ v }">
          <FormDateTime v-model="v.date" :field="groupFormFields.date" />
          <FormInput v-model="v.text1" :field="groupFormFields.text1" />
          <FormInput v-model="v.text2" :field="groupFormFields.text2" />
        </template>
      </FormGroupRender>
    </FormRender>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ValidateService from '@/service/ValidateService'
import { getClassifyOptions } from '@/service/ConstService'

@Component
export default class DemoForm extends Vue {
  private form = {
    text: '',
    textarea: '',
    switch: 1,
    checkbox: [],
    extraText: '',
    select: 2,
    date: '',
    stepper: 1,
    minDate: '2018-01-01',
    maxDate: '2019-12-12',
    minSalary: '',
    maxSalary: '',
    negotiable: 0,
    area: '',
    code: '',
    image: '',
    images: [],
    classify: [111, 112],
    group: [{ date: '2020-01-01', text1: '1', text2: '2' }]
  }

  private formFields = ValidateService.genRules({
    text: {
      label: '输入框',
      rules: [ValidateService.required]
    },
    textarea: {
      label: '文本框',
      rules: [ValidateService.required, ValidateService.max(200)]
    },
    switch: {
      label: '开关'
    },
    checkbox: {
      label: '复选框',
      options: [
        { id: 1, display_name: '选项1' },
        { id: 2, display_name: '选项2' },
        { id: 3, display_name: '选项3' },
        { id: 4, display_name: '三生三世' },
        { id: 5, display_name: '反反复复' },
        { id: 6, display_name: '额鹅鹅鹅' },
        { id: 7, display_name: '凄凄切切' },
        { id: 8, display_name: '啛啛喳喳' }
      ],
      rules: []
    },
    select: {
      label: '下拉框',
      options: [
        { id: 1, display_name: '选项1' },
        { id: 2, display_name: '选项2' },
        { id: 3, display_name: '选项3' }
      ],
      rules: [ValidateService.required]
    },
    date: {
      label: '日期'
    },
    stepper: {
      label: '步进器',
      rules: []
    },
    rangeDate: {
      label: '日期区间'
    },
    rangeSalary: {
      label: '薪资范围',
      rules: [ValidateService.required]
    },
    area: {
      label: '城市',
      rules: []
    },
    code: {
      label: '验证码'
    },
    image: {
      label: '图片',
      rules: []
    },
    images: {
      label: '图片集',
      rules: []
    },
    classify: {
      label: '行业',
      options: getClassifyOptions(),
      rules: []
    }
  })

  private groupForm = {
    date: '',
    text1: '',
    text2: ''
  }

  private groupFormFields = ValidateService.genRules({
    date: {
      label: '日期',
      rules: [ValidateService.required]
    },
    text1: {
      label: '文本1',
      rules: [ValidateService.required]
    },
    text2: {
      label: '文本2',
      rules: [ValidateService.required]
    }
  })

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
