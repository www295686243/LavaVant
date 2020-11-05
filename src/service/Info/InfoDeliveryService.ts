import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

interface Params {
  send_info_type: string;
  send_info_id?: string;
  receive_info_type: string;
  receive_info_id: string;
}

class InfoDeliveryService extends BaseModelService {
  name = 'Info/InfoDelivery'

  index () {
    //
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
