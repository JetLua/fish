import * as PIXI from 'pixi.js'
import {animate} from 'popmotion'
import {stage, screen, ticker} from '~/core'

let root: PIXI.Container
let fishes: Fish[] = []

const bound = screen.clone().pad(100)
const {max, random, PI, sin, cos} = Math

interface Fish extends PIXI.Sprite {
  speed: number
  direction: number
  turnSpeed: number
}


function init() {
  root = new PIXI.Container()

  const bed = PIXI.Sprite.from('bkg.jpg')
  bed.zIndex = -1
  bed.scale.set(max(screen.width / bed.width, screen.height / bed.height))

  /* 水面 */
  const overlay = PIXI.TilingSprite.from('overlay.png', {width: screen.width, height: screen.height})
  overlay.zIndex = 1

  /* 潭中鱼可百许头 */
  for (let i = 0; i < 16; i++) {
    const fish = PIXI.Sprite.from(`fish.${i % 4 + 1}.png`) as Fish
    fish.anchor.set(.5)
    fish.scale.set(.5)

    fish.speed = (1 + random()) * 2
    fish.direction = random() * PIXI.PI_2
    fish.turnSpeed = random() - .8

    fish.position.set(random() * screen.width, random() * screen.height)
    fish.anchor.set(.5)

    fishes.push(fish)
  }

  root.addChild(overlay, bed, ...fishes)

  ticker.add(() => {
    for (const fish of fishes) {
      fish.direction += fish.turnSpeed * .01
      fish.direction %= PIXI.PI_2
      fish.rotation = fish.direction
      fish.x -= cos(fish.rotation) * fish.speed
      fish.y -= sin(fish.rotation) * fish.speed

      fish.x < bound.left ? fish.x = bound.right :
      fish.x > bound.right ? fish.x = bound.left : 0

      fish.y < bound.top ? fish.y = bound.bottom :
      fish.y > bound.bottom ? fish.y = bound.top : 0
    }


    overlay.tilePosition.x -= 1
    overlay.tilePosition.y -= 1

    overlay.tilePosition.x %= 512
    overlay.tilePosition.y %= 512
  })
}

export function show() {
  if (!root) init()
  stage.addChild(root)
  root.alpha = 0
  animate({
    from: 0,
    to: 1,
    duration: 1e3,
    onUpdate: v => root.alpha = v
  })
}

export function hide() {
  stage.removeChild(root)
}
