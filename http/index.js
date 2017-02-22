//创建http服务器并监听是否有请求
//当接受到请求时，解析请求的地址，决定文件地址
//检查请求文件是否存在
//如果文件不存在，给出适当的响应
//如果文件存在，打开文件进行读取
//准备响应( response )的头部( header )
//等待下一次请求
var http = require('http'),
    path = require('path'),
    mime = requrei('mime'), // 用 mime.lookup( path ) 来测试文件的类型
      fs = require('fs'),
    //需要访问的页面的baseURL
    base = require('home/examples/public_html');

http.createServer( function( req , res ){
  
  var pathname = base + req.url;
  console.log( pathname );
  
  fs.exists( pathname , ( exists ) => {
    // 如果文件不存在，返回404错误
    if( !exists ){
      res.writeHead(404);
      res.write('Bad request 404\n');
      res.end();
    // 如果文件存在
    }else{
      res.setHeader('Content-type','text/html');
      res.statusCode=200;
      
      // 创建可读流
      var file = fs.createReadStream( pathname );
      // file绑定open事件
      file.on( 'open' , ( err )=>{
        file.pipe( res );
      })
      // file绑定error事件
      file.on( 'error' , ( err )=>{
        console.log( err );
      })
    }
  })

}).listen( 8124 );
