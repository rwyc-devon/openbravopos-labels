<?php
require_once("util.php");
function csvfile($products) {
	$fh=tmpfile();
	fputcsv($fh, ["sku", "name", "text", "price", "code"]);
	foreach($products as $p) {
		fputcsv($fh, [
			lookup($p, "sku",   ""),
			lookup($p, "name",  ""),
			lookup($p, "txt",  ""),
			lookup($p, "price", ""),
			lookup($p, "code",  "")
		], ',', '"', '\\');
	}
	fseek($fh, 0);
	return $fh;
}

require_once("../include/openbravo.php");
function createCsv($userdata) {
	$table=[];
	foreach($userdata as $uitem) {
		$row=[];
		#get item from db
		$dbitem=getProduct($uitem["id"]);
		#assign fields to row
		$row["sku"]=$dbitem["sku"] ?: "";
		$row["name"]=$uitem["name"] ?: $dbitem["name"] ?: "";
		$row["txt"]=$uitem["txt"] ?: "";
		$row["price"]=$dbitem["price"] ?: "";
		$row["code"]=$dbitem["code"] ?: "";
		#append the row n times to the table
		$n=$uitem["num"] ?: 1;
		for($i=0; $i<$n; $i++) {
			array_push($table, $row);
		}
	}
	return csvfile($table);
}
