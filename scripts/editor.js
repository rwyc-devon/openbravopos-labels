var editor=document.getElementById("editor");
editor.list=document.getElementById("products");
editor.form=document.getElementById("editor-controls");
editor.list.addProduct=function(product, local) {
	console.log(product, local);
	editor.list.appendChild(editor.list.createProductElement(product, local));
	if(!local)
		editor.list.save();
};
editor.list.createProductElement=function(product, local) {
	local=(typeof local == "undefined")? {}: local;
	console.log(product)
	var e=document.createElement("li");
	e.id=product.id;
	var nameInput=e.appendChild(createInput("text", (typeof local.name == "undefined")? product.name : local.name));
	var txtInput=e.appendChild(createInput("text",(typeof local.txt == "undefined")? "" : local.txt));
	txtInput.setAttribute("placeholder", "text");
	e.appendChild(createElementWithText("span", product.sku, "sku"));
	var numInput=e.appendChild(createInput("number",(typeof local.num == "undefined")? 1 : local.num));
	txtInput.onchange=nameInput.onchange=numInput.onchange=function(){editor.list.save();};
	var delButton=createInput("button");
	delButton.onclick=function(e){
		this.parentNode.del();
	};
	e.appendChild(delButton);
	e.del=function() {
		e.parentNode.removeChild(this);
		editor.list.save();
	};
	e.data=function() {
		var data={
			id: e.id,
			num: numInput.value
		};
		if(txtInput.value !== "") {
			data.txt=txtInput.value;
		}
		if(nameInput.value!=product.name) {
			data.name=nameInput.value;
		}
		return data;
	};
	return e;
};
editor.list.data=function() {
	var children=editor.list.children;
	var data=[];
	for(var i=0; i<children.length; i++) {
		data.push(children[i].data());
	}
	return data;
};
editor.list.csv=function() {
	formPost("csv/", {data: JSON.stringify(editor.list.data())});
}
editor.list.pdf=function() {
	formPost("pdf/", {data: JSON.stringify(editor.list.data())});
}
editor.list.clear=function() {
	while(editor.list.hasChildNodes())
		editor.list.removeChild(editor.list.lastChild);
};
editor.list.save=function() {
	localStorage.barcodeGet=JSON.stringify(editor.list.data());
};
editor.list.load=function() {
	if(localStorage.barcodeGet) {
		locals=JSON.parse(localStorage.barcodeGet);
		IDs=[];
		for(var i=0; i<locals.length; i++) {
			IDs.push(locals[i].id);
		}
		ajax.getProducts(IDs, function(results){
			for(var i=0; i<locals.length; i++) {
				local=locals[i]
				result=results[local.id];
				result.id=local.id
				console.log(IDs);
				editor.list.addProduct(result, local);
			}
		});
	}
};
(function() {
	document.getElementById("clearbutton").onclick=function(e){
		editor.list.clear();
		editor.list.save();
		e.stopPropagation();
		e.preventDefault();
	};
	document.getElementById("csvbutton").onclick=function(e){
		editor.list.csv();
		e.stopPropagation();
		e.preventDefault();
	};
	document.getElementById("pdfbutton").onclick=function(e){
		editor.list.pdf();
		e.stopPropagation();
		e.preventDefault();
	};
	editor.list.load();
})();
