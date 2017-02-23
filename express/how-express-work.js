//http://www.html-js.com/article/1603
var h = {};
h.createServer = function(){
    
    var cb = arguments[arguments.length-1];
    cb = ( typeof cb == 'function' ) ? cb : null ;
    
    if( !cb ) return cb( new Error ('the argument is not function') );
    cb ( null , req , res , next )
}

var http = require('http');
function express(){
    var funcs = [];
    
    // 是http.createServer的回调，每次有请求都会将 数组中的中间件 依次执行一遍
    var expr = function(req,res){
        var i = 0;
        function next(){            
            var task = funcs[i++];
            if(!task) return;
            task(req,res,next);
        }
        next();
    }
    
    // use 方法将 中间件按照定义的顺序 push 进数组
    expr.use=function(f){
        funcs.push(f);
    }
    return expr;
}
var app = express();

app.use(function(req,res,next){
    console.log('haha');
    next();
});
app.use(function(req,res,next){
    console.log('hehe');
    next();
});
app.use(function(req,res){
    res.end("there is nothing happened");
});

http.createServer(app).listen('3000', function(){
  console.log('Express server listening on port 3000');
});
