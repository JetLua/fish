export function download(opts: {
  url: string
  filePath: string
}) {
  return new Promise<string>((resolve, reject) => {
    wx.downloadFile({
      ...opts,
      success: res => resolve(res.filePath),
      fail: reject
    })
  })
}

export function sync<T>(p: Promise<T>) {
  return p.then(ok).catch(error)
}

export function error(data: unknown): [null, Error] {
  if (data instanceof Error) return [null, data]
  return [null, new Error(data as any)]
}

export function ok<T>(data: T): [T, null] {
  return [data, null]
}

export function toast(title: string): void
export function toast(title: string, icon: Parameters<typeof wx.showToast>[0]['icon']): void
export function toast(title: any, icon?: any) {
  if (icon) return wx.showToast({title, icon})
  if (typeof title === 'string') return wx.showToast({title, icon: 'none'})
}

const fsm = wx.getFileSystemManager()

export function readFile(opts: {
  filePath: string
  encoding?: Parameters<typeof fsm.readFile>[0]['encoding']
}) {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    fsm.readFile({
      ...opts,
      success: res => resolve(res.data),
      fail: reject
    })
  })
}

/** 等待 t 秒 */
export function delay(t: number, stoppable: true): {p: Promise<boolean>, stop: () => void}
export function delay(t?: number): Promise<void>
export function delay(t = 0, stoppable?: boolean): any {
  if (!stoppable) {
    return new Promise(resolve => {
      setTimeout(resolve, t * 1e3)
    })
  }

  let id: number
  let _resolve: (ok: boolean) => void

  const p = new Promise<boolean>(resolve => {
    _resolve = resolve
    id = setTimeout(() => resolve(true), t * 1e3)
  })

  return {p, stop: () => {
    clearTimeout(id)
    _resolve(false)
  }}
}

export function getUserInfo(opts: Parameters<typeof wx.createUserInfoButton>[0]) {
  return new Promise<wx.IUserInfo>(resolve => {
    const btn = wx.createUserInfoButton(opts)

    const handle: Parameters<typeof btn.onTap>[0] = (res) => {
      resolve(res)
      btn.destroy()
    }

    btn.onTap(handle)
  })
}

export function distance(p: {x: number, y: number}, q: {x: number, y: number}) {
  return Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2)
}

export function range(m: number, n: number, int = false) {
  const i = m + (n - m) * Math.random()
  return int ? i | 0 : i
}

export function dark(v: number, t: number) {
  const r = (v >>> 16 & 0xff) * t
  const g = (v >>> 8 & 0xff) * t
  const b = (v & 0xff) * t
  return (r << 16) | (g << 8) | b
}

export function mixin<T extends new (...args: any[]) => unknown>(ctor: T, ...bases: any[]) {
  bases.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      // 小程序特色？
      if (name === 'constructor') return
      Object.defineProperty(
        ctor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
      )
    })
  })
  return ctor
}
