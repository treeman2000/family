// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 用于调整tabbar的状态
  onShow() {
    console.log("onshow",typeof this.getTabBar, this.getTabBar())
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const page = getCurrentPages().pop();
      this.getTabBar().setData({
        value: '/' + page.route
      })
    }
  }
})