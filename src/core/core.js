let {
  windowHeight: height,
  windowWidth: width,
  devicePixelRatio = 1,
  pixelRatio = 1
} = wx.getSystemInfoSync()

pixelRatio = Math.min(2, pixelRatio)

PIXI.utils.isWebGLSupported = () => true

const app = new PIXI.Application({
  view: canvas,
  width: width * pixelRatio,
  height: height * pixelRatio,
  roundPixels: true,
  sharedLoader: true,
  sharedTicker: true,
  autoResize: false,
  antialias: false,
  backgroundColor: 0x171a24
})

app.renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
  point.x = x * pixelRatio
  point.y = y * pixelRatio
}

app.align = function(node, option={}) {
  const
    {top, left, right, bottom} = option,
    delta = {x: 0, y: 0},
    rect = node.getBounds(false)

  if (top !== undefined) {
    delta.y = top - rect.top
  } else if (bottom !== undefined) {
    delta.y = (app.screen.height - bottom) - rect.bottom
  } else {
    delta.y = (app.screen.height - (rect.top + rect.bottom)) / 2
  }

  if (left !== undefined) {
    delta.x = left - rect.left
  } else if (right !== undefined) {
    delta.x = (app.screen.width - right) - rect.right
  } else {
    delta.x = (app.screen.width - (rect.left + rect.right)) / 2
  }
  node.x += delta.x / node.parent.scale.x
  node.y += delta.y / node.parent.scale.y
}

export default app
export {
  devicePixelRatio,
  pixelRatio
}
