import {ticker, stage, screen} from '../core'

const
  {max, random, PI, sin, cos} = Math,
  PI2 = PI * 2

export default {
  fishes: [],
  bound: screen.clone(),

  init() {
    this.container = new PIXI.Container()
    /* 湖底 */
    this.bed = PIXI.Sprite.from('bkg.jpg')
    this.bed.zIndex = -1
    this.bed.scale.set(max(screen.width / this.bed.width, screen.height / this.bed.height))

    /* 水面 */
    this.overlay = PIXI.TilingSprite.from('overlay.png', screen.width, screen.height)
    this.overlay.zIndex = 1

    /* 潭中鱼可百许头 */
    for (let i = 0; i < 16; i++) {
      const fish = PIXI.Sprite.from(`fish.${i % 4 + 1}.png`)

      fish.speed = (1 + random()) * 2
      fish.direction = random() * PI2
      fish.turnSpeed = random() - .8

      fish.position.set(random() * screen.width, random() * screen.height)
      fish.anchor.set(.5)

      this.fishes.push(fish)
      this.container.addChild(fish)
    }

    /**
     * env.js 开启了 SORTABLE_CHILDREN
     * 所以可以根据 zIndex 排序
     */
    this.container.addChild(
      this.overlay,
      this.bed
    )

    this.bound.pad(100)
  },

  update() {
    const {bound, overlay, fishes} = this

    for (const fish of fishes) {
      fish.direction += fish.turnSpeed * .01
      fish.direction %= PI2
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
  },

  show() {
    this.init()
    stage.addChild(this.container)
    ticker.add(this.update, this)
  }
}