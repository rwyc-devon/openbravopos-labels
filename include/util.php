<?php
function lookup($array, $key, $default=Null) {
	return isset($array[$key])? $array[$key] : $defualt;
}
