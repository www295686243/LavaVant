<template>
  <div class="PopupInfoComplaint">
    <ButtonSubmit
      type="warning"
      :onClick="handleShowPopup"
      icon="service"
      size="small"
      plain
      round>
      投诉
    </ButtonSubmit>
    <van-popup
      class="PopupInfoComplaint-popup"
      v-model="isShowPopup"
      closeable
      round
      close-on-popstate
      get-container="body"
      position="bottom">
      <div class="complaint-container">
        <div class="title">信息投诉</div>
        <div class="complaint-result" v-if="form.id">
          <p v-if="form.is_solve === 0" class="text-color-danger">您的投诉在核实处理中，请等待！</p>
          <p v-if="form.is_solve === 1">投诉结果：<span class="text-color-danger">{{form.handle_content}}</span></p>
          <p v-if="form.is_solve === 1" class="costomer-service">如有疑问，请联系客服微信：<span class="text-color-click" @click="isShowCustomerService = true">yuancaokf</span></p>
        </div>
        <FormRender
          :form="form"
          :onSubmit="handleSubmit"
          :disableSubmit="!!form.id"
          :onLoad="handleLoad">
          <FormRadioGroup v-model="form.complaint_type" :field="formFields.complaint_type"></FormRadioGroup>
          <FormTextarea v-model="form.complaint_content" :field="formFields.complaint_content"></FormTextarea>
        </FormRender>
        <div class="tips-container" v-if="isLoad">
          <p>感谢您的反馈，管理员核实后会有互助券奖励！</p>
          <p>但请不要恶意投诉，会降低在平台上的信誉！</p>
        </div>
      </div>
    </van-popup>
    <van-popup
      class="PopupInfoComplaint-official-account"
      get-container="body"
      closeable
      close-on-popstate
      v-model="isShowOfficialAccount">
      <div class="official-account">
        <p>检测到您未关注【原草互助】公众号</p>
        <p>请扫码识别关注，才能接收处理结果通知！</p>
        <div><img src="@/assets/images/yuancao.jpg" alt="原草网公众号"></div>
      </div>
    </van-popup>
    <van-popup
      class="PopupInfoComplaint-service"
      v-model="isShowCustomerService"
      closeable
      close-on-popstate
      get-container="body">
      <div class="service-img"><img src="@/assets/images/yuancaokf.jpg" alt="原草网客服" width="240" height="240"></div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import RouterService from '@/service/RouterService'
import UserService from '@/service/User/UserService'
import ValidateService from '@/service/ValidateService'
import HrAbstract from '@/abstract/HrAbstract'
import { getOptions } from '@/service/ConstService'

@Component
export default class PopupInfoComplaint extends Vue {
  @Prop()
  Service!: HrAbstract

  private isShowPopup = false
  private isShowOfficialAccount = false
  private isShowCustomerService = false
  private isLoad = false
  private form = {
    id: '',
    info_id: RouterService.query('id'),
    complaint_type: '',
    complaint_content: '',
    handle_content: '',
    is_solve: 0
  }

  private formFields = ValidateService.genRules({
    complaint_type: {
      prop: 'complaint_type',
      label: '投诉类型',
      rules: [ValidateService.required],
      disabled: false,
      options: getOptions('InfoComplaint', 'complaint_type')
    },
    complaint_content: {
      prop: 'complaint_content',
      label: '投诉内容',
      rules: [ValidateService.required, ValidateService.max(255)],
      disabled: false
    }
  })

  private handleShowPopup () {
    this.isShowPopup = true
  }

  private handleLoad () {
    return this.Service.isComplaint()
      .then((res) => {
        Object.assign(this.form, res.data)
        this.isLoad = true
        this.handleToggleFormDisabled(!!this.form.id)
      })
  }

  private handleSubmit () {
    return this.Service.complaint(this.form)
      .then((res) => {
        this.isShowPopup = false
        this.isShowOfficialAccount = UserService.info.is_follow_official_account === 0
        this.form.id = res.data.id
        this.handleToggleFormDisabled(!!this.form.id)
        return res
      })
  }

  private handleToggleFormDisabled (bool: boolean) {
    Object.keys(this.formFields).forEach((key: string) => {
      this.formFields[key].disabled = bool
    })
  }
}
</script>

<style lang="less">
.PopupInfoComplaint {
  & > .ButtonSubmit {
    display: block;
    border: 0;
    color: @text-link-color;
  }
}
.PopupInfoComplaint-popup {
  .complaint-container {
    padding: 16px 0;
    .complaint-result {
      padding: 16px;
      background: #f8f8f8;
      margin: 0 16px 16px;
      border-radius: 8px;
      .costomer-service {
        font-size: 12px;
        color: #666;
      }
    }
    .title {
      font-size: 16px;
      text-align: center;
      padding-bottom: 12px;
    }
    .tips-container {
      padding: 4px 16px 0;
      font-size: 12px;
      color: #999;
    }
  }
}
.PopupInfoComplaint-official-account {
  max-width: 300px;
  .official-account {
    padding-top: 28px;
    p {
      padding: 4px 16px;
    }
  }
  .van-popup__close-icon--top-right {
    top: 8px;
    right: 8px;
  }
}
.PopupInfoComplaint-service {
  .service-img {
    padding: 10px;
  }
  .van-popup__close-icon--top-right {
    top: 6px;
    right:6px;
  }
}
</style>
