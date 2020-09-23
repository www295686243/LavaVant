<template>
  <FormRender :Service="UserPersonalService" :form="form">
    <FormImage v-model="form.avatar" :field="formFields.avatar" />
    <FormCheckboxGroup v-model="form.tags" :field="formFields.tags" type="label-string" />
    <FormGroupRender v-model="form.education_experience" :initData="educationExperienceForm" title="教育经历">
      <template v-slot="{ v }">
        <FormRangeDate
          :min-value.sync="v.minDate"
          :max-value.sync="v.maxDate"
          :field="educationExperienceFields.rangeDate" />
        <FormInput v-model="v.school" :field="educationExperienceFields.school" />
        <FormInput v-model="v.profession" :field="educationExperienceFields.profession" />
      </template>
    </FormGroupRender>
  </FormRender>
</template>

<script lang="ts">
import ValidateService from '@/service/ValidateService'
import { Component, Vue } from 'vue-property-decorator'
import UserPersonalService from '@/service/User/UserPersonalService'

@Component
export default class UserPersonalDetail extends Vue {
  private UserPersonalService = UserPersonalService
  private form = {
    id: 1,
    avatar: '',
    tags: '',
    education_experience: [],
    work_experience: [],
    honorary_certificate: []
  }

  private educationExperienceForm = {
    minDate: '',
    maxDate: '',
    school: '',
    profession: ''
  }

  private formFields = ValidateService.genRules({
    avatar: {
      prop: 'avatar',
      label: '个人头像'
    },
    tags: {
      prop: 'tags',
      label: '个人标签'
    }
  })

  private educationExperienceFields = ValidateService.genRules({
    rangeDate: {
      prop: 'rangeDate',
      label: '日期',
      rules: [ValidateService.required]
    },
    school: {
      prop: 'school',
      label: '学校',
      rules: [ValidateService.required, ValidateService.max(30)]
    },
    profession: {
      prop: 'profession',
      label: '专业',
      rules: [ValidateService.required, ValidateService.max(30)]
    }
  })
}
</script>
