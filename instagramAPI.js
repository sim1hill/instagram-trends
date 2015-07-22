
var requestify = require('requestify'); 



function apiRequest(hashtag){

requestify.get('https://api.instagram.com/v1/tags/fw2015/media/recent?client_id=[INSERT CLIENT ID]&max_tag_id=10343103678223315303').then(function(response){
  var parsedResponse = response.getBody();

});
}




exports.apiRequest = apiRequest;