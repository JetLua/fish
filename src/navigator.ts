import * as PIXI from 'pixi.js'
import * as routes from '~/route'
import {pixelRatio, store} from './core'

interface Scene {
  show: (opts?: any) => void
  hide: () => void
}

const records = [] as {scene: Scene, opts: any, name: SceneName}[]
let current: Scene
let currentName: SceneName
let currentOpts: any

export function back() {
  if (records.length < 1) return go('game')
  current.hide()
  const r = records.pop()!
  current = r.scene
  currentName = r.name
  currentOpts = r.opts
  current.show(currentOpts)
}

export function go(sn: 'game', opts?: {level: number, from?: 'invite'}): void
export function go(sn: SceneName, opts?: any) {
  if (sn === currentName) return

  if (current) {
    current.hide()
    records.push({scene: current, opts: currentOpts, name: currentName})
  }

  current = routes[sn]
  currentName = sn
  currentOpts = opts
  current.show(opts)
}

export function redirect(sn: SceneName, opts?: any) {
  if (sn === currentName) return
  current?.hide()

  current = routes[sn]
  currentName = sn
  currentOpts = opts
  current.show(opts)
}

let btn: PIXI.Sprite

export function add(parent: PIXI.Container) {
  if (!btn) {
    btn = PIXI.Sprite.from('icon.back.png')
    btn.interactive = true
    btn.scale.set(.5)
    btn.tint = 0xadb5bd
    const {mem: {screen: {rw}, menuBtn: r}} = store
    btn.position.set((rw - r.right) + btn.width / 2, (r.bottom + r.top) / 2)
    btn.on('tap', back)
  }

  btn.texture = PIXI.Texture.from(`icon.${records.length ? 'back' : 'home'}.png`)

  parent.addChild(btn)
}

export function toggle(visible: boolean) {
  if (btn) btn.visible = visible
}

export function getCurrent() {
  return {name: currentName, scene: current}
}
