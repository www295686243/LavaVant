<template>
  <PageContainer class="view-user-help">
    <HelpText></HelpText>
  </PageContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelpText from '@/views/components/HelpText.vue'

@Component({
  components: {
    HelpText
  }
})
export default class ViewUserHelp extends Vue {
}
</script>
