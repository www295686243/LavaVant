<template>
  <van-uploader v-model="fileList" multiple :after-read="handleAfterRead" v-bind="$attrs" />
</template>

<script lang="ts">
import FormMixins from '../FormMixins'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Uploader } from 'vant'
import axios from '@/plugins/axios'
import RouterService from '@/service/RouterService'

interface FileItem {
  file: File;
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
export default class FormBaseImagesBox extends Mixins(FormMixins) {
  @Prop()
  uploadParmas!: { type: string; info_id: string }

  private fileList: FileItem[] = []

  private handleAfterRead (files: FileItem | FileItem[]) {
    if (!Array.isArray(files)) {
      files = [files]
    }
    files
      .map((file) => {
        file.message = '等待上传'
        file.status = 'uploading'
        return file
      })
      .reduce((acc, file) => {
        return acc.then(() => {
          file.message = '上传中...'

          const form = new FormData()
          form.append('file', file.file)
          form.append('info_id', this.uploadParmas.info_id)
          form.append('type', this.uploadParmas.type)
          form.append('marking', RouterService.query('marking') as string)
          return axios.upload('image', form)
            .then((res) => {
              file.status = 'success'
              file.message = ''
              file.url = res.data.url
            })
            .catch(() => {
              file.status = 'failed'
              file.message = '上传失败'
            })
        })
      }, Promise.resolve())
      .then(() => {
        this.innerValue = this.fileList.filter((res) => res.url).map((res) => res.url)
        this.$emit('success')
      })
  }
}
</script>
