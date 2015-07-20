var http = require("http");
var url = require("url");

function start(route, handle) {
http.createServer(function(request,response){
    console.log("Server kicked.");
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response);
}).listen(8080);
console.log("Server Running on 8080"); 
}

exports.start = start;