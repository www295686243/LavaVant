import cache from '@/plugins/cache'

export interface OptionItem {
  id: number;
  config_id: number;
  display_name: string;
}

export interface ConfigItem {
  id: number;
  name: string;
  display_name: string;
  guard_name: string;
  options: OptionItem[];
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
  const configs = cache.config.get('options') || []
  const item = configs.find((res: { name: string }) => res.name === name)
  return item ? item.value : ''
}

export function getOptions (name: string) {
  const configs: ConfigItem[] = cache.config.get('options') || []
  const config = configs.find((res) => res.name === name)
  return config ? config.options : []
}

// eslint-disable-next-line
export function getOptionsValue (id: number, _displayName?: string) {
  const configs: OptionItem[] = cache.config.get('options_list') || []
  const item = configs.find((res) => res.id === id)
  return item ? item.id : null
}

/**
 * @param name Model:field
 * @param displayName
 */
export function getOptionsValue2 (name: string, displayName: string) {
  const item = (getOptions(name) || []).find((res) => res.display_name === displayName)
  if (!item) {
    console.error('选项不存在')
  }
  return item ? item.id : null
}

export function getOptionsLabel (id: number) {
  const configs: OptionItem[] = cache.config.get('options_list') || []
  const item = configs.find((res) => res.id === id)
  return item ? item.display_name : null
}

export function getGlobalOptions (name: string) {
  const configs: ConfigItem[] = cache.config.get('options') || []
  const config = configs.find((res) => res.name === '_global:' + name)
  return config ? config.options : []
}

const modelNames = {
  hrJob: {
    model: 'Info/Hr/HrJob',
    text: '招聘',
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
