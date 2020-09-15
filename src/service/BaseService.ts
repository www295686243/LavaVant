import { getOptions } from './ConstService'

export default abstract class BaseModelService {
  abstract name: string

  public getOptions (fieldName: string) {
    return getOptions(this.name + ':' + fieldName)
  }

  public getOptionsValue (fieldName: string, displayName: string) {
    const item = (this.getOptions(fieldName) || []).find((res) => res.display_name === displayName)
    if (!item) {
      console.error('选项不存在')
    }
    return item ? item.id : null
  }
}
