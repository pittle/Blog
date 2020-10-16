var blogDao = require('../dao/BlogDao');

var tagsDao = require('../dao/TagsDao');

var tagBlogMappingDao = require('../dao/TagBlogMappingDao');

var timeUtil = require('../util/timeUtil');

var respUtil = require('../util/respUtil');

var url = require('url');

var path = new Map();

//随机标签云
function queryRandomTags(request,response) {
    tagsDao.queryAllTag(function (result) {
         result.sort(function () {
             return Math.random() > 0.5 ? true : false;
         })
        response.writeHead(200);
        response.write(respUtil.writeResult("success","获取成功",result));
        response.end();
    })
}

path.set('/queryRandomTags',queryRandomTags);


//根据标签搜索的所有记录
function queryByTag(request,response){
    var params = url.parse(request.url,true).query;
    // console.log(params); //{ page: '0', pageSize: '1', tag: 'js' }
    tagsDao.queryTag(params.tag,function (result) {
        // console.log(result,123);
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","获取成功",result));
            response.end();
        }else{
            tagBlogMappingDao.queryByTag(result[0].id,parseInt(params.page),parseInt(params.pageSize),function (result) {
                // console.log(result);
                var blogList = [];
                for(var i = 0; i < result.length; i ++){
                    blogDao.queryBlogById(result[i].blog_id,function (result) {
                        blogList.push(result[0]);

                    })
                }
                //等blogList==result.length时才返回
                getResult(blogList,result.length,response);
            });
        }

    })

}

function getResult(blogList,len,response){
    if(blogList.length < len){
        setTimeout(function () {
            getResult(blogList,len,response);
        },10);
    }else{
        //去掉图片标签
        for(var i = 0;i < blogList.length; i ++){
            //去掉图片标签
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/g,'');
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g,'');
            blogList[i].content = blogList[i].content.substring(0,300) + "...";
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success","获取成功",blogList));
        response.end();
    }
}
path.set('/queryByTag',queryByTag);


//根据标签搜索到的总条数数值
function queryByTagCount(request,response){
    var params = url.parse(request.url,true).query;
    tagsDao.queryTag(params.tag,function (result) {
        tagBlogMappingDao.queryByTagCount(result[0].id,function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","获取成功",result));
            response.end();
        })
    })
}
path.set('/queryByTagCount',queryByTagCount);


module.exports.path = path;