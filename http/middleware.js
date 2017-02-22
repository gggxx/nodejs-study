// middleware.js
// 中间件处理乏味的数据流
// 存在于 开发人员 与底层系统 之中
// NODE 的两个主流 中间件应用程序 JSGI( Javascript Gateway Interface , Javascript网关接口 ) 和 Connect


// Connect中间件
// 3.x版本中 connect.static 方法被分离
var connect = require('connect'),
       http = require('http'),
    __dirname = 'home/example';

var app = connect() // 实在例化一个Connect

app.use( connect.static( __dirname + 'public_html' ) , { redirect : true } )
   .use( connect.logger() )

http.createServer( app ).listen( 8124 );


// Connect.favicon( path , options )的实现
module.exports = function( path , options ){

  

}
