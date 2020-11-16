
//	...
if( $OP === undefined ){
	$OP = {};
};

//...
if( $OP.Args === undefined ){
	//	...
	$OP.Args = function(args){
		//	...
		var spans = document.createElement('span');
			spans.classList.add('args');

		//	...
		if( args === undefined ){
			return spans;
		};

		//	...
		for(var arg of args){
			//	...
			var span = document.createElement('span');
				span.classList.add('arg');

			//	...
			span.appendChild( $OP.Arg(arg) );
			spans.appendChild( span );
		};

		//	...
		return spans;
	};
};
