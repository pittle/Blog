var dbutil = require('./dbutil');

//插入一条blog
function insertBlog(title,content,tags,views,ctime,utime,success) {
    var insertSql = "insert into blog(title,content,tags,views,ctime,utime) values (?,?,?,?,?,?)";

    var params = [title,content,tags,views,ctime,utime];

    var connection = dbutil.createConnection();

    connection.connect();

    connection.query(insertSql,params,function (err,result) {
        if(err == null){
            // console.log(result);
            success(result);
        }else{
            throw new Error(err);
        }
    });

    connection.end();
}

//分页查询
function queryBlogByPage(page,pageSize,success) {
    var querySql = "select * from blog order by id desc limit ?,?";

    var params = [page * pageSize,pageSize];

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

//查找blog总数
function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog";

    var params = [];

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

//详情页获取
function queryBlogById(id,success) {
    var querySql = "select * from blog where id = ?";

    var params = [id];

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

//地图查询所有列表

function queryAllBlog(success) {
    var querySql = "select * from blog";

    var params = [];

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


//添加浏览记录
function addView(id,success) {
    var querySql = "update blog set views = views + 1 where id = ?";

    var params = [id];

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

// 最近热门根据浏览热度排序
function queryHotBlog(size,success){
    var querySql = "select * from blog order by views limit ?";
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


module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addView = addView;
module.exports.queryHotBlog = queryHotBlog;