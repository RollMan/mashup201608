console.log(calcMesh(37.523747, 139.939702));

//いど、けいど
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
