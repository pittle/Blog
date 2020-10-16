var express = require('express');

//{ port: '12306', web_path: 'web' }
var globalConfig = require('./config');

var load = require('./load');

var app = new express();

var path = require('path');

//通过字符串拼接 静态文件目录
app.use(express.static(__dirname + '/page/'));

//編輯每日一句接口
app.post('/editEveryDay',load.get("/editEveryDay"));

//获取每日一句接口
app.get('/queryEveryDay',load.get("/queryEveryDay"));

//編輯文章接口
app.post('/editBlog',load.get("/editBlog"));

//获取博客文章接口
app.get('/queryBlogByPage',load.get("/queryBlogByPage"));

//获取blog总数
app.get('/queryBlogCount',load.get("/queryBlogCount"));

//获取文章详情
app.get('/queryBlogById',load.get("/queryBlogById"));

//添加评论
app.get('/addComment',load.get("/addComment"));

//验证码图片
app.get('/queryRandomCode',load.get("/queryRandomCode"));

//评论列表
app.get('/queryCommentsByBlogId',load.get("/queryCommentsByBlogId"));

//评论总条数
app.get('/queryCommentsCountByBlogId',load.get("/queryCommentsCountByBlogId"));

//地图
app.get('/queryAllBlog',load.get("/queryAllBlog"));

//获取随机标签
app.get('/queryRandomTags',load.get("/queryRandomTags"));

//最近热门接口
app.get('/queryHotBlog',load.get("/queryHotBlog"));

//最新评论
app.get('/queryNewComments',load.get("/queryNewComments"));

// 按照随机标签云查找一类标签blog
app.get('/queryNewComments',load.get("/queryNewComments"));

//根据标签搜索 查根据标签搜索的总数
app.get('/queryByTag',load.get("/queryByTag"));
app.get('/queryByTagCount',load.get("/queryByTagCount"));

app.listen(globalConfig['port'],function(){
    console.log('服务已经启动');
});




