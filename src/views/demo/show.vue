<template>
  <PageContainer :onLoad="handleLoad">
    {{info.title}}
    <PopupQueryContacts :model="model"></PopupQueryContacts>
  </PageContainer>
</template>

<script lang="ts">
import HrResumeService from '@/service/Info/Hr/HrResumeService'
import HrJobService from '@/service/Info/Hr/HrJobService'
import { Component, Vue } from 'vue-property-decorator'
import RouterService from '@/service/RouterService'
import InfoViewService from '@/service/Info/InfoViewService'
import PopupQueryContacts from '@/views/components/Popup/PopupQueryContacts.vue'

@Component({
  components: {
    PopupQueryContacts
  }
})
export default class DemoShow extends Vue {
  private info = {
    title: ''
  }

  private model = ''

  private handleLoad () {
    return Promise.resolve()
      .then(() => {
        if (RouterService.query('type') === 'job') {
          return HrJobService.show()
            .then((res) => {
              InfoViewService.store(HrJobService.name)
              return res
            })
        } else {
          return HrResumeService.show()
            .then((res) => {
              InfoViewService.store(HrResumeService.name)
              return res
            })
        }
      })
      .then((res) => {
        Object.assign(this.info, res.data)
      })
  }

  created () {
    this.model = RouterService.query('type') === 'job' ? 'hrJob' : 'hrResume'
  }
}
</script>

<style lang="less">
</style>
