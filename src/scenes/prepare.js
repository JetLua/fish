export default async function () {
  // 单图片示例
  // 添加缓存
  // PIXI.Texture.addToCache(await loadTexture('static/textures/misc.png'), 'misc.png')
  // 使用
  // PIXI.Sprite.fromFrame('misc.png')
  await new Promise(async resolve => {
    new PIXI.Spritesheet(
      await loadBaseTexture('static/textures/misc.png'),
      require('../../dist/static/textures/misc.json')
    ).parse(resolve)
  })
}

function loadTexture(url) {
  return new Promise(resolve => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(PIXI.Texture.from(img))
  })
}

function loadBaseTexture(url) {
  return new Promise(resolve => {
    const img = wx.createImage()
    img.src = url
    img.onload = () => resolve(new PIXI.BaseTexture(img))
  })
}
