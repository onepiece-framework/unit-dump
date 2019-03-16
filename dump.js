/**
 * unit-dump:/index.php
 *
 * @creation  2018-04-13
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
	$OP.Dump = function(div){
		//	...
		if( div.innerText.length < 1 ){
			return;
		}

		//	...
		var json = JSON.parse(div.innerText);
		var dump = table(json);
		div.innerText = '';
		div.appendChild(dump);
	}

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

	//	...
	function table(json){
		var dump = document.createElement('table');
		for(var index in json){
			var value =  json[index];
			dump.appendChild(tr(index, value));
		}
		return dump;
	}

	//	...
	function tr(index, value){
		var temp = document.createElement('tr');

		//	...
		var tags = {};
			tags.th = document.createElement('th');
			tags.td = document.createElement('td');

		//	...
		temp.appendChild(tags.th);
		temp.appendChild(tags.td);

		//	...
		var match = index.match(/\s/);
		if( match ){
			console.log('The index key of associative array included space character.', match, index);
		}

		//	...
		tags.th.innerText = index;
		tags.th.addEventListener('click', click, false);

		//	...
		if( typeof value !== 'object' || value === null ){
			//	...
			var span = document.createElement('span');
				span.classList.add('arg');
				span.appendChild( Arg(value) );

			//	...
			var args = document.createElement('span');
				args.classList.add('args');
				args.appendChild(span);

			//	...
			tags.td.appendChild(args);
		}else{
			tags.td.appendChild(table(value));
		}

		//	...
		return temp;
	}

	//	...
	function click(e){
		if( this.parentNode.childNodes[1].childNodes[0].hidden ){
			this.parentNode.childNodes[1].childNodes[0].hidden = false;
		}else{
			this.parentNode.childNodes[1].childNodes[0].hidden = true;
		}
	};

	//	...
	document.addEventListener('DOMContentLoaded', function(){
		setTimeout(function(){
			var divs = document.querySelectorAll('div.OP_DUMP');
			for(var i=0; i<divs.length; i++){
				$OP.Dump(divs[i]);
			}
		}, 0);
	});
})();
