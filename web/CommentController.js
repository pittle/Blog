
var commmentDao = require("../dao/CommentDao");

var timeUtil = require('../util/timeUtil');

var respUtil = require('../util/respUtil');

var url = require('url');

var captcha = require("svg-captcha");

var path = new Map();

//添加评论
function addComment(request,response) {
        var params = url.parse(request.url,true).query;
        commmentDao.insertComment(parseInt(params.bid),parseInt(params.parent),params.parentName,params.username,params.email,params.content,timeUtil.getNow(),timeUtil.getNow(),function () {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','评论成功',null));
            response.end();
        })
}

path.set("/addComment",addComment);

//生成随机数
function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34});
    // response.writeHead(200,{"Content-Type":"image/svg+xml"});
    response.writeHead(200);
    response.write(respUtil.writeResult("success","获取成功",img));
    response.end();
}
path.set("/queryRandomCode",queryRandomCode);

//评论列表
function queryCommentsByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    // console.log(params.bid);
    commmentDao.queryCommentsByBlogId(parseInt(params.bid),function (result) {
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success","获取成功",result));
        response.end();
    })
}

path.set("/queryCommentsByBlogId",queryCommentsByBlogId);

//查询某条blog的评论条数
function queryCommentsCountByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commmentDao.queryCommentsCountByBlogId(parseInt(params.bid),function (result) {
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success","获取成功",result));
        response.end();
    })
}
path.set("/queryCommentsCountByBlogId",queryCommentsCountByBlogId);

//最新评论
function queryNewComments(request,response){
    commmentDao.queryNewComments(5,function (result) {
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success","获取成功",result));
        response.end();
    })
}
path.set("/queryNewComments",queryNewComments);

module.exports.path = path;