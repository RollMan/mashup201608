function getMesh(query){
  var url = 'http://www.data4citizen.jp/app/users/openDataOutput/json/get/O_MESH_POPULATION';
  var q = '';
  for(key in query){
    q += '&' + key + '=' + query[key];
  }
  if(q != ''){
    url += '?' + q.substr(1);
  }
  console.log(url);
}

//debug
//console.log(calcMesh(37.523749, 139.939513));

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

  //console.log(calLatLng(code));

  return code;
}

function calLatLng(_mesh){
  var mesh = _mesh.toString();
  var mesh1 = mesh.slice(0, 4);  // 1 次メッシュ
  var mesh2 = mesh.slice(4, 6);  // 2 次メッシュ
  var mesh3 = mesh.slice(6, 8);  // 3 次メッシュ

  // 経度の度分秒
  var latDeg = parseInt(mesh1.slice(0, 2)) / 1.5;
  var latMin = parseInt(mesh2.slice(0, 1)) * 5;
  var latSec = parseInt(mesh3.slice(0, 1)) * 30;
  // 緯度の度分秒
  var lngDeg = parseInt(mesh1.slice(2, 4)) + 100;
  var lngMin = parseInt(mesh2.slice(1, 2)) * 7.5;
  var lngSec = parseInt(mesh3.slice(1, 2)) * 45;

  // 10 進数表記に変換
  var lat = ((latDeg * 3600) + (latMin * 60) + latSec) / 3600;
  var lng = ((lngDeg * 3600) + (lngMin * 60) + lngSec) / 3600;

  return [ lat, lng ];
}
