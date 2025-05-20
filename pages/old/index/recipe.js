const { exportData, importData } = require('../../utils/file.js');

Page({
  data: {
    recipes: []
  },
  onShow: function () {
    this.getRecipes();
  },
  getRecipes: function () {
    const recipes = wx.getStorageSync('recipes');
    console.log('getrecipes',recipes)
    this.setData({
      recipes: recipes
    });
  },
  // 随机获取N个菜
  getRandomRecipes: function () {
    exportData('recipes')
    importData('recipes')
    const v = wx.getStorageSync('recipes')
    this.setData({
      recipes : v
    } )
    console.log(v)
    console.log(this.data.recipes)
  },
  // 显示购物清单
  showShoppingList: function (recipeList) {
    const shoppingList = [];
    recipeList.forEach(recipe => {
      const ingredients = recipe.ingredients.split(',');
      ingredients.forEach(ingredient => {
        if (!shoppingList.includes(ingredient)) {
          shoppingList.push(ingredient);
        }
      });
    });
    console.log('购物清单:', shoppingList);
    wx.showModal({
      title: '购物清单',
      content: shoppingList.join(', '),
      showCancel: false
    });
  }
})