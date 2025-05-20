const foodCategories = require('./foodCategories')

module.exports = {
  recipeList: [
    {name:'丝瓜面test',
      ingredients:[['丝瓜',2,'根'],['番茄',1, '斤'],['鸡蛋', 3,'个'],['面',300,'克']],
      steps:['先洗一洗','再烧一烧'],
      tags:[foodCategories.主食, foodCategories.混合菜, foodCategories.荤菜],
      note:['别忘了洗','别忘了烧']
    },
    {name:'番茄意大利面',ingredients:['肉糜','番茄','意大利面'],tags:['主食']},
    {name:'番茄炒蛋',ingredients:['番茄','蛋'],tags:['素菜']},
    {name:'丝瓜炒蛋',ingredients:['丝瓜','蛋'],tags:['素菜']},
    {name:'荷兰豆炒山药',ingredients:['荷兰豆','山药','黑木耳'],tags:['素菜']},
    {name:'空气炸锅鸡胸肉',ingredients:['鸡胸肉'],tags:['荤菜']},
    {name:'沙拉',ingredients:['鸡胸肉','西兰花','小番茄','美国杂菜','胡萝卜'],tags:['混合菜']},
    {name:'白灼菜心',ingredients:['菜心'],tags:['素菜']},
    {name:'茄子肉糜',ingredients:['茄子','肉糜'],tags:['混合菜']},
    {name:'杏鲍菇炒青红椒',ingredients:['杏鲍菇','彩椒'],tags:['素菜']},
    {name:'咖喱饭',ingredients:['鸡胸肉','胡萝卜','土豆'],tags:['主食']},
    {name:'蒜苗炒肉',ingredients:['蒜苗','梅花肉','青椒'],tags:['混合菜']},
    {name:'蒜苔炒肉',ingredients:['蒜苔','梅花肉','青椒'],tags:['混合菜']},
    {name:'土豆炒肉',ingredients:['土豆','梅花肉','青椒'],tags:['混合菜']},
    {name:'丝瓜炒肉',ingredients:['丝瓜','梅花肉'],tags:['混合菜']},
    {name:'虾皮冬瓜',ingredients:['虾皮','冬瓜'],tags:['素菜']},
    {name:'孜然羊肉',ingredients:['羊肉'],tags:['荤菜']},
    {name:'包菜炒肉',ingredients:['包菜','鸡腿肉'],tags:['混合菜']},
    {name:'水煮西兰花',ingredients:['西兰花'],tags:['素菜']},
    {name:'水煮芹菜',ingredients:['芹菜'],tags:['素菜']},
    {name:'醋溜西葫芦',ingredients:['西葫芦','番茄','黑木耳'],tags:['素菜']},
    {name:'部队锅',ingredients:['金针菇','羊肉卷'],tags:['主食']},
    {name:'大盘鸡',ingredients:['鸡块','土豆','青椒','蒜苗','面'],tags:['主食']},
  ]
}