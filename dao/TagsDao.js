var dbutil = require('./dbutil');

function insertTag(tag,ctime,utime,success) {
    var insertSql = "insert into tags(tag,ctime,utime) values (?,?,?)";

    var params = [tag,ctime,utime];

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

function queryTag(tag,success) {
    var insertSql = "select * from tags where tag = ?";

    var params = [tag];

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

//获取所有的随机标签云的tags
function queryAllTag(success) {
    var insertSql = "select * from tags";

    var params = [];

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



module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;
