import core, {devicePixelRatio, pixelRatio} from './core'

const
  design = {width: 750, height: 1334},
  monitor = new PIXI.utils.EventEmitter(),
  zoom = {
    mix: [],
    get max() {return Math.max(...this.mix)},
    get min() {return Math.min(...this.mix)}
  }

zoom.mix = [
  core.screen.width / design.width,
  core.screen.height / design.height
]

export default core
export {
  zoom,
  design,
  monitor,
  pixelRatio,
  devicePixelRatio
}