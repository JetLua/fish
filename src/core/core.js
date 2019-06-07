import './env'

let {
  devicePixelRatio,
  windowWidth: width,
  windowHeight: height,
} = wx.getSystemInfoSync()

const
  ticker = PIXI.Ticker.shared,
  loader = PIXI.Loader.shared,
  stage = new PIXI.Container(),
  design = {width: 1334, height: 750},
  monitor = new PIXI.utils.EventEmitter(),
  pixelRatio = Math.min(2, devicePixelRatio)

const
  renderer = new PIXI.Renderer({
    view: canvas,
    antialias: true,
    backgroundColor: 0x8799a3,
    width: width * pixelRatio,
    height: height * pixelRatio
  }),

  zoom = {
    mix: [],
    get max() { return Math.max(...this.mix) },
    get min() { return Math.min(...this.mix) }
  }

zoom.mix = [
  renderer.screen.width / design.width,
  renderer.screen.height / design.height
]

renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
  point.set(x * pixelRatio, y * pixelRatio)
}

ticker.add(() => renderer.render(stage))

export const screen = renderer.screen

export {
  zoom,
  stage,
  design,
  loader,
  ticker,
  monitor,
  renderer,
  pixelRatio
}