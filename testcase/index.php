<?php
/**
 * module-testcase:/unit/dump/action.php
 *
 * @creation  2019-03-08
 * @version   1.0
 * @package   module-testcase
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
/* @var $app    \OP\UNIT\App  */
/* @var $args    array        */
//	...
D( true, false, null, "String", "123", '', "  \t,\r,\n  ", '<h1> XSS ', 0, 123, 1.23, [0, 1, '100', true, false, null,
		['foo'=>'bar','boolean'=>true,'null'=>null,'string'=>'', 'white-space'=>"  \t,\r,\n  ", 'XSS'=>'<h1> XSS ']]);
