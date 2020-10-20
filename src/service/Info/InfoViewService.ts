import axios from '@/plugins/axios'
import BaseModelService from '@/service/BaseModelService'
import RouterService from '@/service/RouterService'

class InfoViewService extends BaseModelService {
  name = 'Info/InfoView'
  store (_model: string) {
    return axios.post('info_view', {
      id: RouterService.query('id'),
      _model,
      su: RouterService.query('su')
    })
  }
}

export default new InfoViewService()
