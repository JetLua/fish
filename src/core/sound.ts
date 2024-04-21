import * as store from './store'

type N = 'collide-once.mp3' | 'collide-arrow.mp3' | 'collide-green.mp3' | 'collide.mp3' | 'fail.mp3' | 'win.mp3' | 'transfer.mp3' | 'bgm.mp3' | 'collide-gear.mp3' | 'gxtg.mp3' | 'click-baffle.mp3' | 'click-start.mp3' | 'new-baffle-tip.mp3'


function play(name: N, opts: {
  volume?: number
  loop?: boolean
  autoplay?: boolean
  useWebAudioImplement?: boolean
} = {}) {
  opts.loop = opts.loop ?? false
  opts.volume = opts.volume ?? 1
  opts.useWebAudioImplement = opts.useWebAudioImplement ?? true

  const c = wx.createInnerAudioContext({useWebAudioImplement: opts.useWebAudioImplement})
  c.src = `${wx.env.USER_DATA_PATH}/${name}`
  c.loop = opts.loop
  c.volume = opts.volume
  c.play()

  if (!opts.loop) {
    c.onPause(() => destroy(c))
    c.onEnded(() => destroy(c))
  }

  c.onError(() => destroy(c))

  return c
}

function destroy(c: wx.IInnerAudioContext) {
  c.destroy()
}

export const voice = {
  play(name: N, opts?: {
    volume?: number
    loop?: boolean
    autoplay?: boolean
    useWebAudioImplement?: boolean
  }) {
    if (!store.mem.user.settings.voice) return
    return play(name, opts)
  }
}

export const music = {
  play(name: N, opts: {
    volume?: number
    loop?: boolean
    autoplay?: boolean
    useWebAudioImplement?: boolean
  } = {}) {
    if (!store.mem.user.settings.music) return
    opts.useWebAudioImplement = false
    return play(name, opts)
  }
}
