<!DOCTYPE html>
<html>
	<head>
		<title>Barcode Get</title>
		<link rel="stylesheet" href="style.css">
		<script src="keyboard.js"></script>
	</head>
	<body>
		<h1>Barcode Get</h1>
		<main>
			<section id="search-pane">
				<form id="search">
					<select name="field">
						<option value="name">Name</option>
						<option value="sku">SKU</option>
					</select>
					<input name="query" type="text">
					<input type="submit" value="Search">
				</form>
				<ul id="search-results"></ul>
			</section>
			<section id="editor">
				<form id="editor-controls">
					<input id="clearbutton" type="submit" value="Clear">
					<input id="csvbutton" type="submit" value="Get CSV">
					<input id="pdfbutton" type="submit" value="Get PDF">
				</form>
				<ul id="products"></ul>
			</section>
		</main>
		<script src="scripts/util.js"></script>
		<script src="scripts/requests.js"></script>
		<script src="scripts/search.js"></script>
		<script src="scripts/editor.js"></script>
	</body>
</html>
