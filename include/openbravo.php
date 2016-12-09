<?php
require_once("db.php");
function getProduct($id) {
	$sql=<<<EOQ
select
	ID as id,
	REFERENCE as sku,
	NAME as name,
	FORMAT(PRICESELL, 2) as price,
	CODE as code
from
	PRODUCTS
where
	ID = ?
EOQ;
	$result=query($sql, ["s", $id])->fetch_assoc();
	return [
		"sku"=>trim($result["sku"]),
		"name"=>trim($result["name"]),
		"code"=>trim($result["code"]),
		"price"=>trim($result["price"]),
	];
}
function findProducts($name, $sku) {
	$sql=<<<EOQ
	select
		ID as id,
		REFERENCE as sku,
		NAME as name,
		FORMAT(PRICESELL, 2) as price,
		CODE as barcode
	from
		PRODUCTS
	where
		NAME like ? and
		REFERENCE like ?
	order by
		NAME
	limit
		250
EOQ;
	return results(query($sql, ["ss", "%$name%", "%$sku%"]));
}
