import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class InfoComplaintService extends BaseModelService {
  name = 'Info/InfoComplaint'

  store (form: { complaint_type: string; complaint_content: string; info_id: string; _model: string }) {
    return axios.post('info_complaint', form)
  }

  getInfoComplaint (params: { info_id: string; _model: string }) {
    return axios.get('info_complaint/getInfoComplaint', params)
  }
}

export default new InfoComplaintService()
