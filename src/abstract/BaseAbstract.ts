import { getOptions, getOptionsItem, getOptionsValue, getStatusValue, getStatusLabel, getValue, getOptionsLabel } from '@/service/ConstService'
import VantService from '@/service/VantService'
import { VanToast } from 'vant/types/toast'

export default abstract class BaseAbstract {
  abstract name: string
  displayName!: string
  controllerName!: string
  path!: string // 路由基础地址

  public getModelName () {
    return this.name
  }

  public getControllerName () {
    return this.controllerName || this.name
  }

  public getPermissionName (name: string) {
    return this.getControllerName() + 'Controller@' + name
  }

  public getOptions (fieldName: string) {
    return getOptions(this.name, fieldName)
  }

  public getOptionsItem (fieldName: string, value: number) {
    return getOptionsItem(this.name, fieldName, value)
  }

  // eslint-disable-next-line
  public getOptionsValue (fieldName: string, value: number, _display_name?: string) {
    return getOptionsValue(this.name, fieldName, value, _display_name)
  }

  public getOptionsLabel (fieldName: string, value: number) {
    return getOptionsLabel(this.name, fieldName, value)
  }

  // eslint-disable-next-line
  public getStatusValue (value: number, _display_name?: string) {
    return getStatusValue(this.name, value, _display_name)
  }

  public getStatusLabel (value: number) {
    return getStatusLabel(this.name, value)
  }

  public getValue (fieldName: string) {
    return getValue(this.name + '@' + fieldName)
  }

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
