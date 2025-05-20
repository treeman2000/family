// pages/test/test.js
// 测试导入utils的食物常量
const {recipeList} = require('../../utils/recipeList')

Page({
  data: {
    sc: 'empty',
  },
  // 测试云函数
  loadRecipe: function() {
    console.log("start test cloud func")
    wx.cloud.init()
    wx.cloud.callFunction({
      "name": "test2"
    }).then(console.log)
  },
  testImportConst: function() {
    console.log('testImportConst called')
    this.setData({ sc: foodCategories.素菜 })
  },
  // 测试云存储
  testDb:async function(){
    console.log('testDb called')
    wx.cloud.init()
    // wx.cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
    const db = wx.cloud.database()
    // in迭代得到下标，of才是元素，类似python中的in
    for(var item of recipeList){
      console.log(item)
      await db.collection("recipe").add({data:item})
    }
  }
})