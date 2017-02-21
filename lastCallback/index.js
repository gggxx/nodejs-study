// index.js
var obj = function(){};

obj.prototype = {
	constructor : obj,
	doSomething : function( arg1 , arg2_ ){

		var arg2 = typeof( arg2_ ) == 'string' ? arg2_ : null;

		var callback_ = arguments[ arguments.length - 1 ];
		callback = ( typeof( callback_ ) == 'function' ? callback_ : null );
		
		// 如果 arg2 不存在 ， 抛出错误		
		if( !arg2 )	 callback( new Error( 'second argument missing or not a string' ) );

		callback( null , arg1 );
	}
}

var test = new obj();

try{
	test.doSomething( 'test' , '12' , function( err , value ){
		console.log( value )
		if( err ) throw err;
		// console.log( value + '456' );
	})
}catch( e ){
	console.error( e );
}


// var err1 = new Error('i am a error');


// function callbackErr( err , value ){
// 	if( err ) throw err;

// 	console.log ( value + '123' );

// }

// try{
// 	callbackErr( err1 );
// }catch( e ){
// 	console.log( e );
// }











