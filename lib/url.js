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
