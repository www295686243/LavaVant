import myCoupon from '@/views/user/coupon/my-coupon.vue'
import sellCoupon from '@/views/user/coupon/sell-coupon.vue'
import mySellCoupon from '@/views/user/coupon/my-sell-coupon.vue'

export default [
  {
    path: '/user/coupon/my-coupon',
    component: myCoupon,
    meta: {
      title: '我的互助券'
    }
  },
  {
    path: '/user/coupon/sell-coupon',
    component: sellCoupon,
    meta: {
      title: '出售互助券'
    }
  },
  {
    path: '/user/coupon/my-sell-coupon',
    component: mySellCoupon,
    meta: {
      title: '在售互助券'
    }
  }
]
