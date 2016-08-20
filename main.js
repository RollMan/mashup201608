var url = require('./lib/url.js')
var request = require('request');
var mongoose = require('mongoose');
var app = require('express')();

var db = mongoose.connect('mongodb://localhost/player');

var MeshSchema = new mongoose.Schema({
  meshcode : Number,
  nation : Number,
  owner : Number
});
mongoose.model('Mesh', MeshSchema);
var Mesh = mongoose.model('Mesh');

var PlayerSchema = new  mongoose.Schema({
  id : Number,
  nation : Number,
  lord : Number,
  ownmesh : [Number],
  people : Number
});
mongoose.model('Player', PlayerSchema);
var Player = mongoose.model('Player');


app.get('/', function(req, res){
  console.log('request reached');
  res.send('Hello world');
});
app.get('/employ', function(req, res){
  var q = req.query;
  var player = new Player();
  var mesh = url.calcMesh(q.latitude, q.longitude);

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
  var mesh_code = url.calcMesh(q.latitude, q.longitude);
  if(!(q.id && q.latitude && q.longitude)){
    res.status(400).send("Bad Request");
  }

  Player.findOne({id: q.id}, function(err, player){
    if(err || player == null){
      console.log("No player");
      return;
    }
    Mesh.findOne({meshcode:mesh_code}, function(err, mesh){
      if(err){
        console.log("No mesh");
        return;
      }else if(mesh == null){
        var new_mesh = new Mesh();
        new_mesh.meshcode = mesh_code;
      }
      new_mesh.nation = player.nation;
      new_mesh.owner = player.id;
    }
    //IMPLEMENT FUNCTION CREATES RESPONCE
  });

  res.status(200).send("Accepted");
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
