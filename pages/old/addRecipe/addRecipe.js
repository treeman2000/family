Page({
  data: {
    name: '',
    ingredients: '',
    tag: ''
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  inputIngredients: function (e) {
    this.setData({
      ingredients: e.detail.value
    });
  },
  inputTag: function (e) {
    this.setData({
      tag: e.detail.value
    });
  },
  addRecipe: function () {
    const { name, ingredients, tag } = this.data;
    if (name && ingredients && tag) {
      const recipes = wx.getStorageSync('recipes');
      recipes.push({
        name: name,
        ingredients: ingredients,
        tags: tag
      });
      wx.setStorageSync('recipes', recipes);
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      });
      wx.navigateBack();
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
    }
  }
})