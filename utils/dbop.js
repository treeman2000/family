wx.cloud.init()
const db = wx.cloud.database()
const collctionRecipe = 'recipe'

const getRecipeByID = async function(rID){
  let rInfo = await db.collection(collctionRecipe).where({_id: rID}).get()
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
  getRecipeAll
}