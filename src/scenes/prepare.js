import {loader} from '../core'

export default function() {
  return new Promise(resolve => {
    loader
      .add('static/textures/misc.json')
      .load(resolve)
  })
}