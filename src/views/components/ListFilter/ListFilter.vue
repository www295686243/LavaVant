<template>
  <div class="ViewListFilter">
    <div class="filter-menu van-hairline--bottom">
      <IndustryFilter v-model="form.industry" @change="handleChange"></IndustryFilter>
      <CityFilter v-model="form.city" @change="handleChange"></CityFilter>
      <OrderFilter v-model="form.order" @change="handleChange"></OrderFilter>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IndustryFilter from './IndustryFilter.vue'
import CityFilter from './CityFilter.vue'
import OrderFilter from './OrderFilter.vue'
import UserService from '@/service/User/UserService'

@Component({
  components: {
    IndustryFilter,
    CityFilter,
    OrderFilter
  }
})
export default class ViewListFilter extends Vue {
  private form = {
    industry: UserService.getCurrentRoleInfo().industry.map((res: { id: number }) => res.id),
    city: UserService.getCurrentRoleInfo().city,
    order: 0
  }

  private handleChange () {
    this.$emit('change', this.form)
  }
}
</script>

<style lang="less">
.ViewListFilter {
  height: 44px;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 10;
  .filter-menu {
    display: flex;
    background: @white;
    & > div {
      font-size: @font-size-sm;
      flex: 1 1 0;
      line-height: 44px;
      text-align: center;
      &:active {
        background: @background-color-light;
      }
    }
  }
}
</style>
