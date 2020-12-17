import { PromiseResult } from '@/plugins/axios'
import VantService from '@/service/VantService'
import { VanToast } from 'vant/types/toast'
import BaseAbstract from './BaseAbstract'

export default abstract class HrAbstract extends BaseAbstract {
  abstract index(params: { page: number }): Promise<PromiseResult>
  abstract show(): Promise<PromiseResult>
  abstract pay(params: { user_coupon_id: string }): Promise<{ message: string }>
  abstract getContacts(): Promise<PromiseResult>
  abstract view(params: { id: string; su: string }): Promise<PromiseResult>
  abstract complaint(params: { complaint_type: string; complaint_content: string }): Promise<PromiseResult>
  abstract isComplaint(): Promise<PromiseResult>
  abstract authIndex(params: { page: number }): Promise<PromiseResult>
  abstract authShow(): Promise<PromiseResult>
  abstract store(params: { id: string }): Promise<PromiseResult>
  abstract update(params: any): Promise<PromiseResult>
  abstract destroy(id: string): Promise<PromiseResult>
  abstract refreshUpdateAt(id: string): Promise<PromiseResult>
  abstract updateDisable(id: string): Promise<PromiseResult>
  abstract getFirstUsableCoupon(): Promise<void>
  abstract getUsableCoupon(params: { page: number }): Promise<PromiseResult>
  abstract recommendList(params: { page: number; limit: number }): Promise<PromiseResult>
  protected checkPayOrder (callback: Function) {
    const queryNum = 3
    let queriedNum = 0
    let loading!: VanToast
    const check = (intervalTime: number) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          callback()
            .then((res: any) => {
              resolve(res)
            })
            .catch((err: any) => {
              reject(err)
            })
        }, intervalTime)
      })
    }

    const keepCheck = (): Promise<any> => {
      queriedNum++
      if (queriedNum === 1) {
        loading = VantService.toast.loading('订单验证中...')
      }
      return check(queriedNum > 1 ? 1000 : 0)
        .then((res) => {
          loading.clear()
          return res
        })
        .catch(() => {
          if (queriedNum === queryNum) {
            loading.clear()
            const err = { message: '支付失败' }
            return Promise.reject(err)
          }
          return keepCheck()
        })
    }

    return keepCheck()
  }
}
