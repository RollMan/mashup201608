var request = require('request');
var mongoose = require('mongoose');
var app = require('express')();

var db = mongoose.connect('mongodb://localhost/player');

var PlayerSchema = new  mongoose.Schema({
  id : String,
  nation : String,
  lord : String,
  ownmesh : [Number],
  people : Number
});


app.get('/', function(req, res){
  console.log('request reached');
  res.send('Hello world');
});
app.get('/employ', function(req, res){
});

/*
 * {
 *   id: ID,
 *   latitude : LATITUDE,
 *   longitude : LONGITUDE
 * }
 * 
*/
app.get('/position', function(req, res){
  var q = req.query;
  if(!(q.id && q.latitude && q.longitude)){
    res.status(400).send();
  }
  console.log(req.query);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
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
