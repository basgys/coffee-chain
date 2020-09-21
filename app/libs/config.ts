import getConfig from 'next/config'

// config wraps access to Next.js runtime config
export class config {
  static get = (key: string): any => {
    return getConfig().publicRuntimeConfig[key]
  }
  static map = (fn: (key: string, value: any) => any): any => {
    const c = getConfig().publicRuntimeConfig
    return Object.keys(c).map((key: string) => (
      fn(key, c[key])
    ))
  }
}
