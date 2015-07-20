var exec = require("child_process").exec;

function home(response){
  console.log("Request handler 'home' was called.");
  exec("ls -lah", function(error, stdout,stderr){
    response.writeHeader(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response){
  console.log("Request handler 'upload' was called.");
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.home = home;
exports.upload = upload;