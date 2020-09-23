import { getOptions } from './ConstService'

export default abstract class BaseModelService {
  abstract name: string
  controllerName!: string

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