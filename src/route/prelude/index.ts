import * as PIXI from 'pixi.js'
import {autorun, reaction, runInAction} from 'mobx'
import {animate, easeInOut} from 'popmotion'
import {loader, stage, store, screen, sound} from '~/core'
import {delay, download, error, ok, readFile, sync, toast} from '~/util'
import * as navigator from '~/navigator'
import {Layout} from '~/lib/ui'

let root: PIXI.Container
let acts = [] as Array<{stop: Function}>

async function init() {
  root = new PIXI.Container()

  const layout = new Layout({
    alignItem: 'center',
    areas: [
      [{w: 735 * .3, h: 409 * .3}],
    ],
    anchor: {x: .5, y: .5},
  })

  const pixi = PIXI.Sprite.from('pixi.png')
  pixi.scale.set(1)
  pixi.anchor.set(.5)
  layout.addChild(pixi)

  layout.scale.set(store.mem.screen.dr)
  layout.position.set(screen.width / 2, screen.height / 2)

  root.addChild(layout)

  stage.addChild(root)

  acts.push(animate({
    from: 1,
    to: .2,
    ease: easeInOut,
    duration: 2e3,
    repeat: Infinity,
    repeatType: 'mirror',
    onUpdate: v => pixi.alpha = v
  }))


  await new Promise<any>(resolve => {
    loader
      .add('misc.json')
      .load(resolve)
  })

  // 模拟一些延时操作
  await Promise.all([
    delay(3),
  ])

  navigator
}

export async function show() {
  await init()
}

export function hide() {
  acts.forEach(act => act.stop())
  acts = []

  // 加载页不会再用到
  root.destroy({children: true})
}
