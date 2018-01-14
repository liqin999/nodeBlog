#node构建一套基本的博客系统

# mongodb  链接数据库 找到mondb安装的路径bin目录下程序，然后链接上本地需要链接的数据：
# 例如：  E:\Mongdb\bin>mongod --dbpath=F:\nodeBlog\db --port=27018
# 下一步使用可视化的工具进行链接
# 程序中监听链接   mongoose.connect('mongodb://localhost:27018/blog',function(err){})