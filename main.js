var request = require('request');

var url = 'http://www.data4citizen.jp/app/users/openDataOutput/json/get/O_MESH_POPULATION';
request(url + '?mesh_code=5639070321&month=7&year=2013', function(error, responce, body){
  if(!error && responce.statusCode == 200){
    console.log(body);
  }else{
    console.log('ERROR OCCURED: ' + responce.statusCode);
  }
});
