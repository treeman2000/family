wx.cloud.init()
const db = wx.cloud.database()
const collectionRecipe = 'recipe'

const getRecipeByID = async function(rID){
  let rInfo = await db.collection(collectionRecipe).where({_id: rID}).get()
  if(rInfo.data.length == 0 ){
    return null
  }
  console.log(rInfo.data[0])
  return rInfo.data[0]
}

const getRecipeByType = async function(rType){
  let rInfo = await db.collection(collectionRecipe).where({tags: db.command.all([rType])}).get()
  if(rInfo.data.length == 0 ){
    return null
  }
  console.log(rInfo.data)
  return rInfo.data
}

const getRecipeByName = async function(rName){
  let rInfo = await db.collection(collectionRecipe).where({name: rName}).get()
  if(rInfo.data.length == 0 ){
    return null
  }
  console.log(rInfo.data[0])
  return rInfo.data[0]
}

const getRecipeAll = async function(){
  const MAX_LIMIT = 20
  const countResult = await db.collection(collectionRecipe).count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection(collectionRecipe).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  const results = await Promise.all(tasks)
  const allData = results.reduce((acc, cur) => {
    return acc.concat(cur.data)
  }, [])
  console.log(allData)
  return allData
}

const setRecipe = async function(r){
  console.log(r)
  let rInfo = await db.collection(collectionRecipe).add({
    data: r
  })
  console.log(rInfo.data)
  return rInfo.data
}

const setRecipes = async function(recipeList){
  let ps = []
  for(let r of recipeList){
    ps.push(setRecipe(r))
  }
  let res = await Promise.all(ps)
  console.log("setRecipes ok", res)
}

const delRecipeByID = async function(rID){
  try {
    let res = await db.collection(collectionRecipe).doc(rID).remove()
    console.log("删除菜谱成功", res)
    return res
  } catch (error) {
    console.error("删除菜谱失败", error)
    throw error
  }
}

const updateRecipeByID = async function(rID, r){
  console.log(rID,r)
  let res = await db.collection(collectionRecipe).doc(rID).update({data:r})
  console.log(res)
  return res
}

module.exports = {
  getRecipeByID,
  getRecipeByType,
  getRecipeByName,
  getRecipeAll,
  setRecipe,
  setRecipes,
  delRecipeByID,
  updateRecipeByID
}