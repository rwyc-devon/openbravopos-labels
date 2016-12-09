ajax={
	getJSON:function(url, callback)
	{
		var xhr=new XMLHttpRequest();
		xhr.addEventListener("load", function(e){
			console.log(url);
			console.log(this.response);
			response=JSON.parse(this.response);
			(callback)(response);
		});
		xhr.open("GET", url);
		xhr.send();
	},
	getSearchResults:function(name, sku, callback)
	{
		ajax.getJSON("api/search?name="+encodeURIComponent(name)+"&sku="+encodeURIComponent(sku), callback);
	},
	getProduct:function(id, callback)
	{
		ajax.getJSON("api/getproduct?id="+encodeURIComponent(id), callback);
	},
	getProducts:function(ids, callback)
	{
		ajax.getProduct(encodeURIComponent(ids.join(",")), callback);
	}
}
function formPost(path, params)
{
	var form=document.createElement("form");
	console.log(form);
	form.method="POST";
	form.action=path;
	form.style.display="none";
	for(var name in params) {
		if(params.hasOwnProperty(name)) {
			var input=form.appendChild(document.createElement("input"));
			input.type="hidden";
			input.name=name;
			input.value=params[name];
		}
	}
	document.body.appendChild(form);
	form.submit();
}
