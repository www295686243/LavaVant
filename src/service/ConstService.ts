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

export function getAppValue (name: string) {
  const configs = cache.config.get('app') || []
  const item = configs.find((res: { name: string }) => res.name === name)
  return item ? item.value : ''
}

export function getOptions (name: string) {
  const configs: ConfigItem[] = cache.config.get('options') || []
  const config = configs.find((res) => res.name === name)
  return config ? config.options : []
}

export function getOptionsValue (id: number, _displayName?: string) {
  const configs: OptionItem[] = cache.config.get('options_list') || []
  const item = configs.find((res) => res.id === id)
  return item ? item.id : null
}
