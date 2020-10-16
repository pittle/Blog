

# blog项目

## 项目分析

### 博客文章
- 标题
- 内容
- 创建时间
- 浏览次数
- 标签列表

### 每日一句
- 内容
- 创建时间
- 修改时间

### 标签
- 标签名
- 创建时
- 修改时间

### 标签文章映射(文章标签互相查)
- 标签id
- 文章id

### 评论
- 用户名
- 时间
- 内容
- 扩展


## 项目架构

 浏览器页面  web层   DAO层  持久层
 
### 建表
 
1. blog表
- id
- title  
- content 
- views //瀏覽次數
- tags 
- ctime
- utime

2. 每日一句every_day
- id
- content
- ctime

3. tag表
- id 
- tag
- ctime
- utime

4. 映射表 tag_blog_mapping
- id 
- tag_id
- blog_id
- ctime
- utime

5. 评论表
- id
- blog_id
- parent
- username 
- comments
- email
- ctime
- utime

假设两条评论id=1 id=2 
id=2的评论是回复id=1的评论
parent字段是记录当前字段内容是否为回复
设parent默认为-1表示直接评论文章


## 搭建项目目录以及依赖环境
cnpm install express --save

### 设置静态资源目录的路径
- 通过字符串拼接 静态文件目录
app.use(express.static(__dirname + '/page/'));

- 通过 path.join函数拼接
console.log(path.join(__dirname, 'public'));//I:\back-end\blog\Blog\public


### 项目资源
- 富文本编译器
- wysiwyg

## 项目细节详情比较
- 在body设置text-align:center 子元素上会继承它


## express
- app.use和app.get的区别
> https://www.jianshu.com/p/bfc13d5e5c03
- 可以将app.get()看作app.use的特定请求(get)的简要写法。
```js
var express = require('express');
var app = express();
app.get('/hello',function(req,res,next){
    res.send('hello test2');
});
// 相当有
var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('hello world!');
});
app.use('/hello',router);
```



