// pages/random/random.js

const { getRecipeByType, getRecipeByName } = require("../../utils/dbop")
const food = require("../../utils/foodCategories")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: 2,
    numMeatPerDay: 1,
    numVegPerDay: 1,
    // 二维列表，第一维度是第i天，第二维度是第j个菜
    recipeOfDays: [],
    // 添加菜谱
    searchList: [],
    searchKey: "",
    // 原料清单，二维map，[原料名][单位]数量
    ingredients: {}
  },
  // 用于调整tabbar的状态
  onShow() {
    console.log("onshow",typeof this.getTabBar, this.getTabBar())
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const page = getCurrentPages().pop();
      this.getTabBar().setData({
        value: '/' + page.route
      })
      console.log('/' + page.route)
    }
  },
  handleDay: function(input){
    // console.log("handleDay",day)
    this.setData({day: Number(input.detail.value)})
  },
  handleMeat: function(input){
    this.setData({numMeatPerDay:  Number(input.detail.value)})
  },
  handleVeg: function(input){
    this.setData({numVegPerDay:  Number(input.detail.value)})
  },
  generate: async function(){
    let [meats, vegs, mains] = await Promise.all([
      getRecipeByType(food.荤菜),
      getRecipeByType(food.素菜),
      getRecipeByType(food.主食)
    ])

    // 随机一下
    meats = [...meats].sort(() => Math.random() - 0.5)
    vegs = [...vegs].sort(() => Math.random() - 0.5)
    mains = [...mains].sort(() => Math.random() - 0.5)

    let recipeOfDays = this.generateFoodGroups(meats, vegs)
    console.log("recipeOfDays",recipeOfDays)
    for(let main of mains){
      recipeOfDays.push([main])
    }
    console.log("recipeOfDays",recipeOfDays)
    recipeOfDays = [...recipeOfDays].sort(() => Math.random() - 0.5).slice(0, this.data.day)
    this.setData({recipeOfDays: recipeOfDays})
    this.getIngredients()
  },
  generateFoodGroups: function(meats, vegs) {
    const {numMeatPerDay,numVegPerDay,day} = this.data
    const maxMeatGroups = Math.floor(meats.length / numMeatPerDay);
    const maxVegGroups = Math.floor(vegs.length / numVegPerDay);
    const maxGroups = Math.min(maxMeatGroups, maxVegGroups, day);
    console.log(this.data.numMeatPerDay)
    console.log(day,numMeatPerDay,numVegPerDay,maxMeatGroups,maxVegGroups,maxGroups,meats,vegs)
    // 先创建N个空列表，表示N天的菜，然后往里填荤菜和素菜
    const pairs = Array.from({ length: maxGroups}, () => [])
    console.log(pairs)

    let addOneRecipe = function(li, numPerDay){
      for(let i = 0; i<maxGroups; i+= numPerDay){
        for(let j=0;j<numPerDay;j++){
          console.log(i,j)
          pairs[i].push(li[i*numPerDay+j])
        }
      }
    }
    addOneRecipe(meats, numMeatPerDay)
    addOneRecipe(vegs, numVegPerDay)

    return pairs;
  },
  onDeleteRecipe: function(e) {
    // wxml的大写到这里自动变小写
    const { dayindex, recipeindex } = e.currentTarget.dataset;
    // console.log(e.currentTarget.dataset)
    const recipeOfDay = this.data.recipeOfDays[dayindex]
    recipeOfDay.splice(recipeindex, 1);
    let key = "recipeOfDays["+dayindex+"]"
    this.setData({ [key]:recipeOfDay });
  },
  onChangeValue: function(e) {
    const { value } = e.detail;
    const recipeNames = wx.getStorageSync('recipeNames')
    console.log(recipeNames, typeof recipeNames)
    this.setData({
      searchList: value ? recipeNames.filter((v) => v.includes(value)) : [],
    });
    this.setData({searchKey: value})
  },
  // 添加某个菜到某一天
  onAdd: async function(e){
    const { dayindex } = e.currentTarget.dataset;
    console.log("dayindex",dayindex,e)
    let recipe = await getRecipeByName(this.data.searchKey)
    if(recipe == null){
      wx.showToast({
        title: '不存在这个菜',
        icon: 'none'
        })
        return
    }
    let newRecipeList = this.data.recipeOfDays[dayindex]
    newRecipeList.push(recipe)
    let fieldName = 'recipeOfDays['+dayindex+"]"
    this.setData({
      [fieldName] : newRecipeList
    })
    console.log(this.data.recipeOfDays)

    // 把候选框清空
    this.setData({searchList:[]})

    this.getIngredients()
  },
  getIngredients: function(){
    console.log("getIngredients")
    let ings = {}
    for(let recipes of this.data.recipeOfDays){
      for(let r of recipes){
        for(let ing of r.ingredients){
          let recipeName = ing[0]
          let unit = ing[2]
          if(recipeName in ings){
            if(unit in ings[recipeName]){
              ings[recipeName][unit] += ing[1]
            }else{
              ings[recipeName][unit]=ing[1]
            }
          }else{
            ings[recipeName]={[unit]:ing[1]}
          }
        }
      }
    }
    this.setData({ingredients: ings})
    console.log(this.data.ingredients)
  },
  onDetail: function(e) {
    const { dayindex, recipeindex } = e.currentTarget.dataset;
    const recipe = this.data.recipeOfDays[dayindex][recipeindex];
    wx.navigateTo({
      url: '/pages/detail/detail?recipeID=' + recipe._id
    });
  }
})