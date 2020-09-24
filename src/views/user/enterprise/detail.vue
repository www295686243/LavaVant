<template>
  <FormRender :Service="UserEnterpriseService" :onSubmitAfter="handleSubmitAfter" :form="form">
    <FormImage v-model="form.avatar" :field="formFields.avatar" :uploadParmas="{ _type: UserEnterpriseService.name, info_id: form.user_id }" />
    <FormSelect v-model="form.company_scale" :field="formFields.company_scale" />
    <FormTextarea v-model="form.intro" :field="formFields.intro" />
    <FormCheckboxGroup v-model="form.tags" :field="formFields.tags" type="label-string" :border="false"/>
    <FormImages v-model="form.company_images" :field="formFields.company_images" :uploadParmas="{ _type: UserEnterpriseService.name, info_id: form.user_id }" />
  </FormRender>
</template>

<script lang="ts">
import ValidateService from '@/service/ValidateService'
import { Component, Vue } from 'vue-property-decorator'
import UserEnterpriseService from '@/service/User/UserEnterpriseService'
import RouterService from '@/service/RouterService'

@Component
export default class UserEnterpriseDetail extends Vue {
  private UserEnterpriseService = UserEnterpriseService
  private form = {
    id: 1,
    user_id: '',
    avatar: '',
    company_scale: '',
    intro: '',
    tags: '',
    company_images: []
  }

  private formFields = ValidateService.genRules({
    avatar: {
      prop: 'avatar',
      label: '企业logo'
    },
    company_scale: {
      prop: 'company_scale',
      label: '企业规模'
    },
    intro: {
      prop: 'intro',
      label: '公司简介'
    },
    tags: {
      prop: 'tags',
      label: '企业标签'
    },
    company_images: {
      prop: 'company_images',
      label: '公司图片',
      placeholder: '上传公司介绍相片',
      rules: [ValidateService.max(20)]
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
