import BaseAbstract from '@/abstract/BaseAbstract'
import axios from '@/plugins/axios'

class TaskRecordService extends BaseAbstract {
  name = 'TaskRecord'

  index () {
    return axios.get('task_record')
  }

  shareIndex (page: number) {
    return axios.get('task_record/shareIndex', { page })
  }
}

export default new TaskRecordService()
