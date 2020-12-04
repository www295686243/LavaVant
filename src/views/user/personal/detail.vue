<template>
  <FormRender :Service="UserPersonalService" :onSubmitAfter="handleSubmitAfter" :form="form">
    <FormImage v-model="form.avatar" :field="formFields.avatar" :uploadParmas="{ _model: UserPersonalService.name, info_id: form.user_id }" />
    <FormCheckboxGroup v-model="form.tags" :field="formFields.tags" type="label-string" :border="false"/>
    <FormGroupPopup
      v-model="form.education_experience"
      :initForm="educationExperienceForm"
      :fields="educationExperienceFields"
      title="教育经历">
      <template v-slot="{ v }">
        <FormRangeDate
          :min-value.sync="v.minDate"
          :max-value.sync="v.maxDate"
          :field="educationExperienceFields.rangeDate" />
        <FormInput v-model="v.school" :field="educationExperienceFields.school" />
        <FormInput v-model="v.profession" :field="educationExperienceFields.profession" />
      </template>
    </FormGroupPopup>
    <FormGroupPopup
      v-model="form.work_experience"
      :initForm="workExperienceForm"
      :fields="workExperienceFields"
      title="工作经历">
      <template v-slot="{ v }">
        <FormRangeDate
          :min-value.sync="v.minDate"
          :max-value.sync="v.maxDate"
          :field="workExperienceFields.rangeDate" />
        <FormInput v-model="v.company" :field="workExperienceFields.company" />
        <FormInput v-model="v.position" :field="workExperienceFields.position" />
        <FormArea v-model="v.city" :field="workExperienceFields.city" />
        <FormInput v-model="v.address" :field="workExperienceFields.address" />
      </template>
    </FormGroupPopup>
    <FormGroupPopup
      v-model="form.honorary_certificate"
      :initForm="honoraryCertificateForm"
      :fields="honoraryCertificateFields"
      title="荣誉证书">
      <template v-slot="{ v }">
        <FormInput v-model="v.name" :field="honoraryCertificateFields.name" />
        <FormImages v-model="v.images" :field="honoraryCertificateFields.images" :uploadParmas="{ _model: UserPersonalService.name, info_id: form.user_id }" />
      </template>
    </FormGroupPopup>
  </FormRender>
</template>

<script lang="ts">
import ValidateService from '@/service/ValidateService'
import { Component, Vue } from 'vue-property-decorator'
import UserPersonalService from '@/service/User/UserPersonalService'
import RouterService from '@/service/RouterService'

@Component
export default class UserPersonalDetail extends Vue {
  private UserPersonalService = UserPersonalService
  private form = {
    id: 1,
    user_id: '',
    avatar: '',
    tags: '',
    education_experience: [],
    work_experience: [],
    honorary_certificate: [],
    is_check: false
  }

  private educationExperienceForm = {
    minDate: '',
    maxDate: '',
    school: '',
    profession: ''
  }

  private workExperienceForm = {
    minDate: '',
    maxDate: '',
    company: '',
    position: '',
    city: '',
    address: ''
  }

  private honoraryCertificateForm = {
    name: '',
    images: []
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
      rules: [ValidateService.required],
      valueFormat: 'minDate ~ maxDate'
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

  private workExperienceFields = ValidateService.genRules({
    rangeDate: {
      prop: 'rangeDate',
      label: '日期',
      rules: [ValidateService.required],
      valueFormat: 'minDate ~ maxDate'
    },
    company: {
      prop: 'company',
      label: '公司名',
      rules: [ValidateService.required, ValidateService.max(60)]
    },
    position: {
      prop: 'position',
      label: '职位',
      rules: [ValidateService.required, ValidateService.max(20)]
    },
    city: {
      prop: 'city',
      label: '城市',
      rules: [ValidateService.required]
    },
    address: {
      prop: 'address',
      label: '街道地址',
      rules: [ValidateService.required, ValidateService.max(30)]
    }
  })

  private honoraryCertificateFields = ValidateService.genRules({
    name: {
      prop: 'name',
      label: '证书名称',
      rules: [ValidateService.required, ValidateService.max(20)]
    },
    images: {
      prop: 'images',
      label: '证书图片',
      placeholder: '请上传证书图片',
      rules: [ValidateService.uploadRequired, ValidateService.max(6)]
    }
  })

  private handleSubmitAfter (res: any) {
    return Promise.resolve()
      .then(() => {
        if (RouterService.query('toPath')) {
          RouterService.replace(RouterService.query('toPath'))
        } else {
          RouterService.go(-2)
        }
        return res
      })
  }
}
</script>

<style lang="less" scoped>
.FormGroupPopup {
  margin-top: @padding-md;
}
</style>
