# fish
将[pixi-filters](https://github.com/pixijs/pixi-filters)搬运到微信小游戏。
仅作`pixi.js`开发微信小游戏展示之用。


https://github.com/JetLua/fish/assets/6738986/c54c2890-a25b-493b-8a76-f6256cb9cb02

## 开发
```bash
# clone 项目
git clone git@github.com:JetLua/fish.git

# 安装依赖
pnpm i

# 运行
pnpm dev

# 发布
pnpm build

# 微信开发者工具选择 dist 目录
```

## 提示
1. `dist/project.config.json`里的`appid`按需设置
2. 上传时请开启微信开发者工具的“**将JS编译成ES5**”
