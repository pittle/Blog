var express = require('express');

var app = new express();

var path = require('path');

//通过字符串拼接 静态文件目录
// app.use(express.static(__dirname + '/'));

// app.use(express.static(__dirname + '/page/'));


// app.get('/user/:userId(\\d+)', function (req, res) {
//     res.send(req.params)
// })

//通过 path.join函数拼接
// console.log(path.join(__dirname, 'public'));//I:\back-end\blog\Blog\public

// app.locals.title = 'My App'
// app.locals.strftime = require('strftime')
// app.locals.email = 'me@myapp.com'


// app.listen(12306,function(){
// //     console.log('服务已经启动');
// // });
// //
// //
// // app.use('/abcd', function (req, res, next) {
// //     console.log(123);
// //
// //     next();
// //
// //     // res.send('Hello World')
// // });
// //
// // app.get('/abcd', function (req, res) {
// //     res.send('Welcome')
// // })


