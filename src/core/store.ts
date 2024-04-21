import {action, autorun, observable} from 'mobx'

export const mem = observable({
  /** 微信胶囊按钮尺寸信息 */
  menuBtn: {} as wx.IRect,
  /** 画布尺寸信息 */
  screen: {w: 0, h: 0, rw: 0, rh: 0, dr: 1, rdr: 1},
  /** 第三方字体 */
  font: '',
  /** 页面是否可见 */
  visible: true,

  user: {
    level: 0,
    token: '',
    name: '',
    avatar: '',
    diamond: 5,
    settings: {
      music: true,
      voice: true,
    }
  }
})
