import { Dialog, Toast } from 'vant'
import { ToastOptions } from 'vant/types/toast'
import { DialogOptions } from 'vant/types/dialog'

class VantService {
  alert (message: string, params?: DialogOptions) {
    return Dialog.alert({
      ...params,
      message
    })
  }

  confirm (message: string, params?: DialogOptions) {
    return Dialog.confirm({
      ...params,
      message
    })
  }

  toast = {
    success (message: string, params?: ToastOptions) {
      Toast.success({
        ...params,
        message
      })
    },
    fail (message: string, params?: ToastOptions) {
      Toast.fail({
        ...params,
        message
      })
    },
    loading (message: string, params?: ToastOptions) {
      return Toast.loading({
        ...params,
        message,
        className: (params && params.className) || 'vant-toast-loading'
      })
    }
  }

  delay () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000000)
    })
  }
}

export default new VantService()
