<?php
require_once("../../include/openbravo.php");
$ids=explode(",", urldecode($_GET["id"]));
$results=[];
foreach($ids as $id) {
	$results[$id]=getProduct($id);
}
echo json_encode($results, JSON_PRETTY_PRINT);
