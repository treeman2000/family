const { getRecipeAll } = require("../../utils/dbop")

// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recipes: [],         // 所有菜谱数据
    allRecipes: [],      // 用于保存完整的菜谱列表（用于搜索）
    recipeNames: [],     // 菜谱名称列表（用于搜索建议）
    searchList: [],      // 搜索建议列表
    searchKey: "",       // 搜索关键词
    isLoading: false,    // 加载状态
    version: ""          // 版本号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onShow(options) {
    try {
      this.setData({ isLoading: true })
      
      // 从数据库获取最新数据
      let res = await getRecipeAll()
      console.log("获取菜谱数据：", res)
      
      // 更新页面数据
      this.setData({
        recipes: res,
        allRecipes: res,
        recipeNames: res.map(recipe => recipe.name),
        version: getApp().globalData.version
      })

      // 用于调整tabbar的状态
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        const page = getCurrentPages().pop();
        this.getTabBar().setData({
          value: '/' + page.route
        })
      }
    } catch (error) {
      console.error("加载菜谱失败：", error)
      wx.showToast({
        title: '加载失败',
        icon: 'error',
        duration: 2000
      })
    } finally {
      this.setData({ isLoading: false })
    }
  },

  // 搜索框输入变化时的处理
  onChangeValue: function(e) {
    const { value } = e.detail;
    this.setData({
      searchKey: value,
      searchList: value ? this.data.recipeNames.filter((v) => v.includes(value)) : []
    });
  },

  // 执行搜索
  onSearch: function(){
    const searchKey = this.data.searchKey.trim()
    const filteredRecipes = searchKey === "" 
      ? this.data.allRecipes 
      : this.data.allRecipes.filter((v) => v.name.includes(searchKey))
    
    this.setData({ recipes: filteredRecipes })
  },
  // 点击菜谱项
  onClick: function(event){
    console.log(event.target.dataset)
    const recipeID = event.target.dataset.rid
    console.log('url: /pages/detail/detail?recipeID=' + recipeID)
    
    wx.navigateTo({
      url: '/pages/detail/detail?recipeID=' + recipeID
    })
  },

  // 下拉刷新
  onPullDownRefresh: async function() {
    try {
      // 从数据库获取最新数据
      let res = await getRecipeAll()
      
      // 更新页面数据
      this.setData({
        recipes: res,
        allRecipes: res,
        recipeNames: res.map(recipe => recipe.name),
        searchKey: "",
        searchList: []
      })
      
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1000
      })
    } catch (error) {
      console.error("刷新失败：", error)
      wx.showToast({
        title: '刷新失败',
        icon: 'error',
        duration: 2000
      })
    } finally {
      wx.stopPullDownRefresh()
    }
  }
})