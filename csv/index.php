<?php
header("Content-type: text/csv");
header("Content-disposition: attachment; filename=\"labels.csv\"");
require_once("../include/csv.php");
$fh=createCsv(json_decode($_POST["data"], true));
fpassthru($fh);
fclose($fh);
