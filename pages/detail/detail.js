// pages/detail/detail.js

const { getRecipeByID } = require("../../utils/dbop")

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
  }
})