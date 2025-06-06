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
  },
  onCopy(e){
    const platform = e.currentTarget.dataset.platform
    const links = this.data.recipeInfo.links || {}
    const link = links[platform]

    if (!link) {
      wx.showToast({
        title: `没有${this.getPlatformName(platform)}链接`,
        icon: 'none'
      })
      return
    }
    
    wx.setClipboardData({
      data: link,
      success: () => {
        wx.showToast({
          title: `${this.getPlatformName(platform)}链接已复制`,
          icon: 'success'
        })
      },
      fail: () => {
        wx.showToast({
          title: '复制失败，请重试',
          icon: 'error'
        })
      }
    })
  },

  getPlatformName(platform) {
    const platformNames = {
      xiaohongshu: '小红书',
      douyin: '抖音',
      bilibili: 'B站'
    }
    return platformNames[platform] || '未知平台'
  }
})