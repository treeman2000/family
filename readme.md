# 需求
能够在安卓和苹果运行。
不需要云服务器，本地运行。（后续可以支持几个设备之间同步，简单点用git之类的实现也行，后续有家庭服务器了考虑）

# 使用微信小程序
	好：
		可以跨端
		生态好
		类似vue，好学

# 其他
uniapp：看了下风评不好，bug可能较多
flutter：学习成本较大，类似java的一个语言
低代码平台MiT App Inventor：没法用AI帮忙写代码，开发太慢

# 同类调研
## 微信小程序“程序员做菜”
看了下是把菜单按照种类划分好，可以点击一级目录的种类，看到二级目录的各个菜名，再点进去看详细信息，包括原料工具、菜量、制作步骤。
没有提供我需要的一周随机菜谱功能。
有tag，但是比较简单，例如“回锅肉”只有一个“烹饪”tag，没有细分到蔬菜荤菜。

## 菜谱生成器
看了下有基于AI的，主要老外做的，没中国菜，估计内网还用不了。
https://mealgenie.ai/?ref=aishenqi.net
国内的也比较简单，有的要把所有菜输进去，他帮你做个排序。
https://www.tiandiyoyo.com/apps/weekmenu/
有的是写死的菜谱库，只能随机一组菜。
https://peppernotes.top/2020/07/dishesgenerator/
应用市场搜了下，都是些垃圾。

## 菜谱
### 需求
菜谱表由多个菜谱实例（简称菜谱）组成，每个菜谱实例由菜名，原料，tag组成。tag例如荤菜，素菜，汤。
存储菜谱。
支持导入导出。
支持添加菜谱实例
查看所有菜谱
随机N个菜出来。
对于给定的菜谱列表，自动把要买的菜列出。

### 备忘
响应式：在data里写变量，js里面要用this.setData更新。

### 后续
做菜步骤
对接盒马

上云，
支持多个用户看，
搞好看点
其他功能，

通义灵码试试

调研下现有产品：
电子家庭菜单
收纳助理

用云开发:
project.config.json配置cloudFunctionRoot，指定云函数的文件位置
右键这个文件夹，选择创建好的云环境。
右键这个文件夹，新建云函数。

### setdata
能够将修改动态传递到试图层。
如果要修改数组中某一个元素的值，要把修改的对象写成字符串，然后中括号括起来。
```
  let key = "recipeOfDays["+dayindex+"]"
  this.setData({ [key]:recipeOfDay });
```
https://blog.csdn.net/yisimo/article/details/79453896?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-79453896-blog-135450944.235^v43^pc_blog_bottom_relevance_base7&spm=1001.2101.3001.4242.2&utm_relevant_index=3

### 其他模块
账号密码模块
日记、会议记录模块
衣服模块（子分类，衣服，裤子，美甲，首饰等）
记账模块（支付宝能导出不）

todo::
多个链接，多个框，加个名字。
加个自动识别平台，记下来