const { getRecipeAll } = require("../../utils/dbop")

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let res = await getRecipeAll()
    console.log("res",res)
    this.setData({recipes: res})
    console.log("this.data.recipes", this.data.recipes)
  },
  onClick: function(event){
    console.log(event.target.dataset)
    console.log('url: /pages/detail/detail?recipeID=' + event.target.dataset.rid)
    
    wx.navigateTo({
      url: '/pages/detail/detail?recipeID=' + event.target.dataset.rid
    })
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