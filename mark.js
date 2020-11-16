/**
 * unit-dump:/mark.js
 *
 * @creation  2017-07-28
 * @version   1.0
 * @package   unit-dump
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

//	...
if( $OP === undefined ){
	$OP = {};
}

//	...
(function(){
	//	...
	$OP.Mark = function(div){
		/*
		if( div.getAttribute('op-mark-complete') ){
			//	...
			console.log('op-mark-complete');

			//	...
			var scripts = document.head.querySelectorAll('script');
			for(var script of document.head.querySelectorAll('script')){
				var source = script.getAttribute('src');
				var queries= $OP.URL.Query.Parse( ((source + '?').split('?'))[1] );

				//	...
				console.log(script.getAttribute('src'));
			};

			return;
		};
		*/

		//	...
		if( div.innerText.length < 1 ){
			return;
		}

		//	...
		var text = div.innerText;
		var json = JSON.parse(text);

		//	...
		var spans = {};
			spans.file = document.createElement('span');
			spans.line = document.createElement('span');

			//	...
			spans.file.innerText = json.file;
			spans.line.innerText = json.line;
			spans.args = Args(json.args);

			//	...
			spans.file.classList.add('file');
			spans.line.classList.add('line');
			spans.args.classList.add('args');

		//	...
		div.innerText = '';
		div.appendChild(spans.file);
		div.appendChild(spans.line);
		div.appendChild(spans.args);

		/*
		div.setAttribute('op-mark-complete', true);
		*/
	}

	//	...
	function Args(args){
		//	...
		var spans = document.createElement('span');
			spans.classList.add('args');

		//	...
		for(var arg of args){
			//	...
			var span = document.createElement('span');
				span.classList.add('arg');

			//	...
			span.appendChild( Arg(arg) );
			spans.appendChild( span );
		};

		//	...
		return spans;
	};

	//	...
	function Arg(arg){
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
				//	Empty or Number
				if( arg.length === 0 || arg.match(/^[0-9]+$/) ){
					span.classList.add('quote');
				}else

				//	Has white space.
				if( arg.match(/\s/) ){
					arg = arg.replace("\t", '\\t');
					arg = arg.replace("\n", '\\n');
					arg = arg.replace("\r", '\\r');
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

	//	...
	document.addEventListener('DOMContentLoaded', function(){
		//	...
		var divs = document.querySelectorAll('div.OP_MARK');

		//	...
		for(var i=0; i<divs.length; i++){
			//	...
			$OP.Mark(divs[i]);
		}
	});
})();
