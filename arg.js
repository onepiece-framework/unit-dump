
//	...
if( $OP === undefined ){
	$OP = {};
};

//...
if( $OP.Arg === undefined ){
	//	...
	$OP.Arg = function(arg){
		//	...
		var type = (arg === null) ? 'null': typeof arg;
		var span = document.createElement('span');

		//	...
		span.innerText = (arg === null) ? 'null':arg;

		//	...
		span.classList.add('arg');
		span.classList.add(type);

		//	...
		switch( type ){
			case 'boolean':
				span.classList.add( arg ? 'true':'false' );
			break;

			case 'string':
				//	If arg is empty or number, wrap of quote.
				if( arg.length === 0 || arg.match(/^[0-9]+$/) ){
					span.classList.add('quote');
				}else

				//	Has white space.
				if( arg.match(/\s/) ){
					arg = arg.replace(/\t/g, '\\t');
					arg = arg.replace(/\n/g, '\\n');
					arg = arg.replace(/\r/g, '\\r');
					span.innerText = arg;

					//	...
					var html = span.innerHTML;
					html = html.replace(/ /g  ,'<span class="meta space">&nbsp;</span>');
					html = html.replace(/\\t/g,'<span class="meta">\\t</span>');
					html = html.replace(/\\n/g,'<span class="meta">\\n</span>');
					html = html.replace(/\\r/g,'<span class="meta">\\r</span>');
					span.innerHTML = html;
				};
			break;
		};

		//	...
		return span;
	};
};
