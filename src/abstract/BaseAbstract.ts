import { getOptions, getOptionsItem, getOptionsValue, getStatusValue, getStatusLabel, getValue, getOptionsLabel } from '@/service/ConstService'

export default abstract class BaseAbstract {
  abstract name: string
  displayName!: string
  controllerName!: string
  path!: string // 路由基础地址

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

  public getOptionsLabel (fieldName: string, value: number) {
    return getOptionsLabel(this.name, fieldName, value)
  }

  // eslint-disable-next-line
  public getStatusValue (value: number, _display_name?: string) {
    return getStatusValue(this.name, value, _display_name)
  }

  public getStatusLabel (value: number) {
    return getStatusLabel(this.name, value)
  }

  public getValue (fieldName: string) {
    return getValue(this.name + '@' + fieldName)
  }
}
