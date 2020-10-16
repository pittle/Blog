var mysql = require('mysql');

function  createConnection() {
    var connection = mysql.createConnection({
        host:'192.168.43.100',
        port:'3306',
        user:'root',
        password:'',
        database:'my_blog'
    });
    return connection;
}

module.exports.createConnection = createConnection;