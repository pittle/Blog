var dbutil = require('./dbutil');

function insertEvery(content,ctime,success) {
    var insertSql = "insert into every_day(content,ctime) values (?,?)";

    var params = [content,ctime];

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

function queryEveryDay(success) {
    var querySql = "select * from every_day order by id desc limit 1";

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

module.exports.insertEvery = insertEvery;
module.exports.queryEveryDay = queryEveryDay;