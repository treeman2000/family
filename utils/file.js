// 菜谱格式
// name:string, ingredients: list, tags: list

// 导出功能
function exportData(keyName) {
  const path = `${wx.env.USER_DATA_PATH}/${keyName}`
  const data = wx.getStorageSync(keyName)
  const mgr = wx.getFileSystemManager()
  mgr.writeFileSync(path, JSON.stringify(data), 'utf8')
  console.log('save to:', path)
}

// 导入功能
function importData(keyName) {
  const path = `${wx.env.USER_DATA_PATH}/${keyName}`
  const fs = wx.getFileSystemManager()

  try {
    // 检查文件是否存在
    fs.accessSync(path)
    
    // 如果文件存在，继续执行读取和存储操作
    const content = fs.readFileSync(path, 'utf8')
    wx.setStorageSync(keyName, JSON.parse(content))
  } catch (error) {
    // 如果文件不存在，直接返回
    console.error(`文件 ${path} 不存在，跳过导入操作。`)
    return
  }
}

// 导出函数
module.exports = {
  exportData,
  importData,
};