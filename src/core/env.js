import {install} from '@pixi/unsafe-eval'

PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL
PIXI.settings.SORTABLE_CHILDREN = true

install(PIXI)