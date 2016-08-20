var request = require('request');
var mongoose = require('mongoose');
var app = require('express')();

var mesh_month = 7;
var mesh_year  = 2014;

var db = mongoose.connect('mongodb://localhost/Mash');

var MeshSchema = new mongoose.Schema({
  meshcode : Number,
  nation : Number,
  //lord : Number,
  owner : Number
});
mongoose.model('Mesh', MeshSchema);
var Mesh = mongoose.model('Mesh');

var PlayerSchema = new  mongoose.Schema({
  id : Number,
  nation : Number,
  //lord : Number,
  ownmesh : [Number],
  people : Number
});
mongoose.model('Player', PlayerSchema);
var Player = mongoose.model('Player');


app.get('/', function(req, res){
  console.log('request reached');
  res.send('Hello world');
});

/*
 * {
 *   id: ID,
 *   latitude : LATITUDE,
 *   longitude : LONGITUDE
 * }
 *
*/
app.get('/test', function(req, res){
  console.log("CONNECTED to test");
  var q = req.query;
  var meshcode = calcMesh(q.latitude, q.longitude);
  var url = getMesh({mesh_code:meshcode, year:mesh_year, month:mesh_month});
  console.log("URL: " + url);
  request.get({url:url, json:true}, function(err, responce, body){
    console.log("BODY : " + body.data);
    if(body.data == ""){
      res.send("Bad query value");
      return;
    }
    var result = body.data[0].working_age;
    console.log("RESULT : " + result);
    res.send({population:result});
  });
});
app.get('/test2', function(req, res){
  console.log("connected");
  res.send(req.query);
});

app.get('/employ', function(req, res){
  var q = req.query;
  var player = new Player();
  var mesh = calcMesh(q.latitude, q.longitude);
  Player.find({id: q.id}, function(err, p){
    if(err){
      console.log("EERR");
      return;
    }
    console.log(p);
    if(p != []){
      console.log("CONFLICT");
      res.status(400).send("CONFLICT");
    }else{
      var new_p = new Player();
      Player.findOne({}).sort('id', 1).run(function(err, maxp){
        if(err) return;
        if(maxp == null){
          new_p.id = 0;
        }else{
          new_p.id = maxp.id+1;
        }
        Mesh.findOne({meshcode: mesh}, function(err, m){
          if(m == null){
            //new_p.lord = new_p.id;
            var new_mesh = new Mesh();
            new_mesh.meshcode = mesh;
            new_mesh.nation = new_p.id;
            new_p.nation = new_p.id;
          }else{
            new_p.nation = m.nation;
          }
          new_p.ownmesh.push(mesh);
          new_p.people = getMesh({year:mesh_year, month:mesh_month, mesh_code:mesh})["data"][0]["aged"];
          new_p.save();
        });
      });
    }
    res.send("AC");
  });

});

app.get('/position', function(req, res){
  var q = req.query;
  var mesh_code = calcMesh(q.latitude, q.longitude);
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
    });


    //IMPLEMENT FUNCTION CREATES RESPONCE
    var resdata = {
      //lord_id : player.load,
      own_mesh : [],
      own_people : 0,
      people : 0,
      area : [],
      nation_id : player.nation
    }

    Mesh.find({nation: player.nation}, function(err, mesh){
      if(err){
        console.log("ERR100");
        return;
      }
      resdata["people"] = mesh.length;
    });
    Mesh.find({owner: player.id}, function(err, mesh){
      if(err){
        console.log("ERR200");
        return;
      }
      resdata["own_people"] = mesh.length;
    });
    Mesh.find({}, function(err, mesh){
      if(err){
        console.log("ERR300");
        return;
      }
      resdata["area"] = mesh;
    });

    res.send(resdata);
  });

  res.status(200).send("Accepted");
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

function getMesh(query){
  var url = 'http://www.data4citizen.jp/app/users/openDataOutput/json/get/O_MESH_POPULATION';
  var q = '';
  for(key in query){
    q += '&' + key + '=' + query[key];
  }
  if(q != ''){
    url += '?' + q.substr(1);
  }
  return url;
}


function calcMesh(latitude, longitude){
  var a, b, c, d, e, f, g, h, i, j, k, l, m, n;
  p = Math.floor(latitude * 60 / 40);
  a = latitude * 60 % 40;
  q = Math.floor(a / 5);
  b = a % 5;
  r = Math.floor(b * 60 / 30);
  c = b * 60 % 30;
  s = Math.floor(c / 15);
  d = c % 15;
  t = Math.floor(d / 7.5);
  e = d % 7.5;

  u = Math.floor(longitude - 100);
  f = longitude - 100 - u;
  v = Math.floor(f * 60 / 7.5);
  g = f * 60 % 7.5;
  w = Math.floor(g * 60 / 45);
  h = g * 60 % 45;
  x = Math.floor(h / 22.5);
  i = h % 22.5;
  y = Math.floor(i / 11.25);
  j = i % 11.25;

  m = (s*2) + (x+1);
  n = (t*2) + (y+1);

  var code = String(p) + String(u) + String(q) + String(v) + String(r) + String(w) + String(m) +String(n);
  //var nCode = parseInt(code);

  //var code = n + 10*m + 100*w + 1000*r + 10000*v + 100000*g + 1000000*u + 1000000*p;

  return code;
}
/*
request(url + '?mesh_code=5639070321&month=7&year=2013', function(error, responce, body){
  if(!error && responce.statusCode == 200){
    console.log(body);
  }else{
    console.log('ERROR OCCURED: ' + responce.statusCode);
  }
});
*/
