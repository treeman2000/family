const { getRecipeAll } = require("../../utils/dbop")

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipes: [],
    recipeNames: [],
    searchList: [],
    searchKey: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let res = await getRecipeAll()
    console.log("res",res)
    this.setData({recipes: res})
    // 加到缓存中
    wx.setStorageSync('recipes', res)
    console.log("this.data.recipes", this.data.recipes)
    
    const recipeNames = this.data.recipes.map(recipe => recipe.name)
    this.setData({recipeNames})
    wx.setStorageSync('recipeNames', recipeNames)
    console.log(this.data.recipeNames)
  },
  // 搜索框下面候选词的逻辑
  onChangeValue: function(e) {
    const { value } = e.detail;
    this.setData({
      searchList: value ? this.data.recipeNames.filter((v) => v.includes(value)) : [],
    });
    this.setData({searchKey: value})
  },
  onSearch: function(){
    let searchKey = this.data.searchKey
    this.setData({
      recipes: searchKey == "" ? wx.getStorageSync('recipes') : wx.getStorageSync('recipes').filter((v) => v.name.includes(searchKey))
    })
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