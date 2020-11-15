import cache from '@/plugins/cache'

export interface OptionItem {
  id: string;
  config_id: number;
  display_name: string;
  value: number;
  name: string;
  disabled: boolean;
  [key: string]: any;
}

export interface ConfigItem {
  id: string;
  name: string;
  display_name: string;
  guard_name: string;
  options: OptionItem[];
}

interface Rewards {
  give_number: number;
  coupon_template_id: number;
}

function resolveClassName (name: string) {
  if (name.includes('App\\Models')) {
    name = name.replace('App\\Models\\', '')
    name = name.replaceAll('\\', '/')
    return name
  }
  return name
}

export function getClassifyOptions () {
  return [
    {
      id: 1,
      display_name: '行业1',
      children: [
        {
          id: 11,
          display_name: '行业1-1',
          children: [
            {
              id: 111,
              display_name: '行业1-1-1'
            },
            {
              id: 112,
              display_name: '行业1-1-2'
            }
          ]
        },
        {
          id: 12,
          display_name: '行业1-2',
          children: [
            {
              id: 121,
              display_name: '行业1-2-1'
            },
            {
              id: 122,
              display_name: '行业1-2-2'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      display_name: '行业2',
      children: [
        {
          id: 21,
          display_name: '行业2-1',
          children: [
            {
              id: 211,
              display_name: '行业2-1-1'
            },
            {
              id: 212,
              display_name: '行业2-1-2'
            }
          ]
        },
        {
          id: 22,
          display_name: '行业2-2',
          children: [
            {
              id: 221,
              display_name: '行业2-2-1'
            },
            {
              id: 222,
              display_name: '行业2-2-2'
            }
          ]
        }
      ]
    }
  ]
}

export function getValue (name: string) {
  const configs = cache.config.get('config') || []
  const item = configs.find((res: { name: string }) => res.name === name)
  return item ? item.value : ''
}

export function getOptions (className: string, field: string) {
  className = resolveClassName(className)
  const configs: ConfigItem[] = cache.config.get('options') || []
  let config = configs.find((res) => res.name === className + ':' + field)
  if (!config) {
    config = configs.find((res) => res.name === '_global:' + field)
  }
  return config ? config.options : []
}

export function getOptionsItem (className: string, field: string, value: number) {
  className = resolveClassName(className)
  const options = getOptions(className, field)
  const item = options.find((res) => res.value === value)
  return item
}

export function getOptionsLabel (className: string, field: string, value: number) {
  className = resolveClassName(className)
  const item = getOptionsItem(className, field, value)
  return item ? item.display_name : ''
}

// eslint-disable-next-line
export function getOptionsValue (className: string, field: string, value: number, _display_name?: string) {
  className = resolveClassName(className)
  const item = getOptionsItem(className, field, value)
  return item ? item.value : 0
}

export function getStatusLabel (className: string, value: number) {
  className = resolveClassName(className)
  return getOptionsLabel(className, 'status', value)
}

export function getStatusValue (className: string, value: number, _display_name?: string) {
  className = resolveClassName(className)
  return getOptionsValue(className, 'status', value, _display_name)
}

function getCouponTemplateName (coupon_template_id: number) {
  const item = (cache.config.get('coupon_template') || []).find((res: { id: number }) => res.id === coupon_template_id)
  return item ? item.display_name : '--'
}

export function getRewardCoupons (rewards: Rewards[]) {
  return rewards.map((res) => {
    return `${getCouponTemplateName(res.coupon_template_id)}${res.give_number}张`
  }).join()
}

const modelNames = {
  hrJob: {
    model: 'Info/Hr/HrJob',
    text: '职位',
    path: 'hr/job'
  },
  hrResume: {
    model: 'Info/Hr/HrResume',
    text: '简历',
    path: 'hr/resume'
  }
} as {
  [key: string]: {
    model: string;
    text: string;
    path: string;
  };
}

export function getModel (name: string) {
  return modelNames[name]
}

class ConstService {
  isDisableFixedHelp = false

  constructor () {
    this.isDisableFixedHelp = cache.other.get('isDisableFixedHelp') === true
  }

  disableFixedHelp () {
    cache.other.set('isDisableFixedHelp', true)
    this.isDisableFixedHelp = true
  }
}

export default new ConstService()
