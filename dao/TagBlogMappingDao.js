var dbutil = require('./dbutil');

function insertTagBlogMapping(tag_id,blog_id,ctime,utime,success) {
    var insertSql = "insert into tag_blog_mapping(tag_id,blog_id,ctime,utime) values (?,?,?,?)";

    var params = [tag_id,blog_id,ctime,utime];

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

function queryByTag(tagId,page,pageSize,success) {
    var insertSql = "select * from tag_blog_mapping where tag_id = ? limit ?,?";

    var params = [tagId,page*pageSize,pageSize];

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


function queryByTagCount(tagId,success) {
    var insertSql = "select count(1) as count from tag_blog_mapping where tag_id = ?";

    var params = [tagId];

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

module.exports.queryByTagCount = queryByTagCount;

module.exports.queryByTag = queryByTag;

module.exports.insertTagBlogMapping = insertTagBlogMapping;
