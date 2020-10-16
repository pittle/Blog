var blogDao = require('../dao/BlogDao');

var tagsDao = require('../dao/TagsDao');

var tagBlogMappingDao = require('../dao/TagBlogMappingDao');

var timeUtil = require('../util/timeUtil');

var respUtil = require('../util/respUtil');

var url = require('url');

var path = new Map();

//编辑博客
function editBlog(request,response) {
        var params = url.parse(request.url,true).query;
        var tags = params.tags.replace(/ /g,'').replace(/，/g,",");
        // console.log(params,tags);
        request.on('data',function (data) {
            blogDao.insertBlog(params.title,data.toString(),tags,0,timeUtil.getNow(),timeUtil.getNow(),function (result) {
                    response.writeHead(200);
                    response.write(respUtil.writeResult('success','添加成功',null));
                    response.end();
                    // console.log(result);
                    var blogId = result.insertId;
                    var tagList = tags.split(',');
                    for(var i = 0; i < tagList.length; i ++){
                        if(tagList[i] == ''){
                            continue;
                        }
                        queryTag(tagList[i],blogId);
                    }
            })
        });
}

function queryTag(tag,blogId) {
    tagsDao.queryTag(tag,function (result) {
        //沒有标签的時候
        if(result == null || result.length == 0){
            insertTag(tag,blogId);
        }else{
            // console.log(result);[ RowDataPacket { id: 1, tag: 'js', ctime: 1602242529, utime: 1602242529 } ]
            insertTagBlogMapping(result[0].id,blogId);
        }
    })
}

function insertTag(tag,blogId){
    tagsDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(),function (result) {
          insertTagBlogMapping(result.insertId,blogId);
    })
}

function insertTagBlogMapping(tagId,blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function (result) {

    })
}

path.set('/editBlog',editBlog);


//查询每一条博客
function queryBlogByPage(request,response){
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function (result) {
        for(var i = 0;i < result.length; i ++){
            //去掉图片标签
            result[i].content = result[i].content.replace(/<img[\w\W]*">/g,'');
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g,'');
            result[i].content = result[i].content.substring(0,300) + "...";
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set('/queryBlogByPage',queryBlogByPage);


//查找blog总数
function queryBlogCount(request,response){
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set('/queryBlogCount',queryBlogCount);


//获取每一条博客详情页
function queryBlogById(request,response){
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
        
    //每次点击一次浏览次数加一
        blogDao.addView(parseInt(params.bid),function (result) {})
    })
}
path.set('/queryBlogById',queryBlogById);

//地图查询所有列表

function queryAllBlog(request,response){
        blogDao.queryAllBlog(function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","查询成功",result));
            response.end();
        })
}
path.set('/queryAllBlog',queryAllBlog);

//最近热门接口
function queryHotBlog(request,response){
    blogDao.queryHotBlog(5,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set('/queryHotBlog',queryHotBlog);



module.exports.path = path;