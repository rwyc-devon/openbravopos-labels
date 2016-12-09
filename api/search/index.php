<?php
require_once("../../include/openbravo.php");
echo json_encode(findProducts($_GET["name"], $_GET["sku"]), JSON_PRETTY_PRINT);
