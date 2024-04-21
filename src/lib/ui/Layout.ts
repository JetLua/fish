import * as PIXI from 'pixi.js'
import {tick} from '~/core'

type AlignType = 'h' | 'v' | 'g'
type AlignItem = 'center' | 'start' | 'end'
type Area = {w: number, h: number, x?: number, y?: number}

export class DynamciLayout extends PIXI.Container {
  #type: AlignType
  #alignItem: AlignItem
  #gap: number

  constructor(opts: {
    type: AlignType,
    alignItem: AlignItem,
    gap?: number
  }) {
    super()

    this.#gap = opts.gap ?? 0
    this.#type = opts.type
    this.#alignItem = opts.alignItem
  }

  _render(renderer: PIXI.Renderer) {
    super._render(renderer)

    const r = new PIXI.Rectangle()
    let x = 0
    let y = 0
    let maxWidth = 0
    let maxHeight = 0

    // 首先遍历找到最宽和最高值
    for (const c of this.children) {
      c.getBounds(true, r)
      if (r.width > maxWidth) maxWidth = r.width
      if (r.height > maxHeight) maxHeight = r.height
    }


    if (this.#type === 'v') {
      for (const c of this.children) {
        c.getBounds(true, r)
        // // c.position.set(x + c.pivot.x - r.x, y + c.pivot.y - r.y)
        c.y = y
        y += r.height + this.#gap
        if (this.#alignItem === 'center') {
          c.position.x = (maxWidth - r.width) / 2
          // console.log(c.)
        }
        // } else if (this.#alignItem === 'end') {
        //   c.position.x += maxWidth - r.width
        // }
      }
    }

    this.getLocalBounds(r)
    this.pivot.set(r.width / 2, r.height / 2)
  }
}
// [[],[],[]]
// [[],[],[]]

export class Layout extends PIXI.Graphics {
  alignItem: AlignItem
  areas: Area[][]
  gap: number
  anchor: PIXI.IPointData

  constructor(opts: {
    areas: Area[][]
    gap?: number
    alignItem?: AlignItem
    debug?: boolean
    anchor?: PIXI.IPointData
  }) {
    super()
    this.alignItem = opts.alignItem ?? 'center'
    this.areas = opts.areas
    this.gap = opts.gap ?? 0
    this.anchor = opts.anchor ?? {x: .5, y: .5}

    let w = 0
    let h = 0

    const _rows = [] as Area[]

    for (const rows of opts.areas) {
      let _w = 0
      let _h = 0

      for (const c of rows) {
        _w += c.w + this.gap
        c.h > _h ? _h = c.h : 0
      }

      _w -= this.gap
      h += _h + this.gap
      _rows.push({w: _w, h: _h})
      _w > w ? w = _w : 0
    }

    h -= this.gap


    for (let i = 0, y = 0; i < opts.areas.length; i++) {
      const rows = opts.areas[i]
      let x = 0
      for (const c of rows) {
        c.x = x + (c.w - _rows[i].w + w) / 2
        c.y = y + _rows[i].h / 2
        x += c.w + this.gap
      }
      y += _rows[i].h + this.gap
    }

    this.beginFill(0xffcc33, opts.debug ? .3 : 0)
    this.drawRect(0, 0, w, h)
    this.endFill()

    if (this.anchor) {
      const {x, y} = this.anchor
      this.pivot.set(w * x, h * y)
    }
  }

  addChild<U extends PIXI.DisplayObject[]>(...children: U): U[0] {
    super.addChild(...children)

    let i = 0

    for (const rows of this.areas) {
      for (const c of rows) {
        const child = this.children[i++]
        if (!child) continue
        child.position.copyFrom(c as any)
      }
    }

    return children[0]
  }
}
