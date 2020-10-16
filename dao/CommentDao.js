var dbutil = require('./dbutil');

//插入一条评论
function insertComment(blogId,parent,parent_name,username,email,comments,ctime,utime,success) {
    var insertSql = "insert into comments(blog_id,parent,parent_name,username,email,comments,ctime,utime) values (?,?,?,?,?,?,?,?)";

    var params = [blogId,parent,parent_name,username,email,comments,ctime,utime];

    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(insertSql,params,function (err,result) {
        if(err == null){
            success(result);
        }else{
            throw new Error(err);
        }
    });

    connection.end();
}

//查询某条blog所有评论
function queryCommentsByBlogId(blogId,success) {
    var querySql = "select * from comments where blog_id = ?";

    var params = [blogId];

    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(querySql,params,function (err,result) {
        if(err == null){
            success(result);
        }else{
            throw new Error(err);
        }
    });

    connection.end();
}

//查询某条blog的评论条数
function queryCommentsCountByBlogId(blogId,success){
    var querySql = "select count(1) as count from comments where blog_id = ?";

    var params = [blogId];

    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(querySql,params,function (err,result) {
        if(err == null){
            success(result);
        }else{
            throw new Error(err);
        }
    });

    connection.end();
}

//最新评论
function queryNewComments(size,success){
    var querySql = "select * from comments order by id desc limit ?";
    var params = [size];

    var connection = dbutil.createConnection();

    connection.connect();

    connection.query(querySql,params,function (err,result) {
        if(err == null){
            success(result);
        }else{
            throw new Error(err);
        }
    });

    connection.end();
}


module.exports.insertComment = insertComment;

module.exports.queryCommentsByBlogId = queryCommentsByBlogId;

module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;

module.exports.queryNewComments = queryNewComments;