import axios from '@/plugins/axios'
import BaseModelService from '../BaseModelService'

class TaskRecordService extends BaseModelService {
  name = 'Task/TaskRecord'

  index () {
    return axios.get('task_record')
  }

  shareIndex (page: number) {
    return axios.get('task_record/shareIndex', { page })
  }
}

export default new TaskRecordService()
