var request = require('request');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/player');

var PlayerSchema = new  mongoose.Schema({
  id : String,
  nation : String,
  lord : String,
  ownmesh : [Number],
  people : Number
});

/*
request(url + '?mesh_code=5639070321&month=7&year=2013', function(error, responce, body){
  if(!error && responce.statusCode == 200){
    console.log(body);
  }else{
    console.log('ERROR OCCURED: ' + responce.statusCode);
  }
});
*/
