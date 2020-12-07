import { PromiseResult } from '@/plugins/axios'
import BaseAbstract from './BaseAbstract'

export default abstract class HrAbstract extends BaseAbstract {
  abstract index(params: { page: number }): Promise<PromiseResult>
  abstract show(): Promise<PromiseResult>
  abstract pay(params: { user_coupon_id: string }): Promise<{ message: string }>
  abstract getContacts(): Promise<PromiseResult>
  abstract view(params: { id: string; su: string }): Promise<PromiseResult>
  abstract complaint(params: { complaint_type: string; complaint_content: string }): Promise<PromiseResult>
  abstract isComplaint(): Promise<PromiseResult>
}
