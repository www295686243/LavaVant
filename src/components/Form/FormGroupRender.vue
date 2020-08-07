<template>
  <div class="FormGroupRender">
    <van-panel :title="title" class="panel-container">
      <slot slot="header" name="header"></slot>
      <van-form ref="formElement" :label-width="66" label-align="right">
        <template v-for="(v, index) in innerValue">
          <div :key="index" class="FormGroup-item van-hairline--bottom">
            <slot :index="index" :v="v"></slot>
            <van-icon name="clear" class="clear" @click="removeGroup(index)" v-if="index !== 0" />
          </div>
        </template>
      </van-form>
      <div class="btn-location">
        <van-button @click="createGroup" icon="add-o" type="info" size="small" round plain>添加{{title}}</van-button>
      </div>
    </van-panel>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { Panel, Form } from 'vant'
import { FormElement } from './FormRender.vue'
import VantService from '@/service/VantService'

@Component({
  components: {
    [Panel.name]: Panel,
    [Form.name]: Form
  }
})
export default class FormGroupRender extends Vue {
  @Ref()
  formElement!: FormElement

  @Prop()
  title!: string

  @Prop()
  value!: any[]

  @Prop()
  initData!: { [key: string]: any }

  private innerValue: any[] = this.value || []

  private createGroup () {
    return this.formElement.validate()
      .then(() => {
        this.innerValue.push(JSON.parse(JSON.stringify(this.initData)))
      })
      .catch((err: { name: string; message: string }[]) => {
        if (Array.isArray(err) && err.length > 0) {
          this.formElement.scrollToField(err[0].name)
        }
      })
  }

  private removeGroup (index: number) {
    VantService.confirm('您真的要删除吗?')
      .then(() => {
        this.innerValue.splice(index, 1)
      })
  }

  mounted () {
    if (this.innerValue.length === 0) {
      this.createGroup()
    }
  }
}
</script>

<style lang="less">
.FormGroupRender {
  .FormGroup-item {
    position: relative;
    .van-cell--required:before {
      display: none;
    }
    .van-cell:after {
      border-bottom: none;
    }
    .clear {
      position: absolute;
      top: 12px;
      left: 15px;
      color: #ee0a24;
      font-size: 20px;
      &.right {
        left: initial;
        right: 15px;
        top: 10px;
      }
    }
  }
  .btn-location {
    text-align: center;
    padding: 8px 0 15px;
  }
  .panel-container {
    margin-top: 10px;
  }
}
</style>
