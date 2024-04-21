import './env'
import {vert, frag} from './shader'
import * as PIXI from 'pixi.js'
import {runInAction} from 'mobx'

import * as store from './store'
export * as sound from './sound'

const {
  devicePixelRatio,
  windowWidth: width,
  windowHeight: height,
} = wx.getSystemInfoSync()

const ticker = PIXI.Ticker.shared
const loader = PIXI.Loader.shared
const stage = new PIXI.Container()
const pixelRatio = devicePixelRatio

const renderer = new PIXI.Renderer({
  width,
  height,
  view: canvas,
  antialias: true,
  resolution: pixelRatio,
  backgroundColor: 0x161a23,
  powerPreference: 'high-performance',
})


// link: https://github.com/pixijs/pixijs/pull/10443
renderer.plugins.tilingSprite.shader = PIXI.Shader.from(vert, frag, {globals: renderer.globalUniforms})

runInAction(() => {
  const {screen: {width: w, height: h}} = renderer

  store.mem.screen.dr = Math.min(w / 750, h / 1334)
  store.mem.screen.w = w
  store.mem.screen.h = h
  store.mem.screen.rw = width
  store.mem.screen.rh = height
  store.mem.screen.rdr = Math.min(width / 750, height / 1334)

  store.mem.menuBtn = wx.getMenuButtonBoundingClientRect()
})

renderer.plugins.accessibility.destroy()
renderer.plugins.interaction.mapPositionToPoint = (point: PIXI.Point, x: number, y: number) => {
  point.set(x, y)
}

ticker.add(() => renderer.render(stage))
const screen = renderer.screen

export {stage, renderer, store, screen, ticker, loader, pixelRatio}

export async function tick() {
  return new Promise(resolve => {
    renderer.once('postrender', resolve)
  })
}
