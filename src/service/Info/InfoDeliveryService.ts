import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

interface Params {
  send_info_type: string;
  send_info_id?: string;
  receive_info_type: string;
  receive_info_id: string;
}

class InfoDeliveryService extends BaseAbstract {
  name = 'InfoDelivery'

  index (params: { page: number; type: string; receive_info_type?: string; send_info_type?: string }) {
    return axios.get('info_delivery', params)
  }

  show (params: Params) {
    return axios.get('info_delivery/show', params)
  }

  store (form: Params) {
    return axios.post('info_delivery', form)
  }

  getInfoList (send_info_type: string) {
    return axios.get('info_delivery/getInfoList', { send_info_type })
  }
}

export default new InfoDeliveryService()
