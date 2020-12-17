<template>
  <div class="FormGroupPopup">
    <van-panel class="panel-container">
      <template slot="header">
        <van-cell :title="title">
          <van-button @click="createGroup" icon="add-o" type="info" size="mini" round plain>添加{{title}}</van-button>
        </van-cell>
      </template>
      <template v-for="(v, index) in innerValue">
        <div :key="index" class="FormGroup-item van-hairline--bottom">
          <FormText :value="getValue(v, field)" :field="field" v-for="field in fields" :key="field.prop"/>
          <van-icon name="close" class="clear right" @click="removeGroup(index)" />
          <van-icon name="bianji" class-prefix="zz-icon" class="edit right" @click="editGroup(index)" />
        </div>
      </template>
    </van-panel>
    <van-popup
      v-model="isShowPopup"
      position="bottom"
      :close-on-click-overlay="false"
      closeable
      round
      close-on-popstate
      class="FormGroupPopupContainer"
      get-container="body">
      <div class="title">添加{{title}}</div>
      <FormRender :form="innerForm" :onSubmit="handleSubmit">
        <slot :v="innerForm"></slot>
      </FormRender>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Panel } from 'vant'
import { FormFieldItem } from '@/service/ValidateService'
import VantService from '@/service/VantService'

@Component({
  components: {
    [Panel.name]: Panel
  }
})
export default class FormGroupPopup extends Vue {
  @Prop()
  title!: string

  @Prop()
  value!: any[]

  @Prop()
  initForm!: { [key: string]: any }

  @Prop()
  fields!: FormFieldItem[]

  private innerValue: any[] = this.value || []
  private isShowPopup = false
  private innerForm = {}
  private isEdit = false

  private getValue (row: any, field: FormFieldItem) {
    let value = ''
    if (field.valueFormat) {
      value = field.valueFormat
      Object.keys(row).forEach((key) => {
        value = value.replace(key, row[key])
      })
      return value
    } else {
      const innerValue = row[field.prop as string]
      if (Array.isArray(innerValue) && (field.prop as string).includes('images')) {
        return innerValue.length + '张图片'
      } else {
        return innerValue
      }
    }
  }

  private createGroup () {
    Object.keys(this.initForm).forEach((key) => {
      this.$set(this.innerForm, key, this.initForm[key])
    })
    // this.innerForm = JSON.parse(JSON.stringify(this.initForm))
    this.isShowPopup = true
  }

  private removeGroup (index: number) {
    VantService.confirm('您真的要删除吗?')
      .then(() => {
        this.innerValue.splice(index, 1)
      })
  }

  private editGroup (index: number) {
    this.isEdit = true
    this.innerForm = this.innerValue[index]
    this.isShowPopup = true
  }

  private handleSubmit () {
    if (this.isEdit === false) {
      this.innerValue.push(this.innerForm)
    }
    this.isEdit = false
    this.isShowPopup = false
  }
}
</script>

<style lang="less">
.FormGroupPopupContainer {
  .title {
    text-align: center;
    font-size: @font-size-lg;
    padding: @padding-md 0 @padding-xs;
  }
}
.FormGroupPopup {
  .FormText {
    padding: 4px 40px 4px 12px;
  }
  .FormGroup-item {
    padding: 4px 0;
    position: relative;
    .van-field--disabled .van-field__label {
      color: @gray-7;
    }
    .van-field__control:disabled {
      color: @gray-7;
      -webkit-text-fill-color: @gray-7;
    }
    .van-cell--required:before {
      display: none;
    }
    .van-cell:after {
      border-bottom: none;
    }
    .clear,
    .edit {
      position: absolute;
      left: 15px;
      font-size: 20px;
      &.right {
        left: initial;
        right: 15px;
      }
    }
    .edit {
      color: @green;
      top: 12px;
    }
    .clear {
      top: 48px;
      color: @red;
    }
  }
}
</style>
