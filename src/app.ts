import {action} from 'mobx'
import {prelude} from '~/route'
import {store} from '~/core'
import * as navigator from '~/navigator'

wx.onShow(action(({query}) => {
  store.mem.visible = true
}))

wx.onHide(action(() => store.mem.visible = false))

prelude.show().then(() => {
  prelude.hide()
  navigator.go('game')
}).catch((err: Error) => {
  console.log(err)
  // wx.reportEvent('prelude_error', {err_msg: err?.message ?? err})
  wx.showModal({
    title: '出错啦',
    confirmText: '退出',
    showCancel: false,
    success: () => wx.exitMiniProgram()
  })
})

// 启用分享
wx.showShareMenu({menus: ['shareAppMessage', 'shareTimeline']})

// 更新检测
const updateManager = wx.getUpdateManager()

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})
