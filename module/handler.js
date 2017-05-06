function app(res){
	let jsonData = {"name":"aaa"};
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify(jsonData));
}

function bpp(res){
	let jsonData = {"name":"aaa"};
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end(JSON.stringify(jsonData));
}


exports.app = app;
exports.bpp = bpp;