import core from '../core'

export default {
  fishes: [],
  padding: 100,

  setup() {
    const {width, height} = core.screen
    this.container = new PIXI.Container()
    this.bkg = PIXI.Sprite.fromFrame('bkg.jpg'),
    this.bkg.scale.set(Math.max(width / 630, height / 410))
    this.overlay = PIXI.extras.TilingSprite.fromFrame(
      'overlay.png',
      width,
      height
    )

    this.bound = new PIXI.Rectangle(0, 0, width, height)
    this.bound.pad(this.padding, this.padding)

    this.container.addChild(this.bkg)

    for (let i = 0; i < 16; i++) {
      const fish = PIXI.Sprite.fromFrame(`fish.${i % 4 + 1}.png`)
      fish.direction = Math.random() * Math.PI * 2
      fish.speed = (1 + Math.random()) * 2
      fish.omega = Math.random() - .8

      fish.anchor.set(.5)

      fish.position.set(
        Math.random() * width,
        Math.random() * height
      )
      this.fishes.push(fish)
      this.container.addChild(fish)
    }

    this.container.addChild(this.overlay)
  },

  listen() {
    this.container.once('added', () => {
      core.align(this.bkg)
    })
  },

  update(dt) {
    for (const fish of this.fishes) {

      fish.direction += fish.omega * .01

      fish.x += Math.sin(fish.direction) * fish.speed
      fish.y += Math.cos(fish.direction) * fish.speed

      fish.rotation = -fish.direction - Math.PI / 2

      fish.x < this.bound.left ? fish.x = this.bound.right :
        fish.x > this.bound.right ? fish.x = this.bound.left : null
      fish.y < this.bound.top ? fish.y = this.bound.bottom :
        fish.y > this.bound.bottom ? fish.y = this.bound.top : null
    }

    this.overlay.tilePosition.x -= dt
    this.overlay.tilePosition.y -= dt

    this.overlay.tilePosition.x %= 512
    this.overlay.tilePosition.y %= 512
  },

  show() {
    this.setup()
    this.listen()
    core.stage.addChild(this.container)
    core.ticker.add(this.update, this)
  },

  hide() {
    this.container.destory({children: true})
    core.ticker.remove(this.update, this)
  }
}