const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 从数据库读，json数据库
let db = cloud.database()
exports.main = async (event, context) => {
  return await db.collection("recipe").get()
}
// async await promise介绍
// https://zhuanlan.zhihu.com/p/172378607
