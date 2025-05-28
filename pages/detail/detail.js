// pages/detail/detail.js

const { getRecipeByID, delRecipeByID } = require("../../utils/dbop")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipeInfo : {}
  },
  async onLoad(options) {
    console.log('recipeID',options.recipeID)
    let r = await getRecipeByID(options.recipeID)
    this.setData({recipeInfo: r})
  },
  onDelete(){
    delRecipeByID(this.data.recipeInfo._id)
    wx.navigateBack()
  },
  onEdit(){
    console.log("onEdit")
    console.log("recipeID:", this.data.recipeInfo._id)
    getApp().globalData.currentRID = this.data.recipeInfo._id
    // 有tabbar的页面作为目标时，用switchTab,不能带参数，否则用navigateTo
    wx.switchTab({
      url: '/pages/edit/edit'
    })
  }
})