wx.cloud.init()
const db = wx.cloud.database()
const collctionRecipe = 'recipe'

const getRecipeByID = async function(rID){
  let rInfo = await db.collection(collctionRecipe).where({_id: rID}).get()
  if(rInfo.data.length == 0 ){
    return null
  }
  console.log(rInfo.data[0])
  return rInfo.data[0]
}

const getRecipeByType = async function(rType){
  let rInfo = await db.collection(collctionRecipe).where({tags: db.command.all([rType])}).get()
  if(rInfo.data.length == 0 ){
    return null
  }
  console.log(rInfo.data)
  return rInfo.data
}

const getRecipeByName = async function(rName){
  let rInfo = await db.collection(collctionRecipe).where({name: rName}).get()
  if(rInfo.data.length == 0 ){
    return null
  }
  console.log(rInfo.data[0])
  return rInfo.data[0]
}

const getRecipeAll = async function(){
  let rInfo = await db.collection(collctionRecipe).get()
  console.log(rInfo.data)
  return rInfo.data
}

module.exports = {
  getRecipeByID,
  getRecipeByType,
  getRecipeByName,
  getRecipeAll
}