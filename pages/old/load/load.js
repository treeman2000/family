// pages/load/load.js
const {exportData} = require('../../utils/file')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipesJson : ""
  },
  inputRecipesJson: function(e){
    this.setData({
      recipesJson : e.detail.value
    })
  },
  loadRecipe : function(){
    if (this.data.recipesJson == ''){
      return
    }
    console.log(this.data.recipesJson)
    const recipes = JSON.parse(this.data.recipesJson)
    wx.setStorageSync('recipes', recipes)
    exportData('recipes')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})