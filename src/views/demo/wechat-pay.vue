<template>
  <PageContainer>
    <van-radio-group v-model="id">
      <van-cell-group>
        <ListContainer :onLoad="handleLoad">
          <template v-slot="{ v }">
            <van-cell :title="v.text" clickable @click="id = v.id">
              <template #right-icon>
                <van-radio :name="v.id" />
              </template>
            </van-cell>
          </template>
        </ListContainer>
      </van-cell-group>
    </van-radio-group>
    <ButtonSubmit :onClick="handleSubmit">支付</ButtonSubmit>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WXService from '@/service/WXService'
import axios from '@/plugins/axios'
import { RadioGroup, Radio } from 'vant'

@Component({
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  }
})
export default class DemoWeChatShare extends Vue {
  private id = ''
  private handleLoad (page: number) {
    return axios.get('news', { page })
      .then((res) => res.data.data)
  }

  private handleSubmit () {
    return WXService.pay({ id: this.id })
  }
}
</script>

<style lang="less">
</style>
