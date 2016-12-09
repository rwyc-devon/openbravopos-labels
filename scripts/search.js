var searchPane=document.getElementById("search-pane");
searchPane.form=document.getElementById("search");
searchPane.results=document.getElementById("search-results");
searchPane.search=function()
{
	q=searchPane.form.getSearchQuery();
	var name="";
	var sku="";
	if(q.field=="sku")
		sku=(q.query);
	else if(q.field=="name")
		name=(q.query);
	searchPane.clear();
	ajax.getSearchResults(name, sku, function(results){
		console.log(results);
		searchPane.populateResults(results);
	});
};
searchPane.form.getSearchQuery=function()
{
	return {
		field: searchPane.form.children[0].value,
		query: searchPane.form.children[1].value
	}
};
searchPane.populateResults=function(results)
{
	for(i=0; i<results.length; i++) {
		searchPane.results.appendChild(searchPane.createResultElement(results[i]));
	}
};
searchPane.clear=function()
{
	while(searchPane.results.hasChildNodes()) {
		searchPane.results.removeChild(searchPane.results.lastChild);
	}
};
searchPane.createResultElement=function(result)
{
	var li=document.createElement("li");
	li.appendChild(createElementWithText("h2", result.name));
	li.appendChild(createElementWithText("span", result.sku, "sku"));
	li.appendChild(createElementWithText("span", result.price, "price"));
	li.onclick=function(){
		editor.list.addProduct(result);
	}
	return li;
};
(function(){
	searchPane.form.onsubmit=function(e){
		e.preventDefault();
		this.parentNode.search();
	}
})();
