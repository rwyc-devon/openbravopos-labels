<?php
#send headers
header("Content-type: application/pdf");
header("Content-disposition: attachment; filename=\"labels.pdf\"");
require_once("../include/csv.php");
require_once("../config.php");
$fh=createCsv(json_decode($_POST["data"], true));
$pdf=tempnam(sys_get_temp_dir(), "labels-pdf-");
$pdfarg=escapeshellarg($pdf);
$templatefile=escapeshellarg($config["template"]);
$glabels=proc_open(
	"glabels-3-batch $templatefile -i - -o $pdfarg",
	[
		0 => $fh,
		1 => ["pipe", "w"],
		2 => ["pipe", "w"]
	],
	$pipes
);
foreach($pipes as $pipe) {
	fclose($pipe); #this'll also get the csv filehandle
}
proc_close($glabels);
$fh=fopen($pdf, "rb");
fpassthru($fh);
fclose($fh);
unlink($pdf);
