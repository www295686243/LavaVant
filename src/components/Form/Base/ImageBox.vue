<template>
  <van-uploader v-model="fileList" :max-count="1" :after-read="handleAfterRead" @delete="handleDelete" v-bind="$attrs" />
</template>

<script lang="ts">
import FormMixins from '../FormMixins'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { Uploader } from 'vant'
import axios from '@/plugins/axios'
import VantService from '@/service/VantService'
import RouterService from '@/service/RouterService'

interface FileItem {
  file?: File;
  status: string;
  message: string;
  content: string;
  url: string;
}

@Component({
  inheritAttrs: false,
  components: {
    [Uploader.name]: Uploader
  }
})
export default class FormBaseImageBox extends Mixins(FormMixins) {
  @Prop()
  uploadParmas!: { _model: string; info_id: string }

  @Watch('value')
  onValue2 () {
    this.init()
  }

  private fileList: FileItem[] = []

  private handleAfterRead (file: FileItem) {
    file.status = 'uploading'
    file.message = '上传中...'

    const form = new FormData()
    form.append('file', file.file as File)
    form.append('info_id', this.uploadParmas.info_id)
    form.append('_model', this.uploadParmas._model)
    form.append('marking', RouterService.query('marking') as string)
    axios.upload('image', form)
      .then((res) => {
        file.status = 'success'
        file.message = ''
        this.innerValue = res.data.full_url
        this.$emit('success')
      })
      .catch((err) => {
        file.status = 'failed'
        file.message = '上传失败'
        if (err && err.message) {
          VantService.toast.fail(err.message)
        }
      })
  }

  private handleDelete () {
    this.innerValue = ''
  }

  private init () {
    if (this.innerValue) {
      this.fileList = [{
        url: this.innerValue,
        status: 'success',
        message: '',
        content: ''
      }]
    }
  }

  created () {
    this.init()
  }
}
</script>
