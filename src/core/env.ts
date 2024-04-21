import '@iro/wechat-adapter'
import * as PIXI from 'pixi.js'
import {install} from '@pixi/unsafe-eval'
// @ts-expect-error
import Interaction from '@iro/interaction'

PIXI.settings.SORTABLE_CHILDREN = true
PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL
PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR

install(PIXI)

// pixi.js@6
// remove default interaction extensions
for (const x in PIXI.extensions._queue) {
  // @ts-expect-error
  for (const ext of PIXI.extensions._queue[x]) {
    if (ext.name === 'interaction') {
      PIXI.extensions.remove(ext)
    }
  }
}

// add @iro/interaction
PIXI.extensions.add(
  {
    name: 'interaction',
    ref: Interaction,
    type: [PIXI.ExtensionType.RendererPlugin, PIXI.ExtensionType.CanvasRendererPlugin]
  }
)
