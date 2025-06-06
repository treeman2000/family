// pages/edit/edit.js

const {getRecipeByID, setRecipe, updateRecipeByID} = require('../../utils/dbop')

const foodCategories = require("../../utils/foodCategories")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipeName: '',
    availableTags: Object.keys(foodCategories), // 使用foodCategories的键作为可用标签
    tags: Array(Object.keys(foodCategories).length).fill(false),
    ingredients: [{
      name: '',
      amount: '',
      unit: ''
    }],
    steps: [],
    notes: '',
    links: {
      xiaohongshu: '',
      douyin: '',
      bilibili: ''
    },
    rID: null
  },

  // 输入菜谱名称
  onNameInput(e) {
    this.setData({
      recipeName: e.detail.value
    })
  },

  // 标签切换处理
  onTagChange(e) {
    let tags = this.data.tags
    // console.log(e.currentTarget.dataset, this.data.tags)
    let idx = e.currentTarget.dataset.idx
    tags[idx] = !tags[idx]
    this.setData({ tags })
  },

  // 添加原料输入行
  addIngredientRow() {
    this.setData({
      ingredients: [...this.data.ingredients, {
        name: '',
        amount: '',
        unit: ''
      }]
    })
  },

  // 删除原料输入行
  removeIngredientRow(e) {
    const index = e.currentTarget.dataset.index
    const ingredients = this.data.ingredients
    if (ingredients.length > 1) {
      ingredients.splice(index, 1)
      this.setData({ ingredients })
    } else {
      wx.showToast({
        title: '至少需要一个原料',
        icon: 'none'
      })
    }
  },

  // 输入原料名称
  onIngredientNameInput(e) {
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    this.setData({
      [`ingredients[${index}].name`]: value
    })
  },

  // 输入原料数量
  onIngredientAmountInput(e) {
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    this.setData({
      [`ingredients[${index}].amount`]: value
    })
  },

  // 输入原料单位
  onIngredientUnitInput(e) {
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    this.setData({
      [`ingredients[${index}].unit`]: value
    })
  },

  onNotesInput(e) {
    this.setData({
      notes: e.detail.value
    })
    console.log(this.data.notes)
  },

  onLinkInput(e) {
    const platform = e.currentTarget.dataset.platform
    const value = e.detail.value
    
    this.setData({
      [`links.${platform}`]: value
    })
  },

  // 添加步骤行
  addStepRow() {
    this.setData({
      steps: [...this.data.steps, '']
    })
  },

  // 删除步骤行
  removeStepRow(e) {
    const index = e.currentTarget.dataset.index
    const steps = this.data.steps
    steps.splice(index, 1)
    this.setData({ steps })
  },

  // 输入步骤内容
  onStepInput(e) {
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    this.setData({
      [`steps[${index}]`]: value
    })
  },

  // 保存菜谱
  async saveRecipe() {
    console.log(this.data)
    if (!this.data.recipeName) {
      wx.showToast({
        title: '请输入菜谱名称',
        icon: 'none'
      })
      return
    }

    console.log(this.data.notes)
    // convert to db format
    const r = {
      name: this.data.recipeName,
      tags: this.data.availableTags.filter((_, i) => this.data.tags[i]),
      ingredients: this.data.ingredients.map(item => [item.name, item.amount, item.unit]),
      steps: this.data.steps,
      note: this.data.notes || '',
      links: this.data.links
    };

    if(this.data.rID==null){
      let res = await setRecipe(r)
    }else{
      let res = await updateRecipeByID(this.data.rID, r)
    }
    // set to default
    this.setData({
      recipeName: '',
      tags: Array(Object.keys(foodCategories).length).fill(false),
      ingredients: [{
        name: '',
        amount: '',
        unit: ''
      }],
      steps: [],
      notes: '',
      links: {
        xiaohongshu: '',
        douyin: '',
        bilibili: ''
      },
      rID: null
    })
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  async onShow() {
    let recipeID = getApp().globalData.currentRID
    console.log(recipeID)
    if (!recipeID) {
      return;
    }
    getApp().globalData.currentRID = ""
    
    let recipe = await getRecipeByID(recipeID);
    if (!recipe) {
      return;
    }

    // 转换ingredients格式
    const ingredients = recipe.ingredients.map(item => ({
      name: item[0],
      amount: item[1],
      unit: item[2]
    }));

    // 转换tags格式
    const tags = this.data.availableTags.map(tag => 
      recipe.tags.includes(tag)
    );

    this.setData({
      recipeName: recipe.name,
      ingredients: ingredients,
      tags: tags,
      steps: recipe.steps || [], // 添加步骤数据
      notes: recipe.note || '',
      links: recipe.links || {
        xiaohongshu: '',
        douyin: '',
        bilibili: ''
      },
      rID: recipe._id
    });

    console.log(this.data)
    
  // 用于调整tabbar的状态
    console.log("onshow",typeof this.getTabBar, this.getTabBar())
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const page = getCurrentPages().pop();
      this.getTabBar().setData({
        value: '/' + page.route
      })
    }
  }
})