import { PromiseResult } from '@/plugins/axios'
import BaseAbstract from './BaseAbstract'

export default abstract class HrAbstract extends BaseAbstract {
  abstract index(params: { page: number }): Promise<PromiseResult>
  abstract show(): Promise<PromiseResult>
  abstract pay(params: { user_coupon_id: string }): Promise<{ message: string }>
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
}
