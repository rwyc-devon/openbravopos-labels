function createElementWithText(tagName, txt, className)
{
	var e=document.createElement(tagName);
	e.appendChild(document.createTextNode(txt));
	if(className)
		e.classList.add(className);
	return e;
}
function createInput(type, value)
{
	var tagName=(["button"].indexOf(type) > -1)? type : "input";
	var e=document.createElement(tagName);
	e.type=type;
	if(typeof value !== 'undefined') {
		e.value=value;
	}
	return e;
}
