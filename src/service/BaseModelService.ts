import { getOptions, getOptionsValue2 } from './ConstService'

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

  public getOptionsValue2 (fieldName: string, displayName: string) {
    return getOptionsValue2(this.name + ':' + fieldName, displayName)
  }
}
