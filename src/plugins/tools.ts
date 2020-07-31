import areaList from '@/assets/json/area'

const ua = window.navigator.userAgent
export const isWX = /MicroMessenger/ig.test(ua)
export const isWXDev = /wechatdevtools/ig.test(ua)
export const isIOS = /iP(ad|hone|od)/.test(ua)
export const isAndroid = /(android|adr)/ig.test(ua)
export const isPCWX = /WindowsWechat|MacWechat/ig.test(ua)

// 根据code获取省市区
export function getCityName (code: string, format = '/'): string {
  if (!code) return '--'
  code = code.toString()
  const provinceCode = code.substring(0, 2) + '0000'
  const cityCode = code.substring(0, 4) + '00'
  const countyCode = code
  const provinceName = (areaList as any).province_list[provinceCode]
  const cityName = (areaList as any).city_list[cityCode]
  const countyName = (areaList as any).county_list[countyCode]
  if (provinceName === cityName) {
    return provinceName + format + countyName
  } else {
    return provinceName + format + cityName + format + countyName
  }
}

/**
 * 格式化日期
 * @param value
 * @param fmt Y-m-d/Y-m-d H:i/Y-m
 */
export function formatDate (value: Date, fmt = 'Y-m-d') {
  const date = value ? new Date(value) : new Date()
  const year = date.getFullYear()
  let month: string = (date.getMonth() + 1) + ''
  let day: string = date.getDate() + ''
  let hours: string = date.getHours() + ''
  let minutes: string = date.getMinutes() + ''
  let seconds: string = date.getSeconds() + ''
  if (month.length === 1) {
    month = '0' + month
  }
  if (day.length === 1) {
    day = '0' + day
  }
  if (hours.length === 1) {
    hours = '0' + hours
  }
  if (minutes.length === 1) {
    minutes = '0' + minutes
  }
  if (seconds.length === 1) {
    seconds = '0' + seconds
  }
  if (fmt === 'Y-m-d H:i') {
    return `${year}-${month}-${day} ${hours}:${minutes}`
  } else if (fmt === 'Y-m') {
    return `${year}-${month}`
  } else {
    return `${year}-${month}-${day}`
  }
}

// 根据最后一级的id获取整个path
export function getSelectedPaths (id: number, data: any[]) {
  const paths: any[] = []
  function recursiveQuery (id: number) {
    const item = data.find((res: any) => res.id === id)
    if (item) {
      paths.unshift(item)
      if (item.parent_id) {
        recursiveQuery(item.parent_id)
      }
    }
  }
  recursiveQuery(id)
  return paths
}
