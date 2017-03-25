var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DOMParser = require("dom-parser");
var parser = new DOMParser();
var xhr = new XMLHttpRequest();
xhr.open( "GET", process.argv[2], false ); // false for synchronous request
xhr.send( null );
var data = xhr.responseText;
var xmlDoc=parser.parseFromString(data,"text/xml");
var title = xmlDoc.getElementsByTagName("title");
console.log(title);
