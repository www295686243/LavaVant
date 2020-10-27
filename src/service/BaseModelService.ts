import { getOptions, getOptionsItem, getOptionsValue, getStatusValue, getStatusLabel } from './ConstService'

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
    return getOptions(this.name, fieldName)
  }

  public getOptionsItem (fieldName: string, value: number) {
    return getOptionsItem(this.name, fieldName, value)
  }

  // eslint-disable-next-line
  public getOptionsValue (fieldName: string, value: number, _display_name?: string) {
    return getOptionsValue(this.name, fieldName, value, _display_name)
  }

  // eslint-disable-next-line
  public getStatusValue (value: number, _display_name?: string) {
    return getStatusValue(this.name, value, _display_name)
  }

  public getStatusLabel (value: number) {
    return getStatusLabel(this.name, value)
  }
}
