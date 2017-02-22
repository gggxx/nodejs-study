// middleware.js
// 中间件处理乏味的数据流
// 存在于 开发人员 与底层系统 之中
// NODE 的两个主流 中间件应用程序 JSGI( Javascript Gateway Interface , Javascript网关接口 ) 和 Connect


// Connect中间件
// 3.x版本中 connect.static 方法被分离
// var connect = require('connect'),
//        http = require('http'),
//     __dirname = 'home/example';

// var app = connect() // 实在例化一个Connect

// app.use( connect.static( __dirname + 'public_html' ) , { redirect : true } )
//    .use( connect.logger() )

// http.createServer( app ).listen( 8124 );


// Connect.favicon( path , options )的实现
module.exports = function( path , options ){

	var options = options || {},
	  path = path || __dirname + '/../public/favicon.ico',
	  maxAge = options.maxAge || 86400000;

	return function( req , res , next ){

		if( '/favicon.ico' == req.url ){

			if( icon ){
				res.writeHead( 200 , icon.headers );
				res.end( icon.body );
			}else{

				fs.readFile( path , function( err , buf ){

					if( err )  return next( err );

					icon = {
						headers : {
							'Content-type' : 'image/x-icon',
							'Content-Length' : buf.length,
							'ETag' : '"' + utils.md5( buf ) + '"',
							'Cache-Control' : 'public , max-age=' + ( maxAge / 1000 )
						},
						body : buf
					};

					res.writeHead( 200 , icon.headers );
					res.end( icon.body );

				})

			}
		}else{
			next();
		}

	}
}


