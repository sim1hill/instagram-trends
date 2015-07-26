
var requestify = require('requestify'); 



function apiRequest(hashtag){
  var linkArray = [];
  requestify.get('https://api.instagram.com/v1/tags/fw2015/media/recent?client_id=adae04fae67d4029b3ac8f0dbf7d88c2&max_tag_id=10343103678223315303').then(function(response){
    var parsedResponse = response.getBody().data;
    parsedResponse.forEach(function(photo){
      linkArray.push(photo.link + "/media");
    });
    return linkArray;
  });
}

exports.apiRequest = apiRequest;