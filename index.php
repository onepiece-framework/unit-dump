<?php
/**
 * unit-dump:/index.php
 *
 * @creation  2018-04-13
 * @version   1.0
 * @package   unit-dump
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

/** namespace
 *
 * @creation  2019-02-22
 */
namespace OP;

//	...
include(__DIR__.'/Dump.class.php');

//	...
register_shutdown_function(function(){
	//	...
	try{
		//	...
		$webpack = Unit::Instantiate('Webpack');
		$webpack->Js ([__DIR__.'/mark', __DIR__.'/dump']);
		$webpack->Css([__DIR__.'/mark', __DIR__.'/dump']);

	}catch( \Exception $e ){
		//	...
		echo $e->getMessage();

		//	...
		echo '<script>';
		include(__DIR__.'/mark.js');
		include(__DIR__.'/dump.js');
		echo '</script>';

		//	...
		echo '<style>';
		include(__DIR__.'/mark.css');
		include(__DIR__.'/dump.css');
		echo '</style>';
	};
});
