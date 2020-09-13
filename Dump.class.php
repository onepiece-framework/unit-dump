<?php
/**
 * unit-dump:/Dump.class.php
 *
 * @created   2018-04-13
 * @version   1.0
 * @package   unit-dump
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

/** namespace
 *
 * @created   2018-04-20
 */
namespace OP\UNIT;

/** Used class
 *
 */
use OP\OP_CORE;
use OP\OP_UNIT;
use OP\IF_UNIT;
use OP\Env;
use function OP\Json;
use function OP\CompressPath;

/** Dump
 *
 * @created   2018-04-13
 * @version   1.0
 * @package   unit-dump
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
class Dump implements IF_UNIT
{
	/** trait
	 *
	 */
	use OP_CORE, OP_UNIT;

	/** Escape variable.
	 *
	 * @param array &$args
	 */
	static function _Escape(&$args)
	{
		foreach( $args as &$arg ){
			self::_EscapeByType($arg);
		}
	}

	/** Separate for _Object() from _Escape().
	 *
	 * @created   2020-09-06
	 * @param     mixed        &$arg
	 */
	static function _EscapeByType(&$arg)
	{
		switch( $type = gettype($arg) ){
			case 'array':
				self::_Escape($arg);
				break;

			case 'object':
				self::_Object($arg);
				break;

			case 'resource':
				$type = get_resource_type($arg);
				$arg  = "resource(type:$type)";
				break;

			case 'unknown type':
				$arg  = $type;
				break;

			default:
		}
	}

	/** Object to array.
	 *
	 * @created   2020-09-06
	 * @param     array        $arg
	 */
	static function _Object(&$arg)
	{
		//	Get object name.
		$name = get_class($arg);
		$arr["object($name)"] = [];

		//	Foreach property.
		foreach( $arg as $key => $val ){
			self::_EscapeByType($val);
			$arr["object($name)"][$key] = $val;
		}

		//	...
		$arg = $arr;
	}

	/** Mark
	 *
	 */
	static function Mark()
	{
		/**
		 * DEBUG_BACKTRACE_PROVIDE_OBJECT : Provide current object property.
		 * DEBUG_BACKTRACE_IGNORE_ARGS    : Ignore function or method arguments.
		 */
		$trace = debug_backtrace( DEBUG_BACKTRACE_IGNORE_ARGS, 2)[1];

		//	...
		$trace['file'] = CompressPath($trace['file']);

		//	Arguments.
		$args = func_get_args()[0];

		//	...
		self::_Escape($args);

		//	...
		switch( Env::Mime() ){
			case 'text/css':
				self::MarkCss($args, $trace);
				break;

			case 'text/javascript':
				self::MarkJS($args, $trace);
				break;

			case 'text/json':
			case 'text/jsonp':
				self::MarkJson($args, $trace);
				break;

			case 'text/plain':
				self::MarkPlain($args, $trace);
				break;

			case 'text/html':
			default:
				//	...
				self::MarkHtml($args, $trace);
			break;
		}
	}

	/** MarkCss
	 *
	 * @param mixed $value
	 * @param array $trace
	 */
	static function MarkCss($value, $trace)
	{
		print PHP_EOL;
		print "/* $value */".PHP_EOL;
	}

	/** MarkHtml
	 *
	 * @param mixed $value
	 * @param array $trace
	 */
	static function MarkHtml($args, $trace)
	{
		//	...
		$later = [];

		//	$mark
		$mark = [];
		$mark['file'] = $trace['file'];
		$mark['line'] = $trace['line'];
		$mark['args'] = [];

		//	$args
		foreach( $args as $value ){
			switch( $type = gettype($value) ){
				case 'array':
					//	Stack
					$later[] = $value;
					//	Look and feel to array.
					$count   = count($value);
					$value   = $type."($count)"; // --> array(1)
					break;

				case 'object':
					$later[] = $value;
					$value   = get_class($value);
					break;
			};

			$mark['args'][] = $value;
		};

		//	...
		Json($mark, 'OP_MARK');

		//	...
		foreach( $later as $value ){
			Json($value, 'OP_DUMP');
		}
	}

	/** MarkPlain
	 *
	 * @param mixed $value
	 * @param array $trace
	 */
	static function MarkPlain($value, $trace)
	{
		echo "{$trace['file']} #{$trace['line']}".PHP_EOL;
		print_r($value);
	}

	/** MarkJS
	 *
	 * @param mixed $value
	 * @param array $trace
	 */
	static function MarkJS($value, $trace)
	{
		$value = json_encode($value);
		$trace = json_encode($trace);
		echo "console.log(JSON.parse('{$trace}'), JSON.parse('{$value}'));";
	}

	/** MarkJson
	 *
	 * @param mixed $value
	 * @param array $trace
	 */
	static function MarkJson($value, $trace)
	{
		global $_JSON; // Why used global variable? <-- Use API?
		$mark = [];
		$mark['message']   = $value;
		$mark['backtrace'] = $trace;
		$_JSON['admin']['mark'][] = $mark;
	}
}
